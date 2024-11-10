let editionProjets = document.querySelector(".edition-projets");
let modale = document.querySelector(".modale");
let btnCloseModale = document.querySelector(".modale-close");
let btnBackModale = document.querySelector(".modale-back");

let addPhotoSelectTagInput = document.querySelector(
  ".addPhoto-selectTag-input"
);
let tagImg = document.querySelector(".addPhoto-selectTag-input img");
let addPhotoSelectTagResponse = document.querySelector(
  ".addPhoto-selectTag-response"
);
let tagChoix = document.querySelector(".addPhoto-selectTag-input p");
let allLi = document.querySelectorAll(".addPhoto-selectTag-response li");
let addPhotoTitre = document.querySelector(".addPhoto-selectTitre");
let addPhotoSelect = document.querySelector(".modale-addPhoto select");
let addPhotoFile = document.querySelector("#file-button");

let fileButtonFormat = document.querySelector(".file-button-format");
let removeFile = document.querySelector(".removeFile");

let modaleContainer = document.querySelector(".modale-container");
let modaleGallery = document.querySelector(".modale-gallery");
let modaleAddPhoto = document.querySelector(".modale-addPhoto");
let formAddPhoto = document.querySelector(".modale-addPhoto form");
let buttonModaleGallery = document.querySelector(".modale-gallery button");
let buttonModaleAddPhoto = document.querySelector(".div-btn-form input");

let body = document.querySelector("body");

let blocFileLabel = document.querySelector(".blocFile label")
let blocFileImg = document.querySelector(".blocFile label img")
let blocFileP = document.querySelector(".blocFile label p")
let blocFileDiv = document.querySelector(".blocFile label div")
let imgAjout = document.createElement("img")

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
  //tagChoix.innerText = "";
  body.style.overflow = "scroll";
  imgAjout.src = ''
  btnDisactiv();
}

// Ouverture modale 2/2
buttonModaleGallery.addEventListener("click", function () {
  modaleGallery.style.display = "none";
  modaleAddPhoto.style.display = "block";
  btnBackModale.style.display = "block";
  blocFileImg.style.display = "block";
  blocFileP.style.display = "inline-block";
  blocFileDiv.style.display = "block";
});

// Retour sur modale 1/2
btnBackModale.addEventListener("click", function () {
  modaleGallery.style.display = "block";
  modaleAddPhoto.style.display = "none";
  btnBackModale.style.display = "none";
  addPhotoTitre.value = "";
  addPhotoSelect.value = "";
  addPhotoFile.value = "";
  imgAjout.src = ''
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
  blocFileP.style.display = "none";
  blocFileDiv.style.display = "none";

  const fileNameUser = event.target.files[0]; // On cible l'image insérée
  const previewURL = URL.createObjectURL(fileNameUser); // On génère une url temporaire pour afficher l'img

  blocFileLabel.appendChild(imgAjout)
  imgAjout.src = previewURL
  imgAjout.style.height = "100%"
})

/*
// Formulaire ajout projet
formAddPhoto.addEventListener("submit", async function (event) {
  event.preventDefault();
//  closeModale();

  let options = document.querySelectorAll("option") // On déclare les 3 options de catégorie
  let category = addPhotoSelect.value // On récupère la catégorie choisie

  // Si category = "objets"
  if (category === options[1].value) {
    category = 1;
  }

  // Si category = "appartements"
  if (category === options[2].value) {
    category = 2;
  }

  // Si category = "hotels"
  if (category === options[3].value) {
    category = 3;
  }

  let token = window.localStorage.getItem("token");

  let formData = new FormData();
  formData.append("image", addPhotoFile.files[0]);
  formData.append("title", addPhotoTitre.value);
  formData.append("category", category); // parseint inutile

  let sendProject = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {"Authorization": `Bearer ${token}`},
    body: formData,
    });

  if (sendProject.ok) {
    console.log("requête reçueeeee !!");
  } else {
    console.log("échec");
  }
});
*/

// Gestion des catégories
const fetchCategory = await fetch("http://localhost:5678/api/categories");
const responseCategory = await fetchCategory.json();

// on déclare les options du select
let selectOption1 = document.getElementById("option1")
let selectOption2 = document.getElementById("option2")
let selectOption3 = document.getElementById("option3")

// on leur donne la valeur (nombre)
selectOption1.value = responseCategory[0].id
selectOption2.value = responseCategory[1].id
selectOption3.value = responseCategory[2].id

// on écrit le nom de la catégorie dans le select
selectOption1.innerText = responseCategory[0].name
selectOption2.innerText = responseCategory[1].name
selectOption3.innerText = responseCategory[2].name


// Formulaire ajout projet
formAddPhoto.addEventListener("submit", async function (event) {
  event.preventDefault();

  let userSelectOption = addPhotoSelect.value // On récupère la catégorie (number) choisie

  let token = window.localStorage.getItem("token");

  let formData = new FormData();
  formData.append("image", addPhotoFile.files[0]);
  formData.append("title", addPhotoTitre.value);
  formData.append("category", userSelectOption);

  let sendProject = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {"Authorization": `Bearer ${token}`},
    body: formData,
    });

  if (sendProject.ok) {
    console.log("requête reçueeeee !!");
    closeModale();
  } else {
    console.log("échec");
  }
});