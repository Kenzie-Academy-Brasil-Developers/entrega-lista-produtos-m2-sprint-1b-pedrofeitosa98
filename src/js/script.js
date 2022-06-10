// VARIAVEIS GLOBAIS
let contador = 0
let quantidade = 0
const carrinho = []

// CRIANDO ESTOQUE
function criarCard(produto) {
    const ul = document.querySelector('#listaProdutos ul')
    const liCard = document.createElement('li')

    const cardHeader = criarCardHeader(produto)
    const cardMain   = criarCardMain(produto)

    liCard.append(cardHeader, cardMain)
    ul.append(liCard)
}


function criarCardHeader(produto){
    const cardHeader = document.createElement('img')

    cardHeader.src = produto.img
    cardHeader.alt = produto.nome

    return cardHeader
}


function criarCardMain(produto){
    const cardMain = document.createElement('div')
    cardMain.classList.add('infoProdutos')

    const nome        = document.createElement('h3')
    const secao       = document.createElement('p')
    const componentes = listarComponentes(produto)
    const preco       = document.createElement('span')
    const comprar     = document.createElement('button')

    eventoComprar(produto, comprar)

    preco.classList.add('infoCompra')
    comprar.classList.add('adicionarCarrinho')

    nome.innerText  = produto.nome
    secao.innerText = produto.secao
    preco.innerText = `R$ ${produto.preco}`
    comprar.innerText = 'Comprar'

    cardMain.append(nome, secao, componentes, preco, comprar)

    return cardMain
}


function eventoComprar(produto, comprar) {
    comprar.addEventListener('click', () => {
        carrinho.push(produto)
        montarCarrinho(carrinho)
    })
}


function listarComponentes(produto){
    const componentes = document.createElement('ol')
    componentes.classList.add('componentesProdutos')
    componentes.innerHTML = ''
    
    for (let i = 0; i < produto.componentes.length; i++) {
        const componente = document.createElement('li')
        componente.innerText = produto.componentes[i]
        componentes.append(componente)   
    }

    return componentes
}


function montarDados(listaProdutos){
    const ul = document.querySelector('#listaProdutos ul')
    ul.innerHTML = ''

    if(listaProdutos.length > 0){
        for (let i = 0; i < listaProdutos.length; i++){
            const produto = listaProdutos[i]
            criarCard(produto)
        }
    }
    else {logErro()}
}


montarDados(produtos)


// SEÇÃO DE FILTROS
function tornarBotoesInativos() {
    const botaoAtivo = document.querySelectorAll('.botoesBase')
    botaoAtivo.forEach((button) => {
        button.classList.remove('botoesBase--ativo')
        button.classList.add('botoesBase--inativo')
    })
}


function filtrarTodos() {
    tornarBotoesInativos()

    const botaoMostrarTodos = document.querySelector('#produtosTodos')
    botaoMostrarTodos.classList.remove('botoesBase--inativo')
    botaoMostrarTodos.classList.add('botoesBase--ativo')
    
    montarDados(produtos)
}
const botaoMostrarTodos = document.querySelector('#produtosTodos')
botaoMostrarTodos.addEventListener('click', filtrarTodos)


function filtrarPorHortifruti() {
    const listaHortifruti = produtos.filter((produto) => {
        return produto.secao === 'Hortifruti'
    })
    tornarBotoesInativos()

    const botaoMostrarHortifruti = document.querySelector('#produtosHortifruti')
    botaoMostrarHortifruti.classList.remove('botoesBase--inativo')
    botaoMostrarHortifruti.classList.add('botoesBase--ativo')

    montarDados(listaHortifruti)
}
const botaoMostrarHortifruti = document.querySelector('#produtosHortifruti')
botaoMostrarHortifruti.addEventListener('click', filtrarPorHortifruti)


function filtrarPorPanificadora() {
    const listaPanificadora = produtos.filter((produto) => {
        return produto.secao === 'Panificadora'
    })
    tornarBotoesInativos()

    const botaoMostrarPanificadora = document.querySelector('#produtosPanificadora')
    botaoMostrarPanificadora.classList.remove('botoesBase--inativo')
    botaoMostrarPanificadora.classList.add('botoesBase--ativo')

    montarDados(listaPanificadora)
}
const botaoMostrarPanificadora = document.querySelector('#produtosPanificadora')
botaoMostrarPanificadora.addEventListener('click', filtrarPorPanificadora)


function filtrarPorLaticineos() {
    const listaLaticineos = produtos.filter((produto) => {
        return produto.secao === 'Laticinio'
    })
    tornarBotoesInativos()

    const botaoMostrarLaticineos = document.querySelector('#produtosLaticineos')
    botaoMostrarLaticineos.classList.remove('botoesBase--inativo')
    botaoMostrarLaticineos.classList.add('botoesBase--ativo')

    montarDados(listaLaticineos)
}
const botaoMostrarLaticineos = document.querySelector('#produtosLaticineos')
botaoMostrarLaticineos.addEventListener('click', filtrarPorLaticineos)


