function chamar(event){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "dados.txt", true);
    xhttp.send();

    xhttp.onreadystatechange = function() {if (this.readyState === 4 && this.status === 200) {
        console.log(this.response)}}
}

