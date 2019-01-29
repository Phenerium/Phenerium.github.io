var dados;  // Variável que armazena o documento XML
var i;      // Variável auxiliar para percorrer os containers
var max_i;  // Variável auxiliar que determina o máximo de itens
var lista_elementos;  // Lista que contem os elementos que darão os dados

pegar_dados();  // Função que pega os dados do XML logo que o documento é carregado

var clock = setInterval(trocador, 4000);  // Criamos um relógio para que os elementos sejam alterados


function apagar() {  // Remove os itens para que possamos printar novos
    var items = document.getElementsByClassName("item_container");  // Coletamos todos os itens
    for (var aux = 0; aux < items.length; aux += 1){  // Percorremos todos os itens
        items[aux].style.display = "none";  // Definimos o display como nulo
        if (items[aux].classList.contains("marker")) {  // Se tiver o marcador
            items[aux].classList.remove("marker"); // Tiramos a mesma
        }
    }
}
function atualizador () {  // Atualiza os itens disponíveis na tela para trocar
    lista_elementos = document.getElementsByClassName("marker");  // Coleta os itens mostrados
    max_i = lista_elementos.length - 1;  // Define que o valor máximo deve ser proporcional
    i = 0;  // Reseta o valor da variável auxiliar utilizada para a alteração dos blocos
}

function trocar_elemento(elemento) {  // Usada para disponibilizar a legenda do elemento

   if (lista_elementos.length > 1) {  // Se houver mais que dois elementos realizamos a animação
       clearInterval(clock);  // Removemos o relógio para que a animação não pule diretamente
       clock = setInterval(trocador, 4000);}  // Adicionamos uma nova instância da classe trocadora
   else {clearInterval(clock)}  // Caso contrário apenas removemos a função

    /* Nas linhas abaixo apenas pegamos as informações SEM ESPAÇO */
    var titulo = elemento.getElementsByTagName("h1")[0].innerHTML.trim();
    var sumario = elemento.getElementsByTagName("h3")[0].innerHTML.trim();
    var imagem = elemento.getElementsByTagName("img")[0].src.trim();
    var de = elemento.getElementsByTagName("h4")[0].innerHTML.trim();
    var por = elemento.getElementsByTagName("h2")[0].innerHTML.trim();

    /* Se não houver estoque alteramos a legenda e também a sua cor */
    if (de.trim() === "0") {document.getElementById("destaque_preco_de").style.display = "none"}
    else {document.getElementById("destaque_preco_de").style.display = "block"; document.getElementById("destaque_preco_de_2").innerHTML = de;}

    /* Pegamos a referência da imagem maior */
    var imagem_grande = document.getElementsByClassName("imagem_destacada")[0];
    imagem_grande.classList.add("fadeIn");
    imagem_grande.addEventListener("animationend", function(){document.getElementsByClassName("imagem_destacada")[0].classList.remove("fadeIn");});

    /* Pegamos a referência da imagem maior */
    var legenda_imagem = document.getElementsByClassName("legenda_imagem")[0];
    legenda_imagem.classList.add("Stretch");
    legenda_imagem.addEventListener("animationend", function(){document.getElementsByClassName("legenda_imagem")[0].classList.remove("Stretch");});

    /* Aplicamos as informações nos elementos da imagem */
    document.getElementById("imagem_destacada").src = imagem;
    document.getElementById("destaque_titulo").innerHTML = titulo;
    document.getElementById("destaque_descricao").innerHTML = sumario;
    document.getElementById("destaque_preco_de_2").innerHTML = de;
    document.getElementById("destaque_preco_por_2").innerHTML = por;
}
function trocador(sentido=1) {  // Altera os dados do container descritivo
    sentido = Number(sentido);  // Primeiro convertemos a variável para número
    i += sentido;  // Aumentamos o índice da variável

    if (i > max_i) {i = 0}  // Se passar do máximos voltamos pro inicio
    else if (i < 0) {i = max_i}  // Se passar do mínimo voltamos para o máximo

    trocar_elemento(lista_elementos[i]);  // Por fim, usamos a função anterior para trocar
}

