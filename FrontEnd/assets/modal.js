import { galleryGenerator } from "./projects.js"
import { modalGenerator } from "./projects.js"
import { addTrashEventListener } from "./projects.js"
import { works } from "./projects.js"

let editionProjets = document.getElementById("edition-projets");
let modale = document.getElementById("modale");
let btnCloseModale = document.getElementById("modale-close");
let btnBackModale = document.getElementById("modale-back");

let addPhotoTitre = document.querySelector(".addPhoto-selectTitre");
let addPhotoSelect = document.querySelector("#modale-addPhoto select");
let addPhotoFile = document.getElementById("file-button");

let modaleContainer = document.getElementById("modale-container");
let modaleGallery = document.getElementById("modale-gallery");
let modaleAddPhoto = document.getElementById("modale-addPhoto");
let formAddPhoto = document.querySelector("#modale-addPhoto form");
let buttonModaleGallery = document.querySelector("#modale-gallery button");
let buttonModaleAddPhoto = document.querySelector("#div-btn-form input");

let body = document.querySelector("body");

let blocFileLabel = document.querySelector("#blocFile label")
let blocFileImg = document.querySelector("#blocFile label img")
let blocFileAdd = document.getElementById("file-button-add")
let blocFileFormat = document.getElementById("file-button-format")
let imgLoad = document.createElement("img")
let divMessageError = document.querySelector("#div-msg-error")

// Modale ouverture étape 1/2
editionProjets.addEventListener("click", function () {
  modale.style.display = "flex";
  body.style.overflow = "hidden";
  modale.addEventListener("click", function () {
    closeModale();
  });
  modaleContainer.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// Modale fermeture
btnCloseModale.addEventListener("click", function () {
  closeModale();
});

function closeModale() {
  modale.style.display = "none";
  // on revient à l'étape 1 après ré-ouverture
  modaleGallery.style.display = "block";
  modaleAddPhoto.style.display = "none";
  btnBackModale.style.display = "none";
  // les champs redeviennent vides
  addPhotoTitre.value = "";
  addPhotoSelect.value = "";
  addPhotoFile.value = "";
  body.style.overflow = "scroll";
  imgLoad.src = ''
  divMessageError.innerHTML = ''
  btnDisactiv();
}

// Ouverture modale 2/2
buttonModaleGallery.addEventListener("click", function () {
  modaleGallery.style.display = "none";
  modaleAddPhoto.style.display = "block";
  btnBackModale.style.display = "block";
  blocFileImg.style.display = "block";
  blocFileAdd.style.display = "inline-block";
  blocFileFormat.style.display = "block";
});

// Retour sur modale 1/2
btnBackModale.addEventListener("click", function () {
  modaleGallery.style.display = "block";
  modaleAddPhoto.style.display = "none";
  btnBackModale.style.display = "none";
  addPhotoTitre.value = "";
  addPhotoSelect.value = "";
  addPhotoFile.value = "";
  imgLoad.src = ''
  divMessageError.innerHTML = ''
  btnDisactiv();
});

function btnActiv() {
  buttonModaleAddPhoto.style.backgroundColor = "#1D6154";
  buttonModaleAddPhoto.disabled = false;
  buttonModaleAddPhoto.style.cursor = "pointer";
}
function btnDisactiv() {
  buttonModaleAddPhoto.style.backgroundColor = "var(--button-inactive)";
  buttonModaleAddPhoto.disabled = true;
  buttonModaleAddPhoto.style.cursor = "not-allowed";
}

// Si les 3 champs sont renseignés, le boutons devient actif
formAddPhoto.addEventListener("change", function (event) {
  if (
    addPhotoTitre.value != "" &&
    addPhotoSelect.value != "" &&
    addPhotoFile.value != ""
  ) {
    btnActiv();
  }
});

// Affichage img après chargement de l'input
addPhotoFile.addEventListener("change", function (event) {
  blocFileImg.style.display = "none";
  blocFileAdd.style.display = "none";
  blocFileFormat.style.display = "none";

  const fileNameUser = event.target.files[0]; // On cible l'image insérée
  const previewURL = URL.createObjectURL(fileNameUser); // On génère une url temporaire pour afficher l'img

  blocFileLabel.appendChild(imgLoad)
  imgLoad.src = previewURL
  imgLoad.style.height = "100%"
})

// Récupération des catégories pour l'input selec
const fetchCategory = await fetch("http://localhost:5678/api/categories");
const responseCategory = await fetchCategory.json();

for(let i = 0 ; i < responseCategory.length ; i++){
  let option = document.createElement("option")
  option.innerText = responseCategory[i].name
  option.value = responseCategory[i].id
  addPhotoSelect.appendChild(option)
}

// Formulaire ajout projet
formAddPhoto.addEventListener("submit", async function (event) {
  event.preventDefault();
  let token = window.localStorage.getItem("token");
  let userSelectOption = addPhotoSelect.value; // On récupère la catégorie (number) choisie

  let formData = new FormData();
  formData.append("image", addPhotoFile.files[0]);
  formData.append("title", addPhotoTitre.value);
  formData.append("category", userSelectOption);

  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {"Authorization": `Bearer ${token}`},
    body: formData,
  }).then((response) => {
    if(response.ok) {
      return response.json(); // Récupérer la réponse JSON si l'API renvoie le nouvel objet
    }
  }).then((newWork) => {
    works.push(newWork); // Ajout du nouveau projet dans les données
    galleryGenerator(works); // Maj des projets dans la gallerie
    modalGenerator(works) // Maj des projets dans la modale

    addTrashEventListener(); // Si pas ça, impossible de suppr après add

    closeModale();
  }).catch((error) => {
    let messageError = document.createElement("p");
    messageError.innerText = "Tous les champs ne sont pas correctement remplis";
    divMessageError.appendChild(messageError);
  });
});
