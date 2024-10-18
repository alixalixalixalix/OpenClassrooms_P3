const reponseLogin = await fetch("http://localhost:5678/api/users/login");
const login = await reponseLogin.json();


// LOGIN

let x = document.querySelector("form p")

console.log(x)
/*
add event clic se connecter
    Si email = true && mdp = true
        > redirection vers page d'accueil
    sinon 
        > message d'erreur
*/

