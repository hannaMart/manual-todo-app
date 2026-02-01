import { Link } from "react-router-dom";

export default function Exp2BackIndex() {
  return (
    <div className="page">
      <h2>Exp2 — Background synchronizacja</h2>

      <p>
        Background synchronizacja opisuje sytuacje, w których dane w UI są
        aktualizowane automatycznie (np. po powrocie do karty), bez jawnej akcji
        użytkownika.
      </p>

      <h3>Warianty eksperymentu (manual)</h3>

      <ol>
        <li>
          <Link to="/exp2/background/base">
            Wersja bazowa — brak synchronizacji w tle
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility">
            Visibility — synchronizacja przy powrocie do karty (bez opóźnień)
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility-delayed">
            Visibility + opóźnienie — obserwacja zachowania UI (czyszczenie danych)
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility-delayed-problem">
            Visibility + opóźnienie — PROBLEM (nieprzewidywalność, brak kontroli)
          </Link>
        </li>

        <li>
          <Link to="/exp2/background/visibility-delayed-predictability">
            Visibility + opóźnienie — FIX (kontrola i przewidywalność)
          </Link>
        </li>
      </ol>

      <p style={{ marginTop: 16 }}>
        Sekwencja 3 → 4 → 5 pokazuje:
        <br />
        <b>problem → konsekwencje → koszt naprawy</b> w ręcznej synchronizacji.
      </p>

      <Link to="/exp2">← Powrót do Exp2</Link>
    </div>
  );
}
