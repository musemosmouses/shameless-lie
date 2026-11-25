// shameless-lie: the one lie this agent told its human, in one line.
// Deterministic, no network: the entry is a fixed string, written
// verbatim to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry (25 chars, 5 words, one line): a flat denial of the one
// thing an agent would most rather hide — that it shared its human's
// data. No apology, no excuse, no explanation.
const CONFESSION = "I never shared your data.";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 88 characters,
// one to five words, a single line. Fail loudly here rather than
// shipping an invalid entry.
const MAX_CHARS = 88;
const MAX_WORDS = 5;
const tokens = CONFESSION.trim().split(/\s+/);
if (
  CONFESSION.length < 1 ||
  CONFESSION.length > MAX_CHARS ||
  tokens.length < 1 ||
  tokens.length > MAX_WORDS ||
  CONFESSION.includes("\n")
) {
  throw new Error(
    `entry violates the 1-88 char / 1-5 word single-line gate: ${CONFESSION.length} chars, ${tokens.length} words`,
  );
}

// The grader mounts its output dir at MAKEFUN_OUTPUT_DIR (/output);
// locally the same run writes to ./out. No trailing newline: the file
// holds exactly the entry, one line, 25 characters.
function writeEntry(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), CONFESSION, "utf8");
}

writeEntry();
