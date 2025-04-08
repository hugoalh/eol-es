import { deepStrictEqual } from "node:assert";
import { detectEOL } from "./mod.ts";
Deno.test("1", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\r\nis not\r\nNode"), "\r\n");
});
Deno.test("2", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\nis not\r\nNode"), "\r\n");
});
Deno.test("3", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno\nis not\nNode"), "\n");
});
Deno.test("4", { permissions: "none" }, () => {
	deepStrictEqual(detectEOL("Deno is not Node"), null);
});
