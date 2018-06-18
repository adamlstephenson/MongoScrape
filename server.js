//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const axios = require("axios");

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

//Configure middleware
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/scraper")

//Routes

//GET route for scraping
app.get("/scrape", (req, res) => {
    //Axios
    axios.get("https://midcurrent.com/").
    then(((response) => {
        //Cheerio shorthand selector
        const $ = cheerio.load(response.data);

        //Grab every headline
        $("a").each(((i, element) => {
            //Empty result object
            const result = {};

            //Add text, link, and summary and save them as properties of the result object
            result.headline = $(this).text();
            console.log(result.headline)
        }))
    }))
})

//Listener
app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);
    
})