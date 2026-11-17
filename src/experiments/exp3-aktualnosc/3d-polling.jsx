
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../fakeServer/fakeAPI";

const INTERVAL_MS = 15_000;

export default function Exp3PollingManual() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let active = true;

    const loadData = () => {
      fakeFetchFreshness().then((result) => {
        if (active) setData(result);
      });
    };

    loadData();

    const timer = setInterval(loadData, INTERVAL_MS);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="page">
      <h2>3d. Okresowe pobieranie danych (polling)</h2>

      <p><strong>Interwał:</strong> 10 sekund</p>

      {data ? (
        <>
          <p>
            <strong>Ostatnie pobranie:</strong>{" "}
            {new Date(data.fetchedAt).toLocaleTimeString("pl-PL")}
          </p>
          <p><strong>Numer żądania:</strong> {data.requestId}</p>

          <p><strong>Todos:</strong></p>
          <ul>
            {data.todos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Ładowanie danych…</p>
      )}

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}
