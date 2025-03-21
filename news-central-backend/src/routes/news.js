const express = require("express");
const {fetchNewsFromNewsAPI} = require("../services/newsapiService");
const {fetchNewsFromNyTimes} = require("../services/nytService");
const {fetchNewsFromGNews} = require("../services/gnewsService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const {popularity, keyword, category, startDate, endDate, searchString, source, url} = req.query;

        console.log(req.query)
        const [newsAPI] = await Promise.all([
            // fetchNewsFromNewsAPI(popularity, keyword, category, startDate, endDate, source, url, searchString),
            fetchNewsFromNyTimes(popularity, keyword, category, startDate, endDate, source, url, searchString),
            // fetchNewsFromGNews(popularity, keyword, category, startDate, endDate, source, url, searchString),
        ]);

        let allArticles = [...newsAPI];

        res.json({articles: allArticles});
    } catch (error) {
        res.status(500).json({error: "Erreur lors de la récupération des actualités."});
    }
});

module.exports = router;