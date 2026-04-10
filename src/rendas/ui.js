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
            <button
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
        </section>
    
    `
}