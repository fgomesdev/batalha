
let Mudkip = ["Mudkip", 50, 70, 50, 40, "pokemon/mudkip_sem_fundo_corrigido.png"]
let Torchic = ["Torchic", 45, 70, 50, 45, "pokemon/torchic_sem_fundo.png"]
let Treecko = ["Treecko", 40, 65, 55, 50, "pokemon/treecko_sem_fundo.png"]
let pokemon = [Mudkip,Torchic,Treecko]
for(let i = 0; i < pokemon.length; i++)
{
let vida = pokemon[i][1]
let ataque = pokemon[i][2]
let defesa = pokemon[i][3]
let velocidade = pokemon[i][4]

let iv_vida = vida + Math.floor(Math.random() * 26)
let iv_ataque = ataque + Math.floor(Math.random() * 26)
let iv_defesa = defesa + Math.floor(Math.random() * 26)
let iv_velocidade = velocidade + Math.floor(Math.random() * 26)

pokemon[i][1] = iv_vida
pokemon[i][2] = iv_ataque
pokemon[i][3] = iv_defesa
pokemon[i][4] = iv_velocidade

let statstotal = iv_vida + iv_ataque + iv_defesa + iv_velocidade
pokemon[i].push(statstotal)
}

let tela = document.getElementById(`escolha`)

function escolherpokemon(pokemonescolhido)
{
let confirmar = window.confirm(`Você quer escolher o ${pokemonescolhido}?`)
if (confirmar == true)
{
tela.innerHTML =   
 `<div>
    <button onclick="retornar()">RETORNAR</button>
    </div>`
let treinador
let rival

let escolha = pokemonescolhido == "Mudkip" ? (treinador = pokemon[0],  rival = pokemon[2])
: pokemonescolhido == "Treecko" ? (treinador = pokemon[2] , rival = pokemon[1] )
: (treinador = pokemon[1] , rival = pokemon [0])
let luta = document.getElementById("luta")

luta.style.display = "none"

let pontostreinador = 0
let pontosrival = 0
let luta_vida = treinador[1] > rival[1] ? ">" : treinador[1] < rival[1] ? "<" : "="
let luta_ataque = treinador[2] > rival[2] ? ">" : treinador[2] < rival[2] ? "<" : "="
let luta_defesa = treinador[3] > rival[3] ? ">" : treinador[3] < rival[3] ? "<" : "="
let luta_velocidade = treinador[4] > rival[4] ? ">" : treinador[4] < rival[4] ? "<" : "="
let luta_stats = treinador[6] > rival[6] ? ">" : treinador[6] < rival[6] ? "<" : "="
luta_vida == ">" ? pontostreinador++ : luta_vida == "<" ? pontosrival++ : 0
luta_ataque == ">" ? pontostreinador++ : luta_ataque == "<" ? pontosrival++ : 0
luta_defesa == ">" ? pontostreinador++ : luta_defesa == "<" ? pontosrival++ : 0
luta_velocidade == ">" ? pontostreinador++ : luta_velocidade == "<" ? pontosrival++ : 0
luta_stats == ">" ? pontostreinador++ : luta_stats == "<" ? pontosrival++ : 0
let vencedor = pontostreinador > pontosrival ? treinador[0] : pontostreinador < pontosrival ? rival[0] : "Empate"

let batalha = document.createElement("section")
batalha.id = "batalha"

document.body.insertBefore(batalha, document.querySelector("footer"))

batalha.innerHTML = `
    <div class="pokemon1">
        <h2>${treinador[0]}</h2>
        <img src="${treinador[5]}">
    </div>

    <div class="status">
        Vida: ${treinador[1]} ${luta_vida} ${rival[1]}<br><br>
        Ataque: ${treinador[2]} ${luta_ataque} ${rival[2]}<br><br>
        Defesa: ${treinador[3]} ${luta_defesa} ${rival[3]}<br><br>
        Velocidade: ${treinador[4]} ${luta_velocidade} ${rival[4]}<br><br>
        Status total: ${treinador[6]} ${luta_stats} ${rival[6]}<br><br>
        O Resultado foi: ${vencedor}
    </div>

    <div class="pokemon2">
        <h2>${rival[0]}</h2>
        <img src="${rival[5]}">
    </div>
`

/*
batalha.innerHTML += `Vida: ${treinador[1]} ${luta_vida} ${rival[1]}<br><br>`
batalha.innerHTML += `Ataque: ${treinador[2]} ${luta_ataque} ${rival[2]}<br><br>`
batalha.innerHTML += `Defesa: ${treinador[3]} ${luta_defesa} ${rival[3]}<br><br>`
batalha.innerHTML += `Velocidade: ${treinador[4]} ${luta_velocidade} ${rival[4]}<br><br>`
batalha.innerHTML += `Status total: ${treinador[6]} ${luta_stats} ${rival[6]}<br><br>`
*/
}
else
{
    return
}

}
function retornar() {
    window.location.reload()
}

