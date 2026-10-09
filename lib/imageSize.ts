import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Width/height of a PNG under /public, read from its header at build time,
 * so screenshots render at their real proportions without layout shift.
 */
export function pngSize(
  publicPath: string,
): { width: number; height: number } | null {
  try {
    const file = path.join(process.cwd(), "public", publicPath);
    const buf = readFileSync(file);
    // PNG: 8-byte signature, then IHDR chunk with width/height at 16..24.
    if (buf.length < 24 || buf.toString("ascii", 12, 16) !== "IHDR")
      return null;
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}
