import { GastosLogic } from "./logic.ts";
import { validarGasto } from "./validador.ts";
import type { ErroValidacao, FormularioGasto } from "./type.ts";
import { templateListaCardsGastos } from "./templates.ts";
import { gastos, salvarDados } from "./../data/store.js"
import { lerFiltros, aplicarFiltros, iniciarFiltros, limparFiltrosExtras } from "../filtros.js"

let gastoEmEdicao = null;
// Criada no inicializarGastos(), depois que o store já carregou os dados
let gastosLogic: GastosLogic;

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
  limparErros()
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

// Input correspondente a cada campo validado
const seletorDoCampo: Record<keyof FormularioGasto, string> = {
  categoria: "#inputCategoria",
  valor: "#inputValor",
  data: "#inputData",
  descricao: "#inputDescricao",
};

// Destaca os inputs inválidos e mostra todas as mensagens de uma vez
function mostrarErros(erros: ErroValidacao[]) {
  erros.forEach(({ campo }) => {
    document.querySelector(seletorDoCampo[campo])?.classList.add("border-red-500");
  });
  alert(erros.map(({ mensagem }) => mensagem).join("\n"));
}

function limparErros() {
  Object.values(seletorDoCampo).forEach((seletor) => {
    document.querySelector(seletor)?.classList.remove("border-red-500");
  });
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

    // validação: o validador só aponta os erros, a tela decide como exibi-los
    limparErros();
    const erros = validarGasto(valoresModal);
    if (erros.length > 0) {
      mostrarErros(erros);
      return
    }

    // o input entrega texto; a GastosLogic recebe o valor já como número
    const dadosGasto = { ...valoresModal, valor: Number(valoresModal.valor) };

    // [DECISÃO]: Verifica se existe um ID guardado na variável. (Alterado para gastoEmEdicao)
    if (gastoEmEdicao !== null) {
      // [EXECUÇÃO DO UPDATE]
      gastosLogic.editar(gastoEmEdicao, dadosGasto);
      gastoEmEdicao = null;
      btnModalCadastrar.textContent = "Cadastrar";

    } else {
      // [EXECUÇÃO DO CREATE]
      gastosLogic.adicionar(dadosGasto);
    }

    // --- NOVO: SINCRONIZAÇÃO DE FILTRO ---
    sincFiltro(valoresModal.data)
    limparFiltrosExtras()
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

  // Filtra (mês, categoria, período) e ordena conforme a barra de filtros
  const gastosFiltrados = aplicarFiltros(gastosLogic.obterTodos(), lerFiltros())

  // percorrer o resultado FILTRADO e entregar os itens para o template de cards de gastos
  let cardsListasGastos = gastosFiltrados.map(itens => {
    return templateListaCardsGastos(itens) // Chamando o template correto de gastos
  }).join("")

  // lançar a lista no html
  containerListaGastos.innerHTML = cardsListasGastos

  // exibir o total de gastos no header
  let totalGasto = document.querySelector("#total-Gasto")

  // AJUSTE: Passamos os gastos filtrados para o cálculo do total
  const valorTotal = gastosLogic.calcularTotal(gastosFiltrados)

  totalGasto.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotal)
}

function listaDeGastosUpdate() {
  // Seleciona o botão de "Cadastrar" que fica dentro do Modal para alterar o texto dele depois
  let btnModalCadastrar = document.querySelector("#btn-model-cadastrar")

  // [PERCORRE]: Entra no array de dados e executa o código abaixo para cada item da lista
  gastosLogic.obterTodos().forEach(itens => {
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
  gastosLogic.obterTodos().forEach(itens => {
    // Tentamos encontrar o botão de deletar usando o ID de GASTO
    const btnDelete = document.querySelector(`#btn-deletar-gasto-${itens.id}`)

    // [SEGURANÇA]: Só adicionamos o evento se o botão existir
    if (btnDelete) {
      btnDelete.addEventListener("click", () => {
        if (!confirm(`Excluir "${itens.categoria}" de ${itens.data.split("-").reverse().join("/")}?`)) return
        gastosLogic.excluir(itens.id) // Deleta da lista
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
  // A GastosLogic não sabe do localStorage: a cada mudança, quem a criou
  // atualiza o store (o dashboard ainda lê de lá) e salva no navegador
  gastosLogic = new GastosLogic(gastos, (listaAtualizada) => {
    gastos.length = 0;
    gastos.push(...listaAtualizada);
    salvarDados();
  });

  eventosDoModal() // Configura os botões do modal de gastos
  iniciarFiltros(listaGastos) // Categoria, período e ordenação
  btnData()        // Configura o seletor de mês ANTES de desenhar a lista, senão o filtro está vazio e mostra tudo
  listaGastos()    // Desenha a lista de gastos na tela (já filtrada pelo mês atual)
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->