// FILTRO DE PESQUISA
function buscarPorTexto() {
    const recebeTexto = document.querySelector('.campoBuscaPorNome')
    if(recebeTexto.value.trim() !== '') {filtrarPorTexto(recebeTexto)}
    recebeTexto.value = ''
}
const botaoPesquisa = document.querySelector('.botoesBase--busca')
botaoPesquisa.addEventListener('click', buscarPorTexto)


function filtrarPorTexto(recebeTexto) {
    const filtroPesquisa = produtos.filter((produto) => {
        return (
            produto.nome.toLowerCase() === recebeTexto.value.trim().toLowerCase() ||
            produto.secao.toLowerCase() === recebeTexto.value.trim().toLowerCase()
        )
    })

    montarDados(filtroPesquisa)
}


function logErro() {
    const ul = document.querySelector('#listaProdutos ul')
    ul.innerHTML = ''

    const li = document.createElement('li')
    ul.append(li)

    const mensagem = document.createElement('p')
    mensagem.classList.add('logErro')
    mensagem.innerHTML = '<i class="fa-solid fa-store-slash"></i> Nada encontrado'
    li.append(mensagem)

    return mensagem
}


// CARRINHO DE COMPRAS
function criarCardCarrinho(produtoComprado) {
    const ulCarrinho = document.querySelector('.containerCarrinho__lista')
    const cardCarrinho = document.createElement('li')
    cardCarrinho.classList.add('containerCarrinho__produto')

    const cardHeader = criarCardCarrinhoImage(produtoComprado)
    const cardMain   = criarCardCarrinhoMain(produtoComprado)
    const cardRemove = botaoRemoverProduto(produtoComprado)

    cardCarrinho.append(cardHeader, cardMain, cardRemove)
    ulCarrinho.append(cardCarrinho)
}


function criarCardCarrinhoImage(produtoComprado) {
    const cardImage = document.createElement('img')

    cardImage.src = produtoComprado.img
    cardImage.alt = produtoComprado.nome

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


function botaoRemoverProduto(produtoComprado) {
    const campo = document.createElement('div')
    campo.classList.add('containerCarrinho__remove')

    const remover = document.createElement('button')
    remover.classList.add('botaoRemove')
    remover.innerHTML = '<i class="fa-solid fa-trash"></i>'

    eventoRemover(remover, produtoComprado)

    campo.append(remover)

    return campo
}

function eventoRemover(remover, produtoComprado) {
    remover.addEventListener('click', () => {
        removerProduto(produtoComprado)
        montarCarrinho(carrinho)
    })
}

function removerProduto(produtoComprado) {
    const indexProduto = carrinho.indexOf(produtoComprado)
    carrinho.splice(indexProduto, 1)
}


function montarCarrinho(listaCarrinho){
    const ul = document.querySelector('.containerCarrinho__lista')
    
        ul.innerHTML = ''
    
        for (let i = 0; i < listaCarrinho.length; i++){
            const produtoComprado = listaCarrinho[i]
            criarCardCarrinho(produtoComprado, listaCarrinho)
        }

        calcularPreco(listaCarrinho)
        quantidadeTotal(listaCarrinho)
}


function precoTotal(produtoComprado) {
    const precoTotal = document.querySelector('#precoTotal')
    contador += Number(produtoComprado.preco)
    console.log(contador)
    precoTotal.innerText = `R$ ${contador.toFixed(2)}`
}

function precoZerado() {
    const precoTotal = document.querySelector('#precoTotal')
    contador = 0
    console.log(contador)
    precoTotal.innerText = `R$ ${contador.toFixed(2)}`
}

function calcularPreco(listaCarrinho){
    contador = 0
    if (listaCarrinho.length > 0){
        for (let i = 0; i < listaCarrinho.length; i++){
            const produtoComprado = listaCarrinho[i]
            precoTotal(produtoComprado)
        }
    }else if(listaCarrinho.length == 0){precoZerado()}
}


function quantidadeTotal(listaCarrinho) {
    const quantidadeTotal = document.querySelector('#quantidadeTotal')
    quantidadeTotal.innerText = listaCarrinho.length
}


// function carrinhoVazio () {
//     const secaoCarrinho = document.querySelector('#secaoCarrinho')
//     const container = document.createElement('div')
//     const icone = document.createElement('i')
//     const texto = document.createElement('p')

//     container.classList.add('containerCarrinho__lista--vazio')
//     icone.className = 'fa-solid fa-basket-shopping'
//     texto.innerText = 'Por enquanto não temos produtos no carrinho'

//     container.append(icone, texto)
//     secaoCarrinho.append(container)
// }