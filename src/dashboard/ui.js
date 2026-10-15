import Chart from "chart.js/auto";
import { rendas, gastos } from "../data/store.js";
import { escaparHTML } from "../dom.ts";
import { categoriaGasto } from "../gastos/categorias.ts";

const formatoMoeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function templateHeaderDashboard() {
  return `
    <header class="bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-green-700 p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
      <div class="flex-1">
        <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <p class="text-sm text-gray-500">Resumo das suas finanças no mês</p>
      </div>
      <div class="relative">
        <button
          type="button"
          id="btn-abrir-calendario"
          aria-label="Escolher mês"
          class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <span id="texto-mes-atual">Mês atual</span>
        </button>
        <input
          type="month"
          id="input-filtro-mes"
          class="absolute right-0 top-full opacity-0 w-1 h-1 pointer-events-none -z-10"
        />
      </div>
    </header>
    `;
}

// <===========|TEMPLANTES CARDS (INICIO)|==============>
// <===========|CARDS RENDAS (INICIO)|==============>
function templateCardRenda() {
  return `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-500">Rendas</h2>
        <span class="w-9 h-9 rounded-xl flex items-center justify-center bg-green-50 text-green-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/></svg></span>
      </div>
      <p id="valor-renda-card" class="text-2xl xl:text-3xl font-bold tabular-nums text-green-600">R$ 0,00</p>
      <p class="text-xs text-gray-400">Total recebido em <span class="data-dinamica-card">---</span></p>
    </div>
  `;
}

function cardRendas(mesISO) {
  if (!mesISO) return;

  // 1. Filtro e Soma (Lógica de Negócio)
  const filtrados = rendas.filter((item) => item.data?.startsWith(mesISO));

  const totalRenda = filtrados.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  // 2. Atualização do Valor Principal
  const h1Renda = document.getElementById("valor-renda-card");
  if (h1Renda) {
    h1Renda.innerText = formatoMoeda.format(totalRenda);
  }

  // 3. Atualização das Legendas (Visual)
  const [ano, mes] = mesISO.split("-");
  const mesesNomes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const legendaHumana = `${mesesNomes[parseInt(mes) - 1]} / ${ano}`;

  document.querySelectorAll(".data-dinamica-card").forEach((el) => {
    el.innerText = legendaHumana;
  });
}
// <===========|CARDS RENDAS (FIM)|==============>
// <===========|CARDS GASTOS (INICIO)|==============>
function templateCardGasto() {
  return `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-500">Gastos</h2>
        <span class="w-9 h-9 rounded-xl flex items-center justify-center bg-red-50 text-red-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"/></svg></span>
      </div>
      <p id="valor-gasto-card" class="text-2xl xl:text-3xl font-bold tabular-nums text-red-600">R$ 0,00</p>
      <p class="text-xs text-gray-400">Total gasto em <span class="data-dinamica-card">---</span></p>
    </div>
  `;
}
function cardGastos(mesISO) {
  if (!mesISO) return;

  // 1. Filtro e Soma (Lógica de Negócio)
  const filtrados = gastos.filter((item) => item.data?.startsWith(mesISO));

  const totalGasto = filtrados.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  // 2. Atualização do Valor Principal
  const h1Gasto = document.getElementById("valor-gasto-card");
  if (h1Gasto) {
    h1Gasto.innerText = formatoMoeda.format(totalGasto);
  }

  // 3. Atualização das Legendas (Visual)
  const [ano, mes] = mesISO.split("-");
  const mesesNomes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const legendaHumana = `${mesesNomes[parseInt(mes) - 1]} / ${ano}`;

  document.querySelectorAll(".data-dinamica-card").forEach((el) => {
    el.innerText = legendaHumana;
  });
}
// <===========|CARDS GASTOS (FIM)|==============>
// <===========|CARDS SOLDO DISPONIVEL (INICIO)|==============>
function templateCardDisponivel() {
  return `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-500">Saldo disponível</h2>
        <span class="w-9 h-9 rounded-xl flex items-center justify-center bg-sky-50 text-sky-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg></span>
      </div>
      <p id="valor-saldo-card" class="text-2xl xl:text-3xl font-bold tabular-nums text-green-600">R$ 0,00</p>
      <p class="text-xs text-gray-400">Disponível em <span class="data-dinamica-card">---</span></p>
    </div>
  `;
}

