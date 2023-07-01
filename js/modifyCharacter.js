const postId = (new URLSearchParams(window.location.search)).get('id');

console.log(postId);
fetch('https://character-database.becode.xyz/characters/'+ postId)
    .then((response) => response.json()) // transformer la promesse, qui s'apelle response, en json (le format)
    .then((json) =>  completeDatas(json)); // je donne en param le json



function completeDatas(json) {
    let nameField = document.getElementById('name');
    let sDescField = document.getElementById('Sdescription');
    let imgField = document.getElementById('uploadImageLabel');
    let descField = document.getElementById('description');

    console.log(json['image']);

    nameField.value = json['name'];
    sDescField.value = json["shortDescription"];
    descField.value = json["description"];


    imgField.style.backgroundImage =  "url('data:image/gif;base64," + json['image'] + "')";
    document.querySelector("#textUploadImage").style.display = 'none';

}

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


function modifyCharacter(){



}