import { assertEquals } from "STD/assert/equals";
import {
	eol,
	eolLF,
	normalizeEOL
} from "./mod.ts";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(normalizeEOL(eol, "Deno\r\nis not\r\nNode"), (Deno.build.os === "windows") ? "Deno\r\nis not\r\nNode" : "Deno\nis not\nNode");
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(normalizeEOL(eolLF, "Deno\r\nis not\r\nNode"), "Deno\nis not\nNode");
});
