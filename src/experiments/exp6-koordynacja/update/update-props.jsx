import { useEffect, useState } from "react";

import {
  fakeFetchPb6UpdateTodos,
  fakeAddPb6Todo,
  resetPb6Todos,
} from "../../../fakeServer/fakeAPI";

// Component A — добавление задачи
function TodoAdd({ onAdd, updating }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle || updating) return;

    await onAdd(trimmedTitle);
    setTitle("");
  }

  return (
    <div>
      <h3>Component A — Add Todo</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New todo"
          disabled={updating}
        />

        <button type="submit" disabled={updating || !title.trim()}>
          {updating ? "Updating..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

// Component B — полный список задач
function TodoList({ todos }) {
  return (
    <div>
      <h3>Component B — Todo List</h3>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} — {todo.completed ? "Done" : "Active"}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component C — количество и статистика
function TodoStats({ todos }) {
  const completed = todos.filter(
    (todo) => todo.completed
  ).length;

  const active = todos.filter(
    (todo) => !todo.completed
  ).length;

  return (
    <div>
      <h3>Component C — Statistics</h3>

      <p>Total todos: {todos.length}</p>
      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Родительский компонент — общее состояние
export default function UpdateProps() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    resetPb6Todos();

    fakeFetchPb6UpdateTodos()
      .then((response) => {
        setTodos(response.todos);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleAdd(title) {
    setUpdating(true);
    setError(null);

    try {
      await fakeAddPb6Todo(title);

      const response = await fakeFetchPb6UpdateTodos();
      setTodos(response.todos);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>PB6c — Update (Manual / Props)</h2>

      {error && <p>Error: {error}</p>}

      <TodoAdd onAdd={handleAdd} updating={updating} />

      <TodoList todos={todos} />

      <TodoStats todos={todos} />
    </div>
  );
}