import { Link } from "react-router-dom";

export default function Exp6RepresentationsIndex() {
  return (
    <div className="exp6">
      <h2 className="exp6__title">
        Эксперимент 6b — Разные представления данных
      </h2>

      <p className="exp6__desc">
        Несколько компонентов отображают разные представления одного и того же
        server-state.
      </p>

      <ul className="exp6__list">
        <li>
          <Link to="/exp6/representations/representations-props">
            representations — передача данных через props
          </Link>
        </li>

        <li>
          <Link to="/exp6/representations/representations-context">
            representations — Context API
          </Link>
        </li>
      </ul>

      <Link to="/exp6">← Назад к эксперименту 6</Link>
    </div>
  );
}