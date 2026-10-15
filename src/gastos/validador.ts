/**
 * Validação dos dados do formulário de gastos.
 *
 * As funções apenas descrevem os problemas encontrados; exibir as mensagens
 * e destacar os campos é responsabilidade da interface. Uma lista vazia
 * indica que os dados podem seguir para a GastosLogic.
 */
import type { ErroValidacao, FormularioGasto } from "./type.ts";

function validarCategoria(categoria: string): ErroValidacao | null {
    if (categoria === "") {
        return { campo: "categoria", mensagem: "Preencha o campo categoria" };
    }
    return null;
}

function validarValor(valor: string): ErroValidacao | null {
    if (valor === "") {
        return { campo: "valor", mensagem: "Preencha o campo valor" };
    }
    if (Number(valor) <= 0) {
        return { campo: "valor", mensagem: "O campo valor tem que ser maior que zero" };
    }
    return null;
}

function validarData(data: string): ErroValidacao | null {
    if (data === "") {
        return { campo: "data", mensagem: "Preencha o campo data" };
    }
    return null;
}

/** @returns Todos os erros encontrados, na ordem dos campos do formulário. */
export function validarGasto({ categoria, valor, data }: FormularioGasto): ErroValidacao[] {
    return [
        validarCategoria(categoria),
        validarValor(valor),
        validarData(data),
    ].filter((erro): erro is ErroValidacao => erro !== null);
}
