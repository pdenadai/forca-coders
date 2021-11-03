document.addEventListener('DOMContentLoaded', () => {
    teclado();
    sorteio();
});


var palavra = ["PADARIA","GELO","OLIMPIADAS","CARRINHO","PASSADO","ORIGINAL","CABIDE","REI","MARIA","BETERRABA","PAULO"];

var erro = 1;
var forca = '';
var indice = Math.floor(Math.random() * palavra.length);
var palavra_oculta = new Array(palavra[indice].length);

for (i=0; i < palavra[indice].length; i++) {
    palavra_oculta[i] = "__";
}

function outra(){
    teclado();
    sorteio();
}

function teclado(){
    teclado = "<table cellpadding=3 cellspacing=6 width=390 height=90> <tr> <form name=fmrteclado action=# onsubmit='return false;'>";
    var linha = 0;
    for(i=65; i<91; i++) {
        if(linha == 8) {
            linha = 0;
            teclado += "</tr><tr>";
        }
        teclado += "<td align=center valign=middle width=15> ";
        teclado += "<button type=button name='" + String.fromCharCode(i) + "' onclick=\"jogar('" + String.fromCharCode(i) +"'); this.style.display ='none';\" class=teclado>" + String.fromCharCode(i) + " </button></td>";
        linha++;
    }
    teclado += "</tr></form></table>";
    document.getElementById('teclado').innerHTML = teclado;
}

function sorteio() {
    var html = "<table cellpadding=2 cellspacing=4 border=0 width=390 height=40><tr>";
    for (i=0; i < palavra[indice].length; i++) {
        html += "<td align=center valign=middle class=visao> __ </td>";
    }
    html += "</tr></table><br>";
    document.getElementById('palavra').innerHTML = html;

}

function tentativa() {
    switch (erro) {
        case 0:
            break
        case 1:
            forca = forca + "<pre>      O   <br>"
            break
        case 2:
            forca = forca + "     /"
            break
        case 3:
            forca = forca + "|"
            break
        case 4:
            forca = forca + "\\ <br>"
            break
        case 5:
            forca = forca + "     /"
            break
        case 6:
            forca = forca + " \\ </pre><br>"
            break
        default:
            document.getElementById('teclado').style.display = 'none';
            forca = "<div class=gameover><b>PERDEUUU</b>";
            forca = forca + "<br><br> Palavra: " + palavra[indice].toUpperCase() + "<br><br>";
            forca = forca + "<a href='javascript:history.go(0)'>INICIAR NOVO JOGO?</a></div>";

    }
    document.getElementById('resultado').innerHTML = forca;
    erro++;
}

function jogar(letra) {
    var nome = palavra[indice].toUpperCase();
    nome.split("");
    var erroSim = 0;
    var coleta = "";
    for (i = 0; i < palavra[indice].length; i++) {
        if (nome[i] == letra) {
            palavra_oculta[i] = letra;
        }
        if (palavra_oculta[i] != "__") {
            coleta = coleta + palavra_oculta[i];
        }
    }
    if (!(coleta.match(letra) == letra)) {
        erroSim = 1;
    }
    
    let texto = "<table cellpadding=2 cellspacing=4 border=0 width=390 height=40><tr>";
    for (i = 0; i < palavra[indice].length; i++) {
        texto += "<td align=center valign=middle class=visao>" + palavra_oculta[i] + "</td>";
    }

    if (erroSim == 1) {
        tentativa();
        erroSim = 0;
    }
    texto += "</tr></table><br>";
    document.getElementById('palavra').innerHTML = texto;

    if (coleta == palavra[indice].toUpperCase()) {

        winmsg = "<br><br><div class=gameover>Palavra: <b>" + palavra[indice].toUpperCase();
        winmsg = winmsg + "<br><br>PARABÉNS VENCEDOR<br><br>";
        winmsg = winmsg + " <a href='javascript:history.go(0)'> JOGAR NOVAMENTE? </a> </div>";

        document.getElementById('resultado').innerHTML = winmsg;
        document.getElementById('teclado').style.display = 'none';
    }
}

