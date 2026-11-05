// Product catalogue. Add a new grade here and it appears on the site automatically.
export type Grade = {
  id: string;
  name: string;
  family: string;
  colour: string;
  swatch: string; // CSS background for the pellet swatch
  summary: string;
  process: string;
  tds: { property: string; condition?: string; method: string; unit: string; value: string }[];
  applications: string[];
  processTemp: string;
  pack: string;
  note: string;
};

export const GRADES: Grade[] = [
  {
    id: "bm-blue",
    name: "GC Prime™ BM 115",
    family: "Blow moulding",
    colour: "Blue",
    swatch: "radial-gradient(circle at 32% 28%, #fff 0%, #86aee6 22%, #23447a 100%)",
    summary:
      "Near-virgin recycled HDPE for small-volume blow moulding up to 15 L, where good mechanical strength, gloss, dimensional stability and ESCR matter.",
    process: "Extrusion blow moulding",
    tds: [
      { property: "Melt flow index", condition: "190°C / 5.0 kg", method: "ASTM D1238", unit: "g/10 min", value: "1.15" },
      { property: "Density", condition: "at 23°C", method: "ASTM D1505", unit: "g/cm³", value: "0.958" },
      { property: "Tensile strength", condition: "at yield", method: "ASTM D638", unit: "MPa", value: "24" },
      { property: "Elongation", condition: "at yield", method: "ASTM D638", unit: "%", value: "9" },
      { property: "Flexural modulus", method: "ASTM D790", unit: "MPa", value: "975" },
      { property: "Ash content", method: "ASTM D2584", unit: "%", value: "< 3.0" },
      { property: "Moisture", method: "ASTM D6980", unit: "%", value: "< 0.2" },
    ],
    applications: ["Jerry cans", "Bottles up to 15 L", "Personal-care packaging", "General-purpose blow-moulded containers"],
    processTemp: "190 – 230°C",
    pack: "25 kg bags",
    note: "Typical values. Being a post-consumer recycled product, properties may vary by up to 10% lot to lot.",
  },
];
