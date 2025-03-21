const axios = require("axios");
const dayjs = require("dayjs");

const fetchNewsFromGNews = async (popularity, keyword, startDate, endDate, searchString, url) => {
    try {
        let apiUrl = `https://gnews.io/api/v4/search?apikey=${process.env.GNEWS_API_KEY}`;

        apiUrl += popularity ? `&sortby=popularity` : `&sortby=publishedAt`;

        if (keyword) {
            apiUrl += `&q=${encodeURIComponent(keyword)}`
        } else {
            apiUrl += `&q=latest`
        }

        if (startDate) apiUrl += `&from=${dayjs(startDate).format("YYYY-MM-DD")}`;
        if (endDate) apiUrl += `&to=${dayjs(endDate).format("YYYY-MM-DD")}`;

        if (searchString) apiUrl += `&q=${encodeURIComponent(searchString)}&in=content`;

        const response = await axios.get(apiUrl);
        const articles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            imageUrl: article.image || null,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
            content: article.content
        }));

        if (url) {
            return articles.filter(article => article.url.toLowerCase().includes(url.toLowerCase()));
        }

        return articles;
    } catch (error) {
        console.error("Erreur GNews API:", error);
        return [];
    }
};

module.exports = {fetchNewsFromGNews};