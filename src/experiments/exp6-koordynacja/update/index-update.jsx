import { Link } from "react-router-dom";

export default function Exp6AktualizacjaIndex() {
  return (
    <div className="exp6">
      <h2 className="exp6__title">
        Эксперимент 6c — Изменение server-state
      </h2>

      <p className="exp6__desc">
        Один компонент изменяет данные, после чего остальные компоненты должны
        отобразить актуальное состояние.
      </p>

      <ul className="exp6__list">
        <li>
          <Link to="/exp6/update/update-props">
            update — общее состояние
          </Link>
        </li>

        <li>
          <Link to="/exp6/update/update-context">
            update — Context API
          </Link>
        </li>
      </ul>

      <Link to="/exp6">← Назад к эксперименту 6</Link>
    </div>
  );
}