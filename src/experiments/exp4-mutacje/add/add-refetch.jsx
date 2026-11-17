import { useEffect, useState } from "react";
import { fakeAddPb4Todo, fakeFetchPb4Todos, resetPb4Todos } from "../../../fakeServer/fakeAPI";

export default function ManualAddRefetch() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    resetPb4Todos();
    loadTodos();
  }, []);

  async function loadTodos() {
    const data = await fakeFetchPb4Todos();
    setTodos(data.todos);
  }

  async function handleAdd() {
    await fakeAddPb4Todo(newTodo);
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
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}