import { useState } from "react";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";
import { Link } from "react-router-dom";

export default function Exp2Errors() {
  const [isFailure, setIsFailure] = useState(false);

  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [data, setData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFetch = () => {
    setStatus("loading");
    setErrorMsg(null);

    simulateFetchTodos({ isFailure, delay: 2000 })
      .then((result) => {
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        setData(null);
        setErrorMsg(err.message);
        setStatus("error");
      });
  };

  return (
    <div className="page">
      <h2>Errors / retry (fixed)</h2>

      <label>
        <input
          type="checkbox"
          checked={isFailure}
          onChange={(e) => setIsFailure(e.target.checked)}
        />
        Symuluj błąd zapytania
      </label>
      <br />
      <button onClick={handleFetch} disabled={status === "loading"}>
        Fetch
      </button>

      {status === "loading" && <div>Loading…</div>}

      {status === "error" && (
        <div>
          <div style={{ color: "red" }}>Błąd: {errorMsg}</div>
          <button onClick={handleFetch}>Retry</button>
        </div>
      )}

      {status === "success" && (
        <ul>
          {data?.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}
      <br />
      <Link to="/exp2/errors">← Wróć</Link>
    </div>
  );
}
