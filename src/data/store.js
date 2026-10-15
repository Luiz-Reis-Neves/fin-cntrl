export let rendas = [];
export let gastos = [];

// Função para SALVAR os dados no navegador
export function salvarDados() {
    localStorage.setItem('minhasRendas', JSON.stringify(rendas));
    localStorage.setItem('meusGastos', JSON.stringify(gastos));
}

// Lê uma lista do localStorage sem quebrar o app se o conteúdo estiver corrompido
function lerLista(chave) {
    try {
        const lista = JSON.parse(localStorage.getItem(chave));
        if (!Array.isArray(lista)) return null;
        // Versões antigas gravavam o valor editado como texto ("99.78"); somado
        // com +, isso concatena em vez de somar. Normaliza tudo para número.
        return lista.map((item) => ({ ...item, valor: Number(item.valor) }));
    } catch (erro) {
        console.error(`Dados corrompidos em "${chave}"`, erro);
        return null;
    }
}

// Função para CARREGAR os dados quando o app abre
export function carregarDados() {
    const rendasSalvas = lerLista('minhasRendas');
    const gastosSalvos = lerLista('meusGastos');

    // Se tiver dados salvos, substitui as listas vazias por eles
    if (rendasSalvas) {
        rendas.length = 0; // Limpa a array original sem quebrar a conexão com os outros arquivos
        rendas.push(...rendasSalvas);
    }

    if (gastosSalvos) {
        gastos.length = 0;
        gastos.push(...gastosSalvos);
    }
}
