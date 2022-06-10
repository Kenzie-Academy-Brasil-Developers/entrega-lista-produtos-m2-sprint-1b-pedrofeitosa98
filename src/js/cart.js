/* CARRINHO DE COMPRAS */
function criarCardCarrinho(produtoComprado) {
    const listaCarrinho = document.querySelector('.containerCarrinho__lista')
    const cardCarrinho = document.createElement('li')
    cardCarrinho.classList.add('containerCarrinho__produto')

    const cardHeader = criarCardCarrinhoImage(produtoComprado)
    const cardMain   = criarCardCarrinhoMain(produtoComprado)
    const cardRemove = removerProduto(produtoComprado)

    cardCarrinho.append(cardHeader, cardMain, cardRemove)
    listaCarrinho.append(cardCarrinho)
}

function criarCardCarrinhoImage(produtoComprado) {
    const cardImage = document.createElement('img')

    cardHeader.src = produtoComprado.img
    cardHeader.alt = produtoComprado.nome

    return cardImage
}

function criarCardCarrinhoMain(produtoComprado) {
    const cardMain = document.createElement('div')
    cardMain.classList.add('containerCarrinho__infos')

    const nome  = document.createElement('h3')
    const secao = document.createElement('p')
    const preco = document.createElement('span')

    nome.innerText  = produtoComprado.nome
    secao.innerText = produtoComprado.secao
    preco.innerText = `R$ ${produtoComprado.preco}`

    cardMain.append(nome, secao, preco)

    return cardMain
}

function removerProduto(produtoComprado) {
    const campo = document.createElement('div')
    campo.classList.add('containerCarrinho__remove')

    const botao = document.createElement('button')
    botao.classList.add('botaoRemove')
    botao.innerHTML = '<i class="fa-solid fa-trash"></i>'

    campo.append(botao)

    return campo
}

function montarCarrinho(listaCarrinho){
    const ul = document.querySelector('containerCarrinho__lista')
    ul.innerHTML = ''

    if(listaProdutos.length > 0){
        for (let i = 0; i < listaProdutos.length; i++){
            const produtoComprado = listaCarrinho[i]
            criarCardCarrinho(produtoComprado)
        }
    }
    else {carrinhoVazio()}
}

function carrinhoVazio () {
    const secaoCarrinho = document.querySelector('#secaoCarrinho')
    const container = document.createElement('div')
    const icone = document.createElement('i')
    const texto = document.createElement('p')

    container.classList.add('containerCarrinho__lista--vazio')
    icone.className = 'fa-solid fa-basket-shopping'
    texto.innerText = 'Por enquanto não temos produtos no carrinho'

    container.append(icone, texto)
    secaoCarrinho.append(container)
}