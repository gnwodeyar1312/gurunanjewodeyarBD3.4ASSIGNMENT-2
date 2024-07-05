const express = require("express");
const app = express();
const port = 3000;

let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

app.get("/", (req, res) => {
  res.send("Welcome to Airflow Task Management System");
});

//Endpoint 1. Add a Task to the Task List
function addTask(task, taskId, text, priority) {
  task.push({ taskId, text, priority });
  return tasks;
}

app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);

  let result = addTask(tasks, taskId, text, priority);
  res.json({ tasks: result });
});

//Endpoint 2. Read All Tasks in the Task List
function returnTasks(task) {
  return task;
}
app.get("/tasks", (req, res) => {
  let result = returnTasks(tasks);
  res.json({ tasks: result });
});

//Endpoint 3. Sort Tasks by Priority
function sortByPriorityInAscending(task1, task2) {
  return task1.priority - task2.priority;
}

app.get("/tasks/sort-by-priority", (req, res) => {
  let taskCopy = tasks.slice();
  let result = taskCopy.sort(sortByPriorityInAscending);
  res.json({ tasks: result });
});

//Endpoint 4. Edit Task Priority
function editTaskOnPriority(task, taskId, priority) {
  for (let i = 0; i < task.length; i++) {
    if (task[i].taskId === taskId) {
      task[i].priority = priority;
    }
  }
  return task;
}
app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = editTaskOnPriority(tasks, taskId, priority);
  res.json({ tasks: result });
});

//Endpoint 5. Edit/Update Task Text
function editTaskOnText(task, taskId, text) {
  for (let i = 0; i < task.length; i++) {
    if (task[i].taskId === taskId) {
      task[i].text = text;
    }
  }
  return task;
}
app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = editTaskOnText(tasks, taskId, text);
  res.json({ tasks: result });
});

//Endpoint 6. Delete a Task from the Task List
function deleteTaskOfTAskId(task, taskId) {
  return task.taskId !== taskId;
}
app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter(task => deleteTaskOfTAskId(task, taskId));
  res.json({ tasks: result});
});

//Endpoint 7. Filter Tasks by Priority
function filterByPriority(task, priority) {
  return task.priority === priority
}

app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter(task => filterByPriority(task, priority));
  res.json({ tasks: result })
})

app.listen(port, () => {
  console.log("Server is running on port https://localhost:" + port);
});
