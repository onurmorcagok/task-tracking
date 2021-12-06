import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import BodyFooter from "./components/BodyFooter";
import About from "./components/About";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  const adminUser = {
    email: "admin@admin.com",
    password: "admin",
  };
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email === adminUser.email &&
      details.password === adminUser.password
    ) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details dont match");
      setError("User information is incorrect or not correct!");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
    console.log("Logged out");
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTaskUpdate = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const taskToggle = await fetchTaskUpdate(id);
    const updateTask = { ...taskToggle, reminder: !taskToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <Navbar
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <div className="container">
        {user.email !== "" ? (
          <>
            <div className="welcome">
              <h2>
                Welcome <span>{user.name}</span>
              </h2>
              <button onClick={Logout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
            <hr />
            <Header
              className="header"
              title="Task List"
              onAdd={() => setShowAddTask(!showAddTask)}
              showAdd={showAddTask}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {showAddTask && <AddTask onAdd={addTask} />}
                    {tasks.length > 0 ? (
                      <Tasks
                        tasks={tasks}
                        onDelete={deleteTask}
                        onToggle={toggleReminder}
                      />
                    ) : (
                      <h2 style={{ color: "red" }}>Task list is empty!</h2>
                    )}
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <BodyFooter />
          </>
        ) : (
          <LoginForm Login={Login} error={error} />
        )}
      </div>
      <Footer />
    </Router>
  );
}

export default App;
