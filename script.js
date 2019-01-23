function chamar(event){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "dados.xml", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {
        console.log(this.responseXML)}}
}

