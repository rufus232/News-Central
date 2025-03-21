const axios = require("axios");
const dayjs = require('dayjs');

const fetchNewsFromNewsAPI = async (
    keyword = "latest",
    category,
    startDate,
    endDate,
    source,
    url,
    sortBy = "popularity",
    searchString
) => {
    try {
        let apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&sortBy=${sortBy}&apiKey=${process.env.NEWS_API_KEY}`;

        if (category) {
            apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;
        }

        if (searchString) apiUrl += `&q=${encodeURIComponent(searchString)}`;

        if (source) apiUrl += `&sources=${encodeURIComponent(source)}`;

        if (startDate) apiUrl += `&from=${dayjs(startDate).format('YYYY-MM-DD')}`;
        if (endDate) apiUrl += `&to=${dayjs(endDate).format('YYYY-MM-DD')}`;

        console.log(apiUrl);
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