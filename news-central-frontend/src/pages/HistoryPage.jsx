// src/pages/HistoryPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, clearHistory } from '../services/news';
import NewsCard from '../components/NewsCard';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory();
      setHistory(data.history || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearHistory = async () => {
    try {
      await clearHistory();
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };
  
  const handleReturnToSearch = (searchParams) => {
    navigate(`/?${searchParams}`);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Reading History</h1>
        
        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear History
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading">Loading...</span>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-16 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-medium text-gray-500">
            You haven't read any articles yet
          </h3>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Browse Articles
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <div key={item._id} className="relative">
              <NewsCard article={item.article} />
              {item.searchParams && (
                <button
                  onClick={() => handleReturnToSearch(item.searchParams)}
                  className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                  Return to Search
                </button>
              )}
              <div className="text-xs text-gray-500 mt-1">
                Viewed on: {new Date(item.viewedAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;