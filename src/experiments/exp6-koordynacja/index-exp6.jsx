import { Link } from "react-router-dom";

export default function Exp6Koordynacja() {
  return (
    <div className="exp6">
      <h2 className="exp6__title">
        Эксперимент 6 — Koordynacja
      </h2>

      <p className="exp6__desc">
        Эксперимент посвящён анализу совместного использования server-state
        несколькими компонентами React-приложения, согласованности отображаемых
        данных и количества HTTP-запросов.
      </p>

      <ul className="exp6__list">
        <li>
          <Link to="/exp6/shared">
            6a — Использование общих серверных данных несколькими компонентами
          </Link>
        </li>

        <li>
          <Link to="/exp6/representations">
            6b — Использование одних и тех же данных различными представлениями
          </Link>
        </li>

        <li>
          <Link to="/exp6/update">
            6c — Изменение server-state одним компонентом и реакция остальных
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}