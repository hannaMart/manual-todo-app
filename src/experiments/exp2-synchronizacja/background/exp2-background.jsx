import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BgBasic() {
  // реальные часы (всегда идут)
  const [realTime, setRealTime] = useState(new Date().toLocaleTimeString());

  // снимок для эксперимента (меняется только по триггеру)
  const [snapshotTime, setSnapshotTime] = useState("");

  useEffect(() => {
    // реальные часы обновляются всегда
    const clockId = setInterval(() => {
      setRealTime(new Date().toLocaleTimeString());
    }, 1000);

    // baseline: берем время ОДИН РАЗ
    setSnapshotTime(new Date().toLocaleTimeString());

    return () => clearInterval(clockId);
  }, []);

  return (
    <div className="page">
      {/* Реальные часы */}
      <div style={{ marginBottom: 16 }}>
        <strong>Aktualny czas:</strong> {realTime}
      </div>

      <hr />

      <h2>Background — Base</h2>
      <p>
        Czas ostatniego odczytu: <b>{snapshotTime}</b>
      </p>
      <br/>

      <Link to="/exp2">← Wróć</Link>
    </div>
  );
}
