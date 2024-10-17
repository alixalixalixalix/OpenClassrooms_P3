/*
fetch('http://localhost:5678/api/works')
  .then(response => response.json()) // Transforme la réponse en JSON
  .then(data => console.log(data))   // Affiche les données récupérées
  .catch(error => console.error('Erreur:', error));
*/

const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

const article = works[0]

console.log(article.title)