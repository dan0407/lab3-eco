const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const db = {
  players: [],
};

app.get("/users", (request, response) => {
  response.send(db);
});

app.post("/user", (request, response) => {
  const { body } = request;
  db.players.push(body);
  response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
});

app.listen(5050, () => {
  console.log(`Server is running on http://localhost:${5050}`);
});
