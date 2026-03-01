import { useEffect, useState } from "react";
import { fakeFetch } from "./fakeFetch"; 
// если файл у тебя называется иначе, поменяй на: "./fakeFetch" или как у тебя реально

export default function Exp3NoFreshness() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fakeFetch().then((result) => {
      setData(result);
    });
  }, []); // только mount

  return (
    <div>
      <h2>PB3 – 3a – Manual (no freshness)</h2>

      {!data && <p>Loading…</p>}

      {data && (
        <div>
          <p><strong>Fetched at:</strong> {data.fetchedAt}</p>
          <p><strong>Request ID:</strong> {data.requestId}</p>

          <p><strong>Todos:</strong></p>
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
