import {
	eolCRLF,
	eolCurrent,
	eolLF,
	regexpEOL,
	type EOLCharacter
} from "./eol.ts";
export type { EOLCharacter } from "./eol.ts";
interface CountEOLResult {
	countCRLF: bigint;
	countLF: bigint;
}
function countEOL(content: string): CountEOLResult {
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
	return {
		countCRLF,
		countLF
	};
}
function detectEOLConclusion(result: CountEOLResult): EOLCharacter | null {
	const {
		countCRLF,
		countLF
	}: CountEOLResult = result;
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
	return detectEOLConclusion(countEOL(content));
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
	let chunkLastEndWithCR: boolean = false;
	for await (const chunk of stream) {
		let content: string = `${chunkLastEndWithCR ? "\r" : ""}${chunk}`;
		if (content.endsWith("\r")) {
			chunkLastEndWithCR = true;
			content = content.slice(0, -1);
		} else {
			chunkLastEndWithCR = false;
		}
		const result: CountEOLResult = countEOL(content);
		countCRLF = result.countCRLF;
		countLF = result.countLF;
	}
	return detectEOLConclusion({
		countCRLF,
		countLF
	});
}
