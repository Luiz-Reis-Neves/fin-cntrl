/**
 * Tela de gastos.
 *
 * A GastosUI liga o HTML gerado por templates.ts à GastosLogic: desenha a
 * lista conforme os filtros, mantém o total atualizado e trata as ações do
 * usuário. Todas as buscas no DOM partem do elemento raiz recebido no
 * construtor, e os cliques nos cards são tratados por um único listener
 * (delegação de eventos), que continua válido a cada nova renderização.
 */
import type { GastosLogic } from "./logic.ts";
import { ModalGasto, type Validador } from "./modal.ts";
import { templateListaCardsGastos, templateListaVazia } from "./templates.ts";
import type { Gasto, NovoGasto } from "./type.ts";
import { exigir } from "../dom.ts";
import { confirmar, notificar } from "../feedback.ts";
import { lerFiltros, aplicarFiltros, iniciarFiltros, limparFiltrosExtras } from "../filtros.js";

const formatoMoeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

// "2026-04" -> "04/2026"
function rotuloDoMes(mesISO: string): string {
  const [ano, mes] = mesISO.split("-");
  return `${mes}/${ano}`;
}

function mesAtualISO(): string {
  const hoje = new Date();
  return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
}

export class GastosUI {
  #logic: GastosLogic;
  #modal: ModalGasto;
  #raiz: HTMLElement;
  #lista: HTMLElement;
  #total: HTMLElement;
  #inputMes: HTMLInputElement;
  #textoMes: HTMLElement;

  /** @param raiz Elemento que contém o HTML de templatesGastos(). */
  constructor(raiz: HTMLElement, logic: GastosLogic, validar: Validador) {
    this.#raiz = raiz;
    this.#logic = logic;
    this.#lista = exigir(raiz, "#container-lista-gastos");
    this.#total = exigir(raiz, "#total-Gasto");
    this.#inputMes = exigir(raiz, "#input-filtro-mes");
    this.#textoMes = exigir(raiz, "#texto-mes-atual");
    this.#modal = new ModalGasto(exigir(raiz, "#fundo-escuro"), validar, (dados, id) => this.#salvar(dados, id));
  }

  /** Liga os eventos e faz a primeira renderização, já filtrada pelo mês atual. */
  montar(): void {
    // Precisa vir antes do listener de mês: o filtros.js limpa o período
    // personalizado no mesmo evento, e a lista só deve ser lida depois disso.
    iniciarFiltros(() => this.renderizar());
    this.#ligarEventos();
    this.#definirMes(mesAtualISO());
    this.renderizar();
  }

  renderizar(): void {
    const visiveis = aplicarFiltros(this.#logic.obterTodos(), lerFiltros()) as Gasto[];
    this.#lista.innerHTML = visiveis.length > 0 ? visiveis.map(templateListaCardsGastos).join("") : templateListaVazia();
    this.#total.textContent = formatoMoeda.format(this.#logic.calcularTotal(visiveis));
  }

  #ligarEventos(): void {
    exigir(this.#raiz, "#btn-nova-gastos").addEventListener("click", () => this.#abrirCadastro());

    exigir(this.#raiz, "#btn-abrir-calendario").addEventListener("click", () => this.#inputMes.showPicker());

    this.#inputMes.addEventListener("change", () => {
      // Valor vazio significa que o usuário limpou o seletor: a lista mostra todos os meses.
      this.#textoMes.textContent = this.#inputMes.value ? rotuloDoMes(this.#inputMes.value) : "Selecione um mês";
      this.renderizar();
    });

    this.#lista.addEventListener("click", (evento) => {
      const botao = (evento.target as Element).closest<HTMLElement>("[data-acao]");
      if (!botao) return;
      if (botao.dataset.acao === "novo") return this.#abrirCadastro();

      const gasto = this.#logic.obterTodos().find((g) => String(g.id) === botao.dataset.id);
      if (!gasto) return;

      if (botao.dataset.acao === "editar") this.#modal.abrirEdicao(gasto);
      if (botao.dataset.acao === "excluir") void this.#excluir(gasto);
    });
  }

  // Novo gasto já vem com o dia 1º do mês em exibição
  #abrirCadastro(): void {
    const mes = this.#inputMes.value;
    this.#modal.abrirCadastro(mes ? `${mes}-01` : undefined);
  }

  #definirMes(mesISO: string): void {
    this.#inputMes.value = mesISO;
    this.#textoMes.textContent = rotuloDoMes(mesISO);
  }

  #salvar(dados: NovoGasto, idEmEdicao: Gasto["id"] | null): void {
    if (idEmEdicao !== null) {
      this.#logic.editar(idEmEdicao, dados);
      notificar("Gasto atualizado.");
    } else {
      this.#logic.adicionar(dados);
      notificar("Gasto cadastrado.");
    }

    // Mostra o mês do gasto salvo e remove filtros que poderiam escondê-lo.
    this.#definirMes(dados.data.slice(0, 7));
    limparFiltrosExtras();
    this.renderizar();
  }

  async #excluir(gasto: Gasto): Promise<void> {
    const data = gasto.data.split("-").reverse().join("/");
    const confirmado = await confirmar(`"${gasto.categoria}" de ${data} será removido. Esta ação não pode ser desfeita.`, {
      titulo: "Excluir gasto?",
      textoConfirmar: "Excluir",
      perigoso: true,
    });
    if (!confirmado) return;

    this.#logic.excluir(gasto.id);
    this.renderizar();
    notificar("Gasto excluído.");
  }
}
