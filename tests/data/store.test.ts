// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { carregarDados, gastos, rendas } from "../../src/data/store.js";
import { GastosLogic } from "../../src/gastos/logic.ts";

beforeEach(() => {
    localStorage.clear();
    gastos.length = 0;
    rendas.length = 0;
});

describe("carregarDados", () => {
    it("converte para número valores gravados como texto por versões antigas", () => {
        localStorage.setItem("meusGastos", JSON.stringify([
            { id: 1, categoria: "Internet", valor: 100, data: "2026-10-05", descricao: "" },
            { id: 2, categoria: "Conta de Luz", valor: "99.78", data: "2026-10-06", descricao: "" },
        ]));
        localStorage.setItem("minhasRendas", JSON.stringify([
            { id: 3, categoria: "Salário", valor: "3000", data: "2026-10-05", descricao: "" },
        ]));

        carregarDados();

        expect(gastos.map((g) => g.valor)).toEqual([100, 99.78]);
        expect(rendas.map((r) => r.valor)).toEqual([3000]);
    });

    it("garante que o total some em vez de concatenar texto", () => {
        localStorage.setItem("meusGastos", JSON.stringify([
            { id: 1, categoria: "Internet", valor: 100, data: "2026-10-05", descricao: "" },
            { id: 2, categoria: "Conta de Luz", valor: "99.78", data: "2026-10-06", descricao: "" },
        ]));

        carregarDados();

        expect(new GastosLogic(gastos).calcularTotal()).toBeCloseTo(199.78);
    });

    it("ignora dados corrompidos sem lançar erro", () => {
        localStorage.setItem("meusGastos", "{corrompido");

        expect(() => carregarDados()).not.toThrow();
        expect(gastos).toEqual([]);
    });
});
