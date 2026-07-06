import { Link } from "react-router-dom";

export default function Exp6WspoldzielenieIndex() {
  return (
    <div className="exp6">
      <h2 className="exp6__title">
        Эксперимент 6a — Общие серверные данные
      </h2>

      <p className="exp6__desc">
        Два компонента одновременно используют один и тот же набор серверных
        данных.
      </p>

      <ul className="exp6__list">
        <li>
          <Link to="/exp6/shared/shared-props">
            Shared — передача данных через props
          </Link>
        </li>

        <li>
          <Link to="/exp6/shared/shared-context">
            Shared — Context API
          </Link>
        </li>
      </ul>

      <Link to="/exp6">← Назад к эксперименту 6</Link>
    </div>
  );
}