function cardSaldo(mesISO) {
  if (!mesISO) return;

  // 1. Calcula o total de RENDAS do mês
  let rendasFiltradas = rendas.filter((item) => item.data?.startsWith(mesISO));
  let totalRenda = rendasFiltradas.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  // 2. Calcula o total de GASTOS do mês (usando o array de gastos!)
  let gastosFiltrados = gastos.filter((item) => item.data?.startsWith(mesISO));
  let totalGasto = gastosFiltrados.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  // 3. Faz a matemática real
  let resul = totalRenda - totalGasto;

  // 4. Atualização do Valor Principal na Tela
  let h1Saldo = document.getElementById("valor-saldo-card");

  if (h1Saldo) {
    h1Saldo.innerText = formatoMoeda.format(resul);

    // Bônus: Muda a cor do texto se o saldo ficar negativo
    if (resul < 0) {
      h1Saldo.classList.replace("text-green-600", "text-red-600");
    } else {
      h1Saldo.classList.replace("text-red-600", "text-green-600");
    }
  }

  // 5. Atualização das Legendas (Visual)
  const [ano, mes] = mesISO.split("-");
  const mesesNomes = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const legendaHumana = `${mesesNomes[parseInt(mes) - 1]} / ${ano}`;

  document.querySelectorAll(".data-dinamica-card").forEach((el) => {
    el.innerText = legendaHumana;
  });
}
// <===========|CARDS SOLDO DISPONIVEL (FIM)|==============>

