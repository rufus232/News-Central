const express = require("express");
const {fetchNewsFromNewsAPI} = require("../services/newsapiService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const {popularity, keyword, category, startDate, endDate, string, source, url } = req.query;

        const [newsAPI] = await Promise.all([
            fetchNewsFromNewsAPI(keyword, category, startDate, endDate),
        ]);

        let allArticles = [...newsAPI];

        // Appliquer les filtres supplémentaires côté backend
        // if (source) {
        //     allArticles = allArticles.filter(article =>
        //         article.source.toLowerCase().includes(source.toLowerCase())
        //     );
        // }
        //
        // if (query) {
        //     allArticles = allArticles.filter(article =>
        //         article.title.toLowerCase().includes(query.toLowerCase()) ||
        //         (article.description && article.description.toLowerCase().includes(query.toLowerCase()))
        //     );
        // }
        //
        // if (startDate) {
        //     allArticles = allArticles.filter(article =>
        //         new Date(article.publishedAt) >= new Date(startDate)
        //     );
        // }
        //
        // if (endDate) {
        //     allArticles = allArticles.filter(article =>
        //         new Date(article.publishedAt) <= new Date(endDate)
        //     );
        // }
        //
        // if (popularity === "desc") {
        //     allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        // } else if (popularity === "asc") {
        //     allArticles.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
        // }

        res.json({articles: allArticles});
    } catch (error) {
        res.status(500).json({error: "Erreur lors de la récupération des actualités."});
    }
});

module.exports = router;