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
        gastos[index] = { id: id, ...novosDados };
        // Retorna 'true' para avisar quem chamou a função que deu tudo certo
        return true;
    }
    // Se o ID não existir no array, retorna 'false' indicando que nada foi alterado
    return false;
}

export function gastosDelete(itens) {
    // percorre o array gastos em busca do item clickado e guarda no index
    const indexExcluir = gastos.findIndex((gasto) => gasto.id === itens.id)
    // apaga o item no gasto
    gastos.splice(indexExcluir, 1)
}

function validarCategoria(categoria) {
    if (categoria === "") {
        alert("Preencha o campo categoria")
        return false
    }
    return true
}

function validarValor(valor) {
    if (valor === "") {
        alert("Preencha o campo valor")
        return false
    } else if (valor <= 0) {
        alert("O campo valor tem que ser maior que zero")
        return false
    }
    return true
}

function validarData(data) {
    if (data === "") {
        alert("Preencha o campo data")
        return false
    }
    return true
}

export function validarGasto({ categoria, valor, data }) {
    let funcCategoria = validarCategoria(categoria)
    let funcValor = validarValor(valor)
    let funcData = validarData(data)

    if (!funcCategoria || !funcValor || !funcData) {
        return false
    }
    return true
}