function templateCardCofrinho() {
  return `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <h2 class="text-sm font-medium text-gray-500">Cofrinho</h2>
        <span class="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-50 text-amber-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 9v1m9-5a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>
      </div>
      <p  class="text-2xl xl:text-3xl font-bold tabular-nums text-gray-300">Em breve</p>
      <p class="text-xs text-gray-400">Total acumulado</p>
    </div>
  `;
}
// <===========|TEMPLANTES CARDS MAIN (INICIO)|==============>
function templateCardDashboard() {
  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    ${templateCardRenda()}
    ${templateCardGasto()}
    ${templateCardDisponivel()}
    ${templateCardCofrinho()}
    </div>
    `;
}
// <===========|TEMPLANTES CARDS MAIN (FIM)|==============>
// <===========|TEMPLANTES CARDS (FIM)|==============>
function templateCentroDashboard() {
  const card = "bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5";
  return `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="${card} lg:col-span-2 flex flex-col">
        <div class="flex items-baseline justify-between gap-3 mb-4">
          <h3 class="font-semibold text-gray-700">Gastos por categoria</h3>
          <p id="resumo-categorias" class="text-xs text-gray-400"></p>
        </div>
        <ol id="grafico-categorias" class="flex-1 flex flex-col justify-evenly gap-4" aria-label="Gastos por categoria, do maior para o menor"></ol>
      </div>

      <div class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="${card} flex flex-col">
            <h3 class="font-semibold text-gray-700 text-sm">Renda vs. Gastos</h3>
            <div class="relative w-[110px] h-[110px] mx-auto mt-3">
              <canvas id="graficoProporcao"></canvas>
            </div>
          </div>

          <div class="${card} flex flex-col overflow-hidden">
            <h3 class="font-semibold text-gray-700 text-sm mb-2">Top 3 despesas</h3>
            <div id="lista-top-despesas" class="flex flex-col gap-2 mt-1"></div>
          </div>
        </div>

        <div class="${card} flex-1 flex flex-col min-h-[200px]">
          <h3 class="font-semibold text-gray-700 mb-2">Evolução dos gastos (4 meses)</h3>
          <div class="relative w-full flex-1 min-h-[140px]">
            <div class="absolute inset-0">
              <canvas id="graficoEvolucao"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

// <==================|GRAFICOS|=========================>

// Quantas categorias aparecem antes de agrupar o restante em "Outras"
const MAX_CATEGORIAS = 6;

// Ranking de gastos por categoria em barras horizontais (HTML, sem canvas):
// nomes longos ficam legíveis e valor e porcentagem aparecem sem depender do mouse.
// As barras têm uma cor só; a cor da categoria fica na bolinha, igual à etiqueta da lista.
function atualizarGrafico(mesISO) {
  if (!mesISO) return;

  const lista = document.getElementById("grafico-categorias");
  const resumo = document.getElementById("resumo-categorias");
  if (!lista) return;

  // 1. Soma os gastos do mês por categoria
  const totaisPorCategoria = {};
  gastos
    .filter((item) => item.data?.startsWith(mesISO))
    .forEach((gasto) => {
      const cat = gasto.categoria || "Outros Gastos";
      totaisPorCategoria[cat] = (totaisPorCategoria[cat] || 0) + (Number(gasto.valor) || 0);
    });

  // 2. Ordena do maior para o menor e agrupa a cauda em "Outras"
  let linhas = Object.entries(totaisPorCategoria)
    .map(([nome, valor]) => ({ nome, valor, cor: categoriaGasto(nome).cor }))
    .sort((a, b) => b.valor - a.valor);

  if (linhas.length > MAX_CATEGORIAS) {
    const cauda = linhas.slice(MAX_CATEGORIAS - 1);
    linhas = [
      ...linhas.slice(0, MAX_CATEGORIAS - 1),
      {
        nome: `Outras (${cauda.length} categorias)`,
        valor: cauda.reduce((acc, linha) => acc + linha.valor, 0),
        cor: "#d1d5db",
      },
    ];
  }

  const total = linhas.reduce((acc, linha) => acc + linha.valor, 0);
  const maior = linhas[0]?.valor || 0;

  if (resumo) {
    const qtd = Object.keys(totaisPorCategoria).length;
    resumo.textContent = qtd > 0 ? `${formatoMoeda.format(total)} em ${qtd} ${qtd === 1 ? "categoria" : "categorias"}` : "";
  }

  if (linhas.length === 0) {
    lista.innerHTML = '<li class="py-10 my-auto text-center text-sm text-gray-400">Nenhum gasto neste mês.</li>';
    return;
  }

  // 3. Desenha uma linha por categoria; a barra é proporcional à maior categoria
  lista.innerHTML = linhas
    .map(({ nome, valor, cor }) => {
      const porcentagem = total > 0 ? Math.round((valor / total) * 100) : 0;
      const largura = maior > 0 ? Math.max((valor / maior) * 100, 1) : 0;
      return `
      <li class="group" title="${escaparHTML(nome)}: ${formatoMoeda.format(valor)} (${porcentagem}% do mês)">
        <div class="flex items-baseline justify-between gap-4">
          <div class="flex items-center gap-2 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" style="background:${cor}" aria-hidden="true"></span>
            <span class="truncate text-sm text-gray-700">${escaparHTML(nome)}</span>
          </div>
          <div class="shrink-0 text-sm tabular-nums">
            <span class="font-semibold text-gray-800">${formatoMoeda.format(valor)}</span>
            <span class="inline-block w-10 text-right text-xs text-gray-400">${porcentagem}%</span>
          </div>
        </div>
        <div class="mt-1.5 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div class="h-full rounded-full bg-[#9F0712] opacity-85 group-hover:opacity-100 transition-opacity" style="width:${largura}%"></div>
        </div>
      </li>`;
    })
    .join("");
}

// Variável global para este gráfico também!
let chartProporcao = null;

function atualizarMiniGrafico1(mesISO) {
  if (!mesISO) return;

  // 1. Pega os totais do mês (reaproveitando a lógica que você já domina)
  const rendasMes = rendas.filter((item) => item.data?.startsWith(mesISO));
  const totalRenda = rendasMes.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  const gastosMes = gastos.filter((item) => item.data?.startsWith(mesISO));
  const totalGasto = gastosMes.reduce(
    (acc, item) => acc + (Number(item.valor) || 0),
    0,
  );

  // 2. Calcula o Restante (Não podemos deixar negativo pro gráfico não bugar)
  let restante = totalRenda - totalGasto;
  if (restante < 0) restante = 0;

  const canvas = document.getElementById("graficoProporcao");
  if (!canvas) return;

  // Destrói o anterior se houver
  if (chartProporcao) {
    chartProporcao.destroy();
  }

  // 3. Tratamento para mês vazio (Se não tiver nem renda nem gasto)
  let labelsGrafico = ["Gastos", "Disponível"];
  let dadosGrafico = [totalGasto, restante];
  let cores = ["#EF4444", "#10B981"]; // Vermelho (Gasto) e Verde (Restante)

  if (totalRenda === 0 && totalGasto === 0) {
    labelsGrafico = ["Sem movimentação"];
    dadosGrafico = [1]; // Cria uma rosca 100% cheia...
    cores = ["#D1D5DB"]; // ...com cor cinza claro
  }

  // 4. Desenha a Rosca
  chartProporcao = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: labelsGrafico,
      datasets: [
        {
          data: dadosGrafico,
          backgroundColor: cores,
          borderWidth: 0,
          cutout: "75%", // Esse é o segredo! Deixa o buraco no meio bem grande, estilo anel
        },
      ],
    },
    // 👇 O 'options' TEM que existir e envolver o 'plugins'
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 0, // Tira aquele espaço extra em volta
      },
      plugins: {
        legend: {
          display: false, // AGORA SIM ele vai obedecer e sumir com a legenda!
        },
        tooltip: {
          displayColors: false,
          bodyFont: { size: 11 },
          padding: 8,
          callbacks: {
            title: function () {
              return null;
            },
            label: function (context) {
              if (context.label === "Sem movimentação") return "Sem dados";
              return `${context.label}: R$ ${context.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
            },
          },
        },
      },
    },
  });
}

// Variável global para não sobrepor gráficos
let chartEvolucao = null;

function atualizarMiniGrafico2(mesISO) {
  if (!mesISO) return;

  // 1. LÓGICA DE VIAGEM NO TEMPO (Pega os últimos 4 meses)
  const [anoAtual, mesAtual] = mesISO.split("-");
  const mesesLabels = []; // Nomes pra mostrar no gráfico (Jan, Fev...)
  const mesesBusca = []; // Formato ISO pra filtrar (2026-01, 2026-02...)
  const nomesMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Fazemos um loop que roda 4 vezes (do mais antigo pro mais novo)
  for (let i = 3; i >= 0; i--) {
    let dataCalculada = new Date(anoAtual, mesAtual - 1 - i, 1); // Subtrai os meses
    let a = dataCalculada.getFullYear();
    let m = String(dataCalculada.getMonth() + 1).padStart(2, "0");

    mesesBusca.push(`${a}-${m}`);
    mesesLabels.push(nomesMeses[dataCalculada.getMonth()]);
  }

  // 2. BUSCA OS GASTOS DESSES 4 MESES
  const dadosGastos = mesesBusca.map((isoBusca) => {
    // Filtra e soma os gastos para cada mês do array
    const gastosDoMes = gastos.filter((item) =>
      item.data?.startsWith(isoBusca),
    );
    return gastosDoMes.reduce(
      (acc, item) => acc + (Number(item.valor) || 0),
      0,
    );
  });

  // 3. DESENHA O GRÁFICO NA TELA
  const canvas = document.getElementById("graficoEvolucao");
  if (!canvas) return;

  if (chartEvolucao) {
    chartEvolucao.destroy();
  }

  chartEvolucao = new Chart(canvas, {
    type: "line", // <-- O tipo MUDOU para linha
    data: {
      labels: mesesLabels,
      datasets: [
        {
          data: dadosGastos,
          borderColor: "#EF4444", // Linha vermelha
          backgroundColor: "rgba(239, 68, 68, 0.1)", // Dá um preenchimento suave embaixo da linha
          borderWidth: 2,
          fill: true, // Ativa o preenchimento que configuramos acima
          tension: 0.4, // Deixa a linha suave/curvada (tente colocar 0 pra ver ela reta!)
          pointRadius: 3, // Tamanho da bolinha em cada mês
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }, // Sem legenda pra ficar clean
        tooltip: {
          displayColors: false,
          callbacks: {
            label: function (context) {
              return `Gastos: R$ ${context.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
            },
          },
        },
      },
      // TRUQUE PARA MINI CARDS: Escondemos as linhas de grade para não poluir
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          display: false, // Escondemos o eixo Y (os números da esquerda) inteiro!
          beginAtZero: true,
        },
      },
    },
  });
}

