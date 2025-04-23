/**
 * End Of Line (EOL) character CRLF, use on the Windows platforms.
 */
export const eolCRLF = "\r\n" as const;
/**
 * End Of Line (EOL) character LF, use on the POSIX/UNIX platforms.
 */
export const eolLF = "\n" as const;
/**
 * End Of Line (EOL) character evaluated for the current platform.
 */
export const eol: typeof eolCRLF | typeof eolLF = (Deno.build.os === "windows") ? eolCRLF : eolLF;
export function _getRegExpEOL(): RegExp {
	return /\r?\n/g;
}
/**
 * @deprecated Replaced by function {@linkcode _getRegExpEOL}.
 */
export const _regexpEOL: RegExp = _getRegExpEOL();
