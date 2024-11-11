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

let buttonTous = document.querySelector(".filters-tous");
let buttonObjets = document.querySelector(".filters-objets");
let buttonAppartements = document.querySelector(".filters-appartements");
let buttonHotels = document.querySelector(".filters-hotels");

export function generatorWorks(works) {
  let gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  let modaleList = document.getElementById("modale-list");
  modaleList.innerHTML = "";

  for (let i = 0; i < works.length; i++) {
    let worksImg = works[i].imageUrl;
    let worksTitle = works[i].title;
    let worksId = works[i].id;

    let figureBalise = document.createElement("figure");
    let imageBalise = document.createElement("img");
    let figcaptionBalise = document.createElement("figcaption");

    gallery.appendChild(figureBalise); // on met la balise figure dans la div gallery
    figureBalise.appendChild(imageBalise); // on met la balise img dans la figure
    figureBalise.appendChild(figcaptionBalise); // idem avec figcaption

    imageBalise.src = worksImg;
    figcaptionBalise.innerText = worksTitle;

    // apparition dans la modale
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

generatorWorks(works);

// boutons de filtres
buttonTous.addEventListener("click", function () {
  let filtersTous = works.filter(function (work) {
    return work.categoryId >= 0;
  });
  document.getElementById("gallery").innerHTML = "";
  generatorWorks(filtersTous);
});

buttonObjets.addEventListener("click", function () {
  let filtersObjets = works.filter(function (work) {
    return work.categoryId === 1;
  });
  document.getElementById("gallery").innerHTML = "";
  generatorWorks(filtersObjets);
});

buttonAppartements.addEventListener("click", function () {
  let filtersAppartements = works.filter(function (work) {
    return work.categoryId === 2;
  });
  document.getElementById("gallery").innerHTML = "";
  generatorWorks(filtersAppartements);
});

buttonHotels.addEventListener("click", function () {
  let filtersHotels = works.filter(function (work) {
    return work.categoryId === 3;
  });
  document.getElementById("gallery").innerHTML = "";
  generatorWorks(filtersHotels);
});
//

// bouton filtres UI
let allButtonsFilters = document.querySelectorAll(".filters-button");

allButtonsFilters.forEach((aButtonFilters) => {
  aButtonFilters.addEventListener("click", function () {
    document
      .querySelector(".filters-active")
      ?.classList.remove("filters-active");
    aButtonFilters.classList.add("filters-active");
  });
});

// suppression projet
let allTrash = document.querySelectorAll(".trash");

function addTrashEventListener() {
  for (let i = 0; i < allTrash.length; i++) {
    allTrash[i].addEventListener("click", function () {
      console.log(i);

      fetch(`http://localhost:5678/api/works/${allTrash[i].id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          works.splice([i], 1);
          generatorWorks(works);
          console.log("Fichier supprimé");
          allTrash = document.querySelectorAll(".trash");
          addTrashEventListener();
        } else {
          console.log("Erreur dans la suppression");
        }
      });
    });
  }
}

addTrashEventListener();