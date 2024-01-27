const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../config/database");

// related to the refresh token
const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  // Check if error is due to the access token being expired
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized Access, Token has expired!" });
  }
  //   General unauthorized response if error not related to access token
  return res.sendStatus(401).send({ message: "Unauthorized" });
};

// Middleware function to verify the token provided in the request
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }

    // if verification successful, extract the user ID from the decoded token
    req.userId = decoded.id;

    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const query = {
      text: "SELECT * from users WHERE id = $1",
      values: [req.userId],
    };

    const userResult = await db.query(query);

    // if user doesn't exist in the DB return an error
    if (userResult.rows.length === 0) {
      return res.status(403).send({ message: "user not found." });
    }

    const user = userResult.rows[0];

    const rolesQuery = {
      text: "SELECT * from user_roles ur JOIN roles r on ur.role_id = r.id WHERE ur.user_id = $1 AND ur.role_id = r.id",
      values: [user.id],
    };

    const rolesResult = await db.query(rolesQuery);

    const roles = rolesResult.rows;

    let isAdmin = false;

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        isAdmin = true;
        break;
      }
    }
    if (isAdmin) {
      return next();
    }

    return res.status(403).send({ message: "Require Admin role" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Unable to validate user role!" });
  }
};

// Check if the user has a moderator role

const isModerator = async (req, res, next) => {
  try {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [req.userId],
    };
    const userResult = await db.query(query);

    if (userResult.rowCount.length === 0) {
      return res.status(403).send({ message: "User not found." });
    }
    const user = userResult.rows[0];

    const rolesQuery = {
      text: "SELECT * FROM user_roles ur JOIN roles r on ur.role_id = r.id WHERE ur.user_id = $1 AND ur.role_id = r.id",
      values: [user.id],
    };

    const rolesResult = await db.query(rolesQuery);
    const roles = rolesResult.rows;

    let isModerator = false;

    //Check if the user has the moderator role
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        isModerator = true;
        break;
      }
    }

    if (isModerator) {
      return next();
    }

    // if not a moderator send a response indicating the failure
    return res
      .status(403)
      .send({ message: "Require moderator role!" });
  } catch (err) {
    return res
      .status(500)
      .send({ message: "Unable to validate moderator role." });
  }
}; // end of isModerator function

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    // Check if the user exists
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [req.userId],
    };

    const userResult = await db.query(query);

    if (userResult.rows.length === 0) {
      return res.status(403).send({ message: "User not found" });
    }
    const user = userResult.rows[0];

    // Check roles
    const rolesQuery = {
      text: "SELECT * FROM user_Roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = $1 AND ur.role_id = r.id",
      values: [user.id],
    };

    const rolesResult = await db.query(rolesQuery);
    const roles = rolesResult.rows;

    let isModeratorOrAdmin = false;

    // CHeck if the user has the moderator or admin Role
    for (let i = 0; i < roles.length; i++) {
      if (
        roles[i].name === "admin" ||
        roles[i.name === "moderator"]
      ) {
        isModeratorOrAdmin = true;
        break;
      }
    }

    if (isModeratorOrAdmin) {
      return next();
    }

    // if not moderator or isAdmin, send a response indicating the failure
    return res
      .status(403)
      .send({ message: "Require moderator or admin role!" });
  } catch (err) {
    return res.status(500).send({
      message: "Unable to validate Moderator or admin role!",
    });
  }
}; // end of isModeratorOrAdmin function

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

module.exports = authJwt;
