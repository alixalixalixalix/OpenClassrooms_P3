/*
fetch('http://localhost:5678/api/works')
  .then(response => response.json()) // Transforme la réponse en JSON
  .then(data => console.log(data))   // Affiche les données récupérées
  .catch(error => console.error('Erreur:', error));
*/

const reponseWorks = await fetch("http://localhost:5678/api/works");
const works = await reponseWorks.json();

let buttonTous = document.querySelector('.filters-tous')
let buttonObjets = document.querySelector('.filters-objets')
let buttonAppartements = document.querySelector('.filters-appartements')
let buttonHotels = document.querySelector('.filters-hotels')

function generatorWorks(works){
    for(let i = 0 ; i < works.length ; i++){
        let worksImg = works[i].imageUrl
        let worksTitle = works[i].title
        
        let figureBalise = document.createElement("figure");
        let imageBalise = document.createElement("img");
        let figcaptionBalise = document.createElement("figcaption");

        let gallery = document.querySelector('.gallery')
        gallery.appendChild(figureBalise) // on met la balise figure dans la div gallery
        figureBalise.appendChild(imageBalise) // on met la balise img dans la figure
        figureBalise.appendChild(figcaptionBalise) // idem avec figcaption

        imageBalise.src = worksImg
        figcaptionBalise.innerText = worksTitle
    }
}



if(buttonTous){ // if pour éviter que cela s'applique sur la page login
    buttonTous.addEventListener("click", function(){
        let filtersTous = works.filter(function (work){
            return work.category.id >= 0
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersTous)
    })

    buttonObjets.addEventListener("click", function(){
        let filtersObjets = works.filter(function (work){
            return work.category.name == "Objets"
            filtersObjets.classList.add("filters-active");
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersObjets)
    })

    buttonAppartements.addEventListener("click", function(){
        let filtersAppartements = works.filter(function (work){
            return work.category.name == "Appartements"
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersAppartements)
    })

    buttonHotels.addEventListener("click", function(){
        let filtersHotels = works.filter(function (work){
            return work.category.name == "Hotels & restaurants"
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersHotels)
    })
}

generatorWorks(works)



// BOUTON FILTRES ACTIF
let allButtonsFilters = document.querySelectorAll(".filters-button");

allButtonsFilters.forEach(aButtonFilters => {
    aButtonFilters.addEventListener('click', function (){
        document.querySelector(".filters-active")?.classList.remove('filters-active');
        aButtonFilters.classList.add('filters-active');
    });
});




let editionProjet = document.querySelector(".editionProjet")
let modaleEdition = document.querySelector(".modaleEdition")
let closeModale = document.querySelector(".modaleEdition-close")
let backModale = document.querySelector(".modaleEdition-back")

let selectTagInput = document.querySelector(".selectTag-input")
let tagImg = document.querySelector(".selectTag-input img")
let selectTagResponse = document.querySelector(".selectTag-response")
let tagChoix = document.querySelector(".selectTag-input p")
let txtResponse = document.querySelector(".modaleEdition-addPhoto input[type=text]")
let allLi = document.querySelectorAll(".selectTag-response li")

let modaleEditionGallery = document.querySelector(".modaleEdition-gallery")
let modaleEditionAddPhoto = document.querySelector(".modaleEdition-addPhoto")
let buttonModaleGallery = document.querySelector(".modaleEdition-gallery button")
let buttonModaleAddPhoto = document.querySelector(".modaleEdition-addPhoto button")

// MODALE OPEN
editionProjet.addEventListener("click", function(){
    modaleEdition.style.display = "flex";
})

// MODALE CLOSE
closeModale.addEventListener("click", function(){
    modaleEdition.style.display = "none";
    // les champs redeviennent vides
    txtResponse.value = '';
    tagChoix.innerText = ''; 
})

// MODALE ADD PHOTO
buttonModaleGallery.addEventListener("click", function(){
    modaleEditionGallery.style.display = "none";
    modaleEditionAddPhoto.style.display = "block";
    backModale.style.display = "block";
})

// CLOSE ADD PHOTO
backModale.addEventListener("click", function(){
    modaleEditionGallery.style.display = "block";
    modaleEditionAddPhoto.style.display = "none";
    backModale.style.display = "none";
})

// quand je ferme avec la croix à l'étape 2, je reviens à l'étape 2

// DROPDOWN OPEN/CLOSE
selectTagInput.addEventListener("click", function(){
    selectTagResponse.classList.toggle("menu-open");
    tagImg.style.transform = "rotate(180deg)";
    if(selectTagResponse.style.display = "block"){
        selectTagInput.addEventListener("click", function(){
            selectTagResponse.classList.remove("menu-open");
            tagImg.style.transform = "rotate(0deg)";        
        })
    }
})

// Écriture du choix dans le champ
allLi.forEach(aLi => {
    aLi.addEventListener("click", function() {
        let responseClicked = aLi.innerText
        tagChoix.innerText = responseClicked;
        selectTagResponse.style.display = "none";
        tagImg.style.transform = "rotate(0deg)";
    })
})









/*

1. clic pour ouvrir dropdown OK
2. la flèche se retourne OK
2. si clic sur une réponse > l'affiche dans le champ 
3. si clic sur autre chose > ferme le dropdown


*/