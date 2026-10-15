// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from "vitest";
import { GastosUI } from "../../src/gastos/ui.ts";
import { GastosLogic } from "../../src/gastos/logic.ts";
import { templatesGastos } from "../../src/gastos/templates.ts";
import { validarGasto } from "../../src/gastos/validador.ts";
import type { Gasto } from "../../src/gastos/type.ts";

// "Hoje" fixo em 14/10/2026 para o filtro de mês ser previsível
const HOJE = new Date(2026, 9, 14);

const internet: Gasto = { id: 1, categoria: "Internet", valor: 100, data: "2026-10-05", descricao: "fibra" };
const mercado: Gasto = { id: 2, categoria: "Supermercado", valor: 350.5, data: "2026-10-10", descricao: "compras" };
const setembro: Gasto = { id: 3, categoria: "Conta de Luz", valor: 80, data: "2026-09-15", descricao: "mês passado" };

const $ = <T extends Element = HTMLInputElement>(seletor: string) => document.querySelector(seletor) as T;
const clicar = (seletor: string) => $<HTMLElement>(seletor).click();
const botao = (acao: "editar" | "excluir", id: Gasto["id"]) => `[data-acao="${acao}"][data-id="${id}"]`;
const idsNaTela = () =>
    [...document.querySelectorAll<HTMLElement>('[data-acao="excluir"]')].map((b) => b.dataset.id);
const totalNaTela = () => $("#total-Gasto").textContent?.replace(/\s/g, " ");

function mudar(seletor: string, valor: string) {
    const campo = $<HTMLInputElement | HTMLSelectElement>(seletor);
    campo.value = valor;
    campo.dispatchEvent(new Event("change"));
}

let aoAlterar: Mock<(gastos: Gasto[]) => void>;
let logic: GastosLogic;

function montarTela(dados: Gasto[]) {
    document.body.innerHTML = templatesGastos();
    aoAlterar = vi.fn();
    logic = new GastosLogic(dados, aoAlterar);
    const tela = new GastosUI($<HTMLElement>("#tela-gastos"), logic, validarGasto);
    tela.montar();
    return tela;
}

beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(HOJE);
    vi.stubGlobal("alert", vi.fn());
    vi.stubGlobal("confirm", vi.fn(() => true));
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

