/**
 * Utilitários de acesso ao DOM compartilhados entre as telas.
 */

/** Busca um elemento obrigatório; falha cedo se o template mudar e o seletor deixar de existir. */
export function exigir<T extends Element>(raiz: ParentNode, seletor: string): T {
    const elemento = raiz.querySelector<T>(seletor);
    if (!elemento) throw new Error(`Elemento "${seletor}" não encontrado`);
    return elemento;
}
