const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

router.route("/:id").get(controller.allTasks);
router.route("/new").post(controller.addNewTask);
router.route("/delete/:id/:user_id").delete(controller.deleteTask);
router.route("/update/:id/:user_id").put(controller.updateTask);

module.exports = router;
