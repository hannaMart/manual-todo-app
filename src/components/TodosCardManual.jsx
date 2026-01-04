import { useEffect, useState } from "react";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

export default function TodosCardManual({index}) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(TODOS_URL)
      .then((r) => r.json())
      .then(setTodos);
  }, []);

  return (
    <div className="card">
      <h3>Manual component #{index}</h3>
      <div>Todos: {todos.length}</div>
    </div>
  );
}
