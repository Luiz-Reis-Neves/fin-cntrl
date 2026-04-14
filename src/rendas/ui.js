import { adicionarRenda, validarRenda, calcularTotalRenda } from "./logic.js"
import { rendas } from "../data/store.js"
let rendaEmEdicao = null

// função que contem o template do header rendas
function renderizarHeader() {
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
            class="bg-[#459464] hover:bg-[#3a7d54] text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d"
          >
            + Nova Renda
          </button>
        </div>
  
  `
}
// função que contem o templete painel do rendas
function renderizarPainel() {
  return `
  <div
          class="w-full h-[50px] text-green-800 bg-white p-2 flex items-center rounded-[10px] shadow-sm rounded-2xl border-l-4 border-green-800"
        >
          <h1 class="text-xl font-semibold">Painel de Rendas</h1>
        </div>
  
  `
}
// função que contem o templete lista do rendas
function renderizarLista() {
  return `
  <div
          id="container-lista-rendas"
          class="w-full h-[400px] p-2 flex flex-col gap-2 overflow-y-auto bg-white rounded-[10px] shadow-2xl"
        ></div>
  
  `
}
// função que contem o templete modal do rendas
function renderizarModal() {
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
// função que chama todos os templentes de rendas
export function renderizarRenda() {
  return `
    <section class="w-full h-full flex flex-col p-2 gap-2">
      ${renderizarHeader()}
      ${renderizarPainel()}
      ${renderizarLista()}
      ${renderizarModal()}   
    </section>
    
    `
}
// função que contem o templete lista de cards
function renderizarListaCards(itens, valorformat) {
  return `
  <div
          class="w-full h-20 bg-gray-200 rounded-[10px] gap-4 p-2 shadow-md flex rounded-md items-center justify-between"
        >
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Categoria:</h2>
            <span
              class="border p-1 rounded-[10px] text-center text-gray-800 font-medium ${corCategoria(itens.categoria)}"
              >${itens.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${valorformat}</span
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
              id="btn-editar-${itens.id}"
              class="w-[50px] h-[30px] bg-blue-500 hover:bg-blue-400 text-white py-1 px-4 rounded shadow-md active:shadow-none active:translate-y-1 transition-all duration-150 btn-3d-editar"
            >
              <img
                src="./src/assets/botao-editar.png"
                class="w-auto h-auto"
                alt=""
              />
            </button>
            <button
              id="btn-deletar-${itens.id}"
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

// função que mostra o modal cadastrar
function btnMostrarModal({ btnNovaRenda, fundoEscuro, btnModelCadastrar }) {
  // adicionar o evento no btn nova renda
  btnNovaRenda.addEventListener("click", () => {
    // retirar o hidden para aparecer o modal
    fundoEscuro.classList.remove("hidden")
    // Garante que quando o usuário abrir o modal pelo botão "Nova Renda", o modo de edição está desativado.
    rendaEmEdicao = null
    // modar o nome do botão para cadastrar
    btnModelCadastrar.textContent = "Cadastrar"
  })
}

// função para editar as informações do card
function btnEditar({ inputCategoria, inputValor, inputData, inputDescricao, fundoEscuro, btnModelCadastrar }) {
  const indexEditar = rendas.findIndex((renda) => renda.id === rendaEmEdicao)
  rendas[indexEditar].categoria = inputCategoria.value
  rendas[indexEditar].valor = inputValor.value
  rendas[indexEditar].data = inputData.value
  rendas[indexEditar].descricao = inputDescricao.value
  renderizarListaRenda()
  fundoEscuro.classList.add("hidden")
  rendaEmEdicao = null
  btnModelCadastrar.textContent = "Cadastrar"
}

// função do botão cancelar no modal
function btnFecharModal({ btnModelCancelar, fundoEscuro }) {
  btnModelCancelar.addEventListener("click", () => {
    fundoEscuro.classList.add("hidden")
  })
}
// pegar os valores do modal
function pegarValoresModal({ btnModelCadastrar, inputCategoria, inputValor, inputData, inputDescricao, fundoEscuro }) {
  btnModelCadastrar.addEventListener("click", () => {
    if (!validarRenda({ categoria: inputCategoria.value, valor: inputValor.value, data: inputData.value })) {
      return
    }

    let fncRenda = adicionarRenda({ categoria: inputCategoria.value, valor: inputValor.value, data: inputData.value, descricao: inputDescricao.value })

    if (rendaEmEdicao === null) {
      rendas.push(fncRenda)
      renderizarListaRenda()
    } else {
      // edição
      btnEditar({ inputCategoria, inputValor, inputData, inputDescricao, fundoEscuro, btnModelCadastrar })
    }



  })
}
// função principal que controla o model, botões de: mostrar, fechar e cadastrar
export function inicializarRenda() {
  const btnNovaRenda = document.querySelector("#btn-nova-renda")
  const fundoEscuro = document.querySelector("#fundo-escuro")
  const btnModelCadastrar = document.querySelector("#btn-model-cadastrar")
  const btnModelCancelar = document.querySelector("#btn-model-cancelar")
  let inputCategoria = document.querySelector("#inputCategoria")
  let inputValor = document.querySelector("#inputValor")
  let inputData = document.querySelector("#inputData")
  let inputDescricao = document.querySelector("#inputDescricao")

  // mostrar model
  btnMostrarModal({ btnNovaRenda, fundoEscuro, btnModelCadastrar })
  // fecha model
  btnFecharModal({ btnModelCancelar, fundoEscuro })
  // pegar os valores do model
  pegarValoresModal({ btnModelCadastrar, inputCategoria, inputValor, inputData, inputDescricao, fundoEscuro })
}

// funcão para pegar valores que colocar no cards
function pegarValoresCards() {
  let htmlCards = ""
  rendas.forEach((itens) => {
    let valorformat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itens.valor)
    htmlCards += renderizarListaCards(itens, valorformat)
  })
  return htmlCards
}

function deletarCards() {
  rendas.forEach((itens) => {
    // identificar o id que vai ser deltado
    const btnDeletar = document.querySelector(`#btn-deletar-${itens.id}`)
    // adicionar o evento do botão delete
    btnDeletar.addEventListener("click", () => {
      // percorre o array rendas em busca do item clickado e guarda no index
      const indexExcluir = rendas.findIndex((renda) => renda.id === itens.id)
      // apaga o item na renda
      rendas.splice(indexExcluir, 1)
      // mostra a nova lista tualiazada
      renderizarListaRenda()
    })
  })
}

function editarCards(btnModelCadastrar) {
  rendas.forEach((itens) => {

    // identificar o item que vai ser deletado
    const btnEditar = document.querySelector(`#btn-editar-${itens.id}`)
    // adicionar o evento do botão editar
    btnEditar.addEventListener("click", () => {
      // declaração de variaveis para ser usada dentro do modal
      let inputCategoria = document.querySelector("#inputCategoria")
      let inputValor = document.querySelector("#inputValor")
      let inputData = document.querySelector("#inputData")
      let inputDescricao = document.querySelector("#inputDescricao")
      const fundoEscuro = document.querySelector("#fundo-escuro")
      // percorrer o array rendas para encontrar o item para editar
      const indexEditar = rendas.findIndex((renda) => renda.id === itens.id)
      rendaEmEdicao = rendas[indexEditar].id
      // abrir o modal
      btnModelCadastrar.textContent = "Concluir Edição"
      fundoEscuro.classList.remove("hidden")
      // colocar as informações do card dentro do modal
      inputCategoria.value = rendas[indexEditar].categoria
      inputValor.value = rendas[indexEditar].valor
      inputData.value = rendas[indexEditar].data
      inputDescricao.value = rendas[indexEditar].descricao
    })
  })
}

// mostrar os cards na tela
export function renderizarListaRenda() {
  const containerLista = document.querySelector("#container-lista-rendas")
  const btnModelCadastrar = document.querySelector("#btn-model-cadastrar")

  // pegar os valores e colocar nos cards
  let htmlCards = pegarValoresCards()

  // exibir o total da renda no header
  let totalRenda = document.querySelector("#total-Renda")
  totalRenda.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calcularTotalRenda())

  // importante: injeta todos os cards de uma vez no container, evitando perda de event listeners
  containerLista.innerHTML = htmlCards
  // array que vai percorrer o array procurando o id que vai ser deltado
  deletarCards()
  // função que edita os cards
  editarCards(btnModelCadastrar)
}
// cores das categorias do card
function corCategoria(categoria) {
  switch (categoria) {
    case "Salário":
      return "bg-blue-200 text-blue-800"
    case "Freelance":
      return "bg-purple-200 text-purple-800"
    case "Investimentos":
      return "bg-yellow-200 text-yellow-800"
    case "Hora Extra":
      return "bg-orange-200 text-orange-800"
    case "Comissão":
      return "bg-pink-200 text-pink-800"
    case "Aluguel Recebido":
      return "bg-teal-200 text-teal-800"
    case "Dividendos":
      return "bg-green-200 text-green-800"
    case "Presente":
      return "bg-red-200 text-red-800"
    case "Restituição":
      return "bg-indigo-200 text-indigo-800"
    case "Outros":
      return "bg-gray-200 text-gray-800"
    default:
  }
}
