import { useEffect, useState } from "react";
import { fakeFetchPb6Todos } from "../../../fakeServer/fakeAPI";

// Дочерний компонент
function TodoList({ title, todos }) {
  return (
    <div>
      <h3>{title}</h3>

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

// Родительский компонент
export default function SharedProps() {
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
      <h2>PB6a — Shared (Manual / Props)</h2>

      <TodoList title="Component A" todos={todos} />
      <TodoList title="Component B" todos={todos} />
    </div>
  );
}