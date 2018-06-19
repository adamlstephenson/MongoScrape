const mongoose = require("mongoose");

//Reference to the Schema constructor
const Schema = mongoose.Schema;

//UserSchema object
const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true
    },
    // summary: {
    //     type: String,
    //     required: true
    // },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
})

//Model creation
const Article = mongoose.model("Article", ArticleSchema);

//Export
module.exports = Article;