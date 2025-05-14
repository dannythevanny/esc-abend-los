
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

let assigned = [];

export default function ESCZiehung() {
  const [result, setResult] = useState(null);
  const [clicked, setClicked] = useState(false);

  function drawLot() {
    if (assigned.length >= countries.length) {
      setResult({ error: "Alle Lose sind bereits vergeben." });
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

    const randomCountry =
      remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
    const randomCategory =
      availableCategories[Math.floor(Math.random() * availableCategories.length)];

    const newDraw = { country: randomCountry, category: randomCategory };
    assigned.push(newDraw);
    setResult(newDraw);
    setClicked(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">ESC Losziehung</h1>
          {clicked && result && !result.error ? (
            <div>
              <p>
                Du bekommst: <strong>{result.country}</strong> – <strong>{result.category}</strong>
              </p>
            </div>
          ) : result?.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <p>Zieh dein Los für den ESC-Abend!</p>
          )}
          {!result?.error && (
            <Button onClick={drawLot}>Los ziehen</Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
