const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const oAuthController = require("../controllers/oauth.controller");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-type, Accept"
  );
  next();
});

router.route("/signup").post(controller.signup);

router.route("/signin").post(controller.signin);

router.route("/signout").post(controller.signout);

router.route("/refreshtoken").post(controller.refreshToken);

router.route("/oauth/request").post(oAuthController.request);

router.route("/oauth").get(oAuthController.oAuth);

module.exports = router;
