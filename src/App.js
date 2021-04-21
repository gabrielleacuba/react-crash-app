import { useState, useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import api from "./services/api";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const url = "http://localhost:5000/tasks/";

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fecthTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fecthTasks = async () => {
    // const res = await fetch(url);
    // const data = await res.json();

    //  return data;
    console.log("aqui");
    const response = await api.get();

    console.log(response.data);
    return response.data;
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`${url}${id}`, {
      method: "DELETE",
    });

    let arrayDelete = tasks.filter((item) => item.id !== id);

    setTasks(arrayDelete);
  };

  //Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  //Add tasks
  const addTasks = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1;

    // const newTask = { id, ...task };

    // setTasks([...tasks, newTask]);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTasks} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default App;
