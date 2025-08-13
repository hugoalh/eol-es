import { deepStrictEqual } from "node:assert";
import {
	detectEOL,
	detectEOLFromStream
} from "./detect.ts";
import {
	eolCRLF,
	eolCurrent,
	eolLF
} from "./eol.ts";
Deno.test("Direct 1", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\r\nis not\r\nNode"), eolCRLF);
});
Deno.test("Direct 2", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\nis not\r\nNode"), eolCurrent);
});
Deno.test("Direct 3", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\nis not\nNode"), eolLF);
});
Deno.test("Direct 4", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno is not Node"), null);
});
Deno.test("Stream 1", { permissions: "none" }, async () => {
	deepStrictEqual(await detectEOLFromStream(ReadableStream.from([
		"Deno\r",
		"\nis not",
		"\r\nNode"
	])), eolCRLF);
});
