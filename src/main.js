import './styles/style.css';
import { renderizarRenda } from './rendas/ui.js';

// Declaração de variaveis dos botões
const botoesNav = document.querySelectorAll("#lista-navegacao button")
let containerConteudoFilho2 = document.querySelector("#container-conteudo-filho-2")
// add eventos de click para cada botão
botoesNav.forEach((botao) => {
    botao.addEventListener("click", () => {
        switch (botao.id) {
            case "btn-renda":
                containerConteudoFilho2.innerHTML = renderizarRenda()
                break
            default:
        }
    })


})
