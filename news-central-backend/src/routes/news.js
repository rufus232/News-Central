const express = require("express");
const { fetchNewsFromNewsAPI } = require("../services/newsapiService");
const { fetchNewsFromNyTimes } = require("../services/nytService");
const { fetchNewsFromGNews } = require("../services/gnewsService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { popularity, keyword, category, startDate, endDate, searchString, source, url, page = 1, limit = 10 } = req.query;

        console.log(req.query);

        // Utilisation de Promise.allSettled() pour exécuter toutes les requêtes sans interruption
        const results = await Promise.allSettled([
            fetchNewsFromNewsAPI(popularity, keyword, category, startDate, endDate, source, url, searchString),
            fetchNewsFromNyTimes(popularity, keyword, category, startDate, endDate, source, url, searchString),
            fetchNewsFromGNews(popularity, keyword, category, startDate, endDate, source, url, searchString),
        ]);

        // Filtrer uniquement les résultats réussis
        const allArticles = results
            .filter(result => result.status === "fulfilled") // Garder les requêtes qui ont réussi
            .flatMap(result => result.value); // Extraire les articles

        // Trier par date de publication (du plus récent au plus ancien)
        allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Pagination
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedArticles = allArticles.slice(startIndex, endIndex);

        res.json({
            totalResults: allArticles.length,
            currentPage: pageNumber,
            totalPages: Math.ceil(allArticles.length / pageSize),
            articles: allArticles
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des actualités:", error);
        res.status(500).json({ error: "Erreur lors de la récupération des actualités." });
    }
});

module.exports = router;