function alterar_selecao(classe, este=document.getElementById('destaques')) {  // Função que mostra os itens de acordo com a classe
    apagar();  // Apaga os elementos iniciais
    var i = 1;  // Variavel auxiliar pra correr os elementos

    /* O trecho abaixo é destinado para o ajuste dos botões do menu de seleção */
    var menus = document.getElementsByClassName("options");  // Coleta todas as classes
    for (let aux = 0; aux < menus.length; aux += 1){  // Corre e remove cada uma delas
        if (menus[aux].classList.contains("menu_selecionado")) {menus[aux].classList.remove("menu_selecionado")}}

    este.classList.add("menu_selecionado");  // Definimos que o elemento em questão é o selecionado
    document.getElementById("selecionado").innerHTML = este.innerHTML;  // Também alteramos o texto

    if (classe === 'destaques') {  // Se estivermos trabalhando com a classe de destaques
        var info = dados.getElementsByTagName(classe)[0].childNodes;  // Pegamos os nomes anotados dos itens

        for (let aux = 1; aux < info.length; aux += 2) {  // Percorremos cada um dos itens anotados
            var procurar = info[aux].textContent;  // E coletamos o valor de cada um deles
            var achado = dados.getElementsByTagName(procurar.trim())[0];  // Procuramos pela correspondência

            /* Trecho de código para animar os elementos */
            let objeto = document.getElementById("item_" + String(i));  // Salvamos a referencia da divisória
            if (!objeto.classList.contains("marker")) {objeto.classList.add("marker")}  // Se não tiver marcamos o elemento
            if (!objeto.classList.contains("fadeOut")) {objeto.classList.add("fadeOut")}  // Adicionamos a animação se não tiver
            objeto.addEventListener("animationend", function (){objeto.classList.remove("fadeOut")});  // Removemos a animação no final

            /* Nas linhas abaixo coletamos os dados do documento XML */
            let imagem = achado.getElementsByTagName("imagem")[0].textContent;
            let titulo = achado.getElementsByTagName("titulo")[0].textContent;
            let sumario = achado.getElementsByTagName("sumario")[0].textContent;
            let de = achado.getElementsByTagName("de")[0].textContent;
            let preco = achado.getElementsByTagName("preco")[0].textContent;
            let estoque = achado.getElementsByTagName("estoque")[0].textContent;

            /* Nas linhas abaixo realizamos as alterações */
            objeto.title = sumario;
            objeto.style.display = "flex";
            objeto.getElementsByTagName("img")[0].src = imagem;
            objeto.getElementsByTagName("h1")[0].innerHTML = titulo;
            objeto.getElementsByTagName("h3")[0].innerHTML = sumario;
            objeto.getElementsByTagName("h4")[0].innerHTML = de;
            objeto.getElementsByTagName("h2")[0].innerHTML = preco;

            let disponivel = objeto.getElementsByTagName("h5")[0];  // Salvamos o elemento de disponibilidade
            /* Se tiver mais que um será disponível, caso contrário indisponível. Também ajusta a cor do elemento */
            if (estoque == 0) {disponivel.style.color = "red"; disponivel.innerHTML = "Indisponível"}
            else {disponivel.style.color = "green"; disponivel.innerHTML = "Disponível"}

            i += 1;  // No final aumentamos a variável para ir ao próximo container
        }
    }

    else {
        var elementos = dados.getElementsByTagName(classe)[0].childNodes;  // Coletamos todos os elementos da classe

        for (let aux = 1; aux < elementos.length; aux += 2) {  // Percorremos todos os elementos que não são de texto

            let elemento = elementos[aux];  // Salvamos uma referencia do objeto XML
            let objeto = document.getElementById("item_" + String(i));  // Salvamos a referencia da divisória
            if (!objeto.classList.contains("marker")) {objeto.classList.add("marker")}  // Se não tiver a marcação adicionamos
            if (!objeto.classList.contains("fadeOut")) {objeto.classList.add("fadeOut")}  // Se não tiver a animação adicionamos
            objeto.addEventListener("animationend", function (){objeto.classList.remove("fadeOut")});  // Removemos a animação no final

            /* No trecho abaixo apenas são coletadas as informações do documento XML */
            let imagem = elemento.getElementsByTagName("imagem")[0].textContent;
            let titulo = elemento.getElementsByTagName("titulo")[0].textContent;
            let sumario = elemento.getElementsByTagName("sumario")[0].textContent;
            let de = elemento.getElementsByTagName("de")[0].textContent;
            let preco = elemento.getElementsByTagName("preco")[0].textContent;
            let estoque = elemento.getElementsByTagName("estoque")[0].textContent;

            /* Nas linhas abaixo realizamos as alterações */
            objeto.title = sumario;
            objeto.style.display = "flex";
            objeto.getElementsByTagName("img")[0].src = imagem;
            objeto.getElementsByTagName("h1")[0].innerHTML = titulo;
            objeto.getElementsByTagName("h3")[0].innerHTML = sumario;
            objeto.getElementsByTagName("h4")[0].innerHTML = de;
            objeto.getElementsByTagName("h2")[0].innerHTML = preco;

            let disponivel = objeto.getElementsByTagName("h5")[0];  // Coletamos o elemento disponibilidade
            /* Nos dados abaixo apenas adaptamos o texto e a cor devido a quantidade de estoque */
            if (estoque == 0) {disponivel.style.color = "red"; disponivel.innerHTML = "Indisponível"}
            else {disponivel.style.color = "green"; disponivel.innerHTML = "Disponível"}

            i += 1;  // No final aumentamos a variável para ir ao próximo container
        }
    }

    atualizador();  // Atualizamos a interface com os novos elementos
    trocar_elemento(lista_elementos[0]);  // E atualizamos as legendas
}

function pegar_dados(){  // Adquire a informação do banco de dados
    var xhttp = new XMLHttpRequest();  // Cria uma nova requisição
    xhttp.open("GET", "data.xml", true);  // Usa o método "GET" para abrir
    xhttp.send();  // Envia os dados para o servidor

    /* No comando abaixo definimos que depois de receber a aprovação o banco de dados será atualizado e a imagem irá adaptar os elementos */
    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {dados = this.responseXML; criar_elementos(); alterar_selecao("destaques")}}}
function criar_elementos(){  // Cria a quantidade adequada de itens
    let divisoria = document.getElementById("exibir");  // Pegamos a divisória onde serão criados os itens
    let quantidade = dados.getElementsByTagName("titulo").length;  // Verificamos a quantidade de itens a ser criados

    for (let aux = 1; aux <= quantidade; aux += 1){  // Percorremos o loop criado cada item
        divisoria.innerHTML += '<div id="item_'+ aux +'" class="item_container"> <img src="sprites/logo.png">' +
            ' <h1> Nome do Produto </h1> <h2> Preço </h2> <h5 style="color: green; font-size: 12px; margin: 0">' +
            ' Disponível </h5> <h3 style="display: none"> Sumário </h3> <h4 style="display: none"> De </h4> </div>'}}

function bindar(elemento, alvo) {
    criar_elementos();
    //window.open("products/product.html?soldador_350w", '_self')

}