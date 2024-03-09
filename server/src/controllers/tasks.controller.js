const db = require("../config/database");

exports.allTasks = async (req, res) => {
  const userId = parseInt(req.params.id);
  const taskStatus = req.params.status;

  const tasksQuery = {
    text: "SELECT * FROM tasks where user_id = $1",
    values: [userId],
  };
  try {
    const tasksReturned = await db.query(tasksQuery);

    return res
      .status(200)
      .send(tasksReturned.rows.filter((task) => task[taskStatus]));
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "An error occurred, unable to retrieve tasks",
      error: error.message,
    });
  }
};

exports.addNewTask = async (req, res) => {
  const { task, user_id } = req.body;

  try {
    const checkTaskExistsQuery = {
      text: "SELECT * FROM tasks WHERE task = $1 AND user_id = $2",
      values: [task, user_id],
    };

    const existingTask = await db.query(checkTaskExistsQuery);

    if (existingTask.rows.length > 0) {
      return res.status(409).send({
        message:
          "Task already exists, please complete previously added task..",
      });
    }

    const addNewTaskQuery = {
      text: "INSERT INTO tasks (task, user_id, is_deleted, is_completed, is_archived) values ($1, $2, false, false, false) RETURNING task",
      values: [task, user_id],
    };

    const newTaskAdded = await db.query(addNewTaskQuery);

    res.status(200).send({ message: "Task successfully added!" });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTask = async (req, res) => {
  const userId = parseInt(req.params.user_id);
  const id = parseInt(req.params.id);

  const findTaskQuery = {
    text: "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    values: [id, userId],
  };

  try {
    const findTaskById = await db.query(findTaskQuery);

    if (findTaskById.rows.length === 0) {
      return res.status(409).send({ message: "task does not exist" });
    }

    const deleteTaskQuery = {
      text: "UPDATE tasks SET is_deleted = true WHERE id = $1 AND user_id = $2 RETURNING *",
      values: [id, userId],
    };

    const taskDeleted = await db.query(deleteTaskQuery);

    return res.status(200).send({
      message: `Task with id ${id} successfully deleted`,
      task: taskDeleted.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(200).send({ message: "An error occurred!" });
  }
};

exports.clearTasks = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const deleteQuery = {
      text: "UPDATE tasks SET is_deleted = true WHERE user_id = $1",
      values: [userId],
    };

    const deletedTasks = await db.query(deleteQuery);

    return res
      .status(200)
      .send({ message: "Tasks successfully deleted" });
  } catch (err) {
    return res.status(500).send({
      message: "An error occurred, operation not completed",
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  const id = parseInt(req.params.id);
  const userId = parseInt(req.params.user_id);
  const { task } = req.body;

  const findTaskToUpdateQuery = {
    text: "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    values: [id, userId],
  };

  try {
    const foundTask = await db.query(findTaskToUpdateQuery);

    if (foundTask.rows.length === 0) {
      return res
        .status(409)
        .send({ message: "Task does not exist." });
    }
    const updateTaskQuery = {
      text: "UPDATE tasks SET task = $1 WHERE id = $2 AND user_id = $3 RETURNING *",
      values: [task, id, userId],
    };
    const taskUpdated = await db.query(updateTaskQuery);

    res.status(200).send({
      message: "Task successfully updated!",
      task: taskUpdated.rows,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "An error occurred" });
  }
};
