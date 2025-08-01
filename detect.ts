import {
	eolCRLF,
	eolCurrent,
	eolLF,
	regExpEOL,
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
 * @param {string | Uint8Array} content Content that need to determine.
 * @returns {EOLCharacter | null} Determine result.
 * @example 1
 * ```ts
 * detectEOL("Deno\r\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example 2
 * ```ts
 * detectEOL("Deno\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example 3
 * ```ts
 * detectEOL("Deno\nis not\nNode");
 * //=> "\n"
 * ```
 * @example 4
 * ```ts
 * detectEOL("Deno is not Node");
 * //=> null
 * ```
 */
export function detectEOL(content: string | Uint8Array): EOLCharacter | null {
	const contentFmt: string = (typeof content === "string") ? content : new TextDecoder().decode(content);
	let countCRLF: bigint = 0n;
	let countLF: bigint = 0n;
	for (const match of contentFmt.matchAll(regExpEOL())) {
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
 * @param {ReadableStream<Uint8Array>} stream Readable stream that need to determine.
 * @returns {Promise<EOLCharacter | null>} Determine result.
 */
export async function detectEOLFromStream(stream: ReadableStream<Uint8Array>): Promise<EOLCharacter | null> {
	let countCRLF: bigint = 0n;
	let countLF: bigint = 0n;
	let bytePreviousIsCR: boolean = false;
	for await (const chunk of stream) {
		for (const byte of chunk) {
			if (bytePreviousIsCR) {
				if (byte === 10) {
					countCRLF += 1n;
				} else if (byte === 13) {
					bytePreviousIsCR = true;
				} else {
					bytePreviousIsCR = false;
				}
			} else {
				if (byte === 10) {
					countLF += 1n;
				} else if (byte === 13) {
					bytePreviousIsCR = true;
				}
			}
		}
	}
	return detectEOLResultConclusion(countCRLF, countLF);
}
