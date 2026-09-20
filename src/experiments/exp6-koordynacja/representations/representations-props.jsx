import { useEffect, useState } from "react";
import { fakeFetchPb6Todos } from "../../../fakeServer/fakeAPI";

// Component A — полный список задач
function TodoList({ todos }) {
  return (
    <div>
      <h3>Component A — Todo List</h3>

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

// Component B — общее количество задач
function TodoTotal({ todos }) {
  return (
    <div>
      <h3>Component B — Total</h3>

      <p>Total todos: {todos.length}</p>
    </div>
  );
}

// Component C — статистика задач
function TodoStats({ todos }) {
  const completed = todos.filter((todo) => todo.completed).length;
  const active = todos.filter((todo) => !todo.completed).length;

  return (
    <div>
      <h3>Component C — Statistics</h3>

      <p>Completed: {completed}</p>
      <p>Active: {active}</p>
    </div>
  );
}

// Родительский компонент
export default function RepresentationsProps() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fakeFetchPb6Todos()
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>PB6b — Representations (Manual / Props)</h2>

      <TodoList todos={todos} />
      <TodoTotal todos={todos} />
      <TodoStats todos={todos} />
    </div>
  );
}