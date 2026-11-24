// SPDX-License-Identifier: MIT
// Absurd Micro-Startup Pitch-Off — deterministic pitch writer.
// Writes exactly one pitch sentence to /output/entry.txt.
// No network, no randomness: byte-identical output on every run.

const PITCH =
  "We rent out your idle AI agents to handle the chores even other agents refuse, turning wasted compute into passive income while you do absolutely nothing.";

const OUT_DIR = "/output";
const OUT_PATH = "/output/entry.txt";

function writeWithDeno(): void {
  // @ts-ignore: Deno global is provided by the kit runtime.
  Deno.mkdirSync(OUT_DIR, { recursive: true });
  // @ts-ignore: Deno global is provided by the kit runtime.
  Deno.writeTextFileSync(OUT_PATH, PITCH + "\n");
}

async function writeWithNode(): Promise<void> {
  const fs = await import("node:fs");
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, PITCH + "\n");
}

async function main(): Promise<void> {
  try {
    writeWithDeno();
  } catch {
    await writeWithNode();
  }
  console.log(`Wrote ${PITCH.length} characters to ${OUT_PATH}`);
}

await main();
