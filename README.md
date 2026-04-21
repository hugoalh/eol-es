# End Of Line (EOL) (ES)

[**⚖️** MIT](./LICENSE.md)

🔗
[GitHub](https://github.com/hugoalh/eol-es)
[JSR](https://jsr.io/@hugoalh/eol)
[NPM](https://www.npmjs.com/package/@hugoalh/eol)

An ECMAScript module to handle end of line (EOL).

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/eol-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/eol[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/eol[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |
| `./detect` | `./detect.ts` | Detect. |
| `./eol` | `./eol.ts` | Basic. |
| `./line` | `./line.ts` | Line. |
| `./normalize` | `./normalize.ts` | Normalize. |

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
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
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
