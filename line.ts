import { regexpEOL } from "./eol.ts";
export interface LineStreamOptions {
	/**
	 * Whether to include End Of Line (EOL) characters/sequence in the result.
	 * @default {true}
	 */
	includeEOL?: boolean;
}
/**
 * Transform the stream to cause each chunk is divided by the End Of Line (EOL) characters/sequence (i.e. each chunk is end with the End Of Line (EOL) characters/sequence).
 */
export class LineStream extends TransformStream<string, string> {
	get [Symbol.toStringTag](): string {
		return "LineStream";
	}
	#bin: string = "";
	#includeEOL: boolean;
	/**
	 * Initialize.
	 */
	constructor(options: LineStreamOptions = {}) {
		super({
			transform: (chunk: string, controller: TransformStreamDefaultController<string>): void => {
				this.#bin += chunk;
				this.#dispatcher(controller);
			},
			flush: (controller: TransformStreamDefaultController<string>): void => {
				this.#dispatcher(controller);
				if (this.#bin.length > 0) {
					controller.enqueue(this.#bin);
					this.#bin = "";
				}
			},
		});
		const { includeEOL = true }: LineStreamOptions = options;
		this.#includeEOL = includeEOL;
	}
	#dispatcher(controller: TransformStreamDefaultController<string>): void {
		while (true) {
			const index: number = this.#bin.indexOf("\n");
			if (index === -1) {
				break;
			}
			const content: string = this.#bin.slice(0, index + 1);
			this.#bin = this.#bin.slice(index + 1);
			controller.enqueue(this.#includeEOL ? content : content.replaceAll(regexpEOL(), ""));
		}
	}
}
