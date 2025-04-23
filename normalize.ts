import {
	_getRegExpEOL,
	type eol
} from "./eol.ts";
/**
 * Normalize the End Of Line (EOL) characters in the content.
 * @param {typeof eol} eolChar EOL character that use to normalize the content.
 * @param {string} content Content that need to normalize the EOL characters.
 * @returns {string} Content that normalized the EOL characters.
 * @example
 * ```ts
 * normalizeEOL(eolLF, "Deno\r\nis not\r\nNode");
 * //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
 * //=> "Deno\nis not\nNode" (Windows Platforms)
 * ```
 */
export function normalizeEOL(eolChar: typeof eol, content: string): string {
	return content.replace(_getRegExpEOL(), eolChar);
}
/**
 * Normalize the End Of Line (EOL) characters in the file, asynchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **File System - Read (Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`):**
 * >   - *Resources*
 * > - **File System - Write (Deno: `write`; NodeJS (>= v20.9.0) 🧪: `fs-write`):**
 * >   - *Resources*
 * @param {typeof eol} eolChar EOL character that use to normalize the file.
 * @param {...readonly (string | URL)} filesPath Path of the files that need to normalize the EOL characters.
 * @returns {Promise<void>}
 */
export async function normalizeFileEOL(eolChar: typeof eol, ...filesPath: readonly (string | URL)[]): Promise<void> {
	const results: readonly PromiseSettledResult<void>[] = await Promise.allSettled(filesPath.map(async (filePath: string | URL): Promise<void> => {
		const contentOriginal: string = await Deno.readTextFile(filePath);
		const contentNew: string = normalizeEOL(eolChar, contentOriginal);
		if (contentOriginal !== contentNew) {
			await Deno.writeTextFile(filePath, contentNew, { create: false });
		}
	}));
	const fails: readonly PromiseRejectedResult[] = results.filter((result: PromiseSettledResult<void>): result is PromiseRejectedResult => {
		return (result.status === "rejected");
	});
	if (fails.length > 0) {
		throw new AggregateError(fails.map((fail: PromiseRejectedResult): Error => {
			return fail.reason as Error;
		}), `Unable to normalize some of the files!`);
	}
}
/**
 * Normalize the End Of Line (EOL) characters in the file, synchronously.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - **File System - Read (Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`):**
 * >   - *Resources*
 * > - **File System - Write (Deno: `write`; NodeJS (>= v20.9.0) 🧪: `fs-write`):**
 * >   - *Resources*
 * @param {typeof eol} eolChar EOL character that use to normalize the file.
 * @param {...readonly (string | URL)} filesPath Path of the files that need to normalize the EOL characters.
 * @returns {void}
 */
export function normalizeFileEOLSync(eolChar: typeof eol, ...filesPath: readonly (string | URL)[]): void {
	const fails: Error[] = [];
	for (const filePath of filesPath) {
		try {
			const contentOriginal: string = Deno.readTextFileSync(filePath);
			const contentNew: string = normalizeEOL(eolChar, contentOriginal);
			if (contentOriginal !== contentNew) {
				Deno.writeTextFileSync(filePath, contentNew, { create: false });
			}
		} catch (error) {
			fails.push(error as Error);
		}
	}
	if (fails.length > 0) {
		throw new AggregateError(fails, `Unable to normalize some of the files!`);
	}
}
