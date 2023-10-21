import Ai from "./handlers/Ai.js";

const AI = new Ai();

const title =
  'Pneumatic Quick Connector Air Fitting For 4 6 8 10 12mm Hose Tube Pipe 1/8" 3/8" 1/2" 1/4" BSP Female Thread Brass';

const keywords = [
  "pneumatic",
  "Air Fittings",
  "Pneumatic Fittings",
  "DIY",
  "Air Hose Fittings",
];

const titles = await AI.generateTitle(title, keywords);

console.log(titles);
