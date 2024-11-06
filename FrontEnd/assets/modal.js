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
  fileButtonFormat.innerText = "jpg, png : 4mo max";
  fileButtonFormat.style.color = "#444444";
  body.style.overflow = "scroll";
  btnDisactiv();
}

// Ouverture modale 2/2
buttonModaleGallery.addEventListener("click", function () {
  modaleGallery.style.display = "none";
  modaleAddPhoto.style.display = "block";
  btnBackModale.style.display = "block";
});

// Retour sur modale 1/2
btnBackModale.addEventListener("click", function () {
  modaleGallery.style.display = "block";
  modaleAddPhoto.style.display = "none";
  btnBackModale.style.display = "none";
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

// Si img 
addPhotoFile.addEventListener("change", function (event) {
  let blocFileLabel = document.querySelector(".blocFile label")
  let blocFileImg = document.querySelector(".blocFile label img")
  let blocFileP = document.querySelector(".blocFile label p")
  let blocFileDiv = document.querySelector(".blocFile label div")
  blocFileImg.style.display = "none";
  blocFileP.style.display = "none";
  blocFileDiv.style.display = "none";

  const fileNameUser = event.target.files[0];

  let imgAjout = document.createElement("img")
  blocFileLabel.appendChild(imgAjout)
  imgAjout.src = fileNameUser.name
  imgAjout.style.height = "166px"
  
})

/*
// Le format prend le nom du fichier chargé
addPhotoFile.addEventListener("change", function (event) {
  const fileNameUser = event.target.files[0];
  if (fileNameUser) {
    fileButtonFormat.innerText = fileNameUser.name;
    fileButtonFormat.style.color = "#1D6154";
  }
});
*/

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
  formData.append("imageUrl", addPhotoFile.files[0]);
  formData.append("title", addPhotoTitre.value);
  formData.append("categoryId", category); // parseint inutile

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


/*
// Dropdown open close
addPhotoSelectTagInput.addEventListener("click", function () {
  console.log(addPhotoSelectTagResponse.style.display)
  if (addPhotoSelectTagResponse.style.display == "block") {
    console.log("FERMÉ");
    closeDropdown();
  } else {
    console.log("OUVERT");
    openDropdown();
  }
});

function openDropdown() {
  addPhotoSelectTagResponse.style.display = "block";
  tagImg.style.transform = "rotate(180deg)";
}

function closeDropdown() {
  addPhotoSelectTagResponse.style.display = "none";
  tagImg.style.transform = "rotate(0deg)";
}

// Écriture du choix dans le champ
allLi.forEach((aLi) => {
  aLi.addEventListener("click", function () {
    let responseClicked = aLi.innerText;
    tagChoix.innerText = responseClicked;
    addPhotoSelectTagResponse.style.display = "none";
    tagImg.style.transform = "rotate(0deg)";
  });
});

buttonModaleAddPhoto.disabled = true;

// SUPPR ^ // AFFICHER L'IMG CHARGÉE À LA PLACE DU BLOC DROPFILE

// On écoute le changement sur le titre
addPhotoTitre.addEventListener("change", function (event) {
  // Si les 2 autres champs sont remplis, le bouton devient actif
  if (addPhotoFile.value != "" && tagChoix.innerText != "") {
    btnActiv();
  } else {
    btnDisactiv();
  }
});

// On écoute le changement sur la catégorie
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "childList" || mutation.type === "characterData") {
      if (addPhotoFile.value != "" && addPhotoTitre.value != "") {
        btnActiv();
      } else {
        btnDisactiv();
      }
    }
  });
});

observer.observe(tagChoix, {
  childList: true, // Observe les ajouts et suppressions de nœuds enfants
  subtree: true, // Observe les modifications dans les nœuds descendants
  characterData: true,
});

// Création nouveau projet

let formAddProject = document.querySelector(".modale-addPhoto form");

formAddProject.addEventListener("submit", async function (event) {
  event.preventDefault();
  closeModale();

  let token = window.localStorage.getItem("token");
  console.log(tagChoix.innerText);

  let creaProject = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      image: addPhotoFile.value,
      title: addPhotoTitre.value,
      categorie: tagChoix.innerText,
    }),
  });

  if (creaProject.ok) {
    console.log("requête reçueeeee !!");
  } else {
    console.log("échec");
  }
});

*/
