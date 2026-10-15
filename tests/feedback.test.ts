// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { confirmar, notificar } from "../src/feedback.ts";

const itens = () => [...document.querySelectorAll<HTMLElement>("#notificacoes [role]")];
const dialogo = () => document.querySelector<HTMLElement>("#dialogo-confirmacao");
const clicar = (seletor: string) => document.querySelector<HTMLElement>(seletor)!.click();

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    vi.useRealTimers();
});

describe("notificar", () => {
    it("mostra a mensagem com o papel de status por padrão", () => {
        notificar("Gasto salvo.");

        expect(itens()).toHaveLength(1);
        expect(itens()[0].textContent).toContain("Gasto salvo.");
        expect(itens()[0].getAttribute("role")).toBe("status");
        expect(itens()[0].className).toContain("bg-green-700");
    });

    it("usa role=alert e cor vermelha para erros", () => {
        notificar("Falhou.", "erro");

        expect(itens()[0].getAttribute("role")).toBe("alert");
        expect(itens()[0].className).toContain("bg-red-700");
    });

    it("reaproveita o mesmo container para várias notificações", () => {
        notificar("Um", "info");
        notificar("Dois");

        expect(document.querySelectorAll("#notificacoes")).toHaveLength(1);
        expect(itens()).toHaveLength(2);
    });

    it("escapa HTML da mensagem", () => {
        notificar("<b>x</b>");

        expect(itens()[0].querySelector("b")).toBeNull();
        expect(itens()[0].textContent).toContain("<b>x</b>");
    });

    it("some sozinha depois de alguns segundos", () => {
        vi.useFakeTimers();
        notificar("Temporária");

        vi.advanceTimersByTime(2900);
        expect(itens()).toHaveLength(1);

        vi.advanceTimersByTime(600);
        expect(itens()).toHaveLength(0);
    });
});

describe("confirmar", () => {
    it("mostra título, mensagem e texto do botão escapados", () => {
        void confirmar("Apagar <tudo>?", { titulo: "<Excluir>", textoConfirmar: "Sim, <apagar>" });

        expect(dialogo()?.querySelector("#confirmacao-titulo")?.textContent).toBe("<Excluir>");
        expect(dialogo()?.textContent).toContain("Apagar <tudo>?");
        expect(dialogo()?.querySelector('[data-resposta="sim"]')?.textContent).toBe("Sim, <apagar>");
    });

    it("usa botão vermelho quando a ação é perigosa", () => {
        void confirmar("x", { perigoso: true });
        expect(dialogo()?.querySelector('[data-resposta="sim"]')?.className).toContain("bg-red-600");
    });

    it("foca o botão de confirmar ao abrir", () => {
        void confirmar("x");
        expect(document.activeElement).toBe(dialogo()?.querySelector('[data-resposta="sim"]'));
    });

    it("resolve true ao confirmar e remove o diálogo", async () => {
        const resposta = confirmar("x");
        clicar('[data-resposta="sim"]');

        await expect(resposta).resolves.toBe(true);
        expect(dialogo()).toBeNull();
    });

    it("resolve false ao cancelar", async () => {
        const resposta = confirmar("x");
        clicar('[data-resposta="nao"]');

        await expect(resposta).resolves.toBe(false);
    });

    it("resolve false com a tecla Esc", async () => {
        const resposta = confirmar("x");
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

        await expect(resposta).resolves.toBe(false);
        expect(dialogo()).toBeNull();
    });

    it("ignora outras teclas", () => {
        void confirmar("x");
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

        expect(dialogo()).not.toBeNull();
    });

    it("resolve false ao clicar no fundo, mas não ao clicar no texto do diálogo", async () => {
        const resposta = confirmar("x");
        clicar("#confirmacao-titulo");
        expect(dialogo()).not.toBeNull();

        dialogo()!.click();
        await expect(resposta).resolves.toBe(false);
    });
});
