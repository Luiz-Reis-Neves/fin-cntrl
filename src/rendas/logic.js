export function adicionarRenda(categoria, valor, data, descricao) {
    let id = Date.now()
    let dadosDeRenda = { id: id, categoria: categoria, valor: valor, data: data, descricao: descricao }

    return dadosDeRenda;
}