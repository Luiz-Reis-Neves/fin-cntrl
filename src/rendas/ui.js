import { adicionarRenda } from "./logic.js"
import { rendas } from "../data/store.js"
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
          <div class="w-full h-[400px] border rounded-[10px]"></div>


          


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
                    <option value="salario">Salário</option>
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
                    class="w-full bg-green-800 text-white py-2 rounded hover:bg-green-700"
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

  btnNovaRenda.addEventListener("click", () => {
    fundoEscuro.classList.remove("hidden")
  })

  btnModelCancelar.addEventListener("click", () => {
    fundoEscuro.classList.add("hidden")
  })

  btnModelCadastrar.addEventListener("click", () => {

    let fncRenda = adicionarRenda(inputCategoria.value, inputValor.value, inputData.value, inputDescricao.value)
    rendas.push(fncRenda)
    console.log(rendas)
  })
}