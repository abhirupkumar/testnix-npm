import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

export default defineConfig({
    input: ['server/index.ts', 'client/index.ts'],
    output: {
        dir: 'dist',
        format: 'es',
        name: "testnix",
    },
    external: ['react', 'react-dom'],
    plugins: [typescript({ tsconfig: "tsconfig.json" })],
})