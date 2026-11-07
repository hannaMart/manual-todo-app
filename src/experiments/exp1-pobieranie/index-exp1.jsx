
import { Link } from "react-router-dom";

export default function Exp1Pobieranie() {
  return (
    <div className="exp1">
      <h2 className="exp1__title">
        PB1 — Pobieranie danych serwerowych
      </h2>

      <ul className="exp1__list">
        <li>
          <Link to="/exp1/baseline">
            Baseline — pobieranie danych przez jeden komponent
          </Link>
        </li>

        <li>
          <Link to="/exp1/scaling">
            Scaling — 10 niezależnych komponentów
          </Link>
        </li>

        <li>
          <Link to="/exp1/scaling-shared">
            Scaling Shared — wspólne pobieranie danych (props)
          </Link>
        </li>
      </ul>

      <Link to="/">← Wróć</Link>
    </div>
  );
}
