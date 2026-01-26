import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function fakeFetchTodos(filter) {
  const delay = Math.random() * 2000 + 300;

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

  const latestRequest = useRef(0);

  useEffect(() => {
//     Это две операции в одной строке:
// latestRequest.current увеличивается на 1
// это новое значение записывается в current
// current (снимок) создаётся на момент запуска эффекта/запроса и не меняется для этого запроса.
// счётчик latestRequest.current растёт при каждом новом клике/эффекте.
// когда приходит ответ, проверка решает: это ответ последнего запроса или уже устаревший.
    const current = ++latestRequest.current;
    setLoading(true);

    fakeFetchTodos(filter).then((result) => {
      if (current !== latestRequest.current) return;

      setData(result);
      setLoading(false);
    });
  }, [filter]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Exp2 — race condition (manual, fixed)</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("completed")}>completed</button>
      </div>

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

      <Link to="/exp2/race">← Powrót</Link>
    </div>
  );
}
