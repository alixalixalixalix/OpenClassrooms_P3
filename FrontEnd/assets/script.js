
// on vérifie si il y a le token dans le localstorage
let token = window.localStorage.getItem("token")
if(token){ // si oui
    // dans la nav on modifie le login par logout
    let navLog = document.querySelectorAll("li")
    navLog[2].innerText = "logout"  

    // on fait apparaitre la topbar edition
    let editionTopbar = document.querySelector(".edition-topbar") 
    editionTopbar.style.display = "flex";

    // on fait apparaitre le modifier dans les projets
    let editionProjets = document.querySelector(".edition-projets")
    editionProjets.style.display = "block";

    // au clic sur logout, on se déconnecte
    navLog[2].addEventListener("click", function() {
        localStorage.removeItem("token")
        window.location.href = "login.html"
    })
}

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

        // apparition dans la modale
        let modaleEditionList = document.querySelector(".modaleEdition-list")
        let modaleEditionCard = document.createElement("div")
        let modaleEditionCardImg = document.createElement("img")
        let modaleEditionCardTrash = document.createElement("img")

        modaleEditionCardImg.src = works[i].imageUrl
        modaleEditionCardImg.classList.add("imgProjet")

        modaleEditionCardTrash.src = "assets/icons/trash.png";
        
        modaleEditionList.appendChild(modaleEditionCard)
        modaleEditionCard.appendChild(modaleEditionCardImg)
        modaleEditionCard.appendChild(modaleEditionCardTrash)
        modaleEditionCard.classList.add("modaleEdition-card")
        modaleEditionCardTrash.classList.add("trash")
    }
}



if(buttonTous){ // if pour éviter que cela s'applique sur la page login
    buttonTous.addEventListener("click", function(){
        let filtersTous = works.filter(function (work){
            return work.categoryId >= 0
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersTous)
    })

    buttonObjets.addEventListener("click", function(){
        let filtersObjets = works.filter(function (work){
            return work.categoryId === 1
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersObjets)
    })

    buttonAppartements.addEventListener("click", function(){
        let filtersAppartements = works.filter(function (work){
            return work.categoryId === 2
        })
        document.querySelector(".gallery").innerHTML = '';
        generatorWorks(filtersAppartements)
    })

    buttonHotels.addEventListener("click", function(){
        let filtersHotels = works.filter(function (work){
            return work.categoryId === 3
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




let editionProjets = document.querySelector(".edition-projets")
let modaleEdition = document.querySelector(".modaleEdition")
let closeModale = document.querySelector(".modaleEdition-close")
let backModale = document.querySelector(".modaleEdition-back")

let addPhotoSelectTagInput = document.querySelector(".addPhoto-selectTag-input")
let tagImg = document.querySelector(".addPhoto-selectTag-input img")
let addPhotoSelectTagResponse = document.querySelector(".addPhoto-selectTag-response")
let tagChoix = document.querySelector(".addPhoto-selectTag-input p")
let txtResponse = document.querySelector(".modaleEdition-addPhoto input[type=text]")
let allLi = document.querySelectorAll(".addPhoto-selectTag-response li")
let addPhotoSelectTitre = document.querySelector(".addPhoto-selectTitre")

let modaleEditionGallery = document.querySelector(".modaleEdition-gallery")
let modaleEditionAddPhoto = document.querySelector(".modaleEdition-addPhoto")
let buttonModaleGallery = document.querySelector(".modaleEdition-gallery button")
let buttonModaleAddPhoto = document.querySelector(".modaleEdition-addPhoto button")

let body = document.querySelector("body")

// MODALE OUVERTURE 1/2
editionProjets.addEventListener("click", function(){
    modaleEdition.style.display = "flex";
    body.style.overflow = "hidden";
})

// MODALE FERMETURE
closeModale.addEventListener("click", function(){
    modaleEdition.style.display = "none";
    // on revient à l'étape 1 après ré-ouverture
    modaleEditionGallery.style.display = "block";
    modaleEditionAddPhoto.style.display = "none";
    backModale.style.display = "none";
    // les champs redeviennent vides
    txtResponse.value = '';
    tagChoix.innerText = ''; 
    body.style.overflow = "auto";

})

// MODALE VALIDER
buttonModaleAddPhoto.addEventListener("click", function(){
    modaleEdition.style.display = "none";
    // on revient à l'étape 1 après ré-ouverture
    modaleEditionGallery.style.display = "block";
    modaleEditionAddPhoto.style.display = "none";
    backModale.style.display = "none";
    // les champs redeviennent vides
    txtResponse.value = '';
    tagChoix.innerText = ''; 
})

// OUVERTURE MODALE 2/2
buttonModaleGallery.addEventListener("click", function(){
    modaleEditionGallery.style.display = "none";
    modaleEditionAddPhoto.style.display = "block";
    backModale.style.display = "block";
})

// RETOUR SUR MODALE 1/2
backModale.addEventListener("click", function(){
    modaleEditionGallery.style.display = "block";
    modaleEditionAddPhoto.style.display = "none";
    backModale.style.display = "none";
})

// pas de déplacement du container quand ouverture dropdown

// DROPDOWN OPEN/CLOSE
addPhotoSelectTagInput.addEventListener("click", function(){
    addPhotoSelectTagResponse.classList.toggle("menu-open");
    tagImg.style.transform = "rotate(180deg)";
    if(addPhotoSelectTagResponse.style.display = "block"){
        addPhotoSelectTagInput.addEventListener("click", function(){
            addPhotoSelectTagResponse.classList.remove("menu-open");
            tagImg.style.transform = "rotate(0deg)";        
        })
    }
})

// Écriture du choix dans le champ
allLi.forEach(aLi => {
    aLi.addEventListener("click", function() {
        let responseClicked = aLi.innerText
        tagChoix.innerText = responseClicked;
        addPhotoSelectTagResponse.style.display = "none";
        tagImg.style.transform = "rotate(0deg)";
    })
})


let fileButton = document.querySelector("#file-button")
let fileButtonFormat = document.querySelector(".file-button-format")
let removeFile = document.querySelector(".removeFile")

// Le format prend le nom du fichier chargé
fileButton.addEventListener("change", function(event){
    const fileNameUser = event.target.files[0];
    if(fileNameUser){
        fileButtonFormat.innerText = fileNameUser.name
        fileButtonFormat.style.color = "#1D6154"
        // Si les 2 autres champs sont remplis, le bouton devient actif
        if(addPhotoSelectTitre.value != '' && tagChoix.innerText != ''){
            buttonModaleAddPhoto.style.backgroundColor = "#1D6154"
        }
    }
})

// On écoute le changement sur le titre
addPhotoSelectTitre.addEventListener("change", function(event){
    // Si les 2 autres champs sont remplis, le bouton devient actif
    if(fileButton.value != '' && tagChoix.innerText != ''){
        buttonModaleAddPhoto.style.backgroundColor = "#1D6154"
    }
})

// On écoute le changement sur la catégorie
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if(mutation.type === 'childList' || mutation.type === "characterData"){
            if(fileButton.value != '' && addPhotoSelectTitre.value != ''){
                buttonModaleAddPhoto.style.backgroundColor = "#1D6154"
            }}
    })
})

observer.observe(tagChoix, {
    childList: true,        // Observe les ajouts et suppressions de nœuds enfants
    subtree: true,          // Observe les modifications dans les nœuds descendants
    characterData : true
})