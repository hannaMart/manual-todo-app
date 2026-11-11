
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";

const formatTime = () =>
  new Date().toLocaleTimeString("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export default function BackgroundVisibility() {
  const [todos, setTodos] = useState(null);
  const [version, setVersion] = useState(0);
  const [updatedAt, setUpdatedAt] = useState("—");
  const [openedAt] = useState(formatTime);
  const [trigger, setTrigger] = useState("init");
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    let inFlight = false;

    const loadData = async (source) => {
      if (inFlight) return;

      inFlight = true;
      setIsFetching(true);
      setError(null);

      try {
        console.count("Manual API");
        const result = await simulateFetchTodos({ delay: 0 });

        if (!active) return;

        setTodos(result);
        setVersion((v) => v + 1);
        setUpdatedAt(formatTime());
        setTrigger(source);
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        inFlight = false;
        if (active) setIsFetching(false);
      }
    };

    loadData("init");

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        loadData("visibility:visible");
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
      <h2>Background — Visibility</h2>

      <p>Dane są aktualizowane po powrocie do karty przeglądarki.</p>

      <div className="card">
        <div>
          <b>Wersja danych:</b> {version ? `v${version}` : "—"}
        </div>

        <div>
          <b>Dane:</b> {todos ? `${todos.length} zadań` : "—"}
        </div>

        <div>
          <b>Ostatnia aktualizacja:</b> {updatedAt}
        </div>

        <div>
          <b>Zdarzenie:</b>{" "}
          {trigger === "init" ? "Otwarcie strony" : "Powrót do karty"}
        </div>

        <div>
          <b>Otwarcie strony:</b> {openedAt}
        </div>

        {isFetching && <p>Aktualizowanie danych…</p>}
        {error && <p>Błąd: {error}</p>}
      </div>

      <br />
      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
