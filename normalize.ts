import {
	eolCRLF,
	eolLF,
	regexpEOL,
	type EOLCharacter
} from "./eol.ts";
export type { EOLCharacter } from "./eol.ts";
function assertEOL(eol: EOLCharacter): void {
	if (!(
		eol === eolCRLF ||
		eol === eolLF
	)) {
		throw new SyntaxError(`\`${eol}\` is not a valid End Of Line (EOL) characters/sequence!`);
	}
}
/**
 * Normalize the End Of Line (EOL) characters/sequence in the content.
 * @param {EOLCharacter} eol EOL character/sequence that use to normalize.
 * @param {string} content Content that need to normalize.
 * @returns {string} Content with normalized EOL characters/sequence.
 * @example
 * ```ts
 * normalizeEOL(eolLF, "Deno\r\nis not\r\nNode");
 * //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
 * //=> "Deno\nis not\nNode" (Windows Platforms)
 * ```
 */
export function normalizeEOL(eol: EOLCharacter, content: string): string {
	assertEOL(eol);
	return content.replace(regexpEOL(), eol);
}
/**
 * Normalize the End Of Line (EOL) characters/sequence in the stream.
 */
export class EOLNormalizeStream extends TransformStream<string, string> {
	get [Symbol.toStringTag](): string {
		return "EOLNormalizeStream";
	}
	#chunkLastEndWithCR: boolean = false;
	#eol: EOLCharacter;
	/**
	 * Initialize.
	 * @param {EOLCharacter} eol EOL character/sequence that use to normalize.
	 */
	constructor(eol: EOLCharacter) {
		super({
			transform: (chunk: string, controller: TransformStreamDefaultController<string>): void => {
				let content: string = `${this.#chunkLastEndWithCR ? "\r" : ""}${chunk}`;
				if (content.endsWith("\r")) {
					this.#chunkLastEndWithCR = true;
					content = content.slice(0, -1);
				} else {
					this.#chunkLastEndWithCR = false;
				}
				controller.enqueue(content.replace(regexpEOL(), this.#eol));
			},
			flush: (controller: TransformStreamDefaultController<string>): void => {
				if (this.#chunkLastEndWithCR) {
					this.#chunkLastEndWithCR = false;
					controller.enqueue("\r");
				}
			}
		});
		assertEOL(eol);
		this.#eol = eol;
	}
}
