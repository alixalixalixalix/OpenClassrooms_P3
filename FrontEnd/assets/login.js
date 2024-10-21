/*
const reponseLogin = await fetch("http://localhost:5678/api/users/login");
const login = await reponseLogin.json();
*/


export function ajoutListenerLogin() {
    const formLogin = document.querySelector(".formLogin")
    formLogin.addEventListener("submit", function (event){
        event.preventDefault();
        const login = {
            email: event.target.querySelector("[name=email]").value, //récup la valeur de email
            password: event.target.querySelector("[name=password]").value
        };
    // login a besoin d'être converti en json pour être transmi au body de la requete ???
    const chargeUtile = JSON.stringify(login);    
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });
    });
}
    

ajoutListenerLogin()

console.log(email.value)
/*
add event clic se connecter
    Si email = true && mdp = true
        > redirection vers page d'accueil
    sinon 
        > message d'erreur
*/



// Bold sur le bouton login dans la nav
let ul = document.querySelectorAll("ul li")
let pageActive = window.location.pathname;
let pageName = pageActive.split("/").pop();

if(pageName === "login.html"){
    ul[2].style.fontWeight = "900";
}