/**
 * Categorias de gasto e suas cores.
 *
 * Fonte única usada pelo formulário, pelas etiquetas da lista e pelo gráfico
 * do dashboard, para que uma categoria tenha a mesma cor em todo o app.
 * As classes do Tailwind precisam estar escritas por extenso para entrarem no CSS gerado.
 */
export interface CategoriaGasto {
  nome: string;
  etiqueta: string; // classes Tailwind da etiqueta na lista
  cor: string; // cor sólida usada nos gráficos
}

export const CATEGORIAS_GASTO: readonly CategoriaGasto[] = [
  { nome: "Aluguel / Prestação", etiqueta: "bg-slate-100 text-slate-700 ring-slate-300", cor: "#64748b" },
  { nome: "Conta de Luz", etiqueta: "bg-yellow-100 text-yellow-800 ring-yellow-300", cor: "#eab308" },
  { nome: "Conta de Água", etiqueta: "bg-cyan-100 text-cyan-800 ring-cyan-300", cor: "#06b6d4" },
  { nome: "Internet", etiqueta: "bg-sky-100 text-sky-800 ring-sky-300", cor: "#0ea5e9" },
  { nome: "Conta de Telefone", etiqueta: "bg-blue-100 text-blue-800 ring-blue-300", cor: "#3b82f6" },
  { nome: "Supermercado", etiqueta: "bg-emerald-100 text-emerald-800 ring-emerald-300", cor: "#10b981" },
  { nome: "Restaurante / Delivery", etiqueta: "bg-orange-100 text-orange-800 ring-orange-300", cor: "#f97316" },
  { nome: "Combustível", etiqueta: "bg-red-100 text-red-800 ring-red-300", cor: "#ef4444" },
  { nome: "Aplicativos (Uber/99)", etiqueta: "bg-stone-100 text-stone-700 ring-stone-300", cor: "#78716c" },
  { nome: "Assinaturas (Netflix, Spotify, etc.)", etiqueta: "bg-purple-100 text-purple-800 ring-purple-300", cor: "#a855f7" },
  { nome: "Lazer / Saídas", etiqueta: "bg-fuchsia-100 text-fuchsia-800 ring-fuchsia-300", cor: "#d946ef" },
  { nome: "Faculdade / Cursos", etiqueta: "bg-indigo-100 text-indigo-800 ring-indigo-300", cor: "#6366f1" },
  { nome: "Fatura do Cartão de Crédito", etiqueta: "bg-rose-100 text-rose-800 ring-rose-300", cor: "#f43f5e" },
  { nome: "Imprevistos", etiqueta: "bg-amber-100 text-amber-800 ring-amber-300", cor: "#f59e0b" },
  { nome: "Pagamentos de Terceiros", etiqueta: "bg-teal-100 text-teal-800 ring-teal-300", cor: "#14b8a6" },
  { nome: "Outros Gastos", etiqueta: "bg-gray-100 text-gray-700 ring-gray-300", cor: "#9ca3af" },
];

const SEM_CATEGORIA: CategoriaGasto = {
  nome: "",
  etiqueta: "bg-gray-100 text-gray-500 ring-gray-200",
  cor: "#d1d5db",
};

/** Dados visuais da categoria; categorias desconhecidas recebem um estilo neutro. */
export function categoriaGasto(nome: string): CategoriaGasto {
  return CATEGORIAS_GASTO.find((categoria) => categoria.nome === nome) ?? { ...SEM_CATEGORIA, nome };
}
