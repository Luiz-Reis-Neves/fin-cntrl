import { adicionarGasto, calcularTotalGasto, editarGasto, gastosDelete, validarGasto } from "./logic.js";
import { gastos } from "./../data/store.js"

// função que contem o template do header gastos
let gastoEmEdicao = null;
function templateHeader() {
  return `
  <div
          class="w-full h-[100px] bg-gray-200 rounded-[10px] flex items-center gap-4 p-2 shadow-md"
        >
          <div class="flex flex-col shadow-md rounded-2xl p-4">
            <h2 class="text-sm text-gray-500">Gastos Totais</h2>
            <label
              id="total-Gasto"
              for=""
              class="text-xl text-[#9F0712] font-bold"
            >
              R$ 0,00
            </label>
          </div>
          <button
            id="btn-nova-gastos"
            class="w-[140px] h-[40px] bg-[#9F0712] hover:bg-red-700 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-gasto-3d"
          >
            + Novo Gasto
          </button>
        </div>
  
  `;
}

// função que contem o templete painel de gastos
function templatePainel() {
  return `
  <div
          class="w-full h-[50px] text-[#9F0712] bg-white p-2 flex items-center justify-between rounded-[10px] shadow-sm rounded-2xl border-l-4 border-[#9F0712]"
        >
          <h1 class="text-xl font-semibold">Painel de Gastos</h1>

          <div class="relative flex items-center gap-2">
            <span
              id="texto-mes-atual"
              class="font-medium text-[#9F0712] text-sm"
              >Mês atual</span
            >

            <button
              id="btn-abrir-calendario"
              class="w-8 h-8 border flex items-center justify-center py-2 rounded hover:bg-green-100 active:scale-95 btn-3d-data-gasto"
            >
              <img
                src="/fin-cntrl/assets/calendarioGastos.png"
                class="w-7 h-7"
                alt="Filtrar por mês"
              />
            </button>

            <input
              type="month"
              id="input-filtro-mes"
              class="absolute right-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
            />
          </div>

          <input type="month" id="input-filtro-mes" class="hidden" />
        </div>
  
  `;
}
// função que contem o templete lista de gastos
function templateLista() {
  return `
  <div
          id="container-lista-gastos"
          class="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-auto bg-white rounded-[10px] shadow-2xl"
        ></div>
  
  `;
}
// função que contem o templete modal do gastos
function templateModal() {
  return `
  <div
          id="fundo-escuro"
          class="w-full h-full bg-black/50 hidden fixed inset-0 z-50"
        >
         
          <div
            id="formulario-cadastro-gastos"
            class="w-full h-full border flex items-center justify-center"
          >
            <form>
          <div class="w-[400px] bg-white p-6 rounded shadow">
            <h2 class="text-2xl font-bold mb-4">Cadastro de gastos</h2>
            <div class="mb-4">
              <label for="inputCategoria" class="block text-gray-700"
                >Tipo de Gasto</label
              >
              <select
                id="inputCategoria"
                name=""
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
              >
                <option disabled selected value="">Selecione uma opção</option>
                <option value="Aluguel / Prestação">Aluguel / Prestação</option>
                <option value="Conta de Luz">Conta de Luz</option>
                <option value="Conta de Água">Conta de Água</option>
                <option value="Internet">Internet</option>
                <option value="Conta de Telefone">Conta de Telefone</option>
                <option value="Supermercado">Supermercado</option>
                <option value="Restaurante / Delivery">Restaurante / Delivery</option>
                <option value="Combustível">Combustível</option>
                <option value="Aplicativos (Uber/99)">Aplicativos (Uber/99)</option>
                <option value="Assinaturas (Netflix, Spotify, etc.)">Assinaturas (Netflix, Spotify, etc.)</option>
                <option value="Lazer / Saídas">Lazer / Saídas</option>
                <option value="Faculdade / Cursos">Faculdade / Cursos</option>
                <option value="Fatura do Cartão de Crédito">Fatura do Cartão de Crédito</option>
                <option value="Imprevistos">Imprevistos</option>
                <option value="Pagamentos de Terceiros">Pagamentos de Terceiros</option>
                <option value="Outros Gastos">Outros Gastos</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="inputValor" class="block text-gray-700">Valor</label>
              <input
                type="number"
                id="inputValor"
                name="valor"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
                placeholder="Digite o valor"
              />
            </div>
            <div class="mb-4">
              <label for="inputData" class="block text-gray-700"
                >Data de Recebimento</label
              >
              <input
                type="date"
                id="inputData"
                name="data"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
              />
            </div>
            <div class="mb-4">
              <label for="inputDescricao" class="block text-gray-700"
                >Descrição</label
              >
              <input
                type="text"
                id="inputDescricao"
                name="descricao"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-[#9F0712] focus:outline-none"
                placeholder="Digite uma descrição"
              />
            </div>

            <div class="flex justify-between gap-2">
              <button
                type="button"
                id="btn-model-cadastrar"
                class="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700 active:scale-95 btn-3d"
              >
                Cadastrar
              </button>
              <button
                type="button"
                id="btn-model-cancelar"
                class="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700 btn-3d-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
          </div>
  </div>
  
  `;
}
// função que contem o templete lista de cards
function templateListaCardsGastos(itens) {
  return `
  <div
          class="w-full h-20 bg-gray-200 rounded-[10px] gap-4 p-2 shadow-md flex rounded-md items-center justify-between"
        >
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Categoria:</h2>
            <span
              class="border p-1 rounded-[10px] text-center ${corCategoriaGasto(itens.categoria)} font-medium "
              >${itens.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-red-600 font-bold"
              >${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(itens.valor)}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Data:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${itens.data.split("-").reverse().join("/")}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Descrição:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${itens.descricao}</span
            >
          </div>
          <div class="w-[110px] p-1 flex items-center justify-between">
            <button
              id="btn-editar-gasto-${itens.id}" 
              class="w-[50px] h-[30px] bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-editar"
            >
              <img
                src="/fin-cntrl/assets/botao-editar.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
            <button
              id="btn-deletar-gasto-${itens.id}"
              class="w-[50px] h-[30px] bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-deletar"
            >
              <img
                src="/fin-cntrl/assets/excluir.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
          </div>
        </div>
  `;
}

