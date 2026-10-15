/**
 * Tela de gastos.
 *
 * A GastosUI liga o HTML gerado por templates.ts à GastosLogic: desenha a
 * lista conforme os filtros, mantém o total atualizado e trata as ações do
 * usuário. Todas as buscas no DOM partem do elemento raiz recebido no
 * construtor, e os cliques nos cards são tratados por um único listener
 * (delegação de eventos), que continua válido a cada nova renderização.
 */
import { GastosLogic } from "./logic.ts";
import { ModalGasto, type Validador } from "./modal.ts";
import { validarGasto } from "./validador.ts";
import { templateListaCardsGastos } from "./templates.ts";
import type { Gasto, NovoGasto } from "./type.ts";
import { exigir } from "../dom.ts";
import { gastos, salvarDados } from "../data/store.js";
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
    this.#lista.innerHTML = visiveis.map(templateListaCardsGastos).join("");
    this.#total.textContent = formatoMoeda.format(this.#logic.calcularTotal(visiveis));
  }

  #ligarEventos(): void {
    exigir(this.#raiz, "#btn-nova-gastos").addEventListener("click", () => {
      // Novo gasto já vem com o dia 1º do mês em exibição
      const mes = this.#inputMes.value;
      this.#modal.abrirCadastro(mes ? `${mes}-01` : undefined);
    });

    exigir(this.#raiz, "#btn-abrir-calendario").addEventListener("click", () => this.#inputMes.showPicker());

    this.#inputMes.addEventListener("change", () => {
      // Valor vazio significa que o usuário limpou o seletor: a lista mostra todos os meses.
      this.#textoMes.textContent = this.#inputMes.value ? rotuloDoMes(this.#inputMes.value) : "Selecione um mês";
      this.renderizar();
    });

    this.#lista.addEventListener("click", (evento) => {
      const botao = (evento.target as Element).closest<HTMLElement>("[data-acao]");
      if (!botao) return;

      const gasto = this.#logic.obterTodos().find((g) => String(g.id) === botao.dataset.id);
      if (!gasto) return;

      if (botao.dataset.acao === "editar") this.#modal.abrirEdicao(gasto);
      if (botao.dataset.acao === "excluir") this.#excluir(gasto);
    });
  }

  #definirMes(mesISO: string): void {
    this.#inputMes.value = mesISO;
    this.#textoMes.textContent = rotuloDoMes(mesISO);
  }

  #salvar(dados: NovoGasto, idEmEdicao: Gasto["id"] | null): void {
    if (idEmEdicao !== null) {
      this.#logic.editar(idEmEdicao, dados);
    } else {
      this.#logic.adicionar(dados);
    }

    // Mostra o mês do gasto salvo e remove filtros que poderiam escondê-lo.
    this.#definirMes(dados.data.slice(0, 7));
    limparFiltrosExtras();
    this.renderizar();
  }

  #excluir(gasto: Gasto): void {
    const data = gasto.data.split("-").reverse().join("/");
    if (!confirm(`Excluir "${gasto.categoria}" de ${data}?`)) return;

    this.#logic.excluir(gasto.id);
    this.renderizar();
  }
}

// Ponto de entrada usado pelo main.js. A criação da GastosLogic e a persistência
// ficam aqui até serem movidas para o main (passo 4).
export function inicializarGastos(): void {
  const logic = new GastosLogic(gastos, (listaAtualizada) => {
    gastos.length = 0;
    gastos.push(...listaAtualizada);
    salvarDados();
  });

  new GastosUI(exigir(document, "#tela-gastos"), logic, validarGasto).montar();
}
