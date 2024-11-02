import { assertEquals } from "STD/assert/equals";
import {
	detectEOL,
	eolLF,
	normalizeEOL
} from "./mod.ts";
Deno.test("Detect 1", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\r\nis not\r\nNode"), "\r\n");
});
Deno.test("Detect 2", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\nis not\r\nNode"), "\r\n");
});
Deno.test("Detect 3", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\nis not\nNode"), "\n");
});
Deno.test("Detect 4", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno is not Node"), null);
});
Deno.test("Normalize 1", { permissions: "none" }, () => {
	assertEquals(normalizeEOL("Deno\r\nis not\r\nNode"), (Deno.build.os === "windows") ? "Deno\r\nis not\r\nNode" : "Deno\nis not\nNode");
});
Deno.test("Normalize 2", { permissions: "none" }, () => {
	assertEquals(normalizeEOL(eolLF, "Deno\r\nis not\r\nNode"), "Deno\nis not\nNode");
});
