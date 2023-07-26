const express = require('express');
const app = express();

const users = [
  { id: 12, name: "John", surname: "Smith", age: 33 },
  { id: 13, name: "Mary", surname: "Moe", age: 28 },
];

// Route: /users/12 -> John Smith
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (user) {
    res.send(`${user.name} ${user.surname}`);
  } else {
    res.status(404).send("User not found.");
  }
});

// Route: /users/John/Smith -> John Smith is of age 33
app.get('/users/:name/:surname', (req, res) => {
  const { name, surname } = req.params;
  const user = users.find(u => u.name === name && u.surname === surname);

  if (user) {
    res.send(`${user.name} ${user.surname} is of age ${user.age}`);
  } else {
    res.status(404).send("User not found.");
  }
});

// Route: /users/search?age=33 -> We found user of age 33: John Smith
app.get('/users/search', (req, res) => {
  const age = req.query.age;
  const user = users.find(u => u.age === age);

  if (user) {
    res.send(`We found user of age ${age}: ${user.name} ${user.surname}`);
  } else {
    res.status(404).send(`We found no user of age ${age}.`);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
