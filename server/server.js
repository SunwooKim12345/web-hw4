const express = require("express");
const cors = require("cors");
const Comp = require('./controller');

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/notes", Comp.getNotesTable );
console.log("Ddbug: router: getTable");

app.post("/notes", Comp.insertNote );
console.log("Ddbug: router: insertNote");

app.put("/notes/:id", Comp.updateNote );
console.log("Ddbug: router: updateNote");

app.delete("/notes/:id", Comp.deleteNote );
console.log("Ddbug: router: deleteNote");

app.get("/users", Comp.getUsersTable );
console.log("Ddbug: router: getTable");

app.put("/users/:id", Comp.updateUser );
console.log("Ddbug: router: updateuser");

app.put("/users/:id/image", Comp.updateProfile );



// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to testcomp application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

