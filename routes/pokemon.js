const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", (req, res) => {
    // TODO: Get all records from the DB and render to view
    db.pokemon
        .findAll()
        .then(function (foundPokemons) {
            res.render("pokemon/favorites", { pokemon: foundPokemons });
        })
        .catch(function (err) {
            console.log("error", err);
            res.render("error");
        });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post("/", (req, res) => {
    // TODO: Get form data and add a new record to DB
    db.pokemon
        .findOrCreate({
            where: {
                name: req.body.name
            }
        })
        .then((newFave) => {
            console.log(`the new fave is:`, newFave);
            res.redirect("/pokemon")
        })
        .catch((err) => {
            console.log("error", err);
            res.render("error")
        });
});

module.exports = router;
