const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

router.route("/addnew").post(controller.addNewTask);
router.route("/delete/:id/:user_id").delete(controller.deleteTask);

module.exports = router;
