import { useEffect, useState } from "react";
import "./App.css";

import { VITE_API_URL } from "./config";

function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${VITE_API_URL}/tasks/today`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setTasks(data.tasks);
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      {tasks.map((task: any) => {
        return (
          <div key={task.sessionId} style={{ border: "1px solid black" }}>
            <h3>{task.sessionId}</h3>
            <p>{task.timeAllocated} minutos</p>
          </div>
        );
      })}
    </>
  );
}

export default App;