function atualizarTopDespesas(mesISO) {
  if (!mesISO) return;

  const divLista = document.getElementById('lista-top-despesas');
  if (!divLista) return;

  // 1. Pega apenas os gastos do mês selecionado
  const gastosMes = gastos.filter(item => item.data?.startsWith(mesISO));

  // 2. Coloca em ordem decrescente (do mais caro pro mais barato) e pega os 3 primeiros
  const top3 = gastosMes
    .sort((a, b) => Number(b.valor) - Number(a.valor))
    .slice(0, 3);

  // 3. Limpa a lista na tela antes de desenhar os novos
  divLista.innerHTML = '';

  // 4. Se não tiver nenhum gasto no mês, mostra um aviso amigável
  if (top3.length === 0) {
    divLista.innerHTML = '<p class="text-sm text-gray-400 text-center mt-4">Nenhum gasto neste mês.</p>';
    return;
  }

  // 5. Desenha os 3 itens na tela
  // 5. Desenha os 3 itens na tela (VERSÃO VERTICAL - Limpa e Espaçosa)
  top3.forEach((gasto, index) => {
    const ehOPrimeiro = index === 0;

    // Mantém o destaque visual para o primeiro lugar
    const corTexto = ehOPrimeiro ? 'text-red-600 font-bold text-sm' : 'text-red-500 font-medium text-sm';
    const iconeRanking = ehOPrimeiro ? '🥇' : (index === 1 ? '🥈' : '🥉');

    // MUDANÇA: Tiramos o 'justify-between' e colocamos 'flex-col' para empilhar
    const itemHTML = `
      <div class="flex flex-col border-b border-gray-200 pb-1 mb-1 last:border-0 last:mb-0 last:pb-0">
        
        <div class="flex items-center  text-gray-600 text-xs ">
          <span class="text-sm">${iconeRanking}</span>
          <span class="truncate">${escaparHTML(gasto.categoria || 'Outros')}</span>
        </div>
        
        <div class="${corTexto} pl-5">
          R$ ${Number(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        
      </div>
    `;
    divLista.innerHTML += itemHTML;
  });
}

