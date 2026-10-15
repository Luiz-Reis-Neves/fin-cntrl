import { rendas } from "../data/store.js";
import { salvarDados } from "../data/store.js";
import { notificar } from "../feedback.ts";

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
    salvarDados();
    return rendas
    // return console.table(rendas)
}


export function calcularTotalRenda(lista = rendas) { // 'rendas' é o padrão caso não venha filtro
    return lista.reduce((acc, item) => acc + Number(item.valor), 0)
}

export function editarRenda(id, novosDados) {
    // [DETETIVE]: Percorre o array 'rendas' para encontrar em qual posição (index) está o item com o ID enviado
    //String() para garantir que a comparação funcione mesmo se um for número e o outro texto
    const index = rendas.findIndex(r => String(r.id) === String(id));
    // [VERIFICAÇÃO]: O findIndex retorna -1 se não achar nada. Aqui checa se ele realmente encontrou o item
    if (index !== -1) {
        // [SUBSTITUIÇÃO]: Vai na "gaveta" exata (index) e troca o conteúdo antigo pelo novo
        // { id: id, ...novosDados } mantém o ID original e "espalha" as novas informações (categoria, valor, etc.)
        // valor volta como texto do input, por isso o Number()
        rendas[index] = { id: id, ...novosDados, valor: Number(novosDados.valor) };
        salvarDados();
        // Retorna 'true' para avisar quem chamou a função que deu tudo certo
        return true;
    }
    // Se o ID não existir no array, retorna 'false' indicando que nada foi alterado
    return false;
}

export function rendasDelete(itens) {
    // percorre o array rendas em busca do item clickado e guarda no index
    const indexExcluir = rendas.findIndex((renda) => String(renda.id) === String(itens.id))
    // se não achou (-1), não faz nada — splice(-1, 1) apagaria o ÚLTIMO item da lista
    if (indexExcluir === -1) return
    // apaga o item e salva no navegador
    rendas.splice(indexExcluir, 1)
    salvarDados();
}

function validarCategoria(categoria) {

    if (categoria === "") {
        notificar("Preencha o campo categoria", "erro")
        return false
    }
    return true
}

function validarValor(valor) {
    if (valor === "") {
        notificar("Preencha o campo valor", "erro")
        return false
    } else if (valor <= 0) {
        notificar("O campo valor tem que ser maior que zero", "erro")
        return false
    }
    return true
}

function validarData(data) {
    if (data === "") {
        notificar("Preencha o campo data", "erro")
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