const characterId = (new URLSearchParams(window.location.search)).get('id');
fetch('https://character-database.becode.xyz/characters/' + characterId)
    .then((response) => response.json())
    .then(character =>{

    let div = document.createElement("div");
    div.className = "character";
    document.body.append(div);
    
    let image = new Image();
    image.src = 'data:image/png;base64,'+ character["image"];
    div.appendChild(image);
    image.style.width = "30%";
    

    let nameBlock = document.createElement("p"); // amener le nom du character
    nameBlock.innerText = character["name"]; // dire que y aura du texte et que c nom de l'api
    nameBlock.className = "nameBlock";  // mettre une classe nameBlock
    div.appendChild(nameBlock);

    let shortDescriptionBlock = document.createElement("p"); 
    shortDescriptionBlock.innerText = character["shortDescription"];
    shortDescriptionBlock.className = "shortDescriptionBlock";

    let longDescriptionBlock = document.createElement("md-block");
    longDescriptionBlock.innerText = character["description"];
    longDescriptionBlock.className = "longDescriptionBlock";


    div.append(nameBlock, shortDescriptionBlock, longDescriptionBlock);


    let divButton = document.createElement("div");
    div.className = "divButton";
    document.body.append(divButton);
    divButton.style.padding = "20px";
    divButton.style.gap = "40px";

    let buttonModifying = document.createElement("a"); // je crée un button pour modifier mon chara

    buttonModifying.style.color = "#2f9d10";
    buttonModifying.style.textDecoration = "none";
    buttonModifying.className = "fa-solid fa-pencil";
    buttonModifying.href= "./pages/modifyCharacter.html?id=" + character["id"];
    buttonModifying.id = "buttonModifying";
    buttonModifying.style.fontSize = "40px";
    buttonModifying.style.paddingLeft = "10px";


    let buttonDelete = document.createElement("i");
 

    buttonDelete.style.color = "#ed1d1d";
    buttonDelete.className = "fa-regular fa-circle-xmark";
    buttonDelete.style.fontSize = "40px";
    buttonDelete.addEventListener("click", ()=> {
    deleteTheCharacter(character["id"]);
    }); 


    divButton.append(buttonDelete, buttonModifying);

    let main = document.getElementsByTagName("main")[0];
    main.className = "mainDiv";
    document.body.append(main);

    main.append(image, div, divButton);

});





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