function atualizarGestaoPorRenda(mesISO) {
  if (!mesISO) return;

  const container = document.getElementById('lista-gestao-rendas');
  if (!container) return;

  // 1. Pega os dados do mês
  const rendasMes = rendas.filter(item => item.data?.startsWith(mesISO));
  const gastosMes = gastos.filter(item => item.data?.startsWith(mesISO));

  container.innerHTML = '';

  if (rendasMes.length === 0) {
    container.innerHTML = '<div class="py-4 text-center text-gray-500 text-sm italic">Nenhuma renda cadastrada neste mês.</div>';
    return;
  }

  // Ordena as rendas do início para o fim do mês
  rendasMes.sort((a, b) => a.data.localeCompare(b.data));

  const coresBolinhas = [
    'bg-purple-200 text-purple-700',
    'bg-emerald-200 text-emerald-800',
    'bg-blue-200 text-blue-800',
    'bg-yellow-200 text-yellow-800',
    'bg-pink-200 text-pink-800'
  ];

  const gastosJaListados = new Set();

  // 2. CRIA OS POTINHOS (CRUZANDO AS DATAS)
  rendasMes.forEach((renda, index) => {
    // FILTRO MÁGICO: Só pega os gastos do MESMO DIA da renda
    // (se tiver 2 rendas no mesmo dia, o gasto fica só na primeira, pra não contar duas vezes)
    const gastosDestaRenda = gastosMes.filter(g => g.data === renda.data && !gastosJaListados.has(g));
    gastosDestaRenda.forEach(g => gastosJaListados.add(g));

    // Cálculos
    const totalGasto = gastosDestaRenda.reduce((acc, g) => acc + (Number(g.valor) || 0), 0);
    const saldoRestante = Number(renda.valor) - totalGasto;
    const corSaldo = saldoRestante >= 0 ? 'text-emerald-600' : 'text-red-600';

    // Formatação visual
    const [ano, mes, dia] = renda.data.split('-');
    const nomeOriginal = renda.descricao || renda.categoria || 'Renda';
    const nomeRenda = escaparHTML(nomeOriginal);
    const primeiraLetra = escaparHTML(nomeOriginal.charAt(0).toUpperCase());
    const corClass = coresBolinhas[index % coresBolinhas.length];

    // Junta o nome das contas pagas (Ex: "Netflix, Spotify, Luz")
    let descricoesGastos = gastosDestaRenda.map(g => escaparHTML(g.categoria || g.descricao)).join(', ');
    if (!descricoesGastos) descricoesGastos = '<span class="italic text-gray-400">Nenhum gasto neste dia.</span>';

    const rowHTML = `
      <div class="grid grid-cols-12 items-center py-3 border-b border-gray-200/80 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2 -mx-2">
        
        <div class="col-span-4 flex items-center gap-3">
          <div class="${corClass} w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            ${primeiraLetra}
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="font-semibold text-gray-700 truncate">${nomeRenda}</span>
            <span class="text-[10px] text-gray-400 font-medium">Dia ${dia}/${mes}</span>
          </div>
        </div>

        <div class="col-span-6 text-sm text-gray-500 truncate pr-4">
          ${descricoesGastos}
        </div>

        <div class="col-span-2 text-right flex flex-col items-end">
          <span class="font-bold ${corSaldo} whitespace-nowrap">
            R$ ${saldoRestante.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

      </div>
    `;

    container.innerHTML += rowHTML;
  });

  // 3. POTE DE SEGURANÇA: Contas que ficaram de fora (Dias sem Renda)
  const gastosSobrando = gastosMes.filter(g => !gastosJaListados.has(g));

  if (gastosSobrando.length > 0) {
    const totalSobrando = gastosSobrando.reduce((acc, g) => acc + (Number(g.valor) || 0), 0);
    const descricoesSobrando = gastosSobrando.map(g => escaparHTML(g.categoria || g.descricao)).join(', ');

    const rowSobrandoHTML = `
      <div class="grid grid-cols-12 items-center py-3 border-b border-red-200 bg-red-50/50 mt-2 rounded-lg px-2 -mx-2">
        <div class="col-span-4 flex items-center gap-3">
          <div class="bg-red-200 text-red-800 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            ⚠️
          </div>
          <div class="flex flex-col">
            <span class="font-semibold text-red-700 truncate">Outros Dias</span>
            <span class="text-[10px] text-red-400 font-medium">Sem renda vinculada</span>
          </div>
        </div>
        <div class="col-span-6 text-sm text-red-500/80 truncate pr-4">
          ${descricoesSobrando}
        </div>
        <div class="col-span-2 text-right flex flex-col items-end">
          <span class="font-bold text-red-600 whitespace-nowrap">
            - R$ ${totalSobrando.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    `;
    container.innerHTML += rowSobrandoHTML;
  }
}

