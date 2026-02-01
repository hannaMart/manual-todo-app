import { useEffect, useState } from "react";

export default function Exp2BackgroundVisibilityDelayed() {
  const [data, setData] = useState({
    version: 1,
    updatedAt: new Date().toLocaleTimeString(),
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timeoutId;

    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;

      setLoading(true);

      // намеренная очистка UI
      setData(null);

      timeoutId = setTimeout(() => {
        setData({
          version: (Math.random() * 100).toFixed(0),
          updatedAt: new Date().toLocaleTimeString(),
        });
        setLoading(false);
      }, 1500);
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="page">
      <h2>Background — visibility (manual, delayed)</h2>

      <p>
        Добавлена задержка, чтобы увидеть,
        что происходит с UI во время обновления.
      </p>

      <div className="card">
        <div><b>Loading:</b> {loading ? "true" : "false"}</div>

        <hr />

        <div><b>Версия:</b> {data ? data.version : "—"}</div>
        <div><b>Обновлено:</b> {data ? data.updatedAt : "—"}</div>

        {loading && <p><i>Обновление…</i></p>}
      </div>
    </div>
  );
}
