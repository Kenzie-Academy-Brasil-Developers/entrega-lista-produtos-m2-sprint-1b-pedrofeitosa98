// VARIAVEIS GLOBAIS
let contador = 0


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

    const nome  = document.createElement('h3')
    const secao = document.createElement('p')
    const preco = document.createElement('span')

    nome.innerText  = produto.nome
    secao.innerText = produto.secao
    preco.innerText = `R$ ${produto.preco},00`

    cardMain.append(nome, secao, preco)

    return cardMain
}

function montarDados(listaProdutos){
    const ul = document.querySelector('#listaProdutos ul')
    ul.innerHTML = ''

    for (let i = 0; i < listaProdutos.length; i++){
        const produto = listaProdutos[i]
        criarCard(produto)
    }
}

montarDados(produtos)
calcularPreco(produtos)

function precoTotal(produto) {
    const precoTotal = document.querySelector('#precoTotal')
    contador += produto.preco
    precoTotal.innerText = contador

    return precoTotal
}

function calcularPreco(listaProdutos){
    for (let i = 0; i < listaProdutos.length; i++){
        const produto = listaProdutos[i]
        precoTotal(produto)
    }
}


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
    contador = 0
    calcularPreco(produtos)
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
    contador = 0
    calcularPreco(listaHortifruti)
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
    contador = 0
    calcularPreco(listaPanificadora)
}
const botaoMostrarPanificadora = document.querySelector('#produtosPanificadora')
botaoMostrarPanificadora.addEventListener('click', filtrarPorPanificadora)

function filtrarPorLaticineos() {
    const listaLaticineos = produtos.filter((produto) => {
        return produto.secao === 'Laticínio'
    })
    tornarBotoesInativos()

    const botaoMostrarLaticineos = document.querySelector('#produtosLaticineos')
    botaoMostrarLaticineos.classList.remove('botoesBase--inativo')
    botaoMostrarLaticineos.classList.add('botoesBase--ativo')

    montarDados(listaLaticineos)
    contador = 0
    calcularPreco(listaLaticineos)
}
const botaoMostrarLaticineos = document.querySelector('#produtosLaticineos')
botaoMostrarLaticineos.addEventListener('click', filtrarPorLaticineos)


// FILTRO DE PESQUISA
function buscarPorTexto() {
    const recebeTexto = document.querySelector('.campoBuscaPorNome')
    filtrarPorTexto(recebeTexto)
    recebeTexto.value = ''
}
const botaoPesquisa = document.querySelector('.botoesBase--busca')
botaoPesquisa.addEventListener('click', buscarPorTexto)

function filtrarPorTexto(recebeTexto) {
    const filtroPesquisa = produtos.filter((produto) => {
        return produto.nome.toLowerCase() === recebeTexto.value.trim().toLowerCase()
    })

    montarDados(filtroPesquisa)
    contador = 0
    calcularPreco(filtroPesquisa)
}