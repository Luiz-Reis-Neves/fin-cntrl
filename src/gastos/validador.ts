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
