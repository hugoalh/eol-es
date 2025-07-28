import { deepStrictEqual } from "node:assert";
import {
	eolCurrent,
	eolLF
} from "./eol.ts";
import { normalizeEOL } from "./normalize.ts";
Deno.test("Direct Current 1", { permissions: "none" }, () => {
	deepStrictEqual(normalizeEOL(eolCurrent, "Deno\r\nis not\r\nNode"), (Deno.build.os === "windows") ? "Deno\r\nis not\r\nNode" : "Deno\nis not\nNode");
});
Deno.test("Direct LF 1", { permissions: "none" }, () => {
	deepStrictEqual(normalizeEOL(eolLF, "Deno\r\nis not\r\nNode"), "Deno\nis not\nNode");
});
