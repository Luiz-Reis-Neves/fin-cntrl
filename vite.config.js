import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: '/fin-cntrl/',
    plugins: [
        tailwindcss(),
    ],
})