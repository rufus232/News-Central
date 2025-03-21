const express = require("express");
const { fetchNewsFromNewsAPI } = require("../services/newsapiService");
const { fetchNewsFromNyTimes } = require("../services/nytService");
const { fetchNewsFromGNews } = require("../services/gnewsService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // Extraire les paramètres de la requête
        const { popularity, keyword, category, startDate, endDate, searchString, source, url, page = 1, limit = 12 } = req.query;

        console.log(req.query);

        // Récupérer les articles depuis les trois API
        const [newsAPI, nyTimes, gNews] = await Promise.all([
            fetchNewsFromNewsAPI(popularity, keyword, category, startDate, endDate, source, url, searchString),
            // fetchNewsFromNyTimes(popularity, keyword, category, startDate, endDate, source, url, searchString),
            // fetchNewsFromGNews(popularity, keyword, category, startDate, endDate, source, url, searchString)
        ]);

        // Fusionner tous les articles récupérés des différentes sources
        let allArticles = [...newsAPI, ...nyTimes, ...gNews];

        // Trier les articles (facultatif, ici par date par exemple)
        allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        // Pagination des articles
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const startIndex = (pageNumber - 1) * limitNumber;
        const paginatedArticles = allArticles.slice(startIndex, startIndex + limitNumber);

        // Vérifier s'il reste encore des articles après cette page
        const hasMore = startIndex + limitNumber < allArticles.length;

        // Retourner les articles paginés et l'information sur la pagination
        res.json({ articles: paginatedArticles, hasMore });
    } catch (error) {
        console.error("Erreur lors de la récupération des actualités :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des actualités." });
    }
});

module.exports = router;
