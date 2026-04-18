import { rendas } from "../data/store.js";
import { eventosDoModal } from "./ui.js"

export function adicionarRenda({ categoria, valor, data, descricao }) {
    let id = Date.now()
    let dadosDeRenda = {
        id: id,
        categoria: categoria,
        valor: valor,
        data: data,
        descricao: descricao
    }
    rendas.push(dadosDeRenda)
    return rendas
    // return console.table(rendas)
}


