const axios = require("axios");
const dayjs = require('dayjs');

const fetchNewsFromNewsAPI = async (
    popularity,
    keyword,
    category,
    startDate,
    endDate,
    source,
    url,
    searchString
) => {
    try {
        let apiUrl = `https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}`;

        if (popularity) apiUrl += `&sortBy=popularity`

        if (keyword) {
            apiUrl += `&q=${encodeURIComponent(keyword)}`
        } else {
            apiUrl += `&q=latest`
        }

        if (category) {
            apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
        }

        if (startDate) apiUrl += `&from=${dayjs(startDate).format('YYYY-MM-DD')}`;
        if (endDate) apiUrl += `&to=${dayjs(endDate).format('YYYY-MM-DD')}`;

        if (source) apiUrl += `&sources=${encodeURIComponent(source)}`;

        if (searchString) apiUrl += `&q=${encodeURIComponent(searchString)}&searchIn=content`;

        const response = await axios.get(apiUrl);

        let articles = response.data.articles.map(article => ({
            title: article.title,
            description: article.description,
            imageUrl: article.urlToImage,
            url: article.url,
            source: article.source.name,
            publishedAt: article.publishedAt,
            content: article.content
        }));

        if (url) {
            articles = articles.filter(article =>
                article.url.toLowerCase().includes(url.toLowerCase())
            );
        }

        return articles;

    } catch (error) {
        console.error("Erreur NewsAPI:", error);
        return [];
    }
};

module.exports = {fetchNewsFromNewsAPI};