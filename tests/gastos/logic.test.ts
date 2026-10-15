import { describe, it, expect, vi, afterEach } from "vitest";
import { GastosLogic } from "../../src/gastos/logic.ts";
import type { Gasto, NovoGasto } from "../../src/gastos/type.ts";

const internet: Gasto = { id: 1, categoria: "Internet", valor: 100, data: "2026-10-05", descricao: "fibra" };
const mercado: Gasto = { id: 2, categoria: "Supermercado", valor: 350.5, data: "2026-10-10", descricao: "compras" };
const luz: Gasto = { id: 3, categoria: "Conta de Luz", valor: 80, data: "2026-10-15", descricao: "" };

const novoGasto: NovoGasto = { categoria: "Combustível", valor: 200, data: "2026-10-20", descricao: "posto" };

afterEach(() => {
    vi.restoreAllMocks();
});

describe("GastosLogic", () => {
    describe("constructor", () => {
        it("não é afetado por alterações na lista original", () => {
            const original = [{ ...internet }];
            const logic = new GastosLogic(original);

            original.push(mercado);
            original[0].valor = 999;

            expect(logic.obterTodos()).toEqual([internet]);
        });

        it("funciona sem callback aoAlterar", () => {
            const logic = new GastosLogic([]);
            expect(() => logic.adicionar(novoGasto)).not.toThrow();
        });
    });

    describe("obterTodos", () => {
        it("retorna os gastos na ordem de cadastro", () => {
            const logic = new GastosLogic([internet, mercado, luz]);
            expect(logic.obterTodos()).toEqual([internet, mercado, luz]);
        });

        it("retorna cópias que não alteram o estado interno", () => {
            const logic = new GastosLogic([internet]);

            const lista = logic.obterTodos();
            lista[0].valor = 0;
            lista.push(mercado);

            expect(logic.obterTodos()).toEqual([internet]);
        });
    });

    describe("adicionar", () => {
        it("cria o gasto com id baseado no horário", () => {
            vi.spyOn(Date, "now").mockReturnValue(1234);
            const logic = new GastosLogic([internet]);

            const criado = logic.adicionar(novoGasto);

            expect(criado).toEqual({ id: 1234, ...novoGasto });
            expect(logic.obterTodos()).toEqual([internet, { id: 1234, ...novoGasto }]);
        });

        it("retorna uma cópia do gasto criado", () => {
            const logic = new GastosLogic([]);

            const criado = logic.adicionar(novoGasto);
            criado.valor = 0;

            expect(logic.obterTodos()[0].valor).toBe(200);
        });

        it("notifica a lista atualizada", () => {
            vi.spyOn(Date, "now").mockReturnValue(1234);
            const aoAlterar = vi.fn();
            const logic = new GastosLogic([internet], aoAlterar);

            logic.adicionar(novoGasto);

            expect(aoAlterar).toHaveBeenCalledOnce();
            expect(aoAlterar).toHaveBeenCalledWith([internet, { id: 1234, ...novoGasto }]);
        });
    });

    describe("editar", () => {
        it("substitui os dados e mantém o id", () => {
            const logic = new GastosLogic([internet, mercado]);

            expect(logic.editar(1, novoGasto)).toBe(true);
            expect(logic.obterTodos()).toEqual([{ id: 1, ...novoGasto }, mercado]);
        });

        it("encontra o gasto mesmo com id em tipo diferente e preserva o id armazenado", () => {
            const logic = new GastosLogic([{ ...internet, id: "1" }]);

            expect(logic.editar(1, novoGasto)).toBe(true);
            expect(logic.obterTodos()[0].id).toBe("1");
        });

        it("retorna false e não altera nada quando o id não existe", () => {
            const aoAlterar = vi.fn();
            const logic = new GastosLogic([internet], aoAlterar);

            expect(logic.editar(999, novoGasto)).toBe(false);
            expect(logic.obterTodos()).toEqual([internet]);
            expect(aoAlterar).not.toHaveBeenCalled();
        });

        it("notifica a lista atualizada", () => {
            const aoAlterar = vi.fn();
            const logic = new GastosLogic([internet], aoAlterar);

            logic.editar(1, novoGasto);

            expect(aoAlterar).toHaveBeenCalledWith([{ id: 1, ...novoGasto }]);
        });
    });

    describe("excluir", () => {
        it("remove apenas o gasto informado", () => {
            const logic = new GastosLogic([internet, mercado, luz]);

            expect(logic.excluir(2)).toBe(true);
            expect(logic.obterTodos()).toEqual([internet, luz]);
        });

        it("aceita id em tipo diferente do armazenado", () => {
            const logic = new GastosLogic([{ ...internet, id: "1" }]);

            expect(logic.excluir(1)).toBe(true);
            expect(logic.obterTodos()).toEqual([]);
        });

        it("não remove o último item quando o id não existe", () => {
            const aoAlterar = vi.fn();
            const logic = new GastosLogic([internet, mercado], aoAlterar);

            expect(logic.excluir(999)).toBe(false);
            expect(logic.obterTodos()).toEqual([internet, mercado]);
            expect(aoAlterar).not.toHaveBeenCalled();
        });

        it("notifica a lista atualizada", () => {
            const aoAlterar = vi.fn();
            const logic = new GastosLogic([internet, mercado], aoAlterar);

            logic.excluir(1);

            expect(aoAlterar).toHaveBeenCalledWith([mercado]);
        });
    });

    describe("calcularTotal", () => {
        it("soma todos os gastos quando nenhuma lista é informada", () => {
            const logic = new GastosLogic([internet, mercado, luz]);
            expect(logic.calcularTotal()).toBe(530.5);
        });

        it("soma apenas a lista informada", () => {
            const logic = new GastosLogic([internet, mercado, luz]);
            expect(logic.calcularTotal([internet, luz])).toBe(180);
        });

        it("retorna zero para lista vazia", () => {
            const logic = new GastosLogic([]);
            expect(logic.calcularTotal()).toBe(0);
        });
    });
});
