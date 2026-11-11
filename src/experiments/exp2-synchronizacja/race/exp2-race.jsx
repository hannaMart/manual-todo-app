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
      <h2>Exp2 — race condition</h2>

      <div style={{ marginBottom: 12 }}>
<button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>all</button>
<button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>active</button>
<button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>completed</button>
      </div>

{/* быстро меняестя при нажатии кнопок. */}
      <p>
        <strong>Aktualny filtr:</strong> {filter} 
      </p>

      {loading && <p>Loading…</p>}

      {data && (
        <div>
          <p>
            Odpowiedż dla filtra: <b>{data.filter}</b> (delay: {data.delay} ms)
          </p>
          <ul>
            {data.items.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
