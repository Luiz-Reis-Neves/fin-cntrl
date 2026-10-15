import { describe, it, expect } from "vitest";
import { validarGasto } from "../../src/gastos/validador.ts";
import type { FormularioGasto } from "../../src/gastos/type.ts";

const formularioValido: FormularioGasto = {
    categoria: "Internet",
    valor: "99.90",
    data: "2026-10-05",
    descricao: "fibra",
};

describe("validarGasto", () => {
    it("retorna lista vazia para dados válidos", () => {
        expect(validarGasto(formularioValido)).toEqual([]);
    });

    it("não exige descrição", () => {
        expect(validarGasto({ ...formularioValido, descricao: "" })).toEqual([]);
    });

    it("aponta categoria vazia", () => {
        expect(validarGasto({ ...formularioValido, categoria: "" })).toEqual([
            { campo: "categoria", mensagem: "Preencha o campo categoria" },
        ]);
    });

    it("aponta valor vazio", () => {
        expect(validarGasto({ ...formularioValido, valor: "" })).toEqual([
            { campo: "valor", mensagem: "Preencha o campo valor" },
        ]);
    });

    it.each(["0", "-10", "-0.01"])("recusa valor %s", (valor) => {
        expect(validarGasto({ ...formularioValido, valor })).toEqual([
            { campo: "valor", mensagem: "O campo valor tem que ser maior que zero" },
        ]);
    });

    it("aceita centavos", () => {
        expect(validarGasto({ ...formularioValido, valor: "0.01" })).toEqual([]);
    });

    it("aponta data vazia", () => {
        expect(validarGasto({ ...formularioValido, data: "" })).toEqual([
            { campo: "data", mensagem: "Preencha o campo data" },
        ]);
    });

    it("retorna todos os erros de uma vez, na ordem dos campos", () => {
        const erros = validarGasto({ categoria: "", valor: "", data: "", descricao: "" });

        expect(erros.map((erro) => erro.campo)).toEqual(["categoria", "valor", "data"]);
    });
});
