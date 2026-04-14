import { rendas } from '../data/store.js'
export function adicionarRenda({ categoria, valor, data, descricao }) {
    let id = Date.now()
    let dadosDeRenda = { id: id, categoria: categoria, valor: valor, data: data, descricao: descricao }

    return dadosDeRenda;
}
// calcula a renda total dos cards somados
export function calcularTotalRenda() {
    let total = rendas.reduce((acumulador, renda) => acumulador + Number(renda.valor), 0)
    return total
}

export function validarCategoria(categoria) {

    if (categoria === "") {
        alert("Prencha o campo categoria")
        return false
    }
    return true
}

export function validarValor(valor) {
    if (valor === "") {
        alert("Preencha o campo valor")
        return false
    } else if (valor <= 0) {
        alert("O campo valor tem que ser maior que zero")
        return false
    }
    return true
}

export function validarData(data) {
    if (data === "") {
        alert("Preencha o campo data")
        return false
    }
    return true
}

export function validarRenda({ categoria, valor, data }) {
    let funcCategoria = validarCategoria(categoria)
    let funcValor = validarValor(valor)
    let funcData = validarData(data)

    if (!funcCategoria || !funcValor || !funcData) {
        return false
    }
    return true
}