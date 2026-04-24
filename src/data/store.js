export let rendas = [];
export let gastos = [];

// Função para SALVAR os dados no navegador
export function salvarDados() {
    localStorage.setItem('minhasRendas', JSON.stringify(rendas));
    localStorage.setItem('meusGastos', JSON.stringify(gastos));
}

// Função para CARREGAR os dados quando o app abre
export function carregarDados() {
    const rendasSalvas = localStorage.getItem('minhasRendas');
    const gastosSalvos = localStorage.getItem('meusGastos');

    // Se tiver dados salvos, substitui as listas vazias por eles
    if (rendasSalvas) {
        rendas.length = 0; // Limpa a array original sem quebrar a conexão com os outros arquivos
        rendas.push(...JSON.parse(rendasSalvas));
    }

    if (gastosSalvos) {
        gastos.length = 0;
        gastos.push(...JSON.parse(gastosSalvos));
    }
}