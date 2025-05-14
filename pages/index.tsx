
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleDraw = async () => {
    setLoading(true);
    const res = await fetch("/api/draw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>ESC Losziehung 🎤</h1>
      <input
        type="text"
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />
      <br />
      <button onClick={handleDraw} disabled={loading || !name}>
        {loading ? "Ziehe..." : "Los ziehen"}
      </button>

      {result && result.country && (
        <div style={{ marginTop: "2rem" }}>
          <h2>🎉 Du hast gezogen:</h2>
          <p>
            <strong>{result.country}</strong> – {result.category}
          </p>
        </div>
      )}
    </div>
  );
}
