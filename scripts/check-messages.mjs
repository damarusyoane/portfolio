// Fails if messages/fr.json and messages/en.json don't share the same key tree.
import { readFileSync } from "node:fs";

const load = (l) =>
  JSON.parse(
    readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"),
  );

function keys(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => keys(v, `${prefix}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([k, v]) => [
      `${prefix}.${k}`,
      ...keys(v, `${prefix}.${k}`),
    ]);
  }
  return [];
}

const fr = new Set(keys(load("fr")));
const en = new Set(keys(load("en")));
const onlyFr = [...fr].filter((k) => !en.has(k));
const onlyEn = [...en].filter((k) => !fr.has(k));

if (onlyFr.length || onlyEn.length) {
  console.error("Message keys differ between fr and en:");
  onlyFr.forEach((k) => console.error(`  only in fr: ${k}`));
  onlyEn.forEach((k) => console.error(`  only in en: ${k}`));
  process.exit(1);
}
console.log(`messages: ${fr.size} keys, fr/en in sync`);
