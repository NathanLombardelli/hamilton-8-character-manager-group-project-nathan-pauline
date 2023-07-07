/**
 * récupère un caratère en json de l'api becode
 * @param id l'id du character
 * @returns {Promise<any>} promise d'un charactere json
 */
export function getCharacterId(id) {

    return fetch('https://character-database.becode.xyz/characters/' + id)
        .then((response) => response.json());

}


export function deleteCharacterId(id,init){
    return fetch('https://character-database.becode.xyz/characters/' + id,init)
        .then((response) => console.log(response));
}

export function modifyCharacterId(id,init){
   return fetch('https://character-database.becode.xyz/characters/' + id, init);
}

export function createCharacter(init){

   return fetch('https://character-database.becode.xyz/characters', init);

}

export function getAllCharcater(){
    return fetch('https://character-database.becode.xyz/characters')
        .then((response) => response.json()); // transformer la promesse, qui s'apelle response, en json (le format)
}