import {
	eolCRLF,
	eolCurrent,
	eolLF,
	regexpEOL,
	type EOLCharacter
} from "./eol.ts";
export type { EOLCharacter } from "./eol.ts";
function detectEOLResultConclusion(countCRLF: bigint, countLF: bigint): EOLCharacter | null {
	if (countCRLF === 0n && countLF === 0n) {
		return null;
	}
	if (countCRLF > countLF) {
		return eolCRLF;
	}
	if (countLF > countCRLF) {
		return eolLF;
	}
	return eolCurrent;
}
/**
 * Determine the End Of Line (EOL) character/sequence in the content.
 * 
 * If no EOL character/sequence is in the content, `null` is returned.
 * @param {string} content Content that need to determine.
 * @returns {EOLCharacter | null} Determine result.
 * @example
 * ```ts
 * detectEOL("Deno\r\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example
 * ```ts
 * detectEOL("Deno\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example
 * ```ts
 * detectEOL("Deno\nis not\nNode");
 * //=> "\n"
 * ```
 * @example
 * ```ts
 * detectEOL("Deno is not Node");
 * //=> null
 * ```
 */
export function detectEOL(content: string): EOLCharacter | null {
	let countCRLF: bigint = 0n;
	let countLF: bigint = 0n;
	for (const match of content.matchAll(regexpEOL())) {
		const target: string = match[0];
		if (target === eolCRLF) {
			countCRLF += 1n;
		} else if (target === eolLF) {
			countLF += 1n;
		}
	}
	return detectEOLResultConclusion(countCRLF, countLF);
}
/**
 * Determine the End Of Line (EOL) character/sequence in the readable stream.
 * 
 * If no EOL character/sequence is in the readable stream, `null` is returned.
 * @param {ReadableStream<string>} stream Readable stream that need to determine.
 * @returns {Promise<EOLCharacter | null>} Determine result.
 */
export async function detectEOLFromStream(stream: ReadableStream<string>): Promise<EOLCharacter | null> {
	let countCRLF: bigint = 0n;
	let countLF: bigint = 0n;
	let bytePreviousIsCR: boolean = false;
	for await (const chunk of stream) {
		for (const byte of chunk) {
			if (bytePreviousIsCR) {
				if (byte === "\n") {
					countCRLF += 1n;
				} else if (byte === "\r") {
					bytePreviousIsCR = true;
				} else {
					bytePreviousIsCR = false;
				}
			} else {
				if (byte === "\n") {
					countLF += 1n;
				} else if (byte === "\r") {
					bytePreviousIsCR = true;
				}
			}
		}
	}
	return detectEOLResultConclusion(countCRLF, countLF);
}
