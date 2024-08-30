const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*",
  },
});

const db = {
  players: [],
};

// Obtener todos los usuarios
app.get("/users", (request, response) => {
  response.json(db);
});

// Añadir un nuevo jugador
app.post("/user", (request, response) => {
  const { name, move } = request.body;

  // Validate move
  if (!["piedra", "papel", "tijera"].includes(move.toLowerCase())) {
    return response.status(400).json({ error: "Movimiento inválido" });
  }

  if (db.players.length < 2) {
    const player = {
      name,
      move: move.toLowerCase(),
      profilePicture: "https://avatar.iran.liara.run/public/13"
    };
    db.players.push(player);
    io.emit("new-player", player);
  }

  if (db.players.length === 2) {
    const result = determineWinner(db.players[0], db.players[1]);
    console.log("Game result:", result);
    io.emit("game-result", result);
    db.players = [];
  }

  response.status(201).json({ name, move: move.toLowerCase() });
});

function determineWinner(player1, player2) {
  console.log("Player 1:", player1);
  console.log("Player 2:", player2);

  if (player1.move === player2.move) {
    return "Es un empate!";
  }

  const winConditions = {
    piedra: "tijera",
    tijera: "papel",
    papel: "piedra"
  };

  if (winConditions[player1.move] === player2.move) {
    return `El jugador ${player1.name} gana!`;
  } else {
    return `El jugador ${player2.name} gana!`;
  }
}

// Conexión de socket
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat-messages", (message) => {
    console.log(message);
    io.emit("chat-messages", message);
  });
});

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:5050`);
});