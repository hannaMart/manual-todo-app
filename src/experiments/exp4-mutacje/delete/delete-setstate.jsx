import { useEffect, useState } from "react";
import {
  fakeDeletePb4Todo,
  fakeFetchPb4Todos,
  resetPb4Todos,
} from "../../../fakeServer/fakeAPI";

export default function ManualDeleteSetState() {
  const [todos, setTodos] = useState([]);



  async function loadTodos() {
    const data = await fakeFetchPb4Todos();
    setTodos(data.todos);
  }

    useEffect(() => {
    resetPb4Todos();
    loadTodos();
  }, []);

  async function handleDelete(id) {
    await fakeDeletePb4Todo(id);

    // обновляем UI локально без повторного GET
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (manual, setState)</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}

            <button
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: "8px" }}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}