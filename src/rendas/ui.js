import { adicionarRenda, editarRenda, rendasDelete, calcularTotalRenda, validarRenda } from "./logic.js"
import { rendas } from "./../data/store.js"
import { escaparHTML } from "../dom.ts"
import { confirmar, notificar } from "../feedback.ts"
import { templateFiltros, lerFiltros, aplicarFiltros, iniciarFiltros, limparFiltrosExtras } from "../filtros.js"
let rendaEmEdicao = null

const ICONE_CALENDARIO = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`
const ICONE_EDITAR = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.232-6.232a2.5 2.5 0 113.536 3.536L12.536 16.536 8 18l1-4.464z"/></svg>`
const ICONE_EXCLUIR = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"/></svg>`
const ICONE_VAZIO = `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`

// Cabeçalho: título, mês em exibição, total e botão de nova renda
function templateHeader() {
  return `
  <header class="bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-700 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
    <div class="flex-1 min-w-0">
      <h1 class="text-2xl font-semibold text-gray-800">Rendas</h1>
      <div class="relative mt-1 flex items-center gap-1 text-sm text-gray-500">
        <span>Período:</span>
        <button
          type="button"
          id="btn-abrir-calendario"
          aria-label="Escolher mês"
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-medium text-green-700 hover:bg-green-50 transition-colors"
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
      <p id="total-Renda" class="text-2xl md:text-3xl font-bold text-green-700 tabular-nums">R$ 0,00</p>
    </div>

    <button
      type="button"
      id="btn-nova-renda"
      class="shrink-0 px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 active:scale-95 text-white font-medium shadow-sm transition"
    >
      + Nova Renda
    </button>
  </header>
  `
}

// Lista em formato de tabela: cabeçalho de colunas no desktop
function templateLista() {
  return `
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500">
      <span class="col-span-4">Categoria</span>
      <span class="col-span-3">Descrição</span>
      <span class="col-span-2">Data</span>
      <span class="col-span-2 text-right">Valor</span>
      <span class="col-span-1"><span class="sr-only">Ações</span></span>
    </div>
    <div id="container-lista-rendas" class="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto"></div>
  </div>
  `
}

// Modal de cadastro/edição
function templateModal() {
  const categorias = ["Salário", "Freelance", "Investimentos", "Hora Extra", "Comissão", "Aluguel Recebido", "Dividendos", "Presente", "Restituição", "Outros"]
  const opcoes = categorias.map((nome) => `<option value="${nome}">${nome}</option>`).join("")

  return `
  <div id="fundo-escuro" class="hidden fixed inset-0 z-50 bg-black/50 fundo-animado">
    <div id="formulario-cadastro-renda" class="w-full h-full flex items-center justify-center p-4">
      <form
        novalidate
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-renda"
        class="painel-animado w-full max-w-md max-h-full overflow-y-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <div class="flex items-start justify-between gap-4 mb-5">
          <h2 id="titulo-modal-renda" class="text-xl font-semibold text-gray-800">Nova renda</h2>
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
          </div>
          <div>
            <label for="inputValor" class="block mb-1 text-sm font-medium text-gray-700">Valor</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">R$</span>
              <input type="number" step="0.01" min="0" inputmode="decimal" id="inputValor" class="campo pl-9" placeholder="0,00" />
            </div>
          </div>
          <div>
            <label for="inputData" class="block mb-1 text-sm font-medium text-gray-700">Data de recebimento</label>
            <input type="date" id="inputData" class="campo" />
          </div>
          <div>
            <label for="inputDescricao" class="block mb-1 text-sm font-medium text-gray-700">
              Descrição <span class="font-normal text-gray-400">(opcional)</span>
            </label>
            <input type="text" id="inputDescricao" class="campo" placeholder="Ex.: salário da empresa" />
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
            class="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-700 hover:bg-green-800 active:scale-95 transition"
          >Cadastrar</button>
        </div>
      </form>
    </div>
  </div>
  `
}