function corCategoriaGasto(categoria) {
  switch (categoria) {
    case "Aluguel / Prestação":
      return "bg-slate-200 text-slate-800";
    case "Conta de Luz":
      return "bg-yellow-200 text-yellow-800";
    case "Conta de Água":
      return "bg-cyan-200 text-cyan-800";
    case "Internet":
      return "bg-sky-200 text-sky-800";
    case "Conta de Telefone":
      return "bg-blue-200 text-blue-800";
    case "Supermercado":
      return "bg-emerald-200 text-emerald-800";
    case "Restaurante / Delivery":
      return "bg-orange-200 text-orange-800";
    case "Combustível":
      return "bg-red-200 text-red-800";
    case "Aplicativos (Uber/99)":
      return "bg-stone-200 text-stone-800";
    case "Assinaturas (Netflix, Spotify, etc.)":
      return "bg-purple-200 text-purple-800";
    case "Lazer / Saídas":
      return "bg-fuchsia-200 text-fuchsia-800";
    case "Faculdade / Cursos":
      return "bg-indigo-200 text-indigo-800";
    case "Fatura do Cartão de Crédito":
      return "bg-rose-200 text-rose-800";
    case "Imprevistos":
      return "bg-amber-200 text-amber-800";
    case "Outros Gastos":
      return "bg-gray-200 text-gray-800";
    default:
      return "bg-gray-200 text-gray-400";
  }
}
// função que chama todos os templentes de gastos
export function templatesGastos() {
  return `
    <section class="w-full h-full flex flex-col p-2 gap-2">
    ${templateHeader()}
    ${templatePainel()}
    ${templateLista()}
    ${templateModal()}
    </section>
    `;
}

