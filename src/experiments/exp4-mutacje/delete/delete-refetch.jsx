import { useEffect, useState } from "react";
import { fakeDeleteTodo, fakeFetchTodos, resetFakeTodos } from "../fakeApi";

export default function ManualDeleteRefetch() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    resetFakeTodos();
    loadTodos();
  }, []);

  async function loadTodos() {
    const data = await fakeFetchTodos();
    setTodos(data.todos);
  }

  async function handleDelete(id) {
    await fakeDeleteTodo(id);
    await loadTodos();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (manual, refetch)</h2>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todoName}
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