// Linha da lista: grade alinhada com o cabeçalho no desktop, cartão empilhado no celular
function templateListaCards(itens) {
  const formato = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  const descricao = itens.descricao
    ? escaparHTML(itens.descricao)
    : `<span class="text-gray-400">Sem descrição</span>`

  return `
  <div class="px-4 md:px-5 py-3 flex flex-col gap-2 md:grid md:grid-cols-12 md:gap-4 md:items-center hover:bg-gray-50 transition-colors">
    <div class="flex items-center justify-between gap-3 md:contents">
      <div class="min-w-0 md:col-span-4 md:order-1">
        <span class="inline-flex max-w-full px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${corCategoria(itens.categoria)}">
          <span class="truncate">${escaparHTML(itens.categoria)}</span>
        </span>
      </div>
      <div class="shrink-0 font-semibold text-green-700 tabular-nums md:col-span-2 md:order-4 md:text-right">
        ${formato.format(itens.valor)}
      </div>
    </div>
    <div class="flex items-center justify-between gap-3 md:contents">
      <div class="min-w-0 flex items-center gap-1.5 text-sm text-gray-500 md:contents">
        <span class="truncate text-gray-700 md:col-span-3 md:order-2">${descricao}</span>
        <span class="md:hidden" aria-hidden="true">·</span>
        <span class="shrink-0 tabular-nums md:col-span-2 md:order-3">${itens.data.split("-").reverse().join("/")}</span>
      </div>
      <div class="shrink-0 flex justify-end gap-1 md:col-span-1 md:order-5">
        <button
          type="button"
          id="btn-editar-${itens.id}"
          aria-label="Editar renda"
          title="Editar"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >${ICONE_EDITAR}</button>
        <button
          type="button"
          id="btn-deletar-${itens.id}"
          aria-label="Excluir renda"
          title="Excluir"
          class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >${ICONE_EXCLUIR}</button>
      </div>
    </div>
  </div>
  `
}

// Exibida quando nenhuma renda passa pelos filtros
function templateListaVazia() {
  return `
  <div class="py-14 px-4 flex flex-col items-center text-center">
    <div class="w-16 h-16 rounded-full bg-green-50 text-green-700 flex items-center justify-center">${ICONE_VAZIO}</div>
    <p class="mt-4 font-medium text-gray-700">Nenhuma renda neste período</p>
    <p class="mt-1 text-sm text-gray-500">Cadastre uma renda ou ajuste os filtros acima.</p>
    <button
      type="button"
      id="btn-vazio-nova-renda"
      class="mt-4 px-4 py-2 rounded-xl text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
    >+ Cadastrar renda</button>
  </div>
  `
}

// função que chama todos os templentes de rendas
export function templatesRenda() {
  return `
    <section class="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4">
      ${templateHeader()}
      ${templateFiltros("receber")}
      ${templateLista()}
      ${templateModal()}
    </section>
    `
}


// <---------------------|FUNÇÕES MODAL (INICIO)|---------------------->
// quando clickar no "cadastrar renda" vai abrir o modal
function abrirModal() {
  let fundoEscuro = document.querySelector("#fundo-escuro")
  fundoEscuro.classList.remove("hidden")
  document.querySelector("#titulo-modal-renda").textContent = rendaEmEdicao !== null ? "Editar renda" : "Nova renda"
  document.querySelector("#inputCategoria").focus()
}
// botão cancelar dentro do modal
function fecharModal() {
  let fundoEscuro = document.querySelector("#fundo-escuro")
  fundoEscuro.classList.add("hidden")
  // Sempre que fechar, limpa a sujeira visual e a memória fantasma
  limparCampos()
  rendaEmEdicao = null;
  document.querySelector("#btn-model-cadastrar").textContent = "Cadastrar";
}

// Abre o cadastro já com o dia 1º do mês selecionado no filtro
function abrirCadastro() {
  let mesFiltro = document.querySelector("#input-filtro-mes").value;
  if (mesFiltro) {
    document.querySelector("#inputData").value = `${mesFiltro}-01`;
  }
  abrirModal();
}

// pegar valores dos inputs do modal
function pegarValoresModal() {
  let categoria = document.querySelector("#inputCategoria").value;
  let valor = document.querySelector("#inputValor").value;
  let data = document.querySelector("#inputData").value;
  let descricao = document.querySelector("#inputDescricao").value;

  // Coloca tudo num pacote e entrega pra quem pediu
  return { categoria, valor, data, descricao };
}

// limpar campos do modal
function limparCampos() {
  document.querySelector("#inputCategoria").value = ""
  document.querySelector("#inputValor").value = ""
  document.querySelector("#inputData").value = ""
  document.querySelector("#inputDescricao").value = ""
}
// <---------------------|FUNÇÕES MODAL (FIM)|---------------------->

