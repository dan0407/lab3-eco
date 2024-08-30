let socket = io("http://localhost:5050", { path: "/real-time" });

document.getElementById("player-form").addEventListener("submit", createUser);

async function createUser(event) {
  event.preventDefault();

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
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = "<p>Loading...</p>";
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = `Player created: ${data.name} chose ${data.move}`;
  container.appendChild(div);
}

// Escuchar el evento "game-result" del servidor
socket.on("game-result", (result) => {
  renderGameResult(result);
});

// Mostrar el resultado del juego en el cliente
function renderGameResult(result) {
  const container = document.getElementById('result-container');
  if (container) {
    container.innerHTML = '';
    const resultDiv = document.createElement('div');
    resultDiv.className = 'winner-announcement';
    resultDiv.innerHTML = `
      <h2>🎉 Resultado del Juego 🎉</h2>
      <p class="winner-text">${result}</p>
    `;
    container.appendChild(resultDiv);
  } else {
    console.error('Result container not found in the DOM');
  }
}
