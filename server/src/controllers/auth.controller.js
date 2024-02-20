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
  const { name, email, password, roles } = req.body;

  try {
    // Check if the user already exists
    const existingUserQuery = "SELECT * FROM users WHERE email = $1";
    const existingUser = await db.query(existingUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).send({
        message: "User with this name or email already exists.",
      });
    }

    // Role checking
    await checkIfRolesExist(req, res, async () => {
      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(
          password,
          saltRounds
        );

        // Creating a new user record in the database
        const createUserQuery =
          "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id";
        const newUser = await db.query(createUserQuery, [
          name,
          email,
          hashedPassword,
        ]);

        let defaultRoleId = 1;

        if (roles && roles.length > 0) {
          const roleIdsQuery =
            "SELECT id FROM roles WHERE name = ANY($1)";
          const roleIdsResult = await db.query(roleIdsQuery, [roles]);

          const roleIds = roleIdsResult.rows.map((row) => row.id);

          const assignRolesQuery =
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)";

          for (const roleId of roleIds) {
            await db.query(assignRolesQuery, [
              newUser.rows[0].id,
              roleId,
            ]);
          }
        } else {
          // Assign default role
          const assignDefaultRoleQuery =
            "INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2)";
          await db.query(assignDefaultRoleQuery, [
            newUser.rows[0].id,
            defaultRoleId,
          ]);
        }

        res.send({ message: "User registered successfully!" });
      } catch (error) {
        console.error("Error during registration", error);
        res.status(500).send({
          message: "An error occurred while registering the user",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error during registration", error);
    res.status(500).send({
      message: "An error occurred while registering the user",
      error: error.message,
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

    // generate a new JWT access token for he user
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    // generate a new refresh token for user
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
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}; // End of Login Route

// function to handle refreshing the access token using a refresh token
exports.refreshToken = async (req, res) => {
  // extract refresh token from the request
  const { refreshToken: requestToken } = req.body;

  // Check if refresh token provided
  if (requestToken === null) {
    return res
      .status(403)
      .json({ message: "Refresh token is required!" });
  }

  try {
    // Find refresh token in the database
    const query = {
      text: "SELECT * from refresh_tokens WHERE token = $1",
      values: [requestToken],
    };

    const { rows } = await db.query(query);

    if (rows.length === 0) {
      return res
        .status(403)
        .json({ message: "Refresh Token is not in the database!" });
    }

    const refreshToken = rows[0];

    // verify refresh token's expiration
    if (verifyRefreshTokenExpiration(refreshToken)) {
      // if the refresh token has expired, remove it from the database and send an error response
      const deleteQuery = {
        text: "DELETE FROM refresh_tokens WHERE id = $1",
        values: [refreshToken.id],
      };
      await db.query(deleteQuery);

      return res.status(403).json({
        message:
          "Refresh token is expired. Please make a new sign in request.",
      });
    }

    // get the associated user for the refresh token
    const userQuery = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [refreshToken.user_id],
    };

    const userResult = await db.query(userQuery);
    const user = userResult.rows[0];

    // generate a new access token for the user
    const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    // send the new access token and the original refresh token in the response
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}; // End of function to handle refreshing the access token

exports.signout = async (req, res) => {
  try {
    req, (session = null);
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
