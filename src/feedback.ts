/**
 * Feedback visual compartilhado entre as telas.
 *
 * Substitui alert() e confirm() do navegador por componentes no estilo do app:
 * notificações temporárias no canto da tela e um diálogo de confirmação que
 * devolve uma Promise, para ser usado com await.
 */
import { escaparHTML } from "./dom.ts";

export type TipoNotificacao = "sucesso" | "erro" | "info";

const ESTILO_NOTIFICACAO: Record<TipoNotificacao, { classes: string; icone: string }> = {
  sucesso: { classes: "bg-green-700 text-white", icone: "✓" },
  erro: { classes: "bg-red-700 text-white", icone: "!" },
  info: { classes: "bg-gray-800 text-white", icone: "i" },
};

const DURACAO_MS = 3000;

function containerNotificacoes(): HTMLElement {
  let container = document.getElementById("notificacoes");
  if (!container) {
    container = document.createElement("div");
    container.id = "notificacoes";
    container.setAttribute("aria-live", "polite");
    container.className =
      "fixed z-[60] bottom-4 right-4 left-4 sm:left-auto flex flex-col items-stretch sm:items-end gap-2 pointer-events-none";
    document.body.appendChild(container);
  }
  return container;
}

/** Mostra uma notificação que some sozinha após alguns segundos. */
export function notificar(mensagem: string, tipo: TipoNotificacao = "sucesso"): void {
  const { classes, icone } = ESTILO_NOTIFICACAO[tipo];
  const item = document.createElement("div");
  item.setAttribute("role", tipo === "erro" ? "alert" : "status");
  item.className = `notificacao pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm ${classes}`;
  item.innerHTML = `
    <span class="w-5 h-5 shrink-0 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">${icone}</span>
    <span>${escaparHTML(mensagem)}</span>`;

  containerNotificacoes().appendChild(item);
  setTimeout(() => {
    item.classList.add("notificacao-saindo");
    item.addEventListener("animationend", () => item.remove(), { once: true });
    // garante a remoção mesmo se a animação não rodar (ex.: movimento reduzido)
    setTimeout(() => item.remove(), 400);
  }, DURACAO_MS);
}

export interface OpcoesConfirmacao {
  titulo?: string;
  textoConfirmar?: string;
  perigoso?: boolean;
}

/** Abre um diálogo de confirmação. Resolve `true` se o usuário confirmar. */
export function confirmar(mensagem: string, opcoes: OpcoesConfirmacao = {}): Promise<boolean> {
  const { titulo = "Confirmar", textoConfirmar = "Confirmar", perigoso = false } = opcoes;
  const corBotao = perigoso ? "bg-red-600 hover:bg-red-700" : "bg-green-700 hover:bg-green-800";

  const fundo = document.createElement("div");
  fundo.id = "dialogo-confirmacao";
  fundo.className = "fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4 fundo-animado";
  fundo.innerHTML = `
    <div role="alertdialog" aria-modal="true" aria-labelledby="confirmacao-titulo"
         class="painel-animado w-full max-w-sm bg-white rounded-2xl shadow-xl p-6">
      <h2 id="confirmacao-titulo" class="text-lg font-semibold text-gray-800">${escaparHTML(titulo)}</h2>
      <p class="mt-2 text-sm text-gray-600">${escaparHTML(mensagem)}</p>
      <div class="mt-6 flex justify-end gap-2">
        <button type="button" data-resposta="nao"
                class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Cancelar</button>
        <button type="button" data-resposta="sim"
                class="px-4 py-2 rounded-lg text-sm font-medium text-white ${corBotao}">${escaparHTML(textoConfirmar)}</button>
      </div>
    </div>`;

  document.body.appendChild(fundo);
  const botaoConfirmar = fundo.querySelector<HTMLButtonElement>('[data-resposta="sim"]');
  botaoConfirmar?.focus();

  return new Promise((resolver) => {
    const encerrar = (resposta: boolean) => {
      document.removeEventListener("keydown", aoTeclar);
      fundo.remove();
      resolver(resposta);
    };
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") encerrar(false);
    };

    document.addEventListener("keydown", aoTeclar);
    fundo.addEventListener("click", (evento) => {
      const alvo = evento.target as HTMLElement;
      if (alvo === fundo) return encerrar(false);
      const resposta = alvo.closest<HTMLElement>("[data-resposta]")?.dataset.resposta;
      if (resposta) encerrar(resposta === "sim");
    });
  });
}
