import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/fin-cntrl/',
    plugins: [
        tailwindcss(),
    ],
    test: {
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            include: ['src/gastos/**'],
            // ui.ts entra na cobertura depois da refatoração
            exclude: ['src/gastos/ui.ts'],
            reporter: ['text', 'html'],
        },
    },
})
