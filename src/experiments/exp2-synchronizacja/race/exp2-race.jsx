import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function fakeFetchTodos(filter) {
  const delay = Math.random() * 2000 + 300; // 300–2300 ms

// В научной логике ты сейчас делаешь:
// Controlled experiment
// (контролируемая среда вместо реального мира)
// Ты исследуешь механизм синхронизации, а не качество API.
// Формулировка (запомни, потом вставим в текст):
// В эксперименте 2 используется симулированный асинхронный источник данных, позволяющий детерминированно управлять задержками и порядком ответов, что необходимо для анализа проблем синхронизации server-state.

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filter,
        items: [`Todo A (${filter})`, `Todo B (${filter})`],
        delay: Math.round(delay),
      });
    }, delay);
  });
}

export default function Exp2Race() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fakeFetchTodos(filter).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Exp2 — race condition (manual)</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("completed")}>completed</button>
      </div>

{/* быстро меняестя при нажатии кнопок. */}
      <p>
        <strong>Текущий filter:</strong> {filter} 
      </p>

      {loading && <p>Loading…</p>}

      {data && (
        <div>
          <p>
            Ответ для filter: <b>{data.filter}</b> (delay: {data.delay} ms)
          </p>
          <ul>
            {data.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/exp2">← Powrót</Link>
    </div>
  );
}
