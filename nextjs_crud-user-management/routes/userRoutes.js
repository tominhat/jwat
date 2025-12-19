const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "To Minh Nhat", birthYear: 2003 },
  { id: 2, name: "Nguyen Trong Nhan", birthYear: 2004 },
  { id: 3, name: "Pham Duc Duy", birthYear: 2006 },
];

// get all
router.get("/", (req, res) => {
  res.json(users);
});

// add
router.post("/", (req, res) => {
  const lastUser = users.at(-1); // get the last user
  let newId = 1;
  if (lastUser) newId = lastUser.id + 1;
  const newUser = {
    id: newId,
    name: req.body.name,
    birthYear: req.body.birthYear,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// update
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = users.findIndex((u) => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...req.body };
    res.json(users[idx]);
  } else {
    res.status(404).send("User not found");
  }
});

// delete
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let idx = users.findIndex((u) => u.id === id);
  if (idx === -1) res.status(404).send("User not found");

  users = users.filter((u) => u.id !== id);
  idx = users.findIndex((u) => u.id === id);
  if (idx === -1) res.status(200).send("Delete success");
  else res.status(404).send("Delete error");
});

module.exports = router;
