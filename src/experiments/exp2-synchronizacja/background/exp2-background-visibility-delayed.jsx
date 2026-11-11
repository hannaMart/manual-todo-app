
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

export default function Exp2BackgroundVisibilityDelayed() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState("—");

  useEffect(() => {
    let active = true;

    const loadData = async (delay) => {
      setLoading(true);

      // Poprzednie dane pozostają widoczne podczas aktualizacji
      const todos = await simulateFetchTodos({ delay });

      if (!active) return;

      setData({
        todos,
        version: Math.floor(Math.random() * 100) + 1
      });

      setUpdatedAt(new Date().toLocaleTimeString("pl-PL"));
      setLoading(false);
    };

    // Pierwsze pobranie danych
    loadData(0);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        loadData(3000);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="page">
      <h2>Background — Visibility + Delayed</h2>

      <p>
        Aktualizacja danych po powrocie do karty
        z opóźnieniem 3000 ms.
      </p>

      <div className="card">
        <div>
          <b>Aktualizacja w toku:</b> {loading ? "Tak" : "Nie"}
        </div>

        <div>
          <b>Wersja odpowiedzi:</b> {data?.version ?? "—"}
        </div>

        <div>
          <b>Ostatnia aktualizacja:</b> {updatedAt}
        </div>

        {loading && <p><i>Aktualizowanie danych…</i></p>}

        <hr />

        <b>Lista zadań:</b>
        <ul>
          {data?.todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>

        <Link to="/exp2">← Wróć</Link>
      </div>
    </div>
  );
}
