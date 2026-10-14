import { gastos } from "../data/store.js"; // Lembre-se de criar o array 'gastos' no store.js!
import { salvarDados } from "../data/store.js";
export function adicionarGasto({ categoria, valor, data, descricao }) {
    let id = Date.now()
    let dadosDeGasto = {
        id: id,
        categoria: categoria,
        valor: Number(valor),
        data: data,
        descricao: descricao
    }
    gastos.push(dadosDeGasto)
    salvarDados();
    return gastos
    // return console.table(gastos)
}

export function calcularTotalGasto(lista = gastos) { // 'gastos' é o padrão caso não venha filtro
    return lista.reduce((acc, item) => acc + Number(item.valor), 0)
}

export function editarGasto(id, novosDados) {
    // [DETETIVE]: Percorre o array 'gastos' para encontrar em qual posição (index) está o item com o ID enviado
    //String() para garantir que a comparação funcione mesmo se um for número e o outro texto
    const index = gastos.findIndex(g => String(g.id) === String(id));

    // [VERIFICAÇÃO]: O findIndex retorna -1 se não achar nada. Aqui checa se ele realmente encontrou o item
    if (index !== -1) {
        // [SUBSTITUIÇÃO]: Vai na "gaveta" exata (index) e troca o conteúdo antigo pelo novo
        // { id: id, ...novosDados } mantém o ID original e "espalha" as novas informações (categoria, valor, etc.)
        // valor volta como texto do input, por isso o Number()
        gastos[index] = { id: id, ...novosDados, valor: Number(novosDados.valor) };
        salvarDados();
        // Retorna 'true' para avisar quem chamou a função que deu tudo certo
        return true;
    }
    // Se o ID não existir no array, retorna 'false' indicando que nada foi alterado
    return false;
}

export function gastosDelete(itens) {
    // percorre o array gastos em busca do item clickado e guarda no index
    const indexExcluir = gastos.findIndex((gasto) => String(gasto.id) === String(itens.id))
    // se não achou (-1), não faz nada — splice(-1, 1) apagaria o ÚLTIMO item da lista
    if (indexExcluir === -1) return
    // apaga o item e salva no navegador
    gastos.splice(indexExcluir, 1)
    salvarDados();
}
