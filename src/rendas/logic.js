import { rendas } from "../data/store.js";


export function adicionarRenda({ categoria, valor, data, descricao }) {
    let id = Date.now()
    let dadosDeRenda = {
        id: id,
        categoria: categoria,
        valor: Number(valor),
        data: data,
        descricao: descricao
    }
    rendas.push(dadosDeRenda)
    return rendas
    // return console.table(rendas)
}


export function calcularTotalRenda() {
    let total = rendas.reduce((acumulador, renda) => acumulador + Number(renda.valor), 0)
    return total
}

export function editarRenda(id, novosDados) {
    // [DETETIVE]: Percorre o array 'rendas' para encontrar em qual posição (index) está o item com o ID enviado
    //String() para garantir que a comparação funcione mesmo se um for número e o outro texto
    const index = rendas.findIndex(r => String(r.id) === String(id));
    // [VERIFICAÇÃO]: O findIndex retorna -1 se não achar nada. Aqui checa se ele realmente encontrou o item
    if (index !== -1) {
        // [SUBSTITUIÇÃO]: Vai na "gaveta" exata (index) e troca o conteúdo antigo pelo novo
        // { id: id, ...novosDados } mantém o ID original e "espalha" as novas informações (categoria, valor, etc.)
        rendas[index] = { id: id, ...novosDados };
        // Retorna 'true' para avisar quem chamou a função que deu tudo certo
        return true;
    }
    // Se o ID não existir no array, retorna 'false' indicando que nada foi alterado
    return false;
}

export function rendasDelete(itens) {
    // percorre o array rendas em busca do item clickado e guarda no index
    const indexExcluir = rendas.findIndex((renda) => renda.id === itens.id)
    // apaga o item na renda
    rendas.splice(indexExcluir, 1)
}