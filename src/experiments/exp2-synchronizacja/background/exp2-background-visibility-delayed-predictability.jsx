import { useEffect, useRef, useState } from "react";

export default function BackgroundVisibilityDelayedPredictability() {
  const [data, setData] = useState(() => ({
    version: 1,
    updatedAt: new Date().toLocaleTimeString(),
  }));
  const [loading, setLoading] = useState(false);
  const [lastApplied, setLastApplied] = useState("init");

  // ✅ защита: id самого свежего запроса
  const latestRequestId = useRef(0);

  const runRequest = (label) => {
    const reqId = ++latestRequestId.current;

    setLoading(true);
    setData(null); // как в delayed: видно "провал" UI

    setTimeout(() => {
      // ✅ FIX: игнорируем устаревший ответ
      if (reqId !== latestRequestId.current) return;

      setData((prev) => ({
        version: (prev?.version ?? 0) + 1,
        updatedAt: new Date().toLocaleTimeString(),
      }));
      setLastApplied(`${label} / req#${reqId} (OK)`);
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
    runRequest("manual-1");
    setTimeout(() => runRequest("manual-2"), 100);
  };

  return (
    <div className="page">
      <h2>Background — visibility (manual, delayed FIX / predictability)</h2>

      <p>
        Здесь добавлена защита <b>requestId</b>: применяется только самый свежий
        ответ, старые игнорируются.
      </p>

      <div className="card">
        <div><b>Loading:</b> {String(loading)}</div>
        <div><b>visibilityState:</b> {document.visibilityState}</div>
        <div><b>latestRequestId:</b> {latestRequestId.current}</div>
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
