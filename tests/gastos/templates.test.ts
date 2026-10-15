// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { templateListaCardsGastos, templateListaVazia, templatesGastos } from "../../src/gastos/templates.ts";
import { CATEGORIAS_GASTO, categoriaGasto } from "../../src/gastos/categorias.ts";
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

    it("aplica a cor da categoria definida em categorias.ts", () => {
        const etiqueta = renderizar(templateListaCardsGastos(gasto)).querySelector("span.rounded-full");

        expect(etiqueta?.className).toContain(categoriaGasto("Internet").etiqueta);
    });

    it("usa cor neutra para categoria desconhecida", () => {
        const etiqueta = renderizar(templateListaCardsGastos({ ...gasto, categoria: "Nova" })).querySelector(
            "span.rounded-full",
        );

        expect(etiqueta?.className).toContain("text-gray-500");
    });

    it("indica quando o gasto não tem descrição", () => {
        const texto = renderizar(templateListaCardsGastos({ ...gasto, descricao: "" })).textContent;

        expect(texto).toContain("Sem descrição");
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

    it("oferece no formulário exatamente as categorias de categorias.ts", () => {
        const opcoes = [...renderizar(templatesGastos()).querySelectorAll<HTMLOptionElement>("#inputCategoria option:not([disabled])")];

        expect(opcoes.map((o) => o.value)).toEqual(CATEGORIAS_GASTO.map((c) => c.nome));
    });

    it("tem um espaço de mensagem de erro para cada campo do formulário", () => {
        const tela = renderizar(templatesGastos());

        for (const campo of ["categoria", "valor", "data", "descricao"]) {
            expect(tela.querySelector(`[data-erro-para="${campo}"]`), campo).not.toBeNull();
        }
    });

    it("começa com a lista vazia e o modal oculto", () => {
        const tela = renderizar(templatesGastos());

        expect(tela.querySelector("#container-lista-gastos")?.children).toHaveLength(0);
        expect(tela.querySelector("#fundo-escuro")?.classList.contains("hidden")).toBe(true);
    });
});

describe("templateListaVazia", () => {
    it("mostra a mensagem e um botão que pede um novo cadastro", () => {
        const vazia = renderizar(templateListaVazia());

        expect(vazia.textContent).toContain("Nenhum gasto neste período");
        expect(vazia.querySelector('[data-acao="novo"]')).not.toBeNull();
    });
});
