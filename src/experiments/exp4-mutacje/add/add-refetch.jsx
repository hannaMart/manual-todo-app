import { useEffect, useState } from "react";
import { fakeAddTodo, fakeFetchTodos, resetFakeTodos } from "../fakeApi";

export default function ManualAddRefetch() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    resetFakeTodos();
    loadTodos();
  }, []);

  async function loadTodos() {
    const data = await fakeFetchTodos();
    setTodos(data.todos);
  }

  async function handleAdd() {
    await fakeAddTodo(newTodo);
    setNewTodo("");
    await loadTodos();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>PB4 — 4a Add (manual)</h2>

      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nowe zadanie"
      />
      <button onClick={handleAdd} style={{ marginLeft: "8px" }}>
        Dodaj
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.todoName}</li>
        ))}
      </ul>
    </div>
  );
}