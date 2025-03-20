// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { fetchNews } from '../services/news';
import NewsCard from '../components/NewsCard';
import SearchFilters from '../components/SearchFilters';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    startDate: '',
    endDate: '',
    source: '',
    popularity: '',
    contentSearch: '',
    sourceUrl: ''
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await fetchNews(filters);
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters({...filters, ...newFilters});
  };

  const handleSearch = () => {
    loadNews();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest News & Article</h1>
      
      <SearchFilters 
        filters={filters} 
        onFilterChange={handleFilterChange}
        onSearch={handleSearch} 
      />
      
      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article._id} article={article} />
          ))}
        </div>
      )}
      
      <div className="flex justify-center mt-8">
        <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default HomePage;