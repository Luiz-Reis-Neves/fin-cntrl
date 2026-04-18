import { adicionarRenda } from "./logic.js"
import { rendas } from "./../data/store.js"

// função que contem o template do header rendas
function templateHeader() {
  return `
  <div
          class="w-full h-[100px] bg-gray-200 rounded-[10px] flex items-center gap-4 p-2 shadow-md"
        >
          <div class="flex flex-col shadow-md rounded-2xl p-4">
            <h2 class="text-sm text-gray-500">Renda Total</h2>
            <label
              id="total-Renda"
              for=""
              class="text-xl text-green-700 font-bold"
            >
              R$ 0,00
            </label>
          </div>
          <button
            id="btn-nova-renda"
            class="w-[140px] h-[40px] bg-[#459464] hover:bg-[#3a7d54] text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d"
          >
            + Nova Renda
          </button>
          <div id="lista-cards-header" class="flex gap-2 overflow-x-auto">

          </div>
        </div>
  
  `
}
// templetes cards do header
function templateCardsHeader() {
  return `
  <div class=" flex flex-col shadow-md rounded-2xl p-4 ">
              <h2 class="text-sm text-blue-800"></h2>
              <label for="" class="text-xl text-blue-800 font-bold"
                ></label
              >
            </div>
  
  `
}
// função que contem o templete painel do rendas
function templatePainel() {
  return `
  <div
          class="w-full h-[50px] text-green-800 bg-white p-2 flex items-center rounded-[10px] shadow-sm rounded-2xl border-l-4 border-green-800"
        >
          <h1 class="text-xl font-semibold">Painel de Rendas</h1>
        </div>
  
  `
}
// função que contem o templete lista do rendas
function templateLista() {
  return `
  <div
          id="container-lista-rendas"
          class="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-auto bg-white rounded-[10px] shadow-2xl"
        ></div>
  
  `
}
// função que contem o templete modal do rendas
function templateModal() {
  return `
  <div
          id="fundo-escuro"
          class="w-full h-full bg-black/50 hidden fixed inset-0 z-50"
        >
         
          <div
            id="formulario-cadastro-renda"
            class="w-full h-full border flex items-center justify-center"
          >
            <form>
          <div class="w-[400px] bg-white p-6 rounded shadow">
            <h2 class="text-2xl font-bold mb-4">Cadastro de Renda</h2>
            <div class="mb-4">
              <label for="inputCategoria" class="block text-gray-700"
                >Tipo de Renda</label
              >
              <select
                id="inputCategoria"
                name=""
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
              >
                <option disabled selected value="">Selecione uma opção</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Hora Extra">Hora Extra</option>
                <option value="Comissão">Comissão</option>
                <option value="Aluguel Recebido">Aluguel Recebido</option>
                <option value="Dividendos">Dividendos</option>
                <option value="Presente">Presente</option>
                <option value="Restituição">Restituição</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="inputValor" class="block text-gray-700">Valor</label>
              <input
                type="number"
                id="inputValor"
                name="valor"
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
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
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
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
                class="w-full px-3 py-2 border-2 rounded-lg focus:border-green-700 focus:outline-none"
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
  
  `
}

// função que contem o templete lista de cards
function templateListaCards(itens) {
  return `
  <div
          class="w-full h-20 bg-gray-200 rounded-[10px] gap-4 p-2 shadow-md flex rounded-md items-center justify-between"
        >
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Categoria:</h2>
            <span
              class="border p-1 rounded-[10px] text-center text-gray-800 font-medium "
              >${itens.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${itens.valor}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Data:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${itens.data}</span
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
              id="btn-editar-"
              class="w-[50px] h-[30px] bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-editar"
            >
              <img
                src="./src/assets/botao-editar.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
            <button
              id="btn-deletar-"
              class="w-[50px] h-[30px] bg-red-500 hover:bg-red-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-deletar"
            >
              <img
                src="./src/assets/excluir.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
          </div>
        </div>
  `
}
// função que chama todos os templentes de rendas
export function templatesRenda() {
  return `
    <section class="w-full h-full flex flex-col p-2 gap-2">
      ${templateHeader()}
      ${templatePainel()}
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
}
// botão cancelar dentro do modal
function fecharModal() {
  let fundoEscuro = document.querySelector("#fundo-escuro")
  fundoEscuro.classList.add("hidden")
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

// <---------------------|FUNÇÕES MODAL (FIM)|---------------------->

// <---------------------|MODAL (INICIO)|---------------------->
// funcionalidades do modal
export function eventosDoModal() {
  let btnNovaRenda = document.querySelector("#btn-nova-renda")
  let btnModelCancelar = document.querySelector("#btn-model-cancelar")
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")

  // Botão abrir do modal
  btnNovaRenda.addEventListener("click", () => {
    abrirModal()
  })
  // botão cancelar do modal
  btnModelCancelar.addEventListener("click", () => {
    fecharModal()
  })
  // botão cadastrar do modal
  btnModalCadastrar.addEventListener("click", () => {
    let valoresModal = pegarValoresModal()
    // função que joga para rendas no store.js
    // essa função se encontra no logic.js
    adicionarRenda(valoresModal)
    listaDeRendas()
  })
}
// <---------------------|MODAL (FIM)|---------------------->


// <---------------------|LISTA DE RENDAS (INICIO)|---------------------->
function listaDeRendas() {

  let containerListaRendas = document.querySelector("#container-lista-rendas")

  let cardsListasRendas = rendas.map(itens => {
    return templateListaCards(itens)
  }).join("")

  containerListaRendas.innerHTML = cardsListasRendas

}
// <---------------------|LISTA DE RENDAS (FIM)|---------------------->



// <---------------------|NUCLEO GERAL (INICIO)|---------------------->
export function inicializarRenda() {
  eventosDoModal()
  listaDeRendas()
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->