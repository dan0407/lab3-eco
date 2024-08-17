let count = 0;

const interval = setInterval(() => {
  const sec = document.getElementById("seconds");
  
  if (sec) {
    sec.textContent = count; // Actualiza el contador en la página
  }

  count++; // Incrementa el contador

  // Cuando el contador llega a 20, se llama a fetchData y se reinicia el contador
  if (count === 10) {
    fetchData();
    count = 0; // Reinicia el contador a 0
  }

}, 1000); // Se ejecuta cada segundo (1000 ms)


async function fetchData() {
  renderLoadingState();
  try {
    const response = await fetch("http://localhost:5050/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error(error);
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Limpiar datos anteriores
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Limpiar datos anteriores
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Limpiar datos anteriores

  if (data.players.length > 0) {
    data.players.forEach((item) => {
      const div = document.createElement("div");
      div.className = "item";

      // Mostrar la imagen, el nombre y la opción elegida por el jugador
      div.innerHTML = `
        <img src="${item.profilePicture}" alt="${item.name}'s profile picture" />
        <p>Name: ${item.name}</p>
        <p>Chose: ${item.move}</p>
      `;

      container.appendChild(div);
    });
  } else {
    container.innerHTML = "<p>No players found</p>";
  }
}
