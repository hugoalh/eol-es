import { systemName } from "https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.2.0/mod.ts";
/**
 * End Of Line (EOL) character/sequence CRLF, use on the Windows platforms.
 */
export const eolCRLF = "\r\n" as const;
/**
 * End Of Line (EOL) character/sequence LF, use on the POSIX/UNIX platforms.
 */
export const eolLF = "\n" as const;
export type EOLCharacter =
	| typeof eolCRLF
	| typeof eolLF;
/**
 * End Of Line (EOL) character/sequence evaluated for the current platform.
 */
export const eolCurrent: EOLCharacter = (systemName === "windows") ? eolCRLF : eolLF;
/**
 * Return regular expression of the End Of Line (EOL) characters/sequence.
 */
export function regExpEOL(): RegExp {
	return /\r?\n/g;
}
