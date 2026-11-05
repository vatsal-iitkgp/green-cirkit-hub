// Delhi open-market prices, INR/kg, excl. GST and freight.
// To update: add a new row at the bottom with the date (YYYY-MM-DD), price and source.
// Only add prices you have seen in a source — never estimate.

export type PricePoint = { date: string; price: number; source: string };

/** Virgin HDPE blow moulding, Delhi open market (midpoint if a range was quoted). */
export const VIRGIN_HDPE_BM_DELHI: PricePoint[] = [
  { date: "2026-10-12", price: 139, source: "BigMint daily round-up" },
  { date: "2026-10-14", price: 138.5, source: "Polymerupdate (138–139)" },
  { date: "2026-10-15", price: 139, source: "BigMint daily round-up" },
];

/** Range observed over a longer window, shown as context when the weekly series is short. */
export const RANGE_NOTE = {
  from: "2026-07-10",
  to: "2026-10-12",
  low: 130.5,
  high: 139.5,
  source: "Polymerupdate",
};

/** Recycled HDPE reference (Delhi weekly, last traded). */
export const RECYCLED_REF = [
  { grade: "R-HDPE blow chips · Natural", low: 128, high: 130, date: "2026-10-15", source: "Polymerupdate" },
  { grade: "R-HDPE blow chips · White", low: 125, high: 127, date: "2026-10-15", source: "Polymerupdate" },
  { grade: "R-HDPE blow pipe chips · Blue", low: 122, high: 124, date: "2026-10-15", source: "Polymerupdate" },
];

/** Producer list-price moves that affect HDPE. Newest first. */
export const PRODUCER_MOVES = [
  { date: "2026-11-01", who: "RIL", move: "HDPE injection & pipe +₹4/kg · other HDPE (incl. blow moulding) unchanged", dir: "up" },
  { date: "2026-11-01", who: "OPaL", move: "HDPE pipe & injection +₹2/kg · other HDPE unchanged", dir: "up" },
  { date: "2026-11-01", who: "IOCL", move: "R-HDPE white +₹1/kg · R-HDPE black unchanged", dir: "up" },
  { date: "2026-10-15", who: "IOCL", move: "HM & pipe HDPE +₹2/kg · other HDPE rolled over", dir: "up" },
  { date: "2026-10-10", who: "RIL", move: "HDPE pipe +₹3/kg · other HDPE rolled over", dir: "up" },
  { date: "2026-09-16", who: "RIL", move: "All HDPE grades +₹2/kg", dir: "up" },
] as const;

export const SOURCES = [
  { name: "BigMint daily polymer round-ups", url: "https://www.bigmint.co/insights" },
  { name: "Polymerupdate", url: "https://www.polymerupdate.com" },
  { name: "Plastemart producer price movement", url: "https://www.plastemart.com/polymer-price-movement/1" },
];
