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

const STALE_TIME_MS = 60_000; // 60s — аналог staleTime=60000 в React Query

// Простейший "кеш" на уровне модуля (живет между mount/unmount этого компонента)
let cachedData = null;
let cachedAt = 0;

export default function Exp3bStaleTimeManual() {
  const [data, setData] = useState(null);
  const [source, setSource] = useState("—"); // "cache" или "fetch"
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  // чтобы избежать setState после unmount
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function load() {
      try {
        setStatus("loading");

        const now = Date.now();
        const isFresh =
          cachedData !== null && now - cachedAt < STALE_TIME_MS;

        if (isFresh) {
          // берём из кеша — запрос НЕ делаем
          if (!cancelledRef.current) {
            setData(cachedData);
            setSource("cache (fresh)");
            setStatus("success");
          }
          return;
        }

        // данные stale или кеш пуст — делаем запрос
        const result = await fakeFetch();

        // обновляем кеш
        cachedData = result;
        cachedAt = Date.now();

        if (!cancelledRef.current) {
          setData(result);
          setSource("fetch (cache updated)");
          setStatus("success");
        }
      } catch (e) {
        if (!cancelledRef.current) {
          setStatus("error");
        }
      }
    }

    load();

    return () => {
      cancelledRef.current = true;
    };
  }, []); // только mount (как в 3a), но с TTL-логикой перед fetch

  return (
    <div>
      <h2>PB3 – 3b – Manual (staleTime / TTL)</h2>

      <p>
        <strong>STALE_TIME_MS:</strong> {STALE_TIME_MS} ms
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Source:</strong> {source}
      </p>

      {!data && status === "loading" && <p>Loading…</p>}
      {status === "error" && <p>Error</p>}

      {data && (
        <div>
          <p>
            <strong>Fetched at:</strong> {data.fetchedAt}
          </p>
          <p>
            <strong>Request ID:</strong> {data.requestId}
          </p>

          <p>
            <strong>Todos:</strong>
          </p>
          <ul>
            {data.todos.map((t) => (
              <li key={t.id}>{t.todoName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}