describe("GastosUI", () => {
    it("falha na criação se a raiz não tiver o HTML da tela", () => {
        const vazio = document.createElement("section");
        expect(() => new GastosUI(vazio, new GastosLogic([]), validarGasto)).toThrow('"#container-lista-gastos"');
    });

    describe("montar", () => {
        it("abre no mês atual, mostrando só os gastos dele e o total", () => {
            montarTela([internet, mercado, setembro]);

            expect($("#input-filtro-mes").value).toBe("2026-10");
            expect($("#texto-mes-atual").textContent).toBe("10/2026");
            expect(idsNaTela()).toEqual(["1", "2"]);
            expect(totalNaTela()).toBe("R$ 450,50");
        });

        it("mostra total zerado quando não há gastos no mês", () => {
            montarTela([setembro]);

            expect(idsNaTela()).toEqual([]);
            expect(totalNaTela()).toBe("R$ 0,00");
        });
    });

    describe("filtro de mês", () => {
        it("troca a lista ao escolher outro mês", () => {
            montarTela([internet, mercado, setembro]);

            mudar("#input-filtro-mes", "2026-09");

            expect(idsNaTela()).toEqual(["3"]);
            expect(totalNaTela()).toBe("R$ 80,00");
            expect($("#texto-mes-atual").textContent).toBe("09/2026");
        });

        it("mostra todos os meses quando o seletor é limpo", () => {
            montarTela([internet, mercado, setembro]);

            mudar("#input-filtro-mes", "");

            expect(idsNaTela()).toEqual(["1", "2", "3"]);
            expect($("#texto-mes-atual").textContent).toBe("Selecione um mês");
        });

        it("abre o seletor nativo ao clicar no calendário", () => {
            montarTela([]);
            const showPicker = vi.fn();
            $("#input-filtro-mes").showPicker = showPicker;

            clicar("#btn-abrir-calendario");

            expect(showPicker).toHaveBeenCalledOnce();
        });
    });

    describe("barra de filtros", () => {
        it("redesenha a lista ao mudar categoria e ordenação", () => {
            montarTela([internet, mercado, setembro]);

            mudar("#filtro-ordem", "valor-desc");
            expect(idsNaTela()).toEqual(["2", "1"]);

            mudar("#filtro-categoria", "Internet");
            expect(idsNaTela()).toEqual(["1"]);
            expect(totalNaTela()).toBe("R$ 100,00");
        });
    });

    describe("cadastro", () => {
        it("sugere o dia 1º do mês em exibição", () => {
            montarTela([]);

            clicar("#btn-nova-gastos");

            expect($("#inputData").value).toBe("2026-10-01");
        });

        it("não sugere data quando o seletor de mês está vazio", () => {
            montarTela([]);
            mudar("#input-filtro-mes", "");

            clicar("#btn-nova-gastos");

            expect($("#inputData").value).toBe("");
        });

        it("adiciona pela GastosLogic e leva o filtro para o mês do gasto", () => {
            montarTela([internet]);
            mudar("#filtro-categoria", "Internet");

            clicar("#btn-nova-gastos");
            $<HTMLSelectElement>("#inputCategoria").value = "Combustível";
            $("#inputValor").value = "200";
            $("#inputData").value = "2026-11-03";
            clicar("#btn-model-cadastrar");

            expect(logic.obterTodos()).toHaveLength(2);
            expect(aoAlterar).toHaveBeenCalledOnce();
            expect($("#input-filtro-mes").value).toBe("2026-11");
            expect($("#texto-mes-atual").textContent).toBe("11/2026");
            // o filtro de categoria esconderia o gasto novo, então é limpo
            expect($<HTMLSelectElement>("#filtro-categoria").value).toBe("");
            expect(totalNaTela()).toBe("R$ 200,00");
        });
    });

    describe("ações nos cards (delegação de eventos)", () => {
        it("abre a edição com os dados do gasto e salva a alteração", () => {
            montarTela([internet, mercado]);

            clicar(botao("editar", 1));
            expect($("#inputValor").value).toBe("100");

            $("#inputValor").value = "120.75";
            clicar("#btn-model-cadastrar");

            expect(logic.obterTodos()[0]).toEqual({ ...internet, valor: 120.75 });
            expect(totalNaTela()).toBe("R$ 471,25");
        });

        it("exclui o gasto quando o usuário confirma", () => {
            montarTela([internet, mercado]);

            clicar(botao("excluir", 1));

            expect(confirm).toHaveBeenCalledWith('Excluir "Internet" de 05/10/2026?');
            expect(logic.obterTodos()).toEqual([mercado]);
            expect(idsNaTela()).toEqual(["2"]);
        });

        it("mantém o gasto quando o usuário cancela a exclusão", () => {
            vi.stubGlobal("confirm", vi.fn(() => false));
            montarTela([internet, mercado]);

            clicar(botao("excluir", 1));

            expect(aoAlterar).not.toHaveBeenCalled();
            expect(idsNaTela()).toEqual(["1", "2"]);
        });

        it("funciona ao clicar no ícone dentro do botão", () => {
            montarTela([internet]);

            $(`${botao("excluir", 1)} img`).dispatchEvent(new MouseEvent("click", { bubbles: true }));

            expect(logic.obterTodos()).toEqual([]);
        });

        it("continua com um único listener depois de várias renderizações", () => {
            const tela = montarTela([internet, mercado]);
            tela.renderizar();
            tela.renderizar();

            clicar(botao("excluir", 1));

            expect(confirm).toHaveBeenCalledOnce();
        });

        it("encontra gastos cujo id está armazenado como texto", () => {
            montarTela([{ ...internet, id: "1" }]);

            clicar(botao("editar", "1"));

            expect($("#inputValor").value).toBe("100");
        });

        it("ignora cliques fora dos botões e ids inexistentes", () => {
            montarTela([internet]);
            $("#container-lista-gastos").insertAdjacentHTML(
                "beforeend",
                `<button data-acao="excluir" data-id="999"></button>`,
            );

            clicar("#container-lista-gastos > div span");
            clicar(botao("excluir", 999));

            expect(confirm).not.toHaveBeenCalled();
            expect(aoAlterar).not.toHaveBeenCalled();
        });
    });
});