// <---------------------|MODAL (INICIO)|---------------------->
// funcionalidades do modal
function eventosDoModal() {
  let btnNovaRenda = document.querySelector("#btn-nova-renda")
  let btnModelCancelar = document.querySelector("#btn-model-cancelar")
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")

  // Botão abrir do modal
  btnNovaRenda.addEventListener("click", abrirCadastro)
  // botão cancelar e o X do modal
  btnModelCancelar.addEventListener("click", fecharModal)
  document.querySelector("#btn-fechar-modal").addEventListener("click", fecharModal)

  // Clique fora do formulário e tecla Esc também fecham
  const fundoEscuro = document.querySelector("#fundo-escuro")
  const formulario = fundoEscuro.querySelector("form")
  fundoEscuro.addEventListener("click", (evento) => {
    if (!formulario.contains(evento.target)) fecharModal()
  })
  fundoEscuro.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModal()
  })

  // botão cadastrar do modal
  // Esse trecho é o "Cérebro Decisor" do modal, que decide se fez uma edição ou um novo cadastro
  // submit cobre o clique em Cadastrar e o Enter dentro dos campos
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()
    // [COLETA]: Chama a função que lê todos os inputs do modal e guarda em um objeto
    let valoresModal = pegarValoresModal();

    // validação
    if (!validarRenda(valoresModal)) {
      return
    }

    // [DECISÃO]: Verifica se existe um ID guardado na variável.
    if (rendaEmEdicao !== null) {
      // [EXECUÇÃO DO UPDATE]
      editarRenda(rendaEmEdicao, valoresModal);
      rendaEmEdicao = null;
      btnModalCadastrar.textContent = "Cadastrar";
      notificar("Renda atualizada.")

    } else {
      // [EXECUÇÃO DO CREATE]
      adicionarRenda(valoresModal);
      notificar("Renda cadastrada.")
    }



    // --- NOVO: SINCRONIZAÇÃO DE FILTRO ---
    sincFiltro(valoresModal.data)
    limparFiltrosExtras()
    // -------------------------------------

    // [ATUALIZAÇÃO]: Chama o Maestro para redesenhar a lista na tela
    // Agora ele vai desenhar filtrando pelo mês que acabamos de setar acima!
    listaRendas();

    // [FINALIZAÇÃO]: Fecha a janela
    fecharModal();
  });
}
// <---------------------|MODAL (FIM)|---------------------->

//<---------------------|FEATURE DATA (INICIO)|---------------------->

function sincFiltro(dataDaRenda) {
  // Agora usamos a variável que recebemos ali em cima
  const [ano, mes] = dataDaRenda.split("-");
  const mesAnoRenda = `${ano}-${mes}`; // Formato: "YYYY-MM"

  // Selecionamos os elementos do filtro no Painel
  const inputFiltro = document.querySelector("#input-filtro-mes");
  const textoFiltro = document.querySelector("#texto-mes-atual");

  // Forçamos o filtro do painel a ir para o mês da renda que acabamos de mexer
  if (inputFiltro) {
    inputFiltro.value = mesAnoRenda;
    textoFiltro.textContent = `${mes}/${ano}`;
  }
}

// funcionalidade do botão de data
function btnData() {
  const btnCalendario = document.querySelector("#btn-abrir-calendario");
  const inputMes = document.querySelector("#input-filtro-mes");
  const textoMesAtual = document.querySelector("#texto-mes-atual");

  // --- LÓGICA DO MÊS ATUAL ---
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dataFormatada = `${ano}-${mes}`; // Ex: 2026-04

  // Inicializa os valores na tela
  if (inputMes) {
    inputMes.value = dataFormatada;
    textoMesAtual.textContent = `${mes}/${ano}`;
  }

  // --- EVENTOS ---
  // Abre o calendário ao clicar no ícone
  btnCalendario.addEventListener("click", () => inputMes.showPicker());

  // Atualiza tudo quando o usuário troca o mês
  inputMes.addEventListener("change", (e) => {
    const valorInput = e.target.value;

    if (valorInput) {
      // Se tem valor (ex: "2026-04")
      const [anoSel, mesSel] = valorInput.split("-");
      textoMesAtual.textContent = `${mesSel}/${anoSel}`;
    } else {
      // Se o usuário clicou em "Limpar"
      textoMesAtual.textContent = "Selecione um mês";
    }

    listaRendas();
  });
}

//<---------------------|FEATURE DATA (FIM)|---------------------->


// <---------------------| FUNÇÕES LISTA DE RENDAS (INICIO)|---------------------->

function listaDeRendasRead() {
  // trackear o local onde vai ficar a lista de rendas
  let containerListaRendas = document.querySelector("#container-lista-rendas")

  // Filtra (mês, categoria, período) e ordena conforme a barra de filtros
  const rendasFiltradas = aplicarFiltros(rendas, lerFiltros())

  // percorrer o resultado FILTRADO e entregar os itens para o templates de cards
  let cardsListasRendas = rendasFiltradas.map(itens => {
    return templateListaCards(itens)
  }).join("")

  // lançar a lista no html (ou a mensagem de lista vazia)
  containerListaRendas.innerHTML = rendasFiltradas.length > 0 ? cardsListasRendas : templateListaVazia()
  document.querySelector("#btn-vazio-nova-renda")?.addEventListener("click", abrirCadastro)

  // exibir o total da renda no header
  let totalRenda = document.querySelector("#total-Renda")

  // AJUSTE: Passamos as rendas filtradas para o cálculo do total
  // Assim o valor lá no topo reflete apenas o que o usuário está vendo no mês
  const valorTotal = calcularTotalRenda(rendasFiltradas)

  totalRenda.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)
}

