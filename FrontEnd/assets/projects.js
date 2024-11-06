// on vérifie si il y a le token dans le localstorage
let token = window.localStorage.getItem("token");
if (token) {
  // si oui
  // dans la nav on modifie le login par logout
  let linkLogin = document.querySelector("#link-login");
  linkLogin.innerText = "logout";

  // on fait apparaitre la topbar edition
  let editionTopbar = document.querySelector(".edition-topbar");
  editionTopbar.style.display = "flex";

  // on fait apparaitre le modifier dans les projets
  let editionProjets = document.querySelector(".edition-projets");
  editionProjets.style.display = "flex";

  // au clic sur logout, on se déconnecte
  linkLogin.addEventListener("click", function () {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
}

const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

let buttonTous = document.querySelector(".filters-tous");
let buttonObjets = document.querySelector(".filters-objets");
let buttonAppartements = document.querySelector(".filters-appartements");
let buttonHotels = document.querySelector(".filters-hotels");

function generatorWorks(works) {
  let gallery = document.querySelector(".gallery");
  let modaleList = document.querySelector(".modale-list");
  gallery.innerHTML = '';
  modaleList.innerHTML = '';

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
    modaleCardTrash.id = worksId

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


// boutons de filtres
buttonTous.addEventListener("click", function () {
  let filtersTous = works.filter(function (work) {
    return work.categoryId >= 0;
  });
  document.querySelector(".gallery").innerHTML = "";
  generatorWorks(filtersTous);
});

buttonObjets.addEventListener("click", function () {
  let filtersObjets = works.filter(function (work) {
    return work.categoryId === 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  generatorWorks(filtersObjets);
});

buttonAppartements.addEventListener("click", function () {
  let filtersAppartements = works.filter(function (work) {
    return work.categoryId === 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  generatorWorks(filtersAppartements);
});

buttonHotels.addEventListener("click", function () {
  let filtersHotels = works.filter(function (work) {
    return work.categoryId === 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  generatorWorks(filtersHotels);
});
//

generatorWorks(works);

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
let allModaleCard = document.querySelectorAll(".modale-card");

for(let i = 0 ; i < allTrash.length ; i++){
  allTrash[i].addEventListener("click", function () {
    //allModaleCard[i].style.display = "none";

    let demandeDelete = fetch(`http://localhost:5678/api/works/${allTrash[i].id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
       },
    })

    generatorWorks(works);

    if(demandeDelete.ok) {
      console.log("c ok")
    }else {
      console.log("c raté")
    }
  });    
}

