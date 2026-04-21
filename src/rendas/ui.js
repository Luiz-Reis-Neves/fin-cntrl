import { adicionarRenda, editarRenda, rendasDelete, calcularTotalRenda, validarRenda } from "./logic.js"
import { rendas } from "./../data/store.js"
let rendaEmEdicao = null
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
              class="border p-1 rounded-[10px] text-center ${corCategoria(itens.categoria)} font-medium "
              >${itens.categoria}</span
            >
          </div>
          <div class="h-[30px] flex items-center gap-1 p-1">
            <h2 class="text-gray-400">Valor:</h2>
            <span
              class="p-1 rounded-[10px] text-center text-gray-800 font-medium"
              >${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(itens.valor)}</span
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
  // Sempre que fechar, limpa a sujeira visual e a memória fantasma
  limparCampos()
  rendaEmEdicao = null;
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
  // Esse trecho é o "Cérebro Decisor" do modal, que decide se fez uma edição ou um novo cadastro
  btnModalCadastrar.addEventListener("click", () => {
    // [COLETA]: Chama a função que lê todos os inputs do modal e guarda em um objeto (ex: {valor: 100, ...})
    let valoresModal = pegarValoresModal();
    // validação
    if (!validarRenda(valoresModal)) {
      return
    }
    // [DECISÃO]: Verifica se existe um ID guardado na variável. Se não for null, significa que estamos EDITANDO
    if (rendaEmEdicao !== null) {
      // [EXECUÇÃO DO UPDATE]: Chama a função da lógica enviando o ID e os novos dados digitados
      editarRenda(rendaEmEdicao, valoresModal);
      // [RESET]: Limpa a variável de controle para que o próximo clique não tente editar o mesmo item
      rendaEmEdicao = null;
      // [VISUAL]: Retorna o texto original do botão para "Cadastrar" (limpando o estado de edição)
      btnModalCadastrar.textContent = "Cadastrar";

    } else {
      // [EXECUÇÃO DO CREATE]: Se a variável era null, o sistema entende que é uma renda totalmente nova
      adicionarRenda(valoresModal);
    }

    // [ATUALIZAÇÃO]: Chama o Maestro para redesenhar a lista na tela com as novas informações
    listaRendas();

    // [FINALIZAÇÃO]: Executa a função que coloca a classe 'hidden' no modal, fechando a janela
    fecharModal();

  });
}
// <---------------------|MODAL (FIM)|---------------------->


// <---------------------| FUNÇÕES LISTA DE RENDAS (INICIO)|---------------------->

function listaDeRendasRead() {
  // trackear o local onde vai ficar a lista de rendas
  let containerListaRendas = document.querySelector("#container-lista-rendas")
  // percorrer banco de dado renda e entregas os itens para o templates de cards
  let cardsListasRendas = rendas.map(itens => {
    return templateListaCards(itens)
  }).join("")
  // lançar a lista no html
  containerListaRendas.innerHTML = cardsListasRendas
  // exibir o total da renda no header
  let totalRenda = document.querySelector("#total-Renda")
  totalRenda.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(calcularTotalRenda())
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
        btnModalCadastrar.textContent = "Concluir Edição";
        // Executa a função que remove a classe 'hidden' e faz o modal aparecer na frente do usuário
        abrirModal();
      });
    }
  });
}

function listaDeRendasDelete() {
  rendas.forEach(itens => {
    const btnDelete = document.querySelector(`#btn-deletar-${itens.id}`)
    btnDelete.addEventListener("click", () => {
      rendasDelete(itens)
      listaRendas()
    })

  })
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
  eventosDoModal()
  listaRendas()
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->