import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetch } from "../fakeFetch";

const STALE_TIME_MS = 60000;

let cachedData = null;
let cachedAt = 0;

async function getDataWithFreshness() {
  const now = Date.now();

  if (cachedData && now - cachedAt < STALE_TIME_MS) {
    return { data: cachedData, source: "cache (fresh)" };
  }

  const result = await fakeFetch();
  cachedData = result;
  cachedAt = Date.now();

  return { data: result, source: "fetch (stale → updated)" };
}

export default function Exp3ReturnLong() {
  const [data, setData] = useState(null);
  const [source, setSource] = useState("");

  useEffect(() => {
    getDataWithFreshness().then(({ data, source }) => {
      setData(data);
      setSource(source);
    });
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <div className="page">
      <h2>PB3 – 3c – Возврат после длинной паузы</h2>

      <p><strong>Source:</strong> {source}</p>
      <p><strong>Fetched at:</strong> {data.fetchedAt}</p>
      <p><strong>Request ID:</strong> {data.requestId}</p>

      <p><strong>Todos:</strong></p>
      <ul>
        {data.todos.map((t) => (
          <li key={t.id}>{t.todoName}</li>
        ))}
      </ul>

      <br />
      <Link to="/exp3">
        ← Назад к выбору паузы
      </Link>
    </div>
  );
}