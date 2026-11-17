import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchFreshness } from "../../fakeServer/fakeAPI";

const STALE_TIME_MS = 30000;

let cachedData = null;
let cachedAt = 0;

async function getDataWithFreshness() {
  const now = Date.now();

  if (cachedData && now - cachedAt < STALE_TIME_MS) {
    return { data: cachedData, source: "cache (fresh)" };
  }

  const result = await fakeFetchFreshness();

  cachedData = result;
  cachedAt = Date.now();

  return { data: result, source: "fetch (stale → updated)" };
}

export default function Exp3TabReturn() {
  const [data, setData] = useState(null);
  const [source, setSource] = useState("");

  useEffect(() => {
    const loadData = () => {
      getDataWithFreshness().then(({ data, source }) => {
        setData(data);
        setSource(source);
      });
    };

    // pierwszy mount
    loadData();

    // powrót do karty przeglądarki
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <div className="page">
      <h2>3c. Aktualność danych po powrocie do karty przeglądarki</h2>
      <p>
        {" "}
        <strong>Ostatnie pobranie:</strong>{" "}
        {new Date(data.fetchedAt).toLocaleTimeString("pl-PL", {
          timeZone: "Europe/Warsaw",
          hour12: false,
        })}
      </p>

      <p>
        <strong>Numer żądania:</strong> {data.requestId}
      </p>
      <p>
        <strong>Źródło danych:</strong> {source}
      </p>

      <p>
        <strong>Todos:</strong>
      </p>
      <ul>
        {data.todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>

      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}
