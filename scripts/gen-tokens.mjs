// Generuje 12 losowych tokenów (6 par) + token administratora.
// Uruchom: npm run gen
import { randomBytes } from "node:crypto";

const tok = () => randomBytes(4).toString("hex"); // 8 znaków hex, nieodgadywalne

const caseId = "furgonetka"; // dostosuj lub ustaw różne dla par

console.log("\n// ── Wklej do lib/config.ts (PARTICIPANTS) ──\n");
console.log("export const PARTICIPANTS = [");
for (let i = 1; i <= 6; i++) {
  console.log(
    `  { token: "${tok()}", pairId: "P${i}", side: "A", caseId: "${caseId}" },`
  );
  console.log(
    `  { token: "${tok()}", pairId: "P${i}", side: "B", caseId: "${caseId}" },`
  );
}
console.log("];\n");

console.log("// ── Ustaw w Vercel jako zmienną środowiskową ADMIN_TOKEN ──");
console.log(`ADMIN_TOKEN=${randomBytes(12).toString("hex")}\n`);
