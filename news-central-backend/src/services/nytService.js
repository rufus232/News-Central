const axios = require("axios");
const dayjs = require("dayjs");

const fetchNewsFromNyTimes = async (popularity, keyword, startDate, endDate, searchString, url) => {
    try {
        let apiUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${process.env.NY_TIMES_API_KEY}`;

        if (!popularity) apiUrl += `&sort=newest`

        if (keyword) apiUrl += `&q=${encodeURIComponent(keyword)}`;

        if (startDate) apiUrl += `&begin_date=${dayjs(startDate).format("YYYYMMDD")}`;
        if (endDate) apiUrl += `&end_date=${dayjs(endDate).format("YYYYMMDD")}`;

        if (searchString) apiUrl += `&q=${encodeURIComponent(searchString)}&searchIn=content`;

        const response = await axios.get(apiUrl);
        const articles = response.data.response.docs.map(article => {
            const multimedia = article.multimedia || [];
            const imageObj = multimedia.length > 0 ? `https://www.nytimes.com/${multimedia[0].url}` : null;

            return {
                title: article.headline.main,
                description: article.abstract,
                imageUrl: imageObj,
                url: article.web_url,
                source: "The New York Times",
                publishedAt: article.pub_date,
                content: article.lead_paragraph
            };
        });

        if (url) {
            return articles.filter(article => article.url.toLowerCase().includes(url.toLowerCase()));
        }

        return articles;
    } catch (error) {
        console.error("Erreur NYTimes API:", error);
        return [];
    }
};

module.exports = {fetchNewsFromNyTimes};