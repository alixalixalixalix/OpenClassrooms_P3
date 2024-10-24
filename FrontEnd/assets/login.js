/*
const reponseLogin = await fetch("http://localhost:5678/api/users/login");
const login = await reponseLogin.json();
*/

/*
export function ajoutListenerLogin() {
    const formLogin = document.querySelector(".formLogin")
    formLogin.addEventListener("submit", async function (event){
        
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
*/
/*
export function ajoutListenerLogin() {
    const formLogin = document.querySelector(".formLogin")
    formLogin.addEventListener("submit", async function (event){
        
        event.preventDefault();
        
        const login = {
            email: event.target.querySelector("[name=email]").value, //récup la valeur de email
            password: event.target.querySelector("[name=password]").value
        };
        // await console.log(login.email)
        
        // login a besoin d'être converti en json pour être transmi au body de la requete ???
        const chargeUtile = JSON.stringify(login);    
        
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: chargeUtile
            });
            await console.log(response)

            if(response.ok) {
                const data = await response.json();
                console.log("Login success", data)
            } else {
                const errorData = await response.json();
                console.log("erreur", errorData)
            }
        } catch (error) {
            console.error("Oups", error)
        }
    
    });
}

ajoutListenerLogin()

*/
/*
const login = fetch("http://localhost:5678/api-docs/users/login")
    .then(login => console.log(login.email))
*/

// on récup le formulaire
const formLogin = document.querySelector(".formLogin")
const userEmail = document.querySelector("#email")
const userPassword = document.querySelector("#password")

// c'est sur le form qu'on écoute l'event submit et non le bouton
formLogin.addEventListener("submit", async function(event){
    event.preventDefault()

    console.log(userEmail.value)
    console.log(userPassword.value) 
    
    let demandeLogin = await fetch("http://localhost:5678/api-docs/users/login", {
        method: "POST",
        headers: { "accept": "application/json" },
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: userEmail.value,
            password: userPassword.value
        })
    })    

    if (demandeLogin.ok){
        console.log("youpi")

    }
})



//const loginToJson = JSON.stringify(login)
//console.log(loginToJson)





// 1. récupérer les valeurs de email et password
// 2. vérifier si elles sont bonnes
// 3. si oui : redirection vers page d'accueil
// 4. si non : message d'erreur


// Bold sur le bouton login dans la nav
let ul = document.querySelectorAll("ul li")
let pageActive = window.location.pathname;
let pageName = pageActive.split("/").pop();

if(pageName === "login.html"){
    ul[2].style.fontWeight = "900";
}