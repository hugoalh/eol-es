# End Of Line (EOL) (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/eol-es](https://img.shields.io/github/v/release/hugoalh/eol-es?label=hugoalh/eol-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/eol-es")](https://github.com/hugoalh/eol-es)
[![JSR: @hugoalh/eol](https://img.shields.io/jsr/v/@hugoalh/eol?label=@hugoalh/eol&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/eol")](https://jsr.io/@hugoalh/eol)
[![NPM: @hugoalh/eol](https://img.shields.io/npm/v/@hugoalh/eol?label=@hugoalh/eol&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/eol")](https://www.npmjs.com/package/@hugoalh/eol)

An ECMAScript (JavaScript & TypeScript) module to handle end of line (EOL).

## 🔰 Begin

### 🎯 Targets

| **Targets** | **Remote** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/eol-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/eol[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/eol[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 APIs

- ```ts
  class EOLNormalizeStream extends TransformStream<string, string> {
    constructor(eol: EOLCharacter);
  }
  ```
- ```ts
  class LineStream extends TransformStream<string, string> {
  }
  ```
- ```ts
  function detectEOL(content: string): EOLCharacter | null;
  ```
- ```ts
  function detectEOLFromStream(stream: ReadableStream<string>): Promise<EOLCharacter | null>;
  ```
- ```ts
  function normalizeEOL(eol: EOLCharacter, content: string): string;
  ```
- ```ts
  type EOLCharacter =
    | typeof eolCRLF
    | typeof eolLF;
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/eol)

## ✍️ Examples

- ```ts
  detectEOL("Deno\r\nis not\r\nNode");
  //=> "\r\n"
  ```
- ```ts
  detectEOL("Deno\nis not\r\nNode");
  //=> "\r\n"
  ```
- ```ts
  detectEOL("Deno\nis not\nNode");
  //=> "\n"
  ```
- ```ts
  detectEOL("Deno is not Node");
  //=> null
  ```
- ```ts
  normalizeEOL(eolCurrent, "Deno\r\nis not\r\nNode");
  //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
  //=> "Deno\r\nis not\r\nNode" (Windows Platforms)
  ```
- ```ts
  normalizeEOL(eolLF, "Deno\r\nis not\r\nNode");
  //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
  //=> "Deno\nis not\nNode" (Windows Platforms)
  ```
