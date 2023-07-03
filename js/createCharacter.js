
let image64;

function readFile() {

    if (!this.files || !this.files[0]) return;

    const FR = new FileReader();

    FR.addEventListener("load", function(evt) {

        document.querySelector("#uploadImageLabel").style.backgroundImage =  "url('" + evt.target.result + "')";
        let index = evt.target.result.indexOf(',');
        image64 = evt.target.result.substring(index + 1);
        document.querySelector("#textUploadImage").style.display = 'none';
        console.log(image64);
    });

    FR.readAsDataURL(this.files[0]);
}



document.querySelector("#dropzone-file").addEventListener("change", readFile);

document.getElementById('createButton').addEventListener('click',createCharacter);

async function createCharacter(){

    let character= {
        name: document.querySelector('#name').value,
        shortDescription: document.querySelector('#Sdescription').value ,
        description: document.querySelector('#description').value ,
        image:image64
    }


    let init = {
        method: 'POST',
        headers: {
            'Accept': 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
    };

    await fetch('https://character-database.becode.xyz/characters', init).then((result) => {
        if(result.ok){
            alert('Character created !');
            return true;
        }else{
            alert('error ' + result.status);
            return false;
        }
    }).then(r=>{
        if(r) { // si le caractère est créer retourner sur l'index.
            window.location.replace("../index.html");
        }
    });



}