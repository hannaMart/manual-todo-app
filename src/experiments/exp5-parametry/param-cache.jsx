
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchPb5Todos } from "../../fakeServer/fakeAPI";

export default function Exp5ParamCache() {
  const [filter, setFilter] = useState("all");
  const [cache, setCache] = useState({});

  // Данные для текущего фильтра
  const data = cache[filter] ?? null;
  const loading = !data;

  useEffect(() => {
    // Если данные уже есть в кэше, запрос не выполняется
    if (cache[filter]) {
      return;
    }

    let ignore = false;

    fakeFetchPb5Todos(filter, 700).then((result) => {
      if (ignore) return;

      // Сохраняем результат в кэше
      setCache((prev) => ({
        ...prev,
        [filter]: result,
      }));
    });

    return () => {
      ignore = true;
    };
  }, [filter, cache]);

  return (
    <div className="exp5">
      <h2 className="exp5__title">
        PB5b — Ponowne wykorzystanie danych (Cache)
      </h2>

      {/* <p className="exp5__desc">
        Przy ponownym wyborze wcześniej używanego filtra
        dane są pobierane z lokalnej pamięci podręcznej
        komponentu, bez wykonywania nowego żądania.
      </p> */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setFilter("all")}
          disabled={filter === "all"}
        >
          all
        </button>

        <button
          onClick={() => setFilter("active")}
          disabled={filter === "active"}
        >
          active
        </button>

        <button
          onClick={() => setFilter("completed")}
          disabled={filter === "completed"}
        >
          completed
        </button>
      </div>

      <p>
        <strong>Aktualny filtr:</strong> {filter}
      </p>

      <p>
        <strong>Filtry zapisane w pamięci podręcznej:</strong>{" "}
        {Object.keys(cache).length > 0
          ? Object.keys(cache).join(", ")
          : "brak"}
      </p>

      {loading && <p>Ładowanie...</p>}

      {data && (
        <>
          <p>
            <strong>Numer żądania:</strong> {data.requestId}
          </p>

          <p>
            <strong>Liczba elementów:</strong> {data.total}
          </p>

          <ul>
            {data.items.map((todo) => (
              <li key={todo.id}>
                {todo.title} —{" "}
                {todo.completed ? "completed" : "active"}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/exp5">← Wróć</Link>
    </div>
  );
}
