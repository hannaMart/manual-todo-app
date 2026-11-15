
import { useState } from "react";
import { simulateFetchTodos } from "../../../fakeServer/fakeAPI";
import { Link } from "react-router-dom";

export default function Exp2ErrorsLoading() {
  const [fail1, setFail1] = useState(false);
  const [status1, setStatus1] = useState("idle");
  const [data1, setData1] = useState(null);
  const [error1, setError1] = useState(null);

  const startBug1 = () => {
    setStatus1("loading");
    setData1(null);
    setError1(null);

    simulateFetchTodos({ isFailure: fail1, delay: 3000 })
      .then((result) => {
        setData1(result);
      })
      .catch((err) => {
        setError1(err.message);
      });
  };

  const resetBug1 = () => {
    setStatus1("idle");
    setData1(null);
    setError1(null);
  };

  const [status2, setStatus2] = useState("idle");
  const [data2, setData2] = useState(null);
  const [error2, setError2] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);

  const startBug2Fail = () => {
    setIsRequesting(true);
    setStatus2("loading");
    setData2(null);
    setError2(null);

    simulateFetchTodos({ isFailure: true, delay: 3000 })
      .then((result) => {
        setData2(result);
        setStatus2("success");
      })
      .catch((err) => {
        setError2(err.message);
        setStatus2("error");
      })
      .finally(() => {
        setIsRequesting(false);
      });
  };

  const retryBug2Ok = () => {
    setIsRequesting(true);
    setError2(null);

    // Celowo pominięto ustawienie statusu loading.

    simulateFetchTodos({ isFailure: false, delay: 3000 })
      .then((result) => {
        setData2(result);
        setStatus2("success");
      })
      .catch((err) => {
        setError2(err.message);
        setStatus2("error");
      })
      .finally(() => {
        setIsRequesting(false);
      });
  };

  const resetBug2 = () => {
    setStatus2("idle");
    setData2(null);
    setError2(null);
  };

  return (
    <div className="page">
      <h2>Kontrola stanu ładowania</h2>

      {/* <p>
        W Manual celowo pominięto wybrane zmiany statusu,
        aby sprawdzić ich wpływ na wyświetlanie stanu ładowania.
      </p> */}

      {/* <hr />

      <h3>1. Loading pozostaje po zakończeniu pobierania</h3>

      <label>
        <input
          type="checkbox"
          checked={fail1}
          onChange={(e) => setFail1(e.target.checked)}
        />
        Symuluj nieudane pobieranie danych
      </label>
      <br />
      <br />

      <button onClick={startBug1}>Pobierz dane</button>
      <button onClick={resetBug1}>Reset</button>

      <div>Status: {status1}</div>

      {status1 === "loading" && <div>Loading…</div>}

      {error1 && <div>Błąd: {error1}</div>}

      {data1 && (
        <ul>
          {data1.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}

      <hr /> */}

      <h3>2. Brak loading podczas ponownego pobierania</h3>

      <button
        onClick={startBug2Fail}
        disabled={isRequesting}
      >
        Pobierz dane (symulacja błędu)
      </button>

      <button
        onClick={retryBug2Ok}
        disabled={status2 !== "error" || isRequesting}
      >
        Spróbuj ponownie pobrać dane
      </button>

      <button onClick={resetBug2}>Reset</button>

      <div>Status: {status2}</div>

      {status2 === "loading" && <div>Loading…</div>}

      {status2 === "error" && error2 && (
        <div style={{ color: "red" }}>
          Błąd: {error2}
        </div>
      )}

      {status2 === "success" && data2 && (
        <ul>
          {data2.map((t) => (
            <li key={t.id}>{t.title}</li>
          ))}
        </ul>
      )}

      <br />
      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
