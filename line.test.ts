import { deepStrictEqual } from "node:assert";
import { LineStream } from "./line.ts";
Deno.test("1", { permissions: "none" }, async () => {
	deepStrictEqual(await Array.fromAsync(ReadableStream.from([
		"qwertzu",
		"iopasd\r\nmnbvc",
		"xylk\rjhgfds\napoiuzt\r",
		"qwr\r09ei\rqwrjiowqr\r",
		"\nrewq0987\n\n654321",
		"\nrewq0987\r\n\r\n654321\r"
	]).pipeThrough(new LineStream())), [
		"qwertzuiopasd\r\n",
		"mnbvcxylk\rjhgfds\n",
		"apoiuzt\rqwr\r09ei\rqwrjiowqr\r\n",
		"rewq0987\n",
		"\n",
		"654321\n",
		"rewq0987\r\n",
		"\r\n",
		"654321\r"
	]);
});
Deno.test("2", { permissions: "none" }, async () => {
	deepStrictEqual(await Array.fromAsync(ReadableStream.from(["rewq0987\r\n\r\n654321\n"]).pipeThrough(new LineStream())), [
		"rewq0987\r\n",
		"\r\n",
		"654321\n"
	]);
});
