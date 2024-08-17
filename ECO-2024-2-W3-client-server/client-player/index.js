document.getElementById("player-form").addEventListener("submit", createUser);

async function createUser(event) {
  event.preventDefault(); // Prevenir la recarga de la página al enviar el formulario
  renderLoadingState();

  try {
    const name = document.getElementById("name").value;
    const move = document.querySelector('input[name="move"]:checked').value;

    const player = {
      name: name,
      move: move,
      profilePicture: "https://avatar.iran.liara.run/public/13",
    };

    const response = await fetch("http://localhost:5050/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    renderData(player);
  } catch (error) {
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `Player created: ${data.name} chose ${data.move}`;
  container.appendChild(div);
}
