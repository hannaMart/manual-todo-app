import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchTodosRace } from "../../../fakeServer/fakeAPI";


export default function Exp2Race() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fakeFetchTodosRace(filter).then((result) => {
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
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/exp2">← Powrót</Link>
    </div>
  );
}
