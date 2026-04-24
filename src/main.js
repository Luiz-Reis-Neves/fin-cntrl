import { carregarDados } from './data/store.js';
import './styles/style.css';
import { inicializarRenda, templatesRenda } from './rendas/ui.js';
import { inicializarGastos, templatesGastos } from './gastos/ui.js';
import { templatesDashboard, inicializarDashboard } from './dashboard/ui.js';



// Declaração de variaveis dos botões
const botoesNav = document.querySelectorAll("#lista-navegacao button")
let containerConteudoFilho2 = document.querySelector("#container-conteudo-filho-2")

// 👉 2. Carrega os dados salvos no navegador AGORA!
carregarDados();

// add eventos de click para cada botão
botoesNav.forEach((botao) => {
    botao.addEventListener("click", () => {
        switch (botao.id) {
            case "btn-renda":
                containerConteudoFilho2.innerHTML = templatesRenda()
                inicializarRenda()
                break
            case "btn-gastos":
                containerConteudoFilho2.innerHTML = templatesGastos()
                inicializarGastos()
                break
            case "btn-dashboard":
                containerConteudoFilho2.innerHTML = templatesDashboard()
                inicializarDashboard()
                break
            default:
        }
    })


})
