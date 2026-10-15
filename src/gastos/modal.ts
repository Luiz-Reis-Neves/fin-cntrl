/**
 * Formulário de cadastro e edição de gastos.
 *
 * A ModalGasto controla o modal já presente no DOM: abre em modo de cadastro
 * ou edição, lê e limpa os campos e exibe os erros de validação. A regra de
 * validação e o destino dos dados são injetados no construtor; a classe só
 * entrega um NovoGasto válido para `aoSalvar` e se fecha em seguida.
 */
import type { ErroValidacao, FormularioGasto, Gasto, NovoGasto } from "./type.ts";

type Validador = (dados: FormularioGasto) => ErroValidacao[];
type AoSalvar = (dados: NovoGasto, idEmEdicao: Gasto["id"] | null) => void;

const CLASSE_ERRO = "border-red-500";

// Falha cedo se o template mudar e um seletor deixar de existir.
function exigir<T extends Element>(raiz: ParentNode, seletor: string): T {
    const elemento = raiz.querySelector<T>(seletor);
    if (!elemento) throw new Error(`ModalGasto: elemento "${seletor}" não encontrado`);
    return elemento;
}

export class ModalGasto {
    #fundo: HTMLElement;
    #campos: Record<keyof FormularioGasto, HTMLInputElement | HTMLSelectElement>;
    #btnConfirmar: HTMLButtonElement;
    #validar: Validador;
    #aoSalvar: AoSalvar;
    #idEmEdicao: Gasto["id"] | null = null;

    /** @param fundo Elemento raiz do modal (#fundo-escuro). */
    constructor(fundo: HTMLElement, validar: Validador, aoSalvar: AoSalvar) {
        this.#fundo = fundo;
        this.#validar = validar;
        this.#aoSalvar = aoSalvar;
        this.#campos = {
            categoria: exigir(fundo, "#inputCategoria"),
            valor: exigir(fundo, "#inputValor"),
            data: exigir(fundo, "#inputData"),
            descricao: exigir(fundo, "#inputDescricao"),
        };
        this.#btnConfirmar = exigir(fundo, "#btn-model-cadastrar");

        this.#btnConfirmar.addEventListener("click", () => this.#confirmar());
        exigir(fundo, "#btn-model-cancelar").addEventListener("click", () => this.fechar());
    }

    /** @param dataSugerida Data inicial no formato AAAA-MM-DD, se houver. */
    abrirCadastro(dataSugerida?: string): void {
        this.#idEmEdicao = null;
        this.#btnConfirmar.textContent = "Cadastrar";
        if (dataSugerida) this.#campos.data.value = dataSugerida;
        this.#exibir();
    }

    abrirEdicao(gasto: Gasto): void {
        this.#idEmEdicao = gasto.id;
        this.#btnConfirmar.textContent = "Concluir Edição";
        this.#campos.categoria.value = gasto.categoria;
        this.#campos.valor.value = String(gasto.valor);
        this.#campos.data.value = gasto.data;
        this.#campos.descricao.value = gasto.descricao;
        this.#exibir();
    }

    /** Fecha e descarta o que foi digitado, inclusive o vínculo com o gasto em edição. */
    fechar(): void {
        this.#fundo.classList.add("hidden");
        Object.values(this.#campos).forEach((campo) => (campo.value = ""));
        this.#limparErros();
        this.#idEmEdicao = null;
        this.#btnConfirmar.textContent = "Cadastrar";
    }

    #exibir(): void {
        this.#fundo.classList.remove("hidden");
    }

    #ler(): FormularioGasto {
        return {
            categoria: this.#campos.categoria.value,
            valor: this.#campos.valor.value,
            data: this.#campos.data.value,
            descricao: this.#campos.descricao.value,
        };
    }

    #confirmar(): void {
        const formulario = this.#ler();

        this.#limparErros();
        const erros = this.#validar(formulario);
        if (erros.length > 0) {
            this.#mostrarErros(erros);
            return;
        }

        // Converte só depois da validação, que já recusou valor vazio, zero ou negativo.
        this.#aoSalvar({ ...formulario, valor: Number(formulario.valor) }, this.#idEmEdicao);
        this.fechar();
    }

    #mostrarErros(erros: ErroValidacao[]): void {
        erros.forEach(({ campo }) => this.#campos[campo].classList.add(CLASSE_ERRO));
        alert(erros.map(({ mensagem }) => mensagem).join("\n"));
    }

    #limparErros(): void {
        Object.values(this.#campos).forEach((campo) => campo.classList.remove(CLASSE_ERRO));
    }
}
