// src/components/NewsCard.jsx
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const NewsCard = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      // Record this article in user history
      await api.post('/history', { articleId: article._id });
      
      // Navigate to article detail page
      navigate(`/article/${article._id}`, { 
        state: { searchParams: window.location.search }
      });
    } catch (error) {
      console.error('Error recording article view:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative">
        <img 
          src={article.urlToImage || '/placeholder-news.jpg'} 
          alt={article.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 text-xs rounded">
          {article.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <button 
            onClick={handleClick}
            className="text-pink-500 hover:underline"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;