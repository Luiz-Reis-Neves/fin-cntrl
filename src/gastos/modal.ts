/**
 * Formulário de cadastro e edição de gastos.
 *
 * A ModalGasto controla o modal já presente no DOM: abre em modo de cadastro
 * ou edição, lê e limpa os campos e exibe os erros de validação abaixo de cada
 * campo. A regra de validação e o destino dos dados são injetados no
 * construtor; a classe só entrega um NovoGasto válido para `aoSalvar` e se
 * fecha em seguida.
 */
import type { ErroValidacao, FormularioGasto, Gasto, NovoGasto } from "./type.ts";
import { exigir } from "../dom.ts";

export type Validador = (dados: FormularioGasto) => ErroValidacao[];
type AoSalvar = (dados: NovoGasto, idEmEdicao: Gasto["id"] | null) => void;

const CLASSE_ERRO = "border-red-500";

export class ModalGasto {
    #fundo: HTMLElement;
    #formulario: HTMLFormElement;
    #titulo: HTMLElement;
    #campos: Record<keyof FormularioGasto, HTMLInputElement | HTMLSelectElement>;
    #btnConfirmar: HTMLButtonElement;
    #validar: Validador;
    #aoSalvar: AoSalvar;
    #idEmEdicao: Gasto["id"] | null = null;
    #focoAnterior: HTMLElement | null = null;

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
        this.#formulario = exigir(fundo, "form");
        this.#titulo = exigir(fundo, "#titulo-modal-gasto");
        this.#btnConfirmar = exigir(fundo, "#btn-model-cadastrar");

        // submit cobre o clique em Cadastrar e o Enter dentro dos campos
        this.#formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.#confirmar();
        });
        exigir(fundo, "#btn-model-cancelar").addEventListener("click", () => this.fechar());
        exigir(fundo, "#btn-fechar-modal").addEventListener("click", () => this.fechar());

        // Clique no fundo escurecido (fora do formulário) fecha o modal
        fundo.addEventListener("click", (evento) => {
            if (!this.#formulario.contains(evento.target as Node)) this.fechar();
        });
        // O foco fica dentro do modal enquanto ele está aberto, então o Esc chega aqui
        fundo.addEventListener("keydown", (evento) => {
            if (evento.key === "Escape") this.fechar();
        });
    }

    /** @param dataSugerida Data inicial no formato AAAA-MM-DD, se houver. */
    abrirCadastro(dataSugerida?: string): void {
        this.#idEmEdicao = null;
        this.#titulo.textContent = "Novo gasto";
        this.#btnConfirmar.textContent = "Cadastrar";
        if (dataSugerida) this.#campos.data.value = dataSugerida;
        this.#exibir();
    }

    abrirEdicao(gasto: Gasto): void {
        this.#idEmEdicao = gasto.id;
        this.#titulo.textContent = "Editar gasto";
        this.#btnConfirmar.textContent = "Salvar alterações";
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
        this.#titulo.textContent = "Novo gasto";
        this.#btnConfirmar.textContent = "Cadastrar";
        // Devolve o foco para onde o usuário estava antes de abrir o modal
        this.#focoAnterior?.focus();
        this.#focoAnterior = null;
    }

    #exibir(): void {
        this.#focoAnterior = document.activeElement as HTMLElement | null;
        this.#fundo.classList.remove("hidden");
        this.#campos.categoria.focus();
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

    #avisoDe(campo: keyof FormularioGasto): HTMLElement | null {
        return this.#fundo.querySelector(`[data-erro-para="${campo}"]`);
    }

    // Cada mensagem aparece embaixo do próprio campo; o foco vai para o primeiro inválido.
    #mostrarErros(erros: ErroValidacao[]): void {
        erros.forEach(({ campo, mensagem }) => {
            this.#campos[campo].classList.add(CLASSE_ERRO);
            this.#campos[campo].setAttribute("aria-invalid", "true");
            const aviso = this.#avisoDe(campo);
            if (aviso) {
                aviso.textContent = mensagem;
                aviso.classList.remove("hidden");
            }
        });
        this.#campos[erros[0].campo].focus();
    }

    #limparErros(): void {
        (Object.keys(this.#campos) as (keyof FormularioGasto)[]).forEach((campo) => {
            this.#campos[campo].classList.remove(CLASSE_ERRO);
            this.#campos[campo].removeAttribute("aria-invalid");
            const aviso = this.#avisoDe(campo);
            if (aviso) {
                aviso.textContent = "";
                aviso.classList.add("hidden");
            }
        });
    }
}