// <---------------------|FUNÇÕES MODAL (INICIO)|---------------------->
// quando clickar no "cadastrar gasto" vai abrir o modal
function abrirModal() {
  let fundoEscuro = document.querySelector("#fundo-escuro")
  fundoEscuro.classList.remove("hidden")
}

// botão cancelar dentro do modal
function fecharModal() {
  let fundoEscuro = document.querySelector("#fundo-escuro")
  fundoEscuro.classList.add("hidden")

  // Sempre que fechar, limpa a sujeira visual e a memória fantasma
  limparCampos()
  gastoEmEdicao = null; // <-- MUDANÇA AQUI: Trocamos 'rendaEmEdicao'
  document.querySelector("#btn-model-cadastrar").textContent = "Cadastrar";
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
// <---------------------|MODAL DE GASTOS (INICIO)|---------------------->
// funcionalidades do modal
function eventosDoModal() {
  // Alterado para buscar o botão com o ID correto do HTML de gastos
  let btnNovoGasto = document.querySelector("#btn-nova-gastos")
  let btnModalCancelar = document.querySelector("#btn-model-cancelar")
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")

  // Botão abrir do modal
  btnNovoGasto.addEventListener("click", () => {
    // 1. Pega o valor que está selecionado no painel (ex: "2026-05")
    let mesFiltro = document.querySelector("#input-filtro-mes").value;

    // 2. Se tiver um mês no filtro, já injeta ele no modal no dia 01
    if (mesFiltro) {
      document.querySelector("#inputData").value = `${mesFiltro}-01`;
    }

    abrirModal();
  })

  // botão cancelar do modal
  btnModalCancelar.addEventListener("click", () => {
    fecharModal()
  })

  // botão cadastrar do modal
  // Esse trecho é o "Cérebro Decisor" do modal, que decide se fez uma edição ou um novo cadastro
  btnModalCadastrar.addEventListener("click", () => {
    // [COLETA]: Chama a função que lê todos os inputs do modal e guarda em um objeto
    let valoresModal = pegarValoresModal();

    // validação (Alterado para a função de gastos)
    if (!validarGasto(valoresModal)) {
      return
    }

    // [DECISÃO]: Verifica se existe um ID guardado na variável. (Alterado para gastoEmEdicao)
    if (gastoEmEdicao !== null) {
      // [EXECUÇÃO DO UPDATE]
      editarGasto(gastoEmEdicao, valoresModal);
      gastoEmEdicao = null;
      btnModalCadastrar.textContent = "Cadastrar";

    } else {
      // [EXECUÇÃO DO CREATE]
      adicionarGasto(valoresModal);
    }

    // --- NOVO: SINCRONIZAÇÃO DE FILTRO ---
    sincFiltro(valoresModal.data)
    // -------------------------------------

    // [ATUALIZAÇÃO]: Chama o Maestro para redesenhar a lista na tela
    // (Alterado para listaGastos)
    listaGastos();

    // [FINALIZAÇÃO]: Fecha a janela
    fecharModal();
  });
}
// <---------------------|MODAL DE GASTOS (FIM)|---------------------->
//<---------------------|FEATURE DATA (INICIO)|---------------------->

function sincFiltro(dataDoGasto) {
  // Agora usamos a variável que recebemos ali em cima
  const [ano, mes] = dataDoGasto.split("-");
  const mesAnoGasto = `${ano}-${mes}`; // Formato: "YYYY-MM"

  // Selecionamos os elementos do filtro no Painel
  const inputFiltro = document.querySelector("#input-filtro-mes");
  const textoFiltro = document.querySelector("#texto-mes-atual");

  // Forçamos o filtro do painel a ir para o mês do gasto que acabamos de mexer
  if (inputFiltro) {
    inputFiltro.value = mesAnoGasto;
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

    // AQUI ESTÁ A MUDANÇA CRÍTICA: Chama a lista de gastos!
    listaGastos();
  });
}
//<---------------------|FEATURE DATA (FIM)|---------------------->
// <---------------------| FUNÇÕES LISTA DE GASTOS (INICIO)|---------------------->

