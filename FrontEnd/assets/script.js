
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
    editionProjets.style.display = "flex";

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
        let modaleList = document.querySelector(".modale-list")
        let modaleCard = document.createElement("div")
        let modaleCardImg = document.createElement("img")
        let modaleCardTrash = document.createElement("img")

        modaleCardImg.src = works[i].imageUrl
        modaleCardImg.classList.add("imgProjet")

        modaleCardTrash.src = "assets/icons/trash.png";
        
        modaleList.appendChild(modaleCard)
        modaleCard.appendChild(modaleCardImg)
        modaleCard.appendChild(modaleCardTrash)
        modaleCard.classList.add("modale-card")
        modaleCardTrash.classList.add("trash")
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
let modale = document.querySelector(".modale")
let btnCloseModale = document.querySelector(".modale-close")
let btnBackModale = document.querySelector(".modale-back")

let addPhotoSelectTagInput = document.querySelector(".addPhoto-selectTag-input")
let tagImg = document.querySelector(".addPhoto-selectTag-input img")
let addPhotoSelectTagResponse = document.querySelector(".addPhoto-selectTag-response")
let tagChoix = document.querySelector(".addPhoto-selectTag-input p")
let txtResponse = document.querySelector(".modale-addPhoto input[type=text]")
let allLi = document.querySelectorAll(".addPhoto-selectTag-response li")
let addPhotoSelectTitre = document.querySelector(".addPhoto-selectTitre")

let modaleContainer = document.querySelector(".modale-container")
let modaleGallery = document.querySelector(".modale-gallery")
let modaleAddPhoto = document.querySelector(".modale-addPhoto")
let buttonModaleGallery = document.querySelector(".modale-gallery button")
let buttonModaleAddPhoto = document.querySelector(".div-btn-form input")

let body = document.querySelector("body")

// MODALE OUVERTURE ÉTAPE 1/2
editionProjets.addEventListener("click", function(){
    modale.style.display = "flex";
    body.style.overflow = "hidden";
    modale.addEventListener("click", function(){
        closeModale()
    })
    modaleContainer.addEventListener("click", function(e){
        e.stopPropagation();
    })
})

// MODALE FERMETURE
btnCloseModale.addEventListener("click", function(){
    closeModale()
})

function closeModale() {
    modale.style.display = "none";
    // on revient à l'étape 1 après ré-ouverture
    modaleGallery.style.display = "block";
    modaleAddPhoto.style.display = "none";
    btnBackModale.style.display = "none";
    // les champs redeviennent vides
    txtResponse.value = '';
    tagChoix.innerText = '';
    fileButton.value = '';
    fileButtonFormat.innerText = "jpg, png : 4mo max"
    fileButtonFormat.style.color = "#444444"
    body.style.overflow = "auto";
    btnDisactiv()
}

// OUVERTURE MODALE 2/2
buttonModaleGallery.addEventListener("click", function(){
    modaleGallery.style.display = "none";
    modaleAddPhoto.style.display = "block";
    btnBackModale.style.display = "block";
})

// RETOUR SUR MODALE 1/2
btnBackModale.addEventListener("click", function(){
    modaleGallery.style.display = "block";
    modaleAddPhoto.style.display = "none";
    btnBackModale.style.display = "none";
})


// DROPDOWN OPEN/CLOSE
addPhotoSelectTagInput.addEventListener("click", function(){
    if(addPhotoSelectTagResponse.style.display != "block"){ // PAR ICI
        console.log("OUVERT")
        openDropdown();
    }
    else{
        console.log("FERMÉ")
        closeDropdown();
    }
})

function openDropdown() {
    addPhotoSelectTagResponse.style.display = "block"
    tagImg.style.transform = "rotate(180deg)";
}

function closeDropdown() {
    addPhotoSelectTagResponse.style.display = "none"
    tagImg.style.transform = "rotate(0deg)";
}

// Écriture du choix dans le champ
allLi.forEach(aLi => {
    aLi.addEventListener("click", function() {
        let responseClicked = aLi.innerText
        tagChoix.innerText = responseClicked;
        addPhotoSelectTagResponse.style.display = "none";
        tagImg.style.transform = "rotate(0deg)";
    })
})


// BOUTON VALIDÉ AJOUT PROJET
let fileButton = document.querySelector("#file-button")
let fileButtonFormat = document.querySelector(".file-button-format")
let removeFile = document.querySelector(".removeFile")


buttonModaleAddPhoto.disabled = true


function btnActiv() {
    buttonModaleAddPhoto.style.backgroundColor = "#1D6154"
    buttonModaleAddPhoto.disabled = false
    buttonModaleAddPhoto.style.cursor = "pointer"
}
function btnDisactiv() {
    buttonModaleAddPhoto.style.backgroundColor = "var(--button-inactive)"
    buttonModaleAddPhoto.disabled = true
    buttonModaleAddPhoto.style.cursor = "not-allowed"
}

// Le format prend le nom du fichier chargé
fileButton.addEventListener("change", function(event){
    const fileNameUser = event.target.files[0];
    if(fileNameUser){
        fileButtonFormat.innerText = fileNameUser.name
        fileButtonFormat.style.color = "#1D6154"
        // Si les 2 autres champs sont remplis, le bouton devient actif
        if(addPhotoSelectTitre.value != '' && tagChoix.innerText != ''){
            btnActiv()
        }
        else {
            btnDisactiv()
        }
    }
})

// On écoute le changement sur le titre
addPhotoSelectTitre.addEventListener("change", function(event){
    // Si les 2 autres champs sont remplis, le bouton devient actif
    if(fileButton.value != '' && tagChoix.innerText != ''){
        btnActiv()
    }
    else {
        btnDisactiv()
    }
})

// On écoute le changement sur la catégorie
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if(mutation.type === 'childList' || mutation.type === "characterData"){
            if(fileButton.value != '' && addPhotoSelectTitre.value != ''){
                btnActiv()
            }
            else {
                btnDisactiv()
            }
        }
            
    })
})

observer.observe(tagChoix, {
    childList: true,        // Observe les ajouts et suppressions de nœuds enfants
    subtree: true,          // Observe les modifications dans les nœuds descendants
    characterData : true
})


// CRÉATION NOUVEAU PROJET

let formAddProject = document.querySelector(".modale-addPhoto form")

formAddProject.addEventListener("submit", async function(event){
    event.preventDefault()
    closeModale()

//    let token = localStorage.getItem("token")

    console.log(tagChoix.innerText)

    let creaProject = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
//            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            image: fileButton.value,
            title: addPhotoSelectTitre.value,
            categorie: tagChoix.innerText
        })
    })

    if (creaProject.ok){
        console.log("requête reçueeeee !!")
    }
    else {
        console.log("échec")
    }
})


console.log(fileButton.value)