import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchPb5Todos } from "../../fakeServer/fakeAPI";

export default function Exp5ParamCache() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});

  useEffect(() => {
    if (cache[filter]) {
      setData(cache[filter]);
      setLoading(false);
      return;
    }

    let ignore = false;

    setLoading(true);

    fakeFetchPb5Todos(filter, 700).then((result) => {
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
      <h2 className="exp5__title">
        5b — Использование кэша (manual)
      </h2>

      <p className="exp5__desc">
        При повторном выборе уже использованного фильтра данные берутся из
        локального кэша компонента без нового запроса.
      </p>

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
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      <p>
        <strong>Кэшированные фильтры:</strong>{" "}
        {Object.keys(cache).length > 0
          ? Object.keys(cache).join(", ")
          : "нет"}
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
                {todo.title} —{" "}
                {todo.completed ? "completed" : "active"}
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/exp5">← Назад</Link>
    </div>
  );
}