
let Mudkip = ["Mudkip", 50, 70, 50, 40, "https://img.pokemondb.net/sprites/scarlet-violet/normal/mudkip.png"]
let Torchic = ["Torchic", 45, 70, 50, 45, "https://img.pokemondb.net/sprites/scarlet-violet/normal/torchic.png"]
let Treecko = ["Treecko", 40, 65, 55, 50, "https://img.pokemondb.net/sprites/scarlet-violet/normal/treecko.png"]
let pokemon = [Mudkip,Torchic,Treecko]
for(let i = 0; i < pokemon.length; i++)
{
let vida = pokemon[i][1]
let ataque = pokemon[i][2]
let defesa = pokemon[i][3]
let velocidade = pokemon[i][4]

let iv_vida = vida + Math.floor(Math.random() * 16)
let iv_ataque = ataque + Math.floor(Math.random() * 16)
let iv_defesa = defesa + Math.floor(Math.random() * 16)
let iv_velocidade = velocidade + Math.floor(Math.random() * 16)

pokemon[i][1] = iv_vida
pokemon[i][2] = iv_ataque
pokemon[i][3] = iv_defesa
pokemon[i][4] = iv_velocidade

let vidamaxima = iv_vida 
pokemon[i].push(vidamaxima)
}

let tela = document.getElementById(`escolha`)

let treinador
let rival
function escolherpokemon(pokemonescolhido)
{
let confirmar = window.confirm(`Você quer escolher o ${pokemonescolhido}?`)
if (confirmar == true)
{
tela.style.display = `none`

let escolha = pokemonescolhido == "Mudkip" ? (treinador = pokemon[0],  rival = pokemon[2])
: pokemonescolhido == "Treecko" ? (treinador = pokemon[2] , rival = pokemon[1] )
: (treinador = pokemon[1] , rival = pokemon [0])
let luta = document.getElementById("luta")

luta.style.display = "none"

let batalha = document.createElement("section")
batalha.id = "batalha"

document.body.insertBefore(batalha, document.querySelector("footer"))

batalha.innerHTML = `
    <div class="pokemon1">
        <img src="${treinador[5]}">
    </div>
       <div class="statusbatalha">
     <h4>
       <span>${treinador[0]}</span>        
       <span id="hptreinador">HP:${treinador[1]}/${treinador[6]}</span>
   </h4>
    </div>
        <div id="caixa-dialogo">
        
        <div id="container-texto">
            <p>O que ${treinador[0]} vai fazer?</p>
        </div>
    <div id="container-golpes" class="escondido">
        <button type="button" class="botao-golpe" onclick="executarGolpe('TACKLE')">TACKLE</button>
        <button type="button" class="botao-golpe" onclick="executarGolpe('LEER')">LEER</button>
        <button class="botao-golpe">-----</button>
        <button class="botao-golpe">-----</button>
    </div>
    </div>
    <div id="menu-acoes">
        <button type="button" id="botaoluta" onclick="atacar()">ATACAR</button>
    </div>
    <div>
        <button type="button" id="botaofugir" onclick="fugir()">CORRER</button>
    </div>

    <div class="pokemon2">
        <img src="${rival[5]}">
    </div>
           <div class="statusbatalharival">
      <h4>
       <span>${rival[0]}</span>        
       <span id="hprival">HP:${rival[1]}/${rival[6]}</span>
   </h4>
    </div>
`

}
else
{
    return
}

}


function processarTurno(golpeTreinador) {

    let velocidadeTreinador = treinador[4];
    let velocidadeRival = rival[4];

    let listaGolpesRival = ['TACKLE', 'LEER'];
    let aleatorio = Math.floor(Math.random() * listaGolpesRival.length);
    let golpeRival = listaGolpesRival[aleatorio];

    if (velocidadeTreinador >= velocidadeRival) {

        executarAtaqueTreinador(golpeTreinador);

        setTimeout(() => {

            if (rival[1] > 0) {
                executarAtaqueRival(golpeRival);
            }

            verificarFimDeJogo();

        }, 1000);

    } else {

        executarAtaqueRival(golpeRival);

        setTimeout(() => {

            if (treinador[1] > 0) {
                executarAtaqueTreinador(golpeTreinador);
            }

            verificarFimDeJogo();

        }, 1000);
    }
}



function executarAtaqueTreinador(nomeGolpe) {
    if (nomeGolpe === 'TACKLE') {

        let dano = Math.round((treinador[2] * 10) / rival[3]);
        rival[1] -= dano;
        console.log(`${treinador[0]} usou TACKLE! Causou ${dano} de dano no rival.`);
    } 
    else if (nomeGolpe === 'LEER') {
        rival[3] -= 10;
        if (rival[3] < 1) rival[3] = 1; // Defesa não pode ser menor que 1
        console.log(`${treinador[0]} usou LEER! A DEFENSE do rival caiu.`);
    }
    if (rival[1] < 0) rival[1] = 0; 
        document.getElementById("hprival").textContent =
    `HP:${rival[1]}/${rival[6]}`;
}

function executarAtaqueRival(nomeGolpe) {
    if (nomeGolpe === 'TACKLE') {
        let dano = Math.round((rival[2] * 10) / treinador[3]);
        treinador[1] -= dano;
        console.log(`Rival ${rival[0]} usou TACKLE! Causou ${dano} de dano em você.`);
    } 
    else if (nomeGolpe === 'LEER') {
        treinador[3] -= 10;
        if (treinador[3] < 1) treinador[3] = 1;
        console.log(`Rival ${rival[0]} usou LEER! A sua DEFENSE caiu.`);
    }
    if (treinador[1] < 0) treinador[1] = 0; 
    document.getElementById("hptreinador").textContent =
    `HP:${treinador[1]}/${treinador[6]}`;
}



function verificarFimDeJogo() {
    if (rival[1] <= 0) {
       window.alert(`Vitória! O ${rival[0]} desmaiou.`);
    } else if (treinador[1] <= 0) {
        window.alert(`Derrota! Seu ${treinador[0]} desmaiou.`);
    }
}

function atacar() {
    const containerTexto = document.getElementById('container-texto');
    const containerGolpes = document.getElementById('container-golpes');
    containerGolpes.classList.remove('escondido');
    containerTexto.classList.add('escondido');
}

function executarGolpe(golpe) {
    processarTurno(golpe);
}

window.processarTurno = processarTurno;
