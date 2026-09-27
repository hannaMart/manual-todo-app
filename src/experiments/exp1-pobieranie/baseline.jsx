import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export default function Exp1Baseline() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(TODOS_URL)
      .then((response) => response.json())
      .then(setTodos);
  }, []);

  return (
    <div className="exp1">
      <h2>Базовое получение данных — Manual</h2>

      <p>
        Один компонент получает server-state при монтировании с помощью
        useEffect, fetch и useState.
      </p>

      <p>Todos: {todos.length}</p>

      <Link to="/exp1">← Назад</Link>
    </div>
  );
}