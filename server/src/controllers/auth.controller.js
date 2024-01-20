const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const saltRounds = 10;

const {
  generateRefreshToken,
  verifyRefreshTokenExpiration,
} = require("../models/refreshToken.model");

const {
  checkIfRolesExist,
} = require("../middleware/checkIfRolesExists");

exports.signup = async (req, res) => {
  const { email, password, roles } = req.body;

  try {
    //check if the user exists
    const existingUserQuery = "SELECT * FROM users WHERE email = $1";
    const existingUser = await db.query(existingUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      res.status(400).send({
        message: "User with this email already exists.",
      });
    }

    //   Check user roles
    await checkIfRolesExist(req, res, async () => {
      try {
        const hashedPassword = await bcrypt.hash(
          password,
          saltRounds
        );

        //   Create a new user in database
        const createUserQuery =
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
        const newUser = await db.query(createUserQuery, [
          email,
          hashedPassword,
        ]);

        let defaultRoleId = 1;

        if (roles && roles.length > 0) {
          const rolesIdsQuery =
            "SELECT id FROM roles WHERE name = ANY($1)";
          const roleIdsResult = await db.query(roleIdsQuery, [roles]);

          const roleIds = roleIdsResult.rows.map((row) => row.id);

          const assignRolesQuery =
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2)";

          for (const roleId of roleIds) {
            await db.query(assignRolesQuery, [
              newUser.rows[0].id,
              roleId,
            ]);
          }
        } else {
          // assign default role
          const assignDefaultRoleQuery =
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1,$2)";

          await db.query(assignDefaultRoleQuery, [
            newUser.rows[0].id,
            defaultRoleId,
          ]);
        }

        res.send({ message: "User Registered Successfully" });
      } catch (error) {
        console.error("Error during registration", error);
        res.status(500).send({
          message: "An error occurred while registering the user",
          error: error.message,
        });
      }
    });
  } catch (err) {
    console.error("An error occurred during registration", err);
    res.status(500).send({
      message: "An error occurred while registering the user",
      error: err.message,
    });
  }
};

// Login Route

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists within database
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    const { rows } = await db.query(query);

    if (rows.length === 0) {
      return res
        .status(404)
        .send({ message: "Email not registered." });
    }

    const user = rows[0];

    // validate password against stored hash in database
    const passwordIsValid = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

    // generate JWT for user
    const refreshToken = await generateRefreshToken(user.id);

    const rolesQuery = {
      text: "SELECT * from user_roles ur JOIN roles r on ur.role_id = r.id WHERE ur.user_id = $1 AND ur.role_id = r.id",
      values: [user.id],
    };

    const rolesResult = await db.query(rolesQuery);
    const roles = rolesResult.rows;

    // Prepare the response with user details and tokens
    const authorities = roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: TokenExpiredError,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
