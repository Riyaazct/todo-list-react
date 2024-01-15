const db = require("../config/database");

exports.checkIfRolesExist = async (req, res, next) => {
  try {
    const { roles } = req.body;

    if (roles && roles.length > 0) {
      const roleIdsQuery =
        "SELECT name FROM roles WHERE name = ANY($1)";
      const roleIdsResult = await db.query(roleIdsQuery, [roles]);

      const existingRolesIds = roleIdsResult.rows.map(
        (row) => row.name
      );

      for (const role of roles) {
        if (!existingRolesIds.includes(role)) {
          return res.status(400).send({
            message: `Failed! Role does not exist: ${role}`,
          });
        }
      }
    }
    next();
  } catch (error) {
    console.error("Error during role checking", error);
    res.status(500).send({
      message: "An error occurred while checking roles",
      error: error.message,
    });
  }
};
