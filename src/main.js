// 👉 1. Importações atualizadas para incluir o que precisamos para o Backup
import { carregarDados, salvarDados, rendas, gastos } from './data/store.js';
import './styles/style.css';
import { inicializarRenda, templatesRenda } from './rendas/ui.js';
import { GastosLogic } from './gastos/logic.ts';
import { GastosUI } from './gastos/ui.ts';
import { templatesGastos } from './gastos/templates.ts';
import { validarGasto } from './gastos/validador.ts';
import { exigir } from './dom.ts';
import { notificar } from './feedback.ts';
import { templatesDashboard, inicializarDashboard } from './dashboard/ui.js';

// Declaração de variaveis dos botões
const botoesNav = document.querySelectorAll("#lista-navegacao button");
let containerConteudoFilho2 = document.querySelector("#container-conteudo-filho-2");

// Pega o input invisível que criamos no HTML
const inputArquivoBackup = document.getElementById("input-arquivo-backup");

// 👉 2. Carrega os dados salvos no navegador AGORA!
carregarDados();

// Instância única durante toda a sessão. A persistência é decidida aqui:
// a lista também é espelhada no store porque o dashboard e o backup ainda leem de lá.
const gastosLogic = new GastosLogic(gastos, (listaAtualizada) => {
    gastos.length = 0;
    gastos.push(...listaAtualizada);
    salvarDados();
});

// ==========================================
// MENU LATERAL (gaveta no celular, fixo no desktop)
// ==========================================
const menu = document.getElementById("container-menu-filho-1");
const fundoMenu = document.getElementById("fundo-menu");
const btnMenu = document.getElementById("btn-menu");

function definirMenuAberto(aberto) {
    menu.classList.toggle("-translate-x-full", !aberto);
    fundoMenu.classList.toggle("hidden", !aberto);
    btnMenu.setAttribute("aria-expanded", String(aberto));
}

btnMenu.addEventListener("click", () => definirMenuAberto(menu.classList.contains("-translate-x-full")));
fundoMenu.addEventListener("click", () => definirMenuAberto(false));
document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") definirMenuAberto(false);
});

// Marca a aba atual no menu (aria-current também é usado pelo CSS para o destaque)
function marcarAbaAtiva(botaoAtivo) {
    document.querySelectorAll("#lista-navegacao .nav-item").forEach((botao) => {
        if (botao === botaoAtivo) botao.setAttribute("aria-current", "page");
        else botao.removeAttribute("aria-current");
    });
}

// add eventos de click para cada botão
botoesNav.forEach((botao) => {
    botao.addEventListener("click", () => {
        definirMenuAberto(false);
        if (["btn-renda", "btn-gastos", "btn-dashboard"].includes(botao.id)) {
            marcarAbaAtiva(botao);
            window.scrollTo(0, 0);
        }

        switch (botao.id) {
            case "btn-renda":
                containerConteudoFilho2.innerHTML = templatesRenda();
                inicializarRenda();
                break;
            case "btn-gastos":
                containerConteudoFilho2.innerHTML = templatesGastos();
                new GastosUI(exigir(containerConteudoFilho2, "#tela-gastos"), gastosLogic, validarGasto).montar();
                break;
            case "btn-dashboard":
                containerConteudoFilho2.innerHTML = templatesDashboard();
                inicializarDashboard();
                break;

            // 👉 LÓGICA DOS NOVOS BOTÕES AQUI:
            case "btn-cofrinho":
                notificar("O Cofrinho ainda está em construção.", "info");
                break;
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
    notificar("Backup exportado.");
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

                if (Array.isArray(dadosRecuperados.rendas) && Array.isArray(dadosRecuperados.gastos)) {
                    rendas.length = 0;
                    rendas.push(...dadosRecuperados.rendas);

                    gastos.length = 0;
                    gastos.push(...dadosRecuperados.gastos);

                    salvarDados(); // Salva no LocalStorage

                    // A página recarrega para mostrar os dados; a notificação aparece depois do reload
                    sessionStorage.setItem("backupRestaurado", "1");
                    window.location.reload();
                } else {
                    notificar("O arquivo selecionado não é um backup válido.", "erro");
                }
            } catch (erro) {
                notificar("Não foi possível ler o arquivo. Ele pode estar corrompido.", "erro");
            }
        };

        leitor.readAsText(arquivoSelecionado);

        // Limpa o valor do input (para o usuário poder importar o mesmo arquivo duas vezes seguidas, se precisar)
        evento.target.value = '';
    });
}

// Abre o app direto no Dashboard (antes a tela começava em branco)
document.getElementById("btn-dashboard").click();

if (sessionStorage.getItem("backupRestaurado")) {
    sessionStorage.removeItem("backupRestaurado");
    notificar("Backup restaurado com sucesso!");
}
