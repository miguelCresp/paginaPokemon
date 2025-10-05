const statsList = document.getElementById("stats");
const imagen = document.getElementById("imagen");
const ruido = document.getElementById("ruido");
const form = document.getElementById("form");
const input = document.getElementById("input");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", (campo) => {
  campo.preventDefault();
  const pokemon = input.value.toLowerCase().trim();
  if (!pokemon) return;
  statsList.innerHTML = "";
  imagen.innerHTML = "";
  ruido.removeAttribute("src");
  mensaje.textContent = "";

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      mensaje.textContent = `¡Has buscado a ${pokemon}!`;
      const stats = data.stats;
      stats.forEach((stat) => {
        const statLi = document.createElement("li");
        statLi.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statLi);
      });
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.alt = pokemon;
      img.style.width = '200px';
      img.style.height = 'auto';
      imagen.appendChild(img);

      const cry = data.cries.latest;
      if (cry) {
        ruido.src = cry;
        ruido.style.display = "block";
      } else {
        ruido.removeAttribute("src");
        ruido.style.display = "none";
      }
    })

    .catch((error) => console.error("Error al obtener los datos:", error));
});
