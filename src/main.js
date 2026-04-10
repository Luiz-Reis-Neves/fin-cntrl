import './styles/style.css';
// Declaração de variaveis dos botões
const botoesNav = document.querySelectorAll("#lista-navegacao button")

// add eventos de click para cada botão
botoesNav.forEach((botao) => {
    botao.addEventListener("click", () => {
        console.log(botao.id)
    })
})
