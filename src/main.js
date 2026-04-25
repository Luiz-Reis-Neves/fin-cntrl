// 👉 1. Importações atualizadas para incluir o que precisamos para o Backup
import { carregarDados, salvarDados, rendas, gastos } from './data/store.js';
import './styles/style.css';
import { inicializarRenda, templatesRenda } from './rendas/ui.js';
import { inicializarGastos, templatesGastos } from './gastos/ui.js';
import { templatesDashboard, inicializarDashboard } from './dashboard/ui.js';

// Declaração de variaveis dos botões
const botoesNav = document.querySelectorAll("#lista-navegacao button");
let containerConteudoFilho2 = document.querySelector("#container-conteudo-filho-2");

// Pega o input invisível que criamos no HTML
const inputArquivoBackup = document.getElementById("input-arquivo-backup");

// 👉 2. Carrega os dados salvos no navegador AGORA!
carregarDados();

// add eventos de click para cada botão
botoesNav.forEach((botao) => {
    botao.addEventListener("click", () => {
        switch (botao.id) {
            case "btn-renda":
                containerConteudoFilho2.innerHTML = templatesRenda();
                inicializarRenda();
                break;
            case "btn-gastos":
                containerConteudoFilho2.innerHTML = templatesGastos();
                inicializarGastos();
                break;
            case "btn-dashboard":
                containerConteudoFilho2.innerHTML = templatesDashboard();
                inicializarDashboard();
                break;

            // 👉 LÓGICA DOS NOVOS BOTÕES AQUI:
            case "btn-exportar":
                exportarBackup();
                break;
            case "btn-importar":
                if (inputArquivoBackup) inputArquivoBackup.click(); // Abre a janela do PC
                break;
            default:
        }
    })
});

// ==========================================
// MOTOR DO BACKUP (EXPORTAR / IMPORTAR)
// ==========================================

function exportarBackup() {
    const pacoteDeDados = {
        rendas: rendas,
        gastos: gastos
    };

    const textoJSON = JSON.stringify(pacoteDeDados, null, 2);
    const arquivoVirtual = new Blob([textoJSON], { type: 'application/json' });
    const linkGerado = URL.createObjectURL(arquivoVirtual);

    const linkFalso = document.createElement('a');
    linkFalso.href = linkGerado;

    const dataHoje = new Date().toISOString().split('T')[0];
    linkFalso.download = `backup-financeiro-${dataHoje}.json`;

    document.body.appendChild(linkFalso);
    linkFalso.click();
    document.body.removeChild(linkFalso);
}

// Escuta o momento exato em que o usuário seleciona um arquivo no input invisível
if (inputArquivoBackup) {
    inputArquivoBackup.addEventListener('change', (evento) => {
        const arquivoSelecionado = evento.target.files[0];
        if (!arquivoSelecionado) return;

        const leitor = new FileReader();

        leitor.onload = function (e) {
            try {
                const dadosRecuperados = JSON.parse(e.target.result);

                if (dadosRecuperados.rendas && dadosRecuperados.gastos) {
                    rendas.length = 0;
                    rendas.push(...dadosRecuperados.rendas);

                    gastos.length = 0;
                    gastos.push(...dadosRecuperados.gastos);

                    salvarDados(); // Salva no LocalStorage

                    alert("🎉 Backup restaurado com sucesso!");
                    window.location.reload(); // Atualiza a página para mostrar os dados
                } else {
                    alert("❌ Erro: O arquivo selecionado não é um backup válido do nosso sistema.");
                }
            } catch (erro) {
                alert("❌ Erro ao ler o arquivo. Ele pode estar corrompido.");
            }
        };

        leitor.readAsText(arquivoSelecionado);

        // Limpa o valor do input (para o usuário poder importar o mesmo arquivo duas vezes seguidas, se precisar)
        evento.target.value = '';
    });
}