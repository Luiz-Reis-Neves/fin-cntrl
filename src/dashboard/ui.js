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

            <input type="month" id="input-filtro-mes" class="hidden" />
          </div>
        </div>
    `
}

function templateCardDashboard() {
  return `
    <div class="w-full h-auto p-3 flex justify-between gap-4">
          <div
            class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
            >
              <h4 class="text-gray-500 font-medium">Fonte de Renda</h4>
              <h1 class="text-3xl font-bold text-green-600">2.500,00</h1>
              <p class="text-sm text-gray-400">Total recebido em Abril/2026</p>
            </div>
          </div>

          <div
            class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
            >
              <h4 class="text-gray-500 font-medium">Fonte de Gastos</h4>
              <h1 class="text-3xl font-bold text-red-600">1.730,00</h1>
              <p class="text-sm text-gray-400">Total gastos em Abril/2026</p>
            </div>
          </div>

          <div
            class="h-[170px] flex-1 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div
              class="h-[170px] flex-1 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-center"
            >
              <h4 class="text-gray-500 font-medium">Saldo Disponível</h4>
              <h1 class="text-3xl font-bold text-green-600">770,00</h1>
              <p class="text-sm text-gray-400">Disponível em Abril/2026</p>
            </div>
          </div>

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
        </div>
    `
}

function templateCentroDashboard() {
  return `
    <div class="w-full p-3 h-auto grid grid-cols-3 gap-4">
          <div
            class="h-[400px] col-span-2 bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl border border-gray-300 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4"
          >
            <h3 class="text-gray-500 font-medium mb-2">Graficos de Gastos</h3>

            <div
              class="w-full h-[330px] border border-gray-300 rounded-2xl bg-white/50"
            ></div>
          </div>

          <div class="col-span-1 flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4 flex-1">
              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col"
              >
                <h3 class="text-gray-500 font-medium mb-2">Mini Gráfico 1</h3>
              </div>

              <div
                class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col"
              >
                <h3 class="text-gray-500 font-medium mb-2">Mini Gráfico 2</h3>
              </div>
            </div>

            <div
              class="bg-gradient-to-br from-gray-50 to-gray-200 rounded-xl shadow-md border border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex-1 flex flex-col"
            >
              <h3 class="text-gray-500 font-medium mb-2">Resumo Secundário</h3>
            </div>
          </div>
        </div>
    `
}

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
    
    `
}

export function templatesDashboard() {
  return `
    ${templateHeaderDashboard()}
    ${templateCardDashboard()}
    ${templateCentroDashboard()}
    ${templateDespesasDashboard()}
    `
}

// <------------|FEATURE DATA (INICIO)|------------->



// <------------|FEATURE DATA (FIM)|------------->


export function inicializarDashboard() {

}