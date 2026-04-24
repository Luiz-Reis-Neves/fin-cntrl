import { rendas } from "../data/store.js";
import { gastos } from "../data/store.js";
function templateHeaderDashboard() {
  return `
    <div class="w-full p-3">
          <div
            class="w-full h-auto text-green-800 bg-white px-5 py-3 flex items-center justify-between rounded-[10px] shadow-sm rounded-2xl border-l-4 border-green-800"
          >
            <h1 class="text-xl font-semibold">Dashboard</h1>

            <div class="relative flex items-center gap-2">
              <span
                id="texto-mes-atual"
                class="font-medium text-green-800 text-sm"
                >Mês atual</span
              >

              <button
                id="btn-abrir-calendario"
                class="w-8 h-8 border flex items-center justify-center py-2 rounded hover:bg-green-100 active:scale-95 btn-3d-data"
              >
                <img
                  src="/fin-cntrl/assets/calendario.png"
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

            <input type="month" class="hidden" />
          </div>
        </div>
    `;
}

// <===========|TEMPLANTES CARDS (INICIO)|==============>
// <===========|CARDS RENDAS (INICIO)|==============>
function templateCardRenda() {
  return `
          <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Fonte de Renda</h4>
                <h1 id="valor-renda-card" class="text-3xl font-bold text-green-600">0,00</h1>
                <p class="text-sm text-gray-400">Total recebido <span class="data-dinamica-card">---</span></p>
              </div>
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
    h1Renda.innerText = totalRenda.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
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
          <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Fonte de Gastos</h4>
                <h1 id="valor-gasto-card" class="text-3xl font-bold text-red-600">0,00</h1>
                <p class="text-sm text-gray-400">Total gastos <span class="data-dinamica-card">---</span></p>
              </div>
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
    h1Gasto.innerText = totalGasto.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
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
        <div
              class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
              >
                <h4 class="text-gray-500 font-medium">Saldo Disponível</h4>
                <h1 id="valor-saldo-card" class="text-3xl font-bold text-green-600">0,00</h1>
                <p class="text-sm text-gray-400">Disponível em <span class="data-dinamica-card">---</span></p>
              </div>
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
    h1Saldo.innerText = resul.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });

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
        <div
            class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
            >
              <h4 class="text-gray-500 font-medium">Cofrinho</h4>
              <h1 class="text-3xl font-bold text-green-600">3.600,00</h1>
              <p class="text-sm text-gray-400">Total acumulado</p>
            </div>
        </div>
  
  `;
}
// <===========|TEMPLANTES CARDS MAIN (INICIO)|==============>
function templateCardDashboard() {
  return `
    <div class="w-full h-auto p-3 flex justify-between gap-4">      
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
  return `
    <div class="w-full p-3 h-auto grid grid-cols-3 gap-4">
          <div
            class="h-[400px] col-span-2 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4"
          >
            <h3 class="text-gray-500 font-medium mb-2">Graficos de Gastos</h3>
            <div
              class="w-full h-[330px] border border-gray-300 rounded-2xl bg-white/50 p-2"
            >
              <canvas id="meuGraficoGastos"></canvas>
            </div>
          </div>

          <div class="col-span-1 flex flex-col gap-4 h-[400px]">
            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col"
              >
                <h3 class="text-gray-500 font-medium mb-2 text-sm">
                  Renda vs. Gastos
                </h3>
                <div
                  class="relative flex justify-center items-center w-[110px] h-[110px] mt-2 mb-1 mx-auto"
                >
                  <canvas id="graficoProporcao"></canvas>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col overflow-hidden"
              >
                <h3
                  class="text-gray-500 font-medium text-sm w-full text-left mb-2"
                >
                  Top 3 Despesas
                </h3>
                <div
                  id="lista-top-despesas"
                  class="flex flex-col gap-2 mt-1"
                ></div>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex-1 flex flex-col"
            >
              <h3 class="text-gray-500 font-medium mb-2">Evolução (4 meses)</h3>

              <div class="relative w-full flex-1 min-h-0">
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

// Variável global para guardar o gráfico atual.
// Isso é MUITO IMPORTANTE para podermos apagá-lo antes de desenhar o do próximo mês!
// Variável global para guardar o gráfico atual. (Não remova!)
let graficoAtual = null;

function atualizarGrafico(mesISO) {
  if (!mesISO) return;

  // 1. Pega só os gastos do mês selecionado (Lógica original, perfeita)
  const gastosDoMes = gastos.filter((item) => item.data?.startsWith(mesISO));

  // 2. Agrupa os valores por Categoria (Lógica original, perfeita)
  const totaisPorCategoria = {};
  gastosDoMes.forEach((gasto) => {
    const cat = gasto.categoria || "Outros";
    if (totaisPorCategoria[cat]) {
      totaisPorCategoria[cat] += Number(gasto.valor);
    } else {
      totaisPorCategoria[cat] = Number(gasto.valor);
    }
  });

  // 3. Separa os Nomes (Labels) e os Valores (Data) (Lógica original, perfeita)
  const nomesCategorias = Object.keys(totaisPorCategoria);
  const valoresCategorias = Object.values(totaisPorCategoria);

  // 4. Desenha o Gráfico!
  const canvas = document.getElementById("meuGraficoGastos");
  if (!canvas) return; // Proteção para evitar erros

  // Se já existir um gráfico, destrói para criar o novo do próximo mês (Não remova!)
  if (graficoAtual) {
    graficoAtual.destroy();
  }

  // Cria o novo gráfico - VERSÃO EM BARRAS
  graficoAtual = new Chart(canvas, {
    type: "bar", // MUDANÇA: 'doughnut' para 'bar'
    data: {
      labels: nomesCategorias, // Categorias no eixo X
      datasets: [
        {
          label: "Total Gasto (R$)", // Rótulo do conjunto de dados
          data: valoresCategorias, // Valores no eixo Y
          // Mantemos as cores bonitinhas para cada barra
          backgroundColor: [
            "#EF4444",
            "#F59E0B",
            "#10B981",
            "#3B82F6",
            "#8B5CF6",
            "#EC4899",
          ],
          borderWidth: 0,
          borderRadius: 5, // Um toque sutil: deixa o topo das barras arredondado
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false, // MUDANÇA: Ocultamos a legenda, pois os nomes já estão no eixo X
        },
        tooltip: {
          // Configuração do balãozinho de informações ao passar o mouse
          callbacks: {
            label: function (context) {
              return " " + context.formattedValue + " Gasto";
            },
          },
        },
      },
      // MUDANÇA IMPORTANTE: Configurando os eixos (scales)
      scales: {
        y: {
          // Eixo Y (Valores)
          beginAtZero: true, // Garante que comece do 0
          title: {
            display: true,
            text: "Total Gasto (R$)", // Título do eixo Y (like example's "(habitantes/km²)")
            font: {
              size: 14,
              weight: "bold",
            },
          },
          ticks: {
            // Formatar os valores do eixo Y para dinheiro (R$)
            callback: function (value, index, values) {
              return "R$ " + value.toLocaleString("pt-BR");
            },
          },
        },
        x: {
          // Eixo X (Categorias)
          title: {
            display: true,
            text: "Categorias de Gastos", // Título do eixo X
            font: {
              size: 14,
              weight: "bold",
            },
          },
          grid: {
            display: false, // Tira as linhas de grade verticais para ficar mais clean
          },
        },
      },
    },
  });
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
          <span class="truncate">${gasto.categoria || 'Outros'}</span>
        </div>
        
        <div class="${corTexto} pl-5">
          R$ ${Number(gasto.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
        
      </div>
    `;
    divLista.innerHTML += itemHTML;
  });
}

// <==================|GRAFICOS FIM|=========================>

function templateDespesasDashboard() {
  return `
    <div class="w-full h-auto p-3">
          <div
            class="col-span-3 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md p-5"
          >
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-gray-600 font-bold text-lg">
                Resumo por Categoria
              </h3>
              <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              class="grid grid-cols-12 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-300 pb-2 mb-2 px-2"
            >
              <div class="col-span-4">Categoria</div>
              <div class="col-span-6">Descrição</div>
              <div class="col-span-2 text-right">Total</div>
            </div>

            <div class="flex flex-col">
              <div
                class="grid grid-cols-12 items-center py-3 border-b border-gray-200/80 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2 -mx-2"
              >
                <div class="col-span-4 flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    A
                  </div>
                  <span class="font-semibold text-gray-700">Assinaturas</span>
                </div>

                <div class="col-span-6 text-sm text-gray-500 truncate pr-4">
                  Netflix, Spotify, Crunchyroll
                </div>

                <div class="col-span-2 text-right font-bold text-red-600">
                  - R$ 85,00
                </div>
              </div>

              <div
                class="grid grid-cols-12 items-center py-3 border-b border-gray-200/80 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2 -mx-2"
              >
                <div class="col-span-4 flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    S
                  </div>
                  <span class="font-semibold text-gray-700">Supermercado</span>
                </div>
                <div class="col-span-6 text-sm text-gray-500 truncate pr-4">
                  Atacadão, Padaria, Feira
                </div>
                <div class="col-span-2 text-right font-bold text-red-600">
                  - R$ 650,00
                </div>
              </div>

              <div
                class="grid grid-cols-12 items-center py-3 border-b border-gray-200/80 last:border-0 hover:bg-white/40 transition-colors rounded-lg px-2 -mx-2"
              >
                <div class="col-span-4 flex items-center gap-3">
                  <div
                    class="w-9 h-9 rounded-full bg-yellow-200 text-yellow-800 flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    C
                  </div>
                  <span class="font-semibold text-gray-700"
                    >Contas da Casa</span
                  >
                </div>
                <div class="col-span-6 text-sm text-gray-500 truncate pr-4">
                  Energia, Água, Internet
                </div>
                <div class="col-span-2 text-right font-bold text-red-600">
                  - R$ 320,00
                </div>
              </div>
            </div>
          </div>
        </div>
    
    `;
}

export function templatesDashboard() {
  return `
    ${templateHeaderDashboard()}
    ${templateCardDashboard()}
    ${templateCentroDashboard()}
    ${templateDespesasDashboard()}
    `;
}

// <------------| FEATURE DATA (INICIO) |------------->

function configurarCalendario() {
  const input = document.getElementById("input-filtro-mes");
  const btn = document.getElementById("btn-abrir-calendario");
  const textoHeader = document.getElementById("texto-mes-atual");

  if (!input || !btn) return;

  btn.onclick = () => input.showPicker();

  input.onchange = (evento) => {
    const valor = evento.target.value; // Ex: "2026-05"
    const [ano, mes] = valor.split("-");

    // Atualiza Header (isso você disse que já funciona)
    if (textoHeader) textoHeader.innerText = `${mes}/${ano}`;

    // PUXA A ATUALIZAÇÃO DOS CARDS
    cardRendas(valor);
    cardGastos(valor);
    cardSaldo(valor);
    atualizarGrafico(valor);
    atualizarMiniGrafico1(valor);
    atualizarMiniGrafico2(valor);
    atualizarTopDespesas(valor);
  };

  // Roda uma vez no início para o card não nascer com "2.500,00" fixo
  if (input.value) cardRendas(input.value);
}

// <------------| FEATURE DATA (FIM) |------------->

export function inicializarDashboard() {
  configurarCalendario();
}
