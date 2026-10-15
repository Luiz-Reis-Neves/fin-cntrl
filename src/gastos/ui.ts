import { GastosLogic } from "./logic.ts";
import { validarGasto } from "./validador.ts";
import type { Gasto, NovoGasto } from "./type.ts";
import { ModalGasto } from "./modal.ts";
import { templateListaCardsGastos } from "./templates.ts";
import { gastos, salvarDados } from "./../data/store.js"
import { lerFiltros, aplicarFiltros, iniciarFiltros, limparFiltrosExtras } from "../filtros.js"

// Criadas no inicializarGastos(), depois que o template está no DOM e o store já carregou
let gastosLogic: GastosLogic;
let modal: ModalGasto;

// Destino dos dados confirmados no modal: cadastro ou edição
function salvarGasto(dados: NovoGasto, idEmEdicao: Gasto["id"] | null) {
  if (idEmEdicao !== null) {
    gastosLogic.editar(idEmEdicao, dados);
  } else {
    gastosLogic.adicionar(dados);
  }

  // Leva o filtro para o mês do gasto salvo, para ele aparecer na lista
  sincFiltro(dados.data)
  limparFiltrosExtras()
  listaGastos();
}

function eventosDoModal() {
  // Novo gasto já vem com o dia 1º do mês selecionado no filtro
  document.querySelector("#btn-nova-gastos").addEventListener("click", () => {
    const mesFiltro = document.querySelector("#input-filtro-mes").value;
    modal.abrirCadastro(mesFiltro ? `${mesFiltro}-01` : undefined);
  })
}
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
  gastosLogic.obterTodos().forEach(itens => {
    const btnEditar = document.querySelector(`#btn-editar-gasto-${itens.id}`);
    if (btnEditar) {
      btnEditar.addEventListener("click", () => modal.abrirEdicao(itens));
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

  modal = new ModalGasto(document.querySelector("#fundo-escuro"), validarGasto, salvarGasto);

  eventosDoModal() // Configura o botão "+ Novo Gasto"
  iniciarFiltros(listaGastos) // Categoria, período e ordenação
  btnData()        // Configura o seletor de mês ANTES de desenhar a lista, senão o filtro está vazio e mostra tudo
  listaGastos()    // Desenha a lista de gastos na tela (já filtrada pelo mês atual)
}
// <---------------------|NUCLEO GERAL (FIM)|---------------------->
