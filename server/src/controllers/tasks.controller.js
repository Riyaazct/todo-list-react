const db = require("../config/database");

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
      text: "INSERT INTO tasks (task, user_id) values ($1, $2) RETURNING task",
      values: [task, user_id],
    };

    const newTaskAdded = await db.query(addNewTaskQuery);

    res.status(200).send({ message: "Task successfully added!" });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteTask = async (req, res) => {
  const user_id = parseInt(req.params.user_id);
  const id = parseInt(req.params.id);

  const findTaskQuery = {
    text: "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
    values: [id, user_id],
  };

  try {
    const findTaskById = await db.query(findTaskQuery);

    if (findTaskById.rows.length === 0) {
      return res.status(409).send({ message: "task does not exist" });
    }

    const deleteTaskQuery = {
      text: "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING task",
      values: [id, user_id],
    };

    const taskDeleted = await db.query(deleteTaskQuery);

    res.status(500).send({
      message: `Task with id ${id} successfully deleted`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(200).send({ message: "An error occurred!" });
  }
};
