import { useEffect, useState } from "react";
import {
  fakeDeletePb4Todo,
  fakeFetchPb4Todos,
  resetPb4Todos,
} from "../../../fakeServer/fakeAPI";

export default function ManualDeleteRefetch() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    resetPb4Todos();
    loadTodos();
  }, []);

  async function loadTodos() {
    const data = await fakeFetchPb4Todos();
    setTodos(data.todos);
  }

  async function handleDelete(id) {
    await fakeDeletePb4Todo(id);
    await loadTodos();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (manual, refetch)</h2>

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