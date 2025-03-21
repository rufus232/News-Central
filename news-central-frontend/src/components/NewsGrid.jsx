import ArticleCard from './ArticleCard';
import './NewsGrid.css';

const NewsGrid = ({ articles }) => {
  return (
    <div className="news-grid">
      <div className="container">
        <div className="grid">
          {articles.map(article => (
            <ArticleCard key={article._id || article.title} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;
