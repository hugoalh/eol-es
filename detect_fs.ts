import { detectEOL } from "./detect.ts";
import type { eol } from "./eol.ts";
/**
 * Detect the End Of Line (EOL) character in the file, asynchronously.
 * 
 * If no EOL character is detected, `null` is returned.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file that need to detect the EOL character.
 * @returns {Promise<typeof eol | null>} Result of the detected EOL character, or `null` if no EOL character is detected.
 */
export async function detectFileEOL(filePath: string | URL): Promise<typeof eol | null> {
	return detectEOL(await Deno.readTextFile(filePath));
}
/**
 * Detect the End Of Line (EOL) character in the file, synchronously.
 * 
 * If no EOL character is detected, `null` is returned.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file that need to detect the EOL character.
 * @returns {typeof eol | null} Result of the detected EOL character, or `null` if no EOL character is detected.
 */
export function detectFileEOLSync(filePath: string | URL): typeof eol | null {
	return detectEOL(Deno.readTextFileSync(filePath));
}
