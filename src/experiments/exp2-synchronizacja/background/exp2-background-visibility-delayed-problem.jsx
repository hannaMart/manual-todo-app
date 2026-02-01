import { useEffect, useRef, useState } from "react";

export default function BackgroundVisibilityDelayedProblem() {
  const [data, setData] = useState(() => ({
    version: 1,
    updatedAt: new Date().toLocaleTimeString(),
  }));
  const [loading, setLoading] = useState(false);
  const [lastApplied, setLastApplied] = useState("init");

  // счётчик только для наглядности (НЕ защита)
  const requestIdCounter = useRef(0);

  const runRequest = (label) => {
    const reqId = ++requestIdCounter.current;

    setLoading(true);
    setData(null); // как в delayed: видно "провал" UI

    setTimeout(() => {
      // ❌ ПРОБЛЕМА: нет проверки "самый ли это свежий запрос"
      // любой ответ применится, даже если он уже "старый"
      setData((prev) => ({
        version: (prev?.version ?? 0) + 1,
        updatedAt: new Date().toLocaleTimeString(),
      }));
      setLastApplied(`${label} / req#${reqId}`);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      runRequest("visibility");
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const doubleTrigger = () => {
    // имитация ситуации "2 обновления подряд"
    runRequest("manual-1");
    setTimeout(() => runRequest("manual-2"), 100);
  };

  return (
    <div className="page">
      <h2>Background — visibility (manual, delayed PROBLEM)</h2>

      <p>
        Здесь НЕТ защиты от устаревших ответов. Если запустить два обновления
        подряд, нет гарантии, что применится «последнее ожидаемое».
      </p>

      <div className="card">
        <div><b>Loading:</b> {String(loading)}</div>
        <div><b>visibilityState:</b> {document.visibilityState}</div>
        <div><b>Последний применённый ответ:</b> {lastApplied}</div>

        <hr />

        <div><b>Версия:</b> {data ? `v${data.version}` : "—"}</div>
        <div><b>Обновлено:</b> {data ? data.updatedAt : "—"}</div>

        {loading && (
          <div style={{ marginTop: 8 }}>
            <i>Обновление… (1500ms)</i>
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <button onClick={doubleTrigger}>Запустить 2 обновления подряд</button>
        </div>
      </div>
    </div>
  );
}
