//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");

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

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/scraper")

//Routes

//GET route for home page
app.get("/", (req, res) => {
    res.render("index");
})

//GET route for scraping
app.get("/scrape", (req, res) => {
    //Make a request of Slate's h3 headlines
    request("https://slate.com/", (error, response, html) => {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        //Empty object to save results
        let result = {};
        //For each element with a class of "story-teaser_headline"
        $(".story-teaser").each(((i, element) => {
            // Save the headline, href, and summary of each link enclosed in the current element
            result.headline = $(element).children("a").attr("title");
            result.link = $(element).children("a").attr("href");
            //let summary = $(element).

            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then((dbArticle) => {
                    console.log(dbArticle)
                })
                .catch((err) => {
                    return res.json(err);
                })
        }))
        // If we were able to successfully scrape and save an Article, send a message to the client
        res.send("Scrape Complete");
    })
})

//Route for getting all articles from the database
app.get("/articles", (req, res) => {
    //Grab every document in Articles collection
    db.Article.find({})
    .then((dbArticle) => {
        res.json(dbArticle)
    })
    .catch((err) => {
        res.json(err)
    })
})

//Listener
app.listen(PORT, () => {
    console.log("app listening on port: " + PORT);

})