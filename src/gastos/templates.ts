/**
 * Templates HTML da tela de gastos.
 *
 * Funções puras: recebem dados e devolvem strings de HTML, sem consultar nem
 * alterar o DOM. Eventos e renderização ficam na ui.ts.
 */
import type { Gasto } from "./type.ts";
import { CATEGORIAS_GASTO, categoriaGasto } from "./categorias.ts";
import { escaparHTML } from "../dom.ts";
import { templateFiltros } from "../filtros.js";

const formatoMoeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const ICONE_CALENDARIO = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
const ICONE_EDITAR = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2.5 2.5 0 113.536 3.536L12.536 16.536 8 18l1-4.464z"/></svg>`;
const ICONE_EXCLUIR = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>`;
const ICONE_VAZIO = `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l2 2 4-4M7 3h10a2 2 0 012 2v16l-3-2-2 2-2-2-2 2-2-2-3 2V5a2 2 0 012-2z"/></svg>`;

function templateCabecalho(): string {
  return `
  <header class="bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-[#9F0712] p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
    <div class="flex-1 min-w-0">
      <h1 class="text-2xl font-semibold text-gray-800">Gastos</h1>
      <div class="relative mt-1 flex items-center gap-1 text-sm text-gray-500">
        <span>Período:</span>
        <button
          type="button"
          id="btn-abrir-calendario"
          aria-label="Escolher mês"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-medium text-[#9F0712] hover:bg-red-50 transition-colors"
        >
          ${ICONE_CALENDARIO}
          <span id="texto-mes-atual">Mês atual</span>
        </button>
        <input
          type="month"
          id="input-filtro-mes"
          class="absolute left-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
        />
      </div>
    </div>

    <div class="sm:text-right">
      <p class="text-xs font-medium uppercase tracking-wide text-gray-500">Total no período</p>
      <p id="total-Gasto" class="text-2xl md:text-3xl font-bold text-[#9F0712] tabular-nums">R$ 0,00</p>
    </div>

    <button
      type="button"
      id="btn-nova-gastos"
      class="shrink-0 px-5 py-2.5 rounded-xl bg-[#9F0712] hover:bg-red-800 active:scale-95 text-white font-medium shadow-sm transition"
    >
      + Novo Gasto
    </button>
  </header>
  `;
}

function templateLista(): string {
  return `
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
      <span class="col-span-4">Categoria</span>
      <span class="col-span-3">Descrição</span>
      <span class="col-span-2">Data</span>
      <span class="col-span-2 text-right">Valor</span>
      <span class="col-span-1"><span class="sr-only">Ações</span></span>
    </div>
    <div id="container-lista-gastos" class="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto"></div>
  </div>
  `;
}

function templateCampoErro(campo: string): string {
  return `<p data-erro-para="${campo}" class="hidden mt-1 text-xs text-red-600"></p>`;
}

function templateModal(): string {
  const opcoes = CATEGORIAS_GASTO.map(
    ({ nome }) => `<option value="${escaparHTML(nome)}">${escaparHTML(nome)}</option>`,
  ).join("");

  return `
  <div id="fundo-escuro" class="hidden fixed inset-0 z-50 bg-black/50 fundo-animado">
    <div id="formulario-cadastro-gastos" class="w-full h-full flex items-center justify-center p-4">
      <form
        novalidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-gasto"
        class="painel-animado w-full max-w-md max-h-full overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <div class="flex items-start justify-between gap-4 mb-5">
          <h2 id="titulo-modal-gasto" class="text-xl font-semibold text-gray-800">Novo gasto</h2>
          <button
            type="button"
            id="btn-fechar-modal"
            aria-label="Fechar"
            class="-mt-1 -mr-2 w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-2xl leading-none"
          >&times;</button>
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <label for="inputCategoria" class="block mb-1 text-sm font-medium text-gray-700">Categoria</label>
            <select id="inputCategoria" class="campo">
              <option disabled selected value="">Selecione uma opção</option>
              ${opcoes}
            </select>
            ${templateCampoErro("categoria")}
          </div>

          <div>
            <label for="inputValor" class="block mb-1 text-sm font-medium text-gray-700">Valor</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">R$</span>
              <input type="number" step="0.01" min="0" inputmode="decimal" id="inputValor" class="campo pl-9" placeholder="0,00" />
            </div>
            ${templateCampoErro("valor")}
          </div>

          <div>
            <label for="inputData" class="block mb-1 text-sm font-medium text-gray-700">Data do gasto</label>
            <input type="date" id="inputData" class="campo" />
            ${templateCampoErro("data")}
          </div>

          <div>
            <label for="inputDescricao" class="block mb-1 text-sm font-medium text-gray-700">
              Descrição <span class="font-normal text-gray-400">(opcional)</span>
            </label>
            <input type="text" id="inputDescricao" class="campo" placeholder="Ex.: conta de outubro" />
            ${templateCampoErro("descricao")}
          </div>
        </div>

        <div class="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <button
            type="button"
            id="btn-model-cancelar"
            class="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >Cancelar</button>
          <button
            type="submit"
            id="btn-model-cadastrar"
            class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#9F0712] hover:bg-red-800 active:scale-95 transition"
          >Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
  `;
}

