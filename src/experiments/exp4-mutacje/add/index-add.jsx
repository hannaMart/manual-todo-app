import { Link } from "react-router-dom";

export default function Exp4AddIndex() {
  return (
    <div className="add">
      <h2 className="add__title">Exp4 — Add (mutacja dodawania)</h2>

      <p className="add__desc">
        Eksperyment analizuje zachowanie aplikacji po dodaniu nowego elementu
        oraz porównuje strategie synchronizacji danych w podejściu manualnym.
      </p>

      <h3>Warianty eksperymentu</h3>

      <ul className="add__list">
        <li>
          <Link to="/exp4/add/refetch">
            Wersja z refetch (POST + GET)
          </Link>
        </li>
        <li>
          <Link to="/exp4/add/setstate">
            Wersja z setState (bez dodatkowego GET)
          </Link>
        </li>
      </ul>

      <Link className="add__back" to="/exp4">
        ← Powrót do Exp4
      </Link>
    </div>
  );
}