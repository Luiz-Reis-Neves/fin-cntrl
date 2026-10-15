// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { ModalGasto } from "../../src/gastos/modal.ts";
import { templatesGastos } from "../../src/gastos/templates.ts";
import { validarGasto } from "../../src/gastos/validador.ts";
import type { Gasto, NovoGasto } from "../../src/gastos/type.ts";

const gasto: Gasto = { id: 7, categoria: "Internet", valor: 100, data: "2026-10-05", descricao: "fibra" };

const $ = <T extends Element = HTMLInputElement>(seletor: string) => document.querySelector(seletor) as T;
const clicar = (seletor: string) => $<HTMLElement>(seletor).click();
const estaAberto = () => !$("#fundo-escuro").classList.contains("hidden");
const camposEmVermelho = () =>
    ["#inputCategoria", "#inputValor", "#inputData", "#inputDescricao"].filter((s) =>
        $(s).classList.contains("border-red-500"),
    );

// Mensagens de erro visíveis, por campo
const mensagensVisiveis = () =>
    Object.fromEntries(
        [...document.querySelectorAll<HTMLElement>("[data-erro-para]:not(.hidden)")].map((p) => [
            p.dataset.erroPara,
            p.textContent,
        ]),
    );

function preencher(campos: Partial<Record<"categoria" | "valor" | "data" | "descricao", string>>) {
    if (campos.categoria !== undefined) $<HTMLSelectElement>("#inputCategoria").value = campos.categoria;
    if (campos.valor !== undefined) $("#inputValor").value = campos.valor;
    if (campos.data !== undefined) $("#inputData").value = campos.data;
    if (campos.descricao !== undefined) $("#inputDescricao").value = campos.descricao;
}

let aoSalvar: Mock<(dados: NovoGasto, idEmEdicao: Gasto["id"] | null) => void>;
let modal: ModalGasto;

