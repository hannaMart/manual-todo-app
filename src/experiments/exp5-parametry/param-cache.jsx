import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchTodos } from "./fakeFetchTodos";

export default function Exp5ParamCache() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    if (cache[filter]) {
      setData(cache[filter]);
      return;
    }

    let ignore = false;

    setLoading(true);

    fakeFetchTodos(filter, 700).then((result) => {
      if (ignore) return;

      setCache((prev) => ({
        ...prev,
        [filter]: result,
      }));

      setData(result);
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [filter, cache]);

  return (
    <div className="exp5">
      <h2 className="exp5__title">5c — Использование кэша (manual)</h2>

      <p className="exp5__desc">
        При повторном выборе уже использованного фильтра данные берутся из
        локального кэша компонента без нового HTTP-запроса.
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>
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
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      <p>
        <strong>Кэшированные фильтры:</strong>{" "}
        {Object.keys(cache).length > 0 ? Object.keys(cache).join(", ") : "нет"}
      </p>

      {loading && <p>Загрузка...</p>}

      {data && (
        <>
          <p>
            <strong>Номер запроса:</strong> {data.requestId}
          </p>

          <p>
            <strong>Количество элементов:</strong> {data.total}
          </p>

          <ul>
            {data.items.map((todo) => (
              <li key={todo.id}>
                {todo.title} — {todo.completed ? "completed" : "active"}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/exp5">← Назад</Link>
    </div>
  );
}

// Смысл: вручную сделать кэш по параметру и посмотреть, что при возврате к уже использованному фильтру новый запрос не нужен.
// Этот вариант специально показывает ручной кэш, чтобы потом было с чем сравнивать TanStack Query.

// То есть логика такая:

// первый раз all → идёт запрос
// потом active → идёт запрос
// потом снова all → данные уже из кэша, без нового запроса