// <==================|GRAFICOS FIM|=========================>

function templateDespesasDashboard() {
  return `
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5 overflow-x-auto">
      <div class="min-w-[560px]">
        
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-700">Gestão de salários (potinhos)</h3>
        </div>

        <div class="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-300 pb-2 mb-2 px-2">
          <div class="col-span-4">Renda / Pote</div>
          <div class="col-span-6">Despesas Pagas (Mesmo Dia)</div>
          <div class="col-span-2 text-right">Saldo Restante</div>
        </div>

        <div id="lista-gestao-rendas" class="flex flex-col">
        </div>

      </div>
    </div>
  `;
}

export function templatesDashboard() {
  return `
    <section class="w-full max-w-6xl mx-auto p-4 md:p-6 flex flex-col gap-4">
    ${templateHeaderDashboard()}
    ${templateCardDashboard()}
    ${templateCentroDashboard()}
    ${templateDespesasDashboard()}
    </section>
    `;
}

// <------------| FEATURE DATA (INICIO) |------------->

// Redesenha todos os cards e gráficos para o mês escolhido (ex: "2026-04")
function atualizarDashboard(mesISO) {
  if (!mesISO) return;

  const [ano, mes] = mesISO.split("-");
  const textoHeader = document.getElementById("texto-mes-atual");
  if (textoHeader) textoHeader.innerText = `${mes}/${ano}`;

  cardRendas(mesISO);              // Atualiza o número de Renda Total
  cardGastos(mesISO);              // Atualiza o número de Gasto Total
  cardSaldo(mesISO);               // Atualiza o número de Saldo Total
  atualizarGrafico(mesISO);        // Atualiza o Gráfico Principal de Barras
  atualizarMiniGrafico1(mesISO);   // Atualiza o Gráfico de Rosca
  atualizarMiniGrafico2(mesISO);   // Atualiza o Gráfico de Evolução
  atualizarTopDespesas(mesISO);    // Atualiza a listinha do Top 3
  atualizarGestaoPorRenda(mesISO); // Atualiza os Potinhos por Data
}

function configurarCalendario() {
  const input = document.getElementById("input-filtro-mes");
  const btn = document.getElementById("btn-abrir-calendario");

  if (!input || !btn) return;

  btn.onclick = () => input.showPicker();

  // Se o usuário clicar em "Limpar" o valor fica vazio, então ignoramos
  input.onchange = (evento) => atualizarDashboard(evento.target.value);

  // Já abre no mês atual, em vez de tudo zerado esperando escolher um mês
  const hoje = new Date();
  input.value = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
  atualizarDashboard(input.value);
}

// <------------| FEATURE DATA (FIM) |------------->

export function inicializarDashboard() {
  configurarCalendario();
}
