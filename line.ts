/**
 * Transform the stream to cause each chunk is divided by the End Of Line (EOL) characters/sequence (i.e. each chunk is end with the End Of Line (EOL) characters/sequence).
 */
export class EOLLineStream extends TransformStream<string, string> {
	get [Symbol.toStringTag](): string {
		return "EOLLineStream";
	}
	#bin: string = "";
	/**
	 * Initialize.
	 */
	constructor() {
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
	}
	#dispatcher(controller: TransformStreamDefaultController<string>): void {
		while (true) {
			const index: number = this.#bin.indexOf("\n");
			if (index === -1) {
				break;
			}
			controller.enqueue(this.#bin.slice(0, index + 1));
			this.#bin = this.#bin.slice(index + 1);
		}
	}
}
