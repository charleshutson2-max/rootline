"use client";

import { useState } from "react";

export function PublicClient() {
  const [honor, setHonor] = useState(false);
  const [history, setHistory] = useState(false);

  return (
    <div className="card">
      <div className="toggle-row">
        <div>
          <strong>Public Honor Roll</strong>
          <p className="hint">Deceased honors only. Default OFF.</p>
        </div>
        <button
          type="button"
          className={`toggle${honor ? " on" : ""}`}
          aria-pressed={honor}
          onClick={() => setHonor((v) => !v)}
        />
      </div>
      <div className="toggle-row">
        <div>
          <strong>Public History Mode</strong>
          <p className="hint">Future flag · deceased generations only. Default OFF.</p>
        </div>
        <button
          type="button"
          className={`toggle${history ? " on" : ""}`}
          aria-pressed={history}
          onClick={() => setHistory((v) => !v)}
        />
      </div>
      <p className="meta" style={{ marginTop: "1rem" }}>
        Living people’s private photos and addresses never appear on the public
        site, regardless of these toggles. Changes are local until Postgres.
        {honor ? " Honor Roll is marked ON for this session." : ""}
        {history ? " Public History Mode is marked ON for this session." : ""}
      </p>
    </div>
  );
}
