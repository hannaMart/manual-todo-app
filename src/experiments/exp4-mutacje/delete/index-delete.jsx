import { Link } from "react-router-dom";

export default function Exp4DeleteIndex() {
  return (
    <div className="delete">
      <h2 className="delete__title">
        Exp4 — Delete (mutacja usuwania)
      </h2>

      <p className="delete__desc">
        Eksperyment analizuje zachowanie aplikacji po usunięciu elementu
        oraz sposób synchronizacji danych w podejściu manualnym.
      </p>

      <h3>Warianty eksperymentu</h3>

      <ul className="delete__list">
        <li>
          <Link to="/exp4/delete/refetch">
            Wersja z refetch (DELETE + GET)
          </Link>
        </li>
        <li>
          <Link to="/exp4/delete/setstate">
            Wersja z setState (bez dodatkowego GET)
          </Link>
        </li>
      </ul>

      <Link className="delete__back" to="/exp4">
        ← Powrót do Exp4
      </Link>
    </div>
  );
}

