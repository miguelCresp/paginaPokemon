const statsList = document.getElementById("stats");
const imagen = document.getElementById("imagen");
const ruido = document.getElementById("ruido");

form.addEventListener("submit", (campo) => {
  campo.preventDefault();
  const pokemon = input.value.toLowerCase().trim();
  if (!pokemon) return;

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => response.json())
    .then((data) => {
      const stats = data.stats;
      stats.forEach((stat) => {
        const statLi = document.createElement("li");
        statLi.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statLi);
      });
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      img.alt = pokemon;
      imagen.appendChild(img);

      const cry = data.cries.latest;
      ruido.src = cry;
    })

    .catch((error) => console.error("Error al obtener los datos:", error));
});
