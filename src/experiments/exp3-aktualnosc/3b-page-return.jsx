import { useEffect, useState } from "react";
import { fakeFetchStale } from "../../fakeServer/fakeAPI";
import { Link } from "react-router-dom";

/**
 * PB3 – 3b – Manual
 *
 * Проверка актуальности данных при повторном открытии страницы
 * внутри React-приложения.
 *
 * Ручная реализация:
 * - cache
 * - TTL = 60 s
 * - проверка freshness при mount
 */

const STALE_TIME_MS = 60000;

let cachedData = null;
let cachedAt = 0;

export default function Exp3bStaleTimeManual() {
  const [data, setData] = useState(null);
  const [source, setSource] = useState(""); // cache / fetch- откуда брать данные 

  useEffect(() => {
    const now = Date.now();

    if (cachedData && now - cachedAt < STALE_TIME_MS) {
      setData(cachedData);
      setSource("cache");
      return;
    }

    fakeFetchStale().then((result) => {
      cachedData = result;
      cachedAt = Date.now();
      setData(result);
      setSource("fetch");
    });
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <div>
      <h2>PB3 – 3b – Manual</h2>

      <p><strong>Source:</strong> {source}</p>
      <p><strong>Fetched at:</strong> {data.fetchedAt}</p>
      <p><strong>Request ID:</strong> {data.requestId}</p>

      <p><strong>Todos:</strong></p>
      <ul>
        {data.todos.map((t) => (
          <li key={t.id}>--{t.title}</li>
        ))}
      </ul>
      <Link to="/exp3">← Powrót</Link>
    </div>
  );
}