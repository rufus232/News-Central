const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    userId: {type: String, required: true},
    articleTitle: String,
    articleDescription: String,
    articleContent: String,
    articleUrl: String,
    source: String,
    pubDate: Date,
    searchedKeyword: String,
    searchedCategory: String,
    searchedString: String,
    searchedSource: String,
    searchedUrl: String,
    searchedDate: {
        startDate: Date,
        endDate: Date,
    },
    viewedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model("History", historySchema);