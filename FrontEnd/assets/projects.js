// on vérifie si il y a le token dans le localstorage
let token = window.localStorage.getItem("token");
if (token) {
  // si token existe, dans la nav on modifie le login par logout
  let linkLogin = document.getElementById("link-login");
  linkLogin.innerText = "logout";

  // on fait apparaitre la topbar edition
  let editionTopbar = document.getElementById("edition-topbar");
  editionTopbar.style.display = "flex";

  // on fait apparaitre le modifier dans les projets
  let editionProjets = document.getElementById("edition-projets");
  editionProjets.style.display = "flex";

  // au clic sur logout, on se déconnecte
  linkLogin.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

const reponseWorks = await fetch("http://localhost:5678/api/works");
export const works = await reponseWorks.json();

let divFilter = document.getElementById("filters")

export function galleryGenerator(works) {
  let gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    let worksImg = works[i].imageUrl;
    let worksTitle = works[i].title;

    let figureBalise = document.createElement("figure");
    let imageBalise = document.createElement("img");
    let figcaptionBalise = document.createElement("figcaption");

    gallery.appendChild(figureBalise); // On met la balise figure dans la div gallery
    figureBalise.appendChild(imageBalise); // On met la balise img dans la figure
    figureBalise.appendChild(figcaptionBalise); // Idem avec figcaption

    imageBalise.src = worksImg;
    figcaptionBalise.innerText = worksTitle;
  }
}

export function modalGenerator(works) {
  let modaleList = document.getElementById("modale-list");
  modaleList.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    let worksId = works[i].id;

    let modaleCard = document.createElement("div");
    let modaleCardImg = document.createElement("img");
    let modaleCardTrash = document.createElement("img");
    
    modaleCardTrash.id = worksId;
    modaleCardImg.src = works[i].imageUrl;
    modaleCardImg.classList.add("imgProjet");
    modaleCardTrash.src = "assets/icons/trash.png";

    modaleList.appendChild(modaleCard);
    modaleCard.appendChild(modaleCardImg);
    modaleCard.appendChild(modaleCardTrash);
    modaleCard.classList.add("modale-card");
    modaleCardTrash.classList.add("trash");
  }
}

galleryGenerator(works);
modalGenerator(works)

// Récupération des catégories pour afficher les boutons de filtres
const fetchCategory = await fetch("http://localhost:5678/api/categories");
const responseCategory = await fetchCategory.json();

for(let i = 0 ; i < responseCategory.length ; i++){
  let buttonFilter = document.createElement("button")
  buttonFilter.innerText = responseCategory[i].name
  buttonFilter.value = responseCategory[i].id
  buttonFilter.classList.add("filters-button")

  divFilter.appendChild(buttonFilter)
}

// Filtre les work en fonction des catégories
let allButtonsFilters = document.querySelectorAll("#filters button");

for(let i = 0 ; i < allButtonsFilters.length ; i++){
  allButtonsFilters[i].addEventListener("click", function(){
    let filtreAction = works.filter(function (work) {
      if(i === 0){ // Si Tous est cliqué, retourne tous les work
        return work.categoryId >= 0;
      } else {
        return work.categoryId === i;
      }
    });
    document.getElementById("gallery").innerHTML = "";
    galleryGenerator(filtreAction);
  })
}

// Style swap filtre actif
allButtonsFilters.forEach((aButtonFilters) => {
  aButtonFilters.addEventListener("click", function () {
    document
      .querySelector(".filters-active")
      ?.classList.remove("filters-active");
    aButtonFilters.classList.add("filters-active");
  });
});

// suppression projet
export function addTrashEventListener() {
  let allTrash = document.querySelectorAll(".trash"); // Déclaration de ma fonction à l'intérieur pour que ça maj la sélection

  for (let i = 0; i < allTrash.length; i++) {
    allTrash[i].addEventListener("click", function () {

      fetch(`http://localhost:5678/api/works/${allTrash[i].id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          works.splice(i, 1); // Force la suppression du projet avant le rechargement de page
          galleryGenerator(works);
          modalGenerator(works)

          addTrashEventListener(); // Sans ça, impossible de supprimer après une suppression
        }
      });
    });
  }
}

addTrashEventListener();
