import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ country: string; category: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function draw() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/draw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert("Fehler beim Ziehen. Bitte versuch es erneut.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>ESC Losziehung 🎤</h1>
      <input
        type="text"
        placeholder="Dein Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <br />
      <button
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}
        onClick={draw}
        disabled={name.trim() === "" || isLoading}
      >
        {isLoading ? "Ziehe..." : "Ziehe!"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
          <p><strong>{name}</strong> hat gezogen:</p>
          <p>🌍 Land: <strong>{result.country}</strong></p>
          <p>🍽️ Kategorie: <strong>{result.category}</strong></p>
        </div>
      )}
    </div>
  );
}

