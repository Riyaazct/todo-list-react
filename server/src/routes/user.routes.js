const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/users.controller");
const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-type, Accept"
  );
  next();
});

router.route("/all").get(controller.allAccess);

router
  .route("/user")
  .get([authJwt.verifyToken], controller.userBoard);

router
  .route("/mod")
  .get(
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

router
  .route("/admin")
  .get([authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

router
  .route("/modoradmin")
  .get(
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.moderatorOrAdminBoard
  );

module.exports = router;
