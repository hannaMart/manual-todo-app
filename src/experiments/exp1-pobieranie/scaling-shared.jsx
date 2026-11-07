
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

function TodoCard({ index, todos }) {
  return (
    <div>
      Komponent #{index} — Liczba zadań: {todos.length}
    </div>
  );
}

export default function Exp1ScalingShared() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(TODOS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="exp1">
      <h2 className="exp1__title">
        Scaling Shared — wspólne pobieranie danych (props)
      </h2>

      {loading && <p>Ładowanie danych...</p>}
      {error && <p>Błąd: {error}</p>}

      {!loading && !error &&
        Array.from({ length: 10 }, (_, index) => (
          <TodoCard
            key={index}
            index={index + 1}
            todos={todos}
          />
        ))
      }

      <Link to="/exp1">← Wróć</Link>
    </div>
  );
}