function listaDeGastosRead() {
  // trackear o local onde vai ficar a lista de gastos
  let containerListaGastos = document.querySelector("#container-lista-gastos")

  // NOVO: Pega o mês que está selecionado no input de data
  const mesSelecionado = document.querySelector("#input-filtro-mes").value // ex: "2026-04"

  // NOVO: Filtra o banco de dados antes de mandar para o template
  const gastosFiltrados = gastos.filter(item => {
    if (!mesSelecionado) return true
    return item.data.startsWith(mesSelecionado)
  })

  // percorrer o resultado FILTRADO e entregar os itens para o template de cards de gastos
  let cardsListasGastos = gastosFiltrados.map(itens => {
    return templateListaCardsGastos(itens) // Chamando o template correto de gastos
  }).join("")

  // lançar a lista no html
  containerListaGastos.innerHTML = cardsListasGastos

  // exibir o total de gastos no header
  let totalGasto = document.querySelector("#total-Gasto")

  // AJUSTE: Passamos os gastos filtrados para o cálculo do total
  const valorTotal = calcularTotalGasto(gastosFiltrados)

  totalGasto.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)
}

function listaDeGastosUpdate() {
  // Seleciona o botão de "Cadastrar" que fica dentro do Modal para alterar o texto dele depois
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")

  // [PERCORRE]: Entra no array de dados e executa o código abaixo para cada item da lista
  gastos.forEach(itens => {
    // [ACHA]: Busca no HTML o botão específico usando o ID de GASTO
    const btnEditar = document.querySelector(`#btn-editar-gasto-${itens.id}`);

    // Verifica se o botão realmente foi encontrado no HTML
    if (btnEditar) {
      // [PREPARA]: Adiciona um "ouvidor" de clique
      btnEditar.addEventListener("click", () => {
        // [ANOTAR]: Salva o ID do item clicado na variável global correta
        gastoEmEdicao = itens.id;

        // Pega o valor do objeto atual e joga dentro do modal
        document.querySelector("#inputCategoria").value = itens.categoria;
        document.querySelector("#inputValor").value = itens.valor;
        document.querySelector("#inputData").value = itens.data;
        document.querySelector("#inputDescricao").value = itens.descricao;

        // Altera visualmente o texto do botão do modal
        btnModalCadastrar.textContent = "Concluir Edição";

        // Abre o modal
        abrirModal();
      });
    }
  });
}

function listaDeGastosDelete() {
  // Percorremos TODOS os gastos do banco
  gastos.forEach(itens => {
    // Tentamos encontrar o botão de deletar usando o ID de GASTO
    const btnDelete = document.querySelector(`#btn-deletar-gasto-${itens.id}`)

    // [SEGURANÇA]: Só adicionamos o evento se o botão existir
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        gastosDelete(itens) // Deleta do banco
        listaGastos() // Redesenha a tela
      })
    }
  })
}

// <---------------------| FUNÇÕES LISTA DE GASTOS (FIM)|---------------------->
// <---------------------|  LISTA DE GASTOS (INICIO)|---------------------->
function listaGastos() {
  // 1. READ: Lê o array 'gastos' e desenha os cards no HTML
  listaDeGastosRead()

  // 2. UPDATE: Procura os botões de editar que acabaram de ser criados e dá vida a eles
  listaDeGastosUpdate()

  // 3. DELETE: Procura os botões de lixeira e dá vida a eles
  listaDeGastosDelete()
}
// <---------------------|  LISTA DE GASTOS (FIM)|---------------------->

// <---------------------|NUCLEO GERAL (INICIO)|---------------------->
export function inicializarGastos() {
  eventosDoModal() // Configura os botões do modal de gastos
  listaGastos()    // Desenha a lista de gastos na tela
  btnData()        // Configura o seletor de mês e data atual
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->
