var dados;  // Variável que armazena os dados
var lista_miniaturas;  // Coleta as miniaturas
var imagem_grande;  // Coletamos a imagem grande
var indice = -1;  // Variável usada para trocar as imagens
var clock;  // Variável auxiliar para que os elementos se alternem

pegar_dados();  // Pegamos os dados do banco criado com XML

function selecionar_imagem(elemento) {  // função usada pra trocar a imagem principal
    clearInterval(clock); clock = setInterval(trocador, 4000);  // Atualizamos o timer


    imagem_grande.classList.add("fadeIn");  // Primeiro adicionamos a animação
    imagem_grande.addEventListener("animationend", function() {imagem_grande.classList.remove("fadeIn")});  // Removemos quando acabar

    imagem_grande.src = elemento.getElementsByTagName("img")[0].src;  //  Alteramos a fonte da imagem principal

    /* No trecho abaixo corremos todas as minuaturas para ajustar o item selecionado (a borda) */
    for (let aux = 0; aux < lista_miniaturas.length; aux++) {
        if (lista_miniaturas[aux].classList.contains("menu_selecionado")) {lista_miniaturas[aux].classList.remove("menu_selecionado")}}
    elemento.classList.add("menu_selecionado")}  // No final marcamos o elemento em questão como o ativo

function trocador(sentido=1){  // Função utilizada para trocar os elementos
    indice += sentido;  // Aumentamos o índice da variável

    if (indice > 2) {indice = 0}  // Se passar do máximos voltamos pro inicio
    else if (indice < 0) {indice = 2}  // Se passar do mínimo voltamos para o máximo

    selecionar_imagem(lista_miniaturas[indice]);}  // Atualizamos a imagem

function atualizar() {  // Atualiza o valor das variáveis logo no inicio
    lista_miniaturas = document.getElementsByClassName("miniaturas");  // Atualizamos a lista com as miniaturas
    imagem_grande = document.getElementById("imagem_grande");  // E também ordenamos que a imagem grande se atualize

    trocador();}  // Damos inicio ao primeiro pulo, que irá acionar o trigger e continuar a função

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "../data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a imagem irá adaptar os elementos */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML; atualizar(); debug()}}}

function debug(){
    console.log(typeof window.location.search)
}