/** Linha da lista: grade alinhada com o cabeçalho no desktop, cartão empilhado no celular. */
export function templateListaCardsGastos(itens: Gasto): string {
  const { etiqueta } = categoriaGasto(itens.categoria);
  const id = escaparHTML(itens.id);
  const data = itens.data.split("-").reverse().join("/");
  const descricao = itens.descricao
    ? escaparHTML(itens.descricao)
    : `<span class="text-gray-400">Sem descrição</span>`;

  return `
  <div class="px-4 md:px-5 py-3 flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-gray-50 transition-colors">
    <div class="flex items-center justify-between gap-3 md:contents">
      <div class="min-w-0 md:col-span-4 md:order-1">
        <span class="inline-flex max-w-full px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${etiqueta}">
          <span class="truncate">${escaparHTML(itens.categoria)}</span>
        </span>
      </div>
      <div class="shrink-0 font-semibold text-red-700 tabular-nums md:col-span-2 md:order-4 md:text-right">
        ${formatoMoeda.format(itens.valor)}
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 md:contents">
      <div class="min-w-0 flex items-center gap-1.5 text-sm text-gray-500 md:contents">
        <span class="truncate text-gray-700 md:col-span-3 md:order-2">${descricao}</span>
        <span class="md:hidden" aria-hidden="true">·</span>
        <span class="shrink-0 tabular-nums md:col-span-2 md:order-3">${data}</span>
      </div>
      <div class="shrink-0 flex justify-end gap-1 md:col-span-1 md:order-5">
        <button
          type="button"
          data-acao="editar"
          data-id="${id}"
          aria-label="Editar gasto"
          title="Editar"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >${ICONE_EDITAR}</button>
        <button
          type="button"
          data-acao="excluir"
          data-id="${id}"
          aria-label="Excluir gasto"
          title="Excluir"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >${ICONE_EXCLUIR}</button>
      </div>
    </div>
  </div>
  `;
}

/** Exibida quando nenhum gasto passa pelos filtros. */
export function templateListaVazia(): string {
  return `
  <div class="py-14 px-4 flex flex-col items-center text-center">
    <div class="w-16 h-16 rounded-full bg-red-50 text-[#9F0712] flex items-center justify-center">${ICONE_VAZIO}</div>
    <p class="mt-4 font-medium text-gray-700">Nenhum gasto neste período</p>
    <p class="mt-1 text-sm text-gray-500">Cadastre um gasto ou ajuste os filtros acima.</p>
    <button
      type="button"
      data-acao="novo"
      class="mt-4 px-4 py-2 rounded-xl text-sm font-medium text-[#9F0712] bg-red-50 hover:bg-red-100 transition-colors"
    >+ Cadastrar gasto</button>
  </div>
  `;
}

/** Estrutura completa da tela; a lista começa vazia e é preenchida pela ui.ts. */
export function templatesGastos(): string {
  return `
    <section id="tela-gastos" class="tema-gastos w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4">
      ${templateCabecalho()}
      ${templateFiltros("pagar")}
      ${templateLista()}
      ${templateModal()}
    </section>
    `;
}
