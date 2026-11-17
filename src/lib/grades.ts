// Product catalogue. Add a new grade here and it appears on the site automatically.
export type Grade = {
  id: string;
  name: string;
  family: string;
  colour: string;
  swatch: string; // CSS background for the pellet swatch
  summary: string;
  highlights: string[];
  process: string;
  tds: { group: string; property: string; condition?: string; method: string; unit: string; value: string }[];
  applications: string[];
  processing: string[];
  processTemp: string;
  pack: string;
  storage: string;
  note: string;
  docNo: string;
  revision: string;
  issued: string;
};

export const GRADES: Grade[] = [
  {
    id: "bm-blue",
    name: "GC Prime™ BM 115",
    family: "Blow moulding",
    colour: "Blue",
    swatch: "radial-gradient(circle at 32% 28%, #fff 0%, #86aee6 22%, #23447a 100%)",
    summary:
      "A blue, near-virgin recycled HDPE grade for extrusion blow moulding of containers up to 15 litres. It gives moulded parts a stiff, stable body, a clean surface finish and dependable resistance to stress cracking.",
    highlights: ["Stiff, dimensionally stable parts", "Clean surface finish", "Reliable stress-crack resistance", "Runs on standard HDPE settings"],
    process: "Extrusion blow moulding",
    tds: [
      { group: "Flow & physical", property: "Melt flow rate (MFR)", condition: "190°C, 5 kg load", method: "ASTM D1238", unit: "g/10 min", value: "1.15" },
      { group: "Flow & physical", property: "Density", condition: "23°C", method: "ASTM D1505", unit: "g/cm³", value: "0.958" },
      { group: "Mechanical", property: "Tensile strength at yield", method: "ASTM D638", unit: "MPa", value: "24" },
      { group: "Mechanical", property: "Elongation at yield", method: "ASTM D638", unit: "%", value: "9" },
      { group: "Mechanical", property: "Flexural modulus", method: "ASTM D790", unit: "MPa", value: "975" },
      { group: "Purity", property: "Ash (inorganic residue)", method: "ASTM D2584", unit: "%", value: "< 3.0" },
      { group: "Purity", property: "Moisture content", method: "ASTM D6980", unit: "%", value: "< 0.2" },
    ],
    applications: ["Jerry cans and carboys", "Household and home-care bottles, up to 15 L", "Personal-care containers", "Industrial blow-moulded packaging"],
    processing: [
      "Melt temperature: 190 – 230°C",
      "Runs on standard HDPE blow-moulding settings",
      "Can be used on its own or blended with virgin HDPE",
      "Pre-drying is not normally needed; if stored in humid conditions, dry before use",
    ],
    processTemp: "190 – 230°C",
    pack: "25 kg bags",
    storage: "Keep bags sealed, dry and out of direct sunlight.",
    note: "Typical values from representative lots. As a post-consumer recycled material, lot-to-lot variation within ±10% is normal. Each shipment carries its own lot test report.",
    docNo: "GC-TDS-BM115",
    revision: "01",
    issued: "Nov 2026",
  },
];
