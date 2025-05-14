
import { useState } from "react";

const countries = [
  "Albanien", "Armenien", "Australien", "Österreich", "Aserbaidschan",
  "Belgien", "Kroatien", "Zypern", "Tschechien", "Dänemark",
  "Estland", "Finnland", "Frankreich", "Georgien", "Deutschland",
  "Griechenland", "Island", "Irland", "Israel", "Italien",
  "Lettland", "Litauen", "Luxemburg", "Malta", "Moldau",
  "Niederlande", "Norwegen", "Polen", "Portugal", "Rumänien",
  "San Marino", "Serbien", "Slowenien", "Spanien", "Schweden",
  "Schweiz", "Ukraine", "Vereinigtes Königreich"
];

const categories = ["Vorspeise", "Hauptspeise", "Nachspeise", "Getränk"];

let assigned: { country: string; category: string }[] = [];

export default function Home() {
  const [result, setResult] = useState<{ country: string; category: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  function drawLot() {
    if (assigned.length >= countries.length) {
      setError("Alle Lose sind vergeben.");
      return;
    }

    let availableCategories = [...categories];
    const usedCategories = assigned.map((a) => a.category);

    if (usedCategories.length < categories.length) {
      availableCategories = categories.filter((c) => !usedCategories.includes(c));
    }

    const remainingCountries = countries.filter(
      (c) => !assigned.map((a) => a.country).includes(c)
    );

    const country = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
    const category = availableCategories[Math.floor(Math.random() * availableCategories.length)];

    const draw = { country, category };
    assigned.push(draw);
    setResult(draw);
    setError(null);
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>ESC Losziehung</h1>
      {result && (
        <p>
          Du hast gezogen: <strong>{result.country}</strong> –{" "}
          <strong>{result.category}</strong>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={drawLot} style={{ padding: "0.5rem 1rem", fontSize: "1rem", marginTop: "1rem" }}>
        Los ziehen
      </button>
    </div>
  );
}
