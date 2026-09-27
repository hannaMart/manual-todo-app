import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function TodoCard({ index }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(TODOS_URL)
      .then((response) => response.json())
      .then(setTodos);
  }, []);

  return (
    <div>
      Component #{index} — Todos: {todos.length}
    </div>
  );
}

export default function Exp1Scaling() {
  return (
    <div className="exp1">
      <h2>Масштабирование количества компонентов — Manual</h2>

      {Array.from({ length: 10 }, (_, index) => (
        <TodoCard key={index} index={index + 1} />
      ))}

      <Link to="/exp1">← Назад</Link>
    </div>
  );
}