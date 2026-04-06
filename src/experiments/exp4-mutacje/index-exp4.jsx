import { Link } from "react-router-dom";

export default function Exp4Mutacje() {
  return (
    <div className="exp4">
      <h2 className="exp4__title">
        Эксперимент 4 — Мутации и синхронизация данных
      </h2>

      <p className="exp4__desc">
        Эксперимент посвящён анализу поведения приложения при изменении данных
        (мутациях) и сравнению стратегий синхронизации server-state с точки
        зрения корректности интерфейса и количества HTTP-запросов.
      </p>

      <ul className="exp4__list">
        <li>
          <Link to="/exp4/add">
            4a — Добавление элемента (add)
          </Link>
        </li>

        <li>
          <Link to="/exp4/delete">
            4b — Удаление элемента (delete)
          </Link>
        </li>

        <li>
          <Link to="/exp4/sync">
            4c — Синхронизация после мутации
          </Link>
        </li>
      </ul>

      <Link to="/">← Назад</Link>
    </div>
  );
}