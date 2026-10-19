// Очистка dist перед сборкой: без rm, чтобы работало и в Windows
import { rmSync } from "node:fs";
rmSync(new URL("../dist", import.meta.url), { recursive: true, force: true });
