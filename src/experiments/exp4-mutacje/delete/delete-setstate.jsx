import { useEffect, useState } from "react";
import { fakeDeleteTodo, fakeFetchTodos, resetFakeTodos } from "../fakeApi";

export default function ManualDeleteSetState() {
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

    // ключ: обновляем UI без GET
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4b Delete (manual, setState)</h2>

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