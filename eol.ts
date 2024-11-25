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
export const _regexpEOL = /\r?\n/g;
