import { useEffect, useRef, useState } from "react";
import { fakeFetch } from "./fakeFetch";

/**
 * PB3 – 3b – Manual (staleTime / TTL)
 *
 * Почему здесь ОДИН файл, а не два (как в React Query)?
 * - В React Query мы делали "default" vs "60s", чтобы показать wpływ konfiguracji biblioteki
 *   (staleTime=0 jako domyślne zachowanie vs staleTime=60s).
 * - В manual "default" (czyli TTL = 0) по смыслу == эксперимент 3a (no freshness): каждый mount => новый fetch.
 * - Поэтому в manual для PB3 достаточно ОДНОГО файла 3b, где появляется TTL-кеш.
 *   Сравнение получается: 3a (без TTL) vs 3b (с TTL). Это и демонстрирует "действий больше" в manual.
 */

const STALE_TIME_MS = 60000;

let cachedData = null;
let cachedAt = 0;

export default function Exp3bStaleTimeManual() {
  const [data, setData] = useState(null);
  const [source, setSource] = useState(""); // cache / fetch

  useEffect(() => {
    const now = Date.now();

    if (cachedData && now - cachedAt < STALE_TIME_MS) {
      setData(cachedData);
      setSource("cache");
      return;
    }

    fakeFetch().then((result) => {
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
          <li key={t.id}>{t.todoName}</li>
        ))}
      </ul>
    </div>
  );
}