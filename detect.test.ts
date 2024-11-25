import { assertEquals } from "STD/assert/equals";
import { detectEOL } from "./mod.ts";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\r\nis not\r\nNode"), "\r\n");
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\nis not\r\nNode"), "\r\n");
});
Deno.test("3", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno\nis not\nNode"), "\n");
});
Deno.test("4", { permissions: "none" }, () => {
	assertEquals(detectEOL("Deno is not Node"), null);
});
