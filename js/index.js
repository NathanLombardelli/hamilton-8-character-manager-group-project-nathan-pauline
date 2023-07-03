
// je recup les infos, c ma requête api
fetch('https://character-database.becode.xyz/characters')
    .then((response) => response.json()) // transformer la promesse, qui s'apelle response, en json (le format)
    .then((json) =>  afficher(json)); // je donne en param le json



// je créer ma fonction afficher qui va aller chercher mon info voulue
function afficher(json) {// nom de la var plus haut, c un argument de la fct
    // console.log(json) //console.log de mon fichier json
    for (let character of json) { //  2.3.
       //  console.log(character ["name"] );
        let div = document.createElement("a"); // 2.3.
        div.className = "card"; // je crée une classe a ma div pour la styliser plus tard dans sass
        div.href = "./pages/character.html?id=" + character["id"]; // character c'est clé et id c valeur (clé valeur)
       
        
        let image = new Image();
        image.src = 'data:image/png;base64,'+ character["image"];
        div.appendChild(image);
        image.style.borderRadius = "5px";
        image.style.width ="100%";

        let nameBlock = document.createElement("p"); // 2.4.
        nameBlock.innerText = character["name"]; //2.5.
        nameBlock.className = "nameBlock"; 

        let section =  document.getElementById("characterList"); //2.7.
        section.append(div); //2.8.

        let shortDescriptionBlock = document.createElement("p"); //3
        shortDescriptionBlock.innerText = character["shortDescription"];
        shortDescriptionBlock.className = "shortDescriptionBloc";

        let buttonModifying = document.createElement("a"); // je crée un button pour modifier mon chara
        buttonModifying.className = "fa-regular fa-pen-to-square";
        buttonModifying.style.color = "#bdd283";
        buttonModifying.href= "./pages/modifyCharacter.html?id=" + character["id"];
        buttonModifying.id = "buttonModifying";


        let buttonDelete = document.createElement("i");
        buttonDelete.className = "fa-regular fa-trash-can";
        buttonDelete.style.color = "#fdb068";
        buttonDelete.addEventListener("click", ()=> {
            deleteTheCharacter(character["id"]);
        }); 
        
      
        div.append(nameBlock, shortDescriptionBlock, buttonModifying, buttonDelete); // je met le nameBlock  shortDes et button dans ma div générale
    

    }
}

async function deleteTheCharacter(id) {
    let card = document.getElementsByClassName('card');

    for (let val of card){
        val.removeAttribute("href");
    }

    let reponse = await window.confirm("Are you sure you want to delete this kind person?");
    let init = {
        method: "DELETE"
    }

    if (reponse){
        fetch('https://character-database.becode.xyz/characters/' + id,init)
            .then((response) => console.log(response))
            .then(()=>
                window.location.replace("./index.html")
            )
            .catch(error=> {
                console.log(error);
            });
    }
}



// 1. paraph 1 avec fetch : je vais chercher dans la page les characters de la database 
   //  1.1  je fais une première promesse, qui s'appelle réponse, et je lui donne le format .json, ca va faire transfo mes charater en format json
   // 1.2 je les fait aficher

// 2. paraph function 
    // 2.1. je crée ma fonction, je lui donne le nom de afficher et comme argument json
    // 2.2. je crée une boucle qui va faire afficher dynamiquement les elements que je veux 
    // 2.3. je creé une div et comme ca mes elements seront la dedans 
    // 2.4. je crée un p, qui s'apelle nameBlock pcq les noms seront dedans
    // 2.5. comme p est encore vide, je lui dis que ce sera du texte dedans et que il affichera les names du bloc character
    // 2.6. je fais tenir mon p dans ma div
    // 2.7. je recup l'élément qui s'aplle characterList et je le met dans la var qui est section
    // 2.8. je fais tenir la div a la section
// 3 je crée un second p que j'apelle shortDescriptionBlock et dedans je vais y mettre les shortDescription du character de mon tableau json
// 4 je crée un 3ème p qui va être ma description et dedans je vais y mettre les description du character de mon tableau json
// 5
// 6


/************************ Shiny card ***************************/



const elPhp = document.querySelector(".cardPhp");
const wrapPhp = document.querySelector(".cardPhp__wrapper");
let wPhp = elPhp.clientWidth;
let hPhp = elPhp.clientHeight;
let bPhp = elPhp.getBoundingClientRect();
elPhp.addEventListener("mousemove", (e) => {
    let X = (e.clientX - bPhp.width) / wPhp;
    let Y = (e.clientY - bPhp.height) / hPhp;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    let bgX = 40 + 20 * X;
    let bgY = 40 + 20 * Y;

    document.documentElement.style.setProperty("--xPhp", 100 * X + "%");
    document.documentElement.style.setProperty("--yPhp", 100 * Y + "%");

    document.documentElement.style.setProperty("--bgPhp-x", bgX + "%");
    document.documentElement.style.setProperty("--bgPhp-y", bgY + "%");

    document.documentElement.style.setProperty("--rPhp-x", rX + "deg");
    document.documentElement.style.setProperty("--rPhp-y", rY + "deg");
});




const elShib = document.querySelector(".cardShib");
const wrapShib = document.querySelector(".cardShib__wrapper");
let wShib = elShib.clientWidth;
let hShib = elShib.clientHeight;
let bShib = elShib.getBoundingClientRect();
elShib.addEventListener("mousemove", (e) => {
    let X = (e.clientX - bShib.width) / wShib;
    let Y = (e.clientY - bShib.height) / hShib;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    let bgX = 40 + 20 * X;
    let bgY = 40 + 20 * Y;

    document.documentElement.style.setProperty("--xShib", 100 * X + "%");
    document.documentElement.style.setProperty("--yShib", 100 * Y + "%");

    document.documentElement.style.setProperty("--bgShib-x", bgX + "%");
    document.documentElement.style.setProperty("--bgShib-y", bgY + "%");

    document.documentElement.style.setProperty("--rShib-x", rX + "deg");
    document.documentElement.style.setProperty("--rShib-y", rY + "deg");
});



/************************ SearchBar ***************************/

let searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',()=>{

    let searchInput = document.getElementById('simple-search');

    document.getElementById("characterList").innerHTML = "";

    fetch('https://character-database.becode.xyz/characters?name=' + searchInput.value)
        .then((response) => response.json())
        .then(json => afficher(json))
        .catch(error=> {
            console.log(error);
        });

});



