// dist/cjs это CommonJS: пометка для Node, иначе он прочитает .js как ESM по "type": "module"
import { writeFileSync } from "node:fs";
writeFileSync(new URL("../dist/cjs/package.json", import.meta.url), '{ "type": "commonjs" }\n');
