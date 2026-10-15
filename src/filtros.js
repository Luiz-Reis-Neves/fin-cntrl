// Filtros e ordenação compartilhados pelas telas de Renda e Gastos

const ORDEM_PADRAO = "cadastro-asc";

function hojeISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Barra de filtros. 'tipo' é "pagar" (gastos) ou "receber" (rendas).
// A cor do campo em foco vem da variável --cor-destaque da tela (style.css).
export function templateFiltros(tipo) {
  const verbo = tipo === "pagar" ? "pagar" : "receber";
  const campo = "campo !py-1.5";
  return `
  <div class="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-3 grid grid-cols-2 lg:flex lg:flex-wrap items-end gap-3">
    <div class="col-span-2 flex flex-col gap-1 lg:min-w-[180px]">
      <label for="filtro-categoria" class="text-xs text-gray-500">Categoria</label>
      <select id="filtro-categoria" class="${campo}">
        <option value="">Todas</option>
      </select>
    </div>
    <div class="flex flex-col gap-1">
      <label for="filtro-de" class="text-xs text-gray-500">Data de</label>
      <input type="date" id="filtro-de" class="${campo}" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="filtro-ate" class="text-xs text-gray-500">Data até</label>
      <input type="date" id="filtro-ate" class="${campo}" />
    </div>
    <div class="col-span-2 flex flex-col gap-1 lg:min-w-[220px]">
      <label for="filtro-ordem" class="text-xs text-gray-500">Ordenar por</label>
      <select id="filtro-ordem" class="${campo}">
        <option value="cadastro-asc">Cadastro: mais antigos primeiro</option>
        <option value="cadastro-desc">Cadastro: mais recentes primeiro</option>
        <option value="valor-desc">Maior valor</option>
        <option value="valor-asc">Menor valor</option>
        <option value="data-asc">Data: mais antiga primeiro</option>
        <option value="data-desc">Data: mais recente primeiro</option>
        <option value="proximas">Próximas a ${verbo}</option>
      </select>
    </div>
    <button
      type="button"
      id="btn-limpar-filtros"
      class="col-span-2 lg:col-span-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 active:scale-95 transition"
    >
      Limpar filtros
    </button>
  </div>
  `;
}

// Lê o estado atual de todos os filtros da tela
export function lerFiltros() {
  const valor = (id) => document.querySelector(id)?.value ?? "";
  return {
    mes: valor("#input-filtro-mes"),
    categoria: valor("#filtro-categoria"),
    de: valor("#filtro-de"),
    ate: valor("#filtro-ate"),
    ordem: valor("#filtro-ordem") || ORDEM_PADRAO,
  };
}

// Aplica filtros e ordenação. Não altera a lista original.
export function aplicarFiltros(lista, { mes, categoria, de, ate, ordem }) {
  const periodoPersonalizado = de || ate;

  const filtrada = lista.filter((item) => {
    if (categoria && item.categoria !== categoria) return false;
    if (periodoPersonalizado) {
      // com período escolhido, ele vale no lugar do filtro de mês
      if (de && item.data < de) return false;
      if (ate && item.data > ate) return false;
      return true;
    }
    return !mes || item.data.startsWith(mes);
  });

  const porId = (a, b) => Number(a.id) - Number(b.id);
  const porData = (a, b) => a.data.localeCompare(b.data) || porId(a, b);

  switch (ordem) {
    case "cadastro-desc":
      return filtrada.sort((a, b) => porId(b, a));
    case "valor-desc":
      return filtrada.sort((a, b) => Number(b.valor) - Number(a.valor) || porId(a, b));
    case "valor-asc":
      return filtrada.sort((a, b) => Number(a.valor) - Number(b.valor) || porId(a, b));
    case "data-asc":
      return filtrada.sort(porData);
    case "data-desc":
      return filtrada.sort((a, b) => porData(b, a));
    case "proximas": {
      // de hoje em diante, do mais próximo ao mais distante; depois os já passados, do mais recente ao mais antigo
      const hoje = hojeISO();
      const futuras = filtrada.filter((i) => i.data >= hoje).sort(porData);
      const passadas = filtrada.filter((i) => i.data < hoje).sort((a, b) => porData(b, a));
      return [...futuras, ...passadas];
    }
    default:
      return filtrada.sort(porId);
  }
}

// Texto ao lado do calendário: mês escolhido ou "Período personalizado"
function atualizarTextoMes() {
  const texto = document.querySelector("#texto-mes-atual");
  const { mes, de, ate } = lerFiltros();
  if (!texto) return;
  if (de || ate) {
    texto.textContent = "Período personalizado";
  } else if (mes) {
    const [ano, m] = mes.split("-");
    texto.textContent = `${m}/${ano}`;
  } else {
    texto.textContent = "Selecione um mês";
  }
}

// Liga os eventos da barra de filtros. 'aoMudar' redesenha a lista.
export function iniciarFiltros(aoMudar) {
  // As categorias do filtro são as mesmas do formulário de cadastro
  const select = document.querySelector("#filtro-categoria");
  document.querySelectorAll("#inputCategoria option:not([disabled])").forEach((opt) => {
    select.add(new Option(opt.textContent, opt.value));
  });

  ["#filtro-categoria", "#filtro-de", "#filtro-ate", "#filtro-ordem"].forEach((id) => {
    document.querySelector(id).addEventListener("change", () => {
      atualizarTextoMes();
      aoMudar();
    });
  });

  // Escolher um mês no calendário descarta o período personalizado
  // (este listener é registrado antes do da tela, então roda primeiro)
  document.querySelector("#input-filtro-mes").addEventListener("change", () => {
    document.querySelector("#filtro-de").value = "";
    document.querySelector("#filtro-ate").value = "";
  });

  document.querySelector("#btn-limpar-filtros").addEventListener("click", () => {
    document.querySelector("#filtro-categoria").value = "";
    document.querySelector("#filtro-de").value = "";
    document.querySelector("#filtro-ate").value = "";
    document.querySelector("#filtro-ordem").value = ORDEM_PADRAO;
    atualizarTextoMes();
    aoMudar();
  });
}

// Depois de cadastrar/editar um item, tira categoria e período do caminho
// para o item novo não "sumir" da lista (a ordenação escolhida continua)
export function limparFiltrosExtras() {
  document.querySelector("#filtro-categoria").value = "";
  document.querySelector("#filtro-de").value = "";
  document.querySelector("#filtro-ate").value = "";
}
