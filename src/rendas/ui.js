import { adicionarRenda, validarRenda } from "./logic.js"
import { rendas } from "../data/store.js"
let rendaEmEdicao = null
export function renderizarRenda() {
  return `
    <section class="w-full h-full flex flex-col p-2 gap-2">
          <div
            class="w-full h-[100px] bg-gray-200 border rounded-[10px] flex items-center gap-4 p-2"
          >
            <div class="flex gap-1">
              <h2 class="text-xl">Saldo Total:</h2>
              <label for="" class="text-lg font-semibold">2.500,00</label>
            </div>
            <button id="btn-nova-renda"
              class="bg-[#459464] hover:bg-[#3a7d54] text-white py-1 px-4 rounded"
            >
              + Nova Renda
            </button>
          </div>
          <div
            class="w-full h-[50px] bg-gray-200 p-2 flex items-center border rounded-[10px]"
          >
            <h1 class="text-xl font-semibold">Painel de Rendas</h1>
          </div>
          <div id="container-lista-rendas" class="w-full h-[400px] border rounded-[10px] p-2 flex flex-col gap-2 overflow-y-auto"></div>


          


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
                  <label for="descricao" class="block text-gray-700"
                    >Tipo de Renda</label
                  >
                  <select name="" id="inputCategoria" class="w-full px-3 py-2 border rounded">
                    <option disabled selected value="">
                      Selecione uma opção
                    </option>
                    <option value="salário">Salário</option>
                    <option value="freelance">Freelance</option>
                    <option value="investimentos">Investimentos</option>
                    <option value="hora_extra">Hora Extra</option>
                    <option value="comissao">Comissão</option>
                    <option value="aluguel_recebido">Aluguel Recebido</option>
                    <option value="dividendos">Dividendos</option>
                    <option value="presente">Presente</option>
                    <option value="restituicao">Restituição</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label for="valor" class="block text-gray-700">Valor</label>
                  <input
                    type="number"
                    id="inputValor"
                    name="valor"
                    class="w-full px-3 py-2 border rounded"
                    placeholder="Digite o valor"
                  />
                </div>
                <div class="mb-4">
                  <label for="data" class="block text-gray-700"
                    >Data de Recebimento</label
                  >
                  <input
                    type="date"
                    id="inputData"
                    name="data"
                    class="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label for="descricao" class="block text-gray-700"
                    >Descrição</label
                  >
                  <input
                    type="text"
                    id="inputDescricao"
                    name="descricao"
                    class="w-full px-3 py-2 border rounded"
                    placeholder="Digite uma descrição"
                  />
                </div>
                
                <div class="flex justify-between gap-2">
                  <button type="button"
                    id="btn-model-cadastrar"
                    class="w-full bg-green-800  text-white py-2 rounded hover:bg-green-700"
                  >
                    Cadastrar
                  </button>
                  <button type="button"
                    id="btn-model-cancelar"
                    class="w-full bg-red-800 text-white py-2 rounded hover:bg-red-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        </section>
    
    `
}

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
  btnNovaRenda.addEventListener("click", () => {
    fundoEscuro.classList.remove("hidden")
  })
  // fecha model
  btnModelCancelar.addEventListener("click", () => {
    fundoEscuro.classList.add("hidden")

  })
  // pegar os valores do model
  btnModelCadastrar.addEventListener("click", () => {
    if (!validarRenda(inputCategoria.value, inputValor.value, inputData.value)) {
      return
    }

    let fncRenda = adicionarRenda(inputCategoria.value, inputValor.value, inputData.value, inputDescricao.value)

    if (rendaEmEdicao === null) {
      rendas.push(fncRenda)
      renderizarListaRenda()
    } else {
      // edição
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


  })
}

// mostrar os cards na tela
export function renderizarListaRenda() {
  const containerLista = document.querySelector("#container-lista-rendas")
  const btnModelCadastrar = document.querySelector("#btn-model-cadastrar")
  // limpar cards
  let htmlCards = ""
  // pegar os valores e colocar nos cards
  rendas.forEach((itens) => {
    // coloca ponto e virgula no numero
    // ex:2000 vai para 2.000,00
    let valorformat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itens.valor)
    // injeta o card no html
    htmlCards += `
    <div class="w-full h-20 border flex rounded-md items-center justify-between p-4">
      <div class="h-[30px] flex items-center gap-1 p-1">
        <h2>Categoria:</h2>
        <span class="border p-1 rounded-[10px] text-center">${itens.categoria}</span>
      </div>
      <div class="h-[30px] flex items-center gap-1 p-1">
        <h2>Valor:</h2>
        <span class="p-1 rounded-[10px] text-center">${valorformat}</span>
      </div>
      <div class="h-[30px] flex items-center gap-1 p-1">
        <h2>Data:</h2>
        <span class="p-1 rounded-[10px] text-center">${itens.data.split("-").reverse().join("/")}</span>
      </div>
      <div class="h-[30px] flex items-center gap-1 p-1">
        <h2>Descrição:</h2>
        <span class="p-1 rounded-[10px] text-center">${itens.descricao}</span>
      </div>
      <div class="w-[120px] p-1 flex items-center justify-between">
        <button id="btn-editar-${itens.id}" class="p-1 bg-blue-500 hover:bg-blue-400 text-white rounded">Editar</button>
        <button id="btn-deletar-${itens.id}" class="p-1 bg-red-500 hover:bg-red-400 text-white rounded">Excluir</button>
      </div>
    </div>
    `
  })
  // importante: injeta todos os cards de uma vez no container, evitando perda de event listeners
  containerLista.innerHTML = htmlCards
  // array que vai percorrer o array procurando o id que vai ser deltado
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
