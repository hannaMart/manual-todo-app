import { Link } from "react-router-dom";

export default function Exp3Aktualnosc() {
  return (
    <div className="exp3">
      <h2 className="exp3__title">Эксперимент 3 — Актуальность данных</h2>

      <p className="exp3__desc">
        Эксперимент посвящён исследованию механизмов контроля актуальности
        server-state и их влияния на поведение повторных HTTP-запросов
        в React-приложении.
      </p>

      <ul className="exp3__list">
        <li>
          <Link to="/exp3/baseline">
            3a — Отсутствие контроля актуальности данных
          </Link>
        </li>

        <li>
          <Link to="/exp3/page-return">
            3b — Введение контроля актуальности данных на основе времени при повторном открытии страницы
          </Link>
        </li>

        <li>
          <Link to="/exp3/tab-return">
            3c — Поведение при возврате к представлению после перерыва при возврате на вкладку
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}