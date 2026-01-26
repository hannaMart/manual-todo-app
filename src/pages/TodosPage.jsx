import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <div>
      <h3>Lista zadań (manual)</h3>

      <ul>
        {todos.slice(0, 10).map((todo) => (
          <li key={todo.id}>
            #{todo.id} {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
