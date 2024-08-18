import React, { useState, useEffect } from "react";
import "./tasklist.css";

const TodoList = () => {
  const [taskList, SetTaskListItems] = useState([]);
  const [task, setTask] = useState("");
  const [msg, setmsg] = useState("");
  const [editTaskMsg, setEditMsg] = useState("");
  const [editindex, seteditIndex] = useState("");

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskList]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskList"));
    if (storedTasks) {
      SetTaskListItems(storedTasks);
    }
  }, []);

  const deleteTask = (Selectedindex) => {
    setmsg("");
    let newTaskList = taskList.filter(
      (task, currentindex) => currentindex !== Selectedindex
    );
    SetTaskListItems(newTaskList);
  };
  const addTask = () => {
    setmsg("");
    if (task.trim() != "") {
      SetTaskListItems((prevtasks) => [
        ...prevtasks,
        { content: task, isComplete: false },
      ]);
      setTask("");
    }
  };
  const moveTask = (selectedindex, operation) => {
    setmsg("");
    if (operation === "up") {
      let newTaskList = [...taskList];
      if (selectedindex > 0) {
        [newTaskList[selectedindex], newTaskList[selectedindex - 1]] = [
          newTaskList[selectedindex - 1],
          newTaskList[selectedindex],
        ];
        SetTaskListItems(newTaskList);
      } else {
        setmsg("⚠️Can't perform the requested action");
      }
    } else {
      let newTaskList = [...taskList];
      if (selectedindex < taskList.length - 1) {
        [newTaskList[selectedindex], newTaskList[selectedindex + 1]] = [
          newTaskList[selectedindex + 1],
          newTaskList[selectedindex],
        ];
        SetTaskListItems(newTaskList);
      } else {
        setmsg("⚠️Can't perform the requested action");
      }
    }
  };
  const handleInputChange = (event) => {
    let value = event.target.value;
    setTask(value);
  };
  const editTask = (index) => {
    seteditIndex(index);
    setEditMsg(taskList[index].content);
  };
  const handleEditchange = (e) => {
    setEditMsg(e.target.value);
  };
  const handleEditTask = () => {
    const newTaskList = [...taskList];
    newTaskList.splice(editindex, 1, {
      content: editTaskMsg,
      isComplete: false,
    });
    setEditMsg("");
    seteditIndex("");
    SetTaskListItems(newTaskList);
  };

  const completeTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList[index].isComplete = !newTaskList[index].isComplete;
    SetTaskListItems(newTaskList);
  };

  return (
    <div>
      <div className="container">
        {msg ? <div className="message">{msg}</div> : ""}
        <div className="todoWrapper">
          <h1> 🗒️ SaveNotes 🚀</h1>
          <h5> Game of ✅ & ❎</h5>
          <div className="contentWrapper">
            <div className="inputWrapper">
              {!editTaskMsg && (
                <>
                  <input
                    type="text"
                    value={task}
                    placeholder="Add a task"
                    onChange={handleInputChange}
                  />
                  <button
                    class="addBtn"
                    role="button"
                    type="submit"
                    onClick={addTask}
                  >
                    Add
                  </button>
                </>
              )}
              {editTaskMsg && (
                <>
                  <input
                    type="text"
                    value={editTaskMsg}
                    onChange={handleEditchange}
                  />
                  <button
                    className="addBtn"
                    role="button"
                    type="submit"
                    onClick={handleEditTask}
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
            <ul>
              {taskList.length ? (
                taskList.map((task, index) => (
                  <li
                    key={`item${index}`}
                    className={task.isComplete ? "textcomplete" : ""}
                  >
                    <div class="text">📌{task.content}</div>
                    <div style={{ display: "flex", gap: "2px" }}>
                      <button onClick={() => editTask(index)}>✏️</button>
                      <button onClick={() => moveTask(index, "up")}>🔺</button>
                      <button onClick={() => moveTask(index, "down")}>
                        🔻
                      </button>
                      <button onClick={() => completeTask(index)}>✅</button>
                      <button onClick={() => deleteTask(index)}>❎</button>
                    </div>
                  </li>
                ))
              ) : (
                <div>
                  <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2Q5bjZtY3JyaWJpOHpicHBraHVucnZ2ZDd6Y3J0amlidXNjM2M2aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/56ikf9jD4ZK6s/giphy.webp"
                    alttext="Drop your note"
                  />
                </div>
              )}
            </ul>
            <div style={{ textAlign: "center" }}>
              Made with ❤️ by Dhanush Holla
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
