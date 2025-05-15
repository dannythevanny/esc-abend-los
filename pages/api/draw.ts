export const config = {
  runtime: "edge",
};

const countries = [
  "Albanien", "Armenien", "Australien", "Österreich", "Aserbaidschan",
  "Belgien", "Kroatien", "Zypern", "Tschechien", "Dänemark", "Estland",
  "Finnland", "Frankreich", "Georgien", "Deutschland", "Griechenland",
  "Island", "Irland", "Israel", "Italien", "Lettland", "Litauen",
  "Luxemburg", "Malta", "Moldau", "Niederlande", "Nordmazedonien",
  "Norwegen", "Polen", "Portugal", "Rumänien", "San Marino", "Serbien",
  "Slowakei", "Slowenien", "Spanien", "Schweden", "Schweiz", "Türkei",
  "Ukraine", "Vereinigtes Königreich"
];

const categories = ["Vorspeise", "Hauptspeise", "Nachspeise", "Getränk"];

export default async function handler(req: Request) {
  const { name } = await req.json();

  const url = "https://axumqshazgdmwqemwdl.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dW1xc2hhZ3pka213cWVtd2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTgyNDIsImV4cCI6MjA2MjgzNDI0Mn0.uZE530b8T4e5FWpSwuJ4sCDhGuck3D2x2OfjZpdIDwo"; // ⚠️ Ersetze diesen mit deinem echten anon public key

  // Lade bestehende Ziehungen
  const res = await fetch(`${url}/rest/v1/draws`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  const existing = await res.json();

  // Verwendete Länder und Kategorien sammeln
  const usedCountries = existing.map((e: any) => e.country);
  const usedCategories = existing.map((e: any) => e.category);
  const availableCountries = countries.filter((c) => !usedCountries.includes(c));

  let categoryPool = [...categories];
  if (usedCategories.length < categories.length) {
    categoryPool = categories.filter((c) => !usedCategories.includes(c));
  }

  // Zufällig ziehen
  const country = availableCountries[Math.floor(Math.random() * availableCountries.length)];
  const category = categoryPool[Math.floor(Math.random() * categoryPool.length)];

  // In Datenbank speichern
  await fetch(`${url}/rest/v1/draws`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ name, country, category }),
  });

  return new Response(JSON.stringify({ country, category }), {
    headers: { "Content-Type": "application/json" },
  });
}

