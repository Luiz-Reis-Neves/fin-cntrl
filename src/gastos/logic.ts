/**
 * Regras de manipulação da lista de gastos.
 *
 * A GastosLogic mantém os gastos em memória e expõe as operações de
 * cadastro, edição, exclusão e soma. Persistência e validação ficam fora
 * daqui: a lista inicial e o callback `aoAlterar` são fornecidos por quem
 * instancia a classe, e os dados recebidos já devem ter passado pelo
 * validador.ts.
 */
import type { Gasto, NovoGasto } from "./type.ts";

export class GastosLogic {
    #gastos: Gasto[];
    #aoAlterar: (gastos: Gasto[]) => void;

    constructor(listaInicial: readonly Gasto[], aoAlterar: (gastos: Gasto[]) => void = () => {}) {
        // Cópia defensiva: alterações feitas na lista original não afetam o estado interno.
        this.#gastos = listaInicial.map((gasto) => ({ ...gasto }));
        this.#aoAlterar = aoAlterar;
    }

    /** Retorna cópias dos gastos; modificar o resultado não altera a classe. */
    obterTodos(): Gasto[] {
        return this.#gastos.map((gasto) => ({ ...gasto }));
    }

    adicionar(dados: NovoGasto): Gasto {
        // Date.now() é suficiente para cadastros manuais, que não ocorrem no mesmo milissegundo.
        const novoGasto: Gasto = { id: Date.now(), ...dados };
        this.#gastos.push(novoGasto);
        this.#notificar();
        return { ...novoGasto };
    }

    /** @returns `false` se nenhum gasto tiver o id informado. */
    editar(id: Gasto["id"], dados: NovoGasto): boolean {
        const index = this.#indexPorId(id);
        if (index === -1) return false;

        // Preserva o id armazenado, que pode diferir em tipo do id recebido.
        this.#gastos[index] = { id: this.#gastos[index].id, ...dados };
        this.#notificar();
        return true;
    }

    /** @returns `false` se nenhum gasto tiver o id informado. */
    excluir(id: Gasto["id"]): boolean {
        const index = this.#indexPorId(id);
        // Sem esta checagem, splice(-1, 1) removeria o último item da lista.
        if (index === -1) return false;

        this.#gastos.splice(index, 1);
        this.#notificar();
        return true;
    }

    /** Soma os valores da lista informada ou, na ausência dela, de todos os gastos. */
    calcularTotal(lista: readonly Gasto[] = this.#gastos): number {
        return lista.reduce((acc, gasto) => acc + gasto.valor, 0);
    }

    // O tipo Gasto aceita id como number ou string; a comparação por texto cobre os dois casos.
    #indexPorId(id: Gasto["id"]): number {
        return this.#gastos.findIndex((gasto) => String(gasto.id) === String(id));
    }

    #notificar(): void {
        this.#aoAlterar(this.obterTodos());
    }
}
