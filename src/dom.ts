/**
 * Utilitários de acesso ao DOM compartilhados entre as telas.
 */

/** Busca um elemento obrigatório; falha cedo se o template mudar e o seletor deixar de existir. */
export function exigir<T extends Element>(raiz: ParentNode, seletor: string): T {
    const elemento = raiz.querySelector<T>(seletor);
    if (!elemento) throw new Error(`Elemento "${seletor}" não encontrado`);
    return elemento;
}

/** Escapa texto do usuário antes de inseri-lo via innerHTML (um "<" na descrição quebraria o card). */
export function escaparHTML(texto: unknown): string {
    return String(texto ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
