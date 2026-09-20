import { Link } from "react-router-dom";

export default function Exp5Parametry() {
  return (
    <div className="exp5">
      <h2 className="exp5__title">
        Эксперимент 5 — Изменение параметров запроса
      </h2>

      <p className="exp5__desc">
        Эксперимент посвящён анализу поведения приложения при изменении
        параметров запроса и сравнению способов управления server-state
        с точки зрения получения и повторного использования данных,
        соответствующих разным параметрам.
      </p>

      <ul className="exp5__list">
        <li>
          <Link to="/exp5/param-change">
            5a — Изменение параметров запроса
          </Link>
        </li>

        <li>
          <Link to="/exp5/param-cache">
            5b — Повторное использование данных по параметру
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}