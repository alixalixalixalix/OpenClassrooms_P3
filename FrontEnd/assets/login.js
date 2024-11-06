// on récup le formulaire
const container = document.querySelector(".container"); //section
const login = document.querySelector("#login"); //section
const formLogin = document.querySelector(".formLogin");
const formEmail = document.querySelector(".formEmail"); //div
const formPassword = document.querySelector(".formPassword"); //div
const userEmail = document.querySelector("#email"); //champ
const userPassword = document.querySelector("#password"); //champ

// on vérifie si il y a le token dans le localstorage
let token = window.localStorage.getItem("token");
if (token) {
  // si oui
  // dans la nav on modifie le login par logout
  let linkLogin = document.querySelector("#link-login");
  linkLogin.innerText = "logout";
}

// c'est sur le form qu'on écoute l'event submit et non le bouton
formLogin.addEventListener("submit", async function (event) {
  event.preventDefault();

  let demandeLogin = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: userEmail.value,
      password: userPassword.value,
    }),
  });

  if (demandeLogin.ok) {
    const data = await demandeLogin.json();
    const token = data.token; // on récupère le token

    window.localStorage.setItem("token", token); // on stocke le token dans le localsto

    document.location.href = "index.html";
    let linkLogin = document.querySelectorAll("li");
    linkLogin.innerText = "logout";
  } else {
    let messageError = document.createElement("p");
    messageError.innerText = "Erreur dans l’identifiant ou le mot de passe.";
    messageError.classList.add("loginError");
    formPassword.appendChild(messageError);
  }
});

// Bold sur le bouton login dans la nav
let ul = document.querySelectorAll("ul li");
let pageActive = window.location.pathname;
let pageName = pageActive.split("/").pop();

if (pageName === "login.html") {
  ul[2].style.fontWeight = "900";
}
