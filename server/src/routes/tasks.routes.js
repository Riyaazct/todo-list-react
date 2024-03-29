const express = require("express");
const router = express.Router();
const controller = require("../controllers/tasks.controller");

router.route("/:id/:status").get(controller.allTasks);
router.route("/new").post(controller.addNewTask);
router.route("/update/:id/:user_id").put(controller.updateTask);
router.route("/clear/:user_id").put(controller.clearTasks);
router
  .route("/status_update/:id/:user_id")
  .put(controller.updateTaskStatus);

module.exports = router;
