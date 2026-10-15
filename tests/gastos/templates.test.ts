// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { templateListaCardsGastos, templatesGastos } from "../../src/gastos/templates.ts";
import type { Gasto } from "../../src/gastos/type.ts";

const gasto: Gasto = { id: 7, categoria: "Internet", valor: 1234.5, data: "2026-10-05", descricao: "fibra" };

// Converte o HTML gerado em elementos para as asserções não dependerem de espaços e quebras de linha
function renderizar(html: string): HTMLElement {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div;
}

describe("templateListaCardsGastos", () => {
    it("exibe valor em reais, data no formato brasileiro e descrição", () => {
        const texto = renderizar(templateListaCardsGastos(gasto)).textContent?.replace(/\s+/g, " ");

        expect(texto).toContain("Internet");
        expect(texto).toContain("R$ 1.234,50");
        expect(texto).toContain("05/10/2026");
        expect(texto).toContain("fibra");
    });

    it("identifica os botões de ação pelo id do gasto", () => {
        const card = renderizar(templateListaCardsGastos(gasto));

        const editar = card.querySelector<HTMLButtonElement>('[data-acao="editar"]');
        const excluir = card.querySelector<HTMLButtonElement>('[data-acao="excluir"]');

        expect(editar?.dataset.id).toBe("7");
        expect(excluir?.dataset.id).toBe("7");
        expect(editar?.type).toBe("button");
        expect(excluir?.getAttribute("aria-label")).toBe("Excluir gasto");
    });

    it("escapa HTML digitado pelo usuário", () => {
        const card = renderizar(templateListaCardsGastos({ ...gasto, descricao: "<img src=x onerror=alert(1)>" }));

        expect(card.querySelector("img[onerror]")).toBeNull();
        expect(card.textContent).toContain("<img src=x onerror=alert(1)>");
    });

    it("escapa um id que não seja numérico", () => {
        const card = renderizar(templateListaCardsGastos({ ...gasto, id: `"x"` }));

        expect(card.querySelector<HTMLElement>('[data-acao="editar"]')?.dataset.id).toBe(`"x"`);
    });

    it("aplica a cor da categoria", () => {
        const etiqueta = renderizar(templateListaCardsGastos(gasto)).querySelector("span");

        expect(etiqueta?.className).toContain("bg-sky-200");
    });

    it("usa cor neutra para categoria desconhecida", () => {
        const etiqueta = renderizar(templateListaCardsGastos({ ...gasto, categoria: "Nova" })).querySelector("span");

        expect(etiqueta?.className).toContain("text-gray-400");
    });
});

describe("templatesGastos", () => {
    it("monta a tela com os elementos usados pela GastosUI e pela ModalGasto", () => {
        const tela = renderizar(templatesGastos());

        for (const seletor of [
            "#tela-gastos",
            "#container-lista-gastos",
            "#total-Gasto",
            "#input-filtro-mes",
            "#texto-mes-atual",
            "#btn-nova-gastos",
            "#btn-abrir-calendario",
            "#fundo-escuro",
            "#filtro-ordem",
        ]) {
            expect(tela.querySelector(seletor), seletor).not.toBeNull();
        }
    });

    it("começa com a lista vazia e o modal oculto", () => {
        const tela = renderizar(templatesGastos());

        expect(tela.querySelector("#container-lista-gastos")?.children).toHaveLength(0);
        expect(tela.querySelector("#fundo-escuro")?.classList.contains("hidden")).toBe(true);
    });
});
