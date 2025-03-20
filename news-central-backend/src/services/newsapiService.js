const axios = require("axios");
const dayjs = require('dayjs');

const fetchNewsFromNewsAPI = async (keyword = "latest", category, startDate, endDate, string, source, url) => {
    try {
        let url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${process.env.NEWS_API_KEY}`;

        if (category) {
            url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
        }

        if (startDate) url += `&from=${dayjs(startDate).format('YYYYMMDD')}`;
        if (endDate) url += `&to=${dayjs(startDate).format('YYYYMMDD')}`;

        const response = await axios.get(url);

        return response.data.articles.map(article => ({
            articleTitle: article.title,
            articleDescription: article.description,
            imageUrl: article.urlToImage,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt
        }));
    } catch (error) {
        console.error("Erreur NewsAPI:", error);
        return [];
    }
};

module.exports = {fetchNewsFromNewsAPI};