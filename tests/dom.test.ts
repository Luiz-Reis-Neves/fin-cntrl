// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { exigir, escaparHTML } from "../src/dom.ts";

describe("exigir", () => {
    it("retorna o elemento encontrado dentro da raiz", () => {
        const raiz = document.createElement("div");
        raiz.innerHTML = `<span id="alvo">ok</span>`;

        expect(exigir(raiz, "#alvo").textContent).toBe("ok");
    });

    it("lança erro com o seletor quando o elemento não existe", () => {
        const raiz = document.createElement("div");

        expect(() => exigir(raiz, "#inexistente")).toThrow('Elemento "#inexistente" não encontrado');
    });

    it("não encontra elementos fora da raiz", () => {
        document.body.innerHTML = `<div id="fora"></div><section id="raiz"></section>`;
        const raiz = exigir<HTMLElement>(document, "#raiz");

        expect(() => exigir(raiz, "#fora")).toThrow();
    });
});

describe("escaparHTML", () => {
    it("escapa os caracteres especiais de HTML", () => {
        expect(escaparHTML(`<a href="x" title='y'>&</a>`)).toBe(
            "&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;&amp;&lt;/a&gt;",
        );
    });

    it("converte valores que não são texto", () => {
        expect(escaparHTML(42)).toBe("42");
    });

    it.each([null, undefined])("trata %s como texto vazio", (valor) => {
        expect(escaparHTML(valor)).toBe("");
    });
});
