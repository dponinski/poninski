import { readFile } from "node:fs/promises";
import { join } from "node:path";

const fontDir = join(process.cwd(), "assets/fonts");

/** Libre Baskerville for ImageResponse, which can't use next/font. */
export async function loadSerifFonts() {
  const [regular, italic] = await Promise.all([
    readFile(join(fontDir, "LibreBaskerville-Regular.ttf")),
    readFile(join(fontDir, "LibreBaskerville-Italic.ttf")),
  ]);

  return [
    { name: "Libre Baskerville", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Libre Baskerville", data: italic, style: "italic" as const, weight: 400 as const },
  ];
}
