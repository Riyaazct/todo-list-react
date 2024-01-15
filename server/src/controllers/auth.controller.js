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