function listaDeRendasUpdate() {
  // Seleciona o botão de "Cadastrar" que fica dentro do Modal para alterar o texto dele depois
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")
  // [PERCORRE]: Entra no array de dados e executa o código abaixo para cada item (objeto) da lista
  rendas.forEach(itens => {
    // [ACHA]: Busca no HTML o botão específico de editar desse item usando o ID único (ex: #btn-editar-1)
    const btnEditar = document.querySelector(`#btn-editar-${itens.id}`);
    // Verifica se o botão realmente foi encontrado no HTML antes de tentar colocar o clique
    if (btnEditar) {
      // [PREPARA]: Adiciona um "ouvidor" que fica esperando o usuário clicar no botão azul de editar
      btnEditar.addEventListener("click", () => {
        // [ANOTAR]: Salva o ID do item clicado na variável global para o sistema saber quem será alterado no futuro
        rendaEmEdicao = itens.id;

        // Pega o valor da categoria do objeto atual e joga dentro do campo de seleção do modal
        document.querySelector("#inputCategoria").value = itens.categoria;
        document.querySelector("#inputValor").value = itens.valor;
        document.querySelector("#inputData").value = itens.data;
        document.querySelector("#inputDescricao").value = itens.descricao;
        // Altera visualmente o texto do botão do modal de "Cadastrar" para "Concluir Edição"
        btnModalCadastrar.textContent = "Salvar alterações";
        // Executa a função que remove a classe 'hidden' e faz o modal aparecer na frente do usuário
        abrirModal();
      });
    }
  });
}

function listaDeRendasDelete() {
  // Percorremos TODAS as rendas do banco
  rendas.forEach(itens => {
    // Tentamos encontrar o botão na tela
    const btnDelete = document.querySelector(`#btn-deletar-${itens.id}`)

    // [SEGURANÇA]: Só adicionamos o evento se o botão realmente existir na tela atual
    if (btnDelete) {
      btnDelete.addEventListener("click", async () => {
        const data = itens.data.split("-").reverse().join("/")
        const confirmado = await confirmar(`"${itens.categoria}" de ${data} será removida. Esta ação não pode ser desfeita.`, {
          titulo: "Excluir renda?",
          textoConfirmar: "Excluir",
          perigoso: true,
        })
        if (!confirmado) return
        rendasDelete(itens)
        listaRendas()
        notificar("Renda excluída.")
      })
    }
  })
}

// cores das categorias do card
function corCategoria(categoria) {
  switch (categoria) {
    case "Salário":
      return "bg-blue-100 text-blue-800 ring-blue-300"
    case "Freelance":
      return "bg-purple-100 text-purple-800 ring-purple-300"
    case "Investimentos":
      return "bg-yellow-100 text-yellow-800 ring-yellow-300"
    case "Hora Extra":
      return "bg-orange-100 text-orange-800 ring-orange-300"
    case "Comissão":
      return "bg-pink-100 text-pink-800 ring-pink-300"
    case "Aluguel Recebido":
      return "bg-teal-100 text-teal-800 ring-teal-300"
    case "Dividendos":
      return "bg-green-100 text-green-800 ring-green-300"
    case "Presente":
      return "bg-red-100 text-red-800 ring-red-300"
    case "Restituição":
      return "bg-indigo-100 text-indigo-800 ring-indigo-300"
    case "Outros":
      return "bg-gray-100 text-gray-700 ring-gray-300"
    default:
      return "bg-gray-100 text-gray-500 ring-gray-200"
  }
}
// <---------------------| FUNÇÕES LISTA DE RENDAS (FIM)|---------------------->

// <---------------------|  LISTA DE RENDAS (INICIO)|---------------------->
function listaRendas() {
  // 1. READ: Lê o array 'rendas' e desenha os cards no HTML
  listaDeRendasRead()
  // 2. UPDATE: Procura os botões de editar que acabaram de ser criados e dá vida a eles
  listaDeRendasUpdate()
  // 3. DELETE: Procura os botões de lixeira e dá vida a eles
  listaDeRendasDelete()

}
// <---------------------|  LISTA DE RENDAS (FIM)|---------------------->

// <---------------------|NUCLEO GERAL (INICIO)|---------------------->
export function inicializarRenda() {
  eventosDoModal() // Configura os botões do modal
  iniciarFiltros(listaRendas) // Categoria, período e ordenação
  btnData() // Configura o seletor de mês ANTES de desenhar a lista, senão o filtro está vazio e mostra tudo
  listaRendas() // Desenha a lista (já filtrada pelo mês atual)
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->