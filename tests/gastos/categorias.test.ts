import { describe, it, expect } from "vitest";
import { CATEGORIAS_GASTO, categoriaGasto } from "../../src/gastos/categorias.ts";

describe("CATEGORIAS_GASTO", () => {
    it("não repete nomes", () => {
        const nomes = CATEGORIAS_GASTO.map((c) => c.nome);
        expect(new Set(nomes).size).toBe(nomes.length);
    });

    it("define etiqueta e cor hexadecimal para todas as categorias", () => {
        for (const { nome, etiqueta, cor } of CATEGORIAS_GASTO) {
            expect(etiqueta, nome).toMatch(/bg-\S+ text-\S+ ring-\S+/);
            expect(cor, nome).toMatch(/^#[0-9a-f]{6}$/i);
        }
    });

    it("inclui Pagamentos de Terceiros, que antes ficava sem cor", () => {
        expect(categoriaGasto("Pagamentos de Terceiros").etiqueta).toContain("bg-teal-100");
    });
});

describe("categoriaGasto", () => {
    it("retorna os dados da categoria conhecida", () => {
        expect(categoriaGasto("Internet")).toEqual(CATEGORIAS_GASTO.find((c) => c.nome === "Internet"));
    });

    it("retorna estilo neutro mantendo o nome da categoria desconhecida", () => {
        expect(categoriaGasto("Nova")).toEqual({ nome: "Nova", etiqueta: expect.stringContaining("text-gray-500"), cor: "#d1d5db" });
    });
});
