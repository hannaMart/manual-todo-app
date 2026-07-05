import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fakeFetchTodos } from "./fakeFetchTodos";

export default function Exp5ParamChange() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    setLoading(true);

    fakeFetchTodos(filter, 700).then((result) => {
      if (ignore) return;
      setData(result);
      setLoading(false);
    });

    return () => {
      ignore = true;
    };
  }, [filter]);

  return (
    <div className="exp5">
      <h2 className="exp5__title">5a — Изменение параметров запроса</h2>

      <p className="exp5__desc">
        Ручная реализация: при изменении фильтра useEffect выполняет новый
        запрос и обновляет состояние компонента.
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <button onClick={() => setFilter("all")}>all</button>
        <button onClick={() => setFilter("active")}>active</button>
        <button onClick={() => setFilter("completed")}>completed</button>
      </div>

      <p>
        <strong>Текущий фильтр:</strong> {filter}
      </p>

      {loading && <p>Загрузка...</p>}

      {data && (
        <>
          <p>
            <strong>Номер запроса:</strong> {data.requestId}
          </p>
          <p>
            <strong>Получено элементов:</strong> {data.total}
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
/* 
Что здесь важно
1. filter

Хранит текущий параметр:

all
active
completed
2. useEffect([filter])

Каждый раз при смене фильтра:

запускается новый запрос
после ответа обновляются данные
3. ignore

Это защита от записи ответа после размонтирования или быстрого переключения.
Она здесь уместна, даже в базовой версии.

4. loading

Показывает, что новый запрос реально идёт.

Что ты проверишь после запуска
При открытии страницы должен уйти запрос для all
При нажатии active должен уйти новый запрос
При нажатии completed должен уйти ещё один запрос
На экране должен меняться:
фильтр
номер запроса
список элементов
Что это уже доказывает для 5a

Этот файл уже показывает:

изменение параметра вызывает новый запрос
данные зависят от параметра
UI обновляется вручную через useState

*/