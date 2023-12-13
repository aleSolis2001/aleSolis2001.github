const API_URL = "https://random-word-api.herokuapp.com/word?length=5&lang=es"
const palabras = [
    "CIELO", "COLOR", "MANDO","CAMPO","MUNDO","RAZON","LLENO","RITMO","PALMA","PERRO","FELIZ","COCHE","MONTE","PARED","VERDE","JOVEN","FUEGO","PIANO","CULTO","FUSIL","TRONO","BAHIA","POLLO","ARROZ","FIDEO","MENEO","MENOR","ALTAR","ABETO","AGUDO","AUTOR","BACHE","BIZCO","BICHO","MESSI","CABRA","CAPTO","CALMA","AMIGO","CERDO","CERCA","CAIDA","ELLOS","ESTAS","ENOJO","FINCA","GALLO","GANAR","INDIA","HACER","HIELO","MANIA","MARCA","METRO","MORIR","NADAR"
]
let word = getWord()

const tryes = document.getElementById("grid")
let intentos = 6
const input = document.getElementById("input")


function intentar(){
    console.log(word)
    let intento = input.value.toUpperCase().replace(/ /g, '');

    if(intento.length !== 5 || intento.includes(" ")) {
        document.getElementById("error").classList.remove("hidden")
        return false
    }else document.getElementById("error").classList.add("hidden")

    input.value = ""
    let divToInsert  = document.createElement("div")
    divToInsert.classList.add("row")
    if (intento === word){
        for(let letter of intento){
            divToInsert.appendChild(Object.assign(document.createElement("span"), {style: "background-color: green;",textContent: `${letter}`}));
        };
        tryes.appendChild(divToInsert)
        let win = document.getElementById("win-message")
        win.classList.remove("hidden")
        return false;
    }    
    intentos--
    if (intentos == 0){
        var lose = document.getElementById("lose-message")
        lose.classList.remove("hidden")
        let correctWord = document.getElementById("correct-word")
        correctWord.textContent = word
        return false
    }
    for(let i in word){
        if (intento[i] === word[i]){
            divToInsert.appendChild(Object.assign(document.createElement("span"), {style: "background-color: green;",textContent: `${intento[i]}`}));
        } else if(word.includes(intento[i])){
            divToInsert.appendChild(Object.assign(document.createElement("span"), {style: "background-color: yellow;",textContent: `${intento[i]}`}));
        } else  {divToInsert.appendChild(Object.assign(document.createElement("span"), {style: "background-color: grey;",textContent: `${intento[i]}`}));}
    }
    tryes.appendChild(divToInsert)
    return false
}
async function getWord(){
    try {
        const res = await fetch(API_URL)
        const data = await res.json()
        return word = data[0].toUpperCase()
    } catch (error) {
        console.error("API ERROR")
        return word = palabras[Math.floor(Math.random() * palabras.length).toUpperCase]
    }
}
function tryAgain(){
word = getWord()
intentos = 6
document.getElementById("lose-message").classList.add("hidden")
document.getElementById("win-message").classList.add("hidden")
tryes.innerHTML = ""
}