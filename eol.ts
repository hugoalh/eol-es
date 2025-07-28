import { EOL } from "node:os";
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
export const eolCurrent: EOLCharacter = EOL as EOLCharacter;
/**
 * Return regular expression of the End Of Line (EOL) characters/sequence.
 */
export function regExpEOL(): RegExp {
	return /\r?\n/g;
}