beforeEach(() => {
    document.body.innerHTML = templatesGastos();
    aoSalvar = vi.fn();
    modal = new ModalGasto($<HTMLElement>("#fundo-escuro"), validarGasto, aoSalvar);
    vi.stubGlobal("alert", vi.fn());
});

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("ModalGasto", () => {
    it("falha na criação se o modal não tiver os campos esperados", () => {
        const vazio = document.createElement("div");
        expect(() => new ModalGasto(vazio, validarGasto, aoSalvar)).toThrow('"#inputCategoria"');
    });

    describe("cadastro", () => {
        it("abre com a data sugerida e o botão Cadastrar", () => {
            modal.abrirCadastro("2026-10-01");

            expect(estaAberto()).toBe(true);
            expect($("#inputData").value).toBe("2026-10-01");
            expect($("#btn-model-cadastrar").textContent).toBe("Cadastrar");
        });

        it("abre sem data quando nenhuma é sugerida", () => {
            modal.abrirCadastro();
            expect($("#inputData").value).toBe("");
        });

        it("entrega os dados com valor numérico e id nulo, e fecha", () => {
            modal.abrirCadastro();
            preencher({ categoria: "Combustível", valor: "200.5", data: "2026-10-20", descricao: "posto" });
            clicar("#btn-model-cadastrar");

            expect(aoSalvar).toHaveBeenCalledWith(
                { categoria: "Combustível", valor: 200.5, data: "2026-10-20", descricao: "posto" },
                null,
            );
            expect(estaAberto()).toBe(false);
        });
    });

    describe("edição", () => {
        it("preenche os campos com o gasto e troca o texto do botão", () => {
            modal.abrirEdicao(gasto);

            expect($<HTMLSelectElement>("#inputCategoria").value).toBe("Internet");
            expect($("#inputValor").value).toBe("100");
            expect($("#inputData").value).toBe("2026-10-05");
            expect($("#inputDescricao").value).toBe("fibra");
            expect($("#btn-model-cadastrar").textContent).toBe("Salvar alterações");
            expect($("#titulo-modal-gasto").textContent).toBe("Editar gasto");
        });

        it("entrega os dados com o id do gasto em edição", () => {
            modal.abrirEdicao(gasto);
            preencher({ valor: "150" });
            clicar("#btn-model-cadastrar");

            expect(aoSalvar).toHaveBeenCalledWith(
                { categoria: "Internet", valor: 150, data: "2026-10-05", descricao: "fibra" },
                7,
            );
        });

        it("esquece a edição ao cancelar, e o próximo envio é um cadastro", () => {
            modal.abrirEdicao(gasto);
            clicar("#btn-model-cancelar");

            modal.abrirCadastro("2026-10-01");
            preencher({ categoria: "Internet", valor: "10" });
            clicar("#btn-model-cadastrar");

            expect(aoSalvar).toHaveBeenCalledWith(expect.anything(), null);
        });
    });

    describe("validação", () => {
        it("não entrega dados inválidos e mantém o modal aberto", () => {
            modal.abrirCadastro();
            clicar("#btn-model-cadastrar");

            expect(aoSalvar).not.toHaveBeenCalled();
            expect(estaAberto()).toBe(true);
        });

        it("mostra cada mensagem embaixo do seu campo, sem alert, e destaca os campos", () => {
            modal.abrirCadastro();
            clicar("#btn-model-cadastrar");

            expect(mensagensVisiveis()).toEqual({
                categoria: "Preencha o campo categoria",
                valor: "Preencha o campo valor",
                data: "Preencha o campo data",
            });
            expect(camposEmVermelho()).toEqual(["#inputCategoria", "#inputValor", "#inputData"]);
            expect($("#inputValor").getAttribute("aria-invalid")).toBe("true");
            expect(alert).not.toHaveBeenCalled();
        });

        it("coloca o foco no primeiro campo com erro", () => {
            modal.abrirCadastro("2026-10-01");
            preencher({ categoria: "Internet" });
            clicar("#btn-model-cadastrar");

            expect(document.activeElement).toBe($("#inputValor"));
        });

        it("remove o destaque dos campos corrigidos na nova tentativa", () => {
            modal.abrirCadastro("2026-10-01");
            preencher({ valor: "0" });
            clicar("#btn-model-cadastrar");
            expect(camposEmVermelho()).toEqual(["#inputCategoria", "#inputValor"]);

            preencher({ categoria: "Internet" });
            clicar("#btn-model-cadastrar");
            expect(camposEmVermelho()).toEqual(["#inputValor"]);
        });

        it("usa o validador injetado", () => {
            const validar = vi.fn(() => [{ campo: "descricao" as const, mensagem: "Descrição obrigatória" }]);
            document.body.innerHTML = templatesGastos();
            const comRegraPropria = new ModalGasto($<HTMLElement>("#fundo-escuro"), validar, aoSalvar);

            comRegraPropria.abrirCadastro();
            clicar("#btn-model-cadastrar");

            expect(validar).toHaveBeenCalledOnce();
            expect(mensagensVisiveis()).toEqual({ descricao: "Descrição obrigatória" });
            expect(camposEmVermelho()).toEqual(["#inputDescricao"]);
        });
    });

    describe("fechar", () => {
        it("limpa campos, destaques e volta o botão para Cadastrar", () => {
            modal.abrirEdicao(gasto);
            preencher({ valor: "" });
            clicar("#btn-model-cadastrar");
            clicar("#btn-model-cancelar");

            expect(estaAberto()).toBe(false);
            expect($("#inputValor").value).toBe("");
            expect($("#inputDescricao").value).toBe("");
            expect(camposEmVermelho()).toEqual([]);
            expect(mensagensVisiveis()).toEqual({});
            expect($("#btn-model-cadastrar").textContent).toBe("Cadastrar");
            expect($("#titulo-modal-gasto").textContent).toBe("Novo gasto");
        });

        it("fecha pelo botão X", () => {
            modal.abrirCadastro();
            clicar("#btn-fechar-modal");
            expect(estaAberto()).toBe(false);
        });

        it("fecha com a tecla Esc", () => {
            modal.abrirCadastro();
            $("#inputDescricao").dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
            expect(estaAberto()).toBe(false);
        });

        it("ignora outras teclas", () => {
            modal.abrirCadastro();
            $("#inputDescricao").dispatchEvent(new KeyboardEvent("keydown", { key: "a", bubbles: true }));
            expect(estaAberto()).toBe(true);
        });

        it("fecha ao clicar no fundo escurecido, mas não ao clicar no formulário", () => {
            modal.abrirCadastro();
            clicar("#titulo-modal-gasto");
            expect(estaAberto()).toBe(true);

            clicar("#formulario-cadastro-gastos");
            expect(estaAberto()).toBe(false);
        });

        it("devolve o foco para o elemento que estava focado antes de abrir", () => {
            const origem = document.createElement("button");
            document.body.appendChild(origem);
            origem.focus();

            modal.abrirCadastro();
            expect(document.activeElement).toBe($("#inputCategoria"));

            modal.fechar();
            expect(document.activeElement).toBe(origem);
        });
    });

    it("envia pelo submit do formulário (Enter em um campo)", () => {
        modal.abrirCadastro("2026-10-01");
        preencher({ categoria: "Internet", valor: "10" });

        const evento = new Event("submit", { cancelable: true });
        $<HTMLFormElement>("#fundo-escuro form").dispatchEvent(evento);

        expect(evento.defaultPrevented).toBe(true);
        expect(aoSalvar).toHaveBeenCalledOnce();
    });
});
