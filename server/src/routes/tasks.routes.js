const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

router.route("/").get(controller.allTasks);
router.route("/addnew").post(controller.addNewTask);
router.route("/delete/:id/:user_id").delete(controller.deleteTask);
router.route("/update/:id/:user_id").put(controller.updateTask);

module.exports = router;
