import ArticleCard from './ArticleCard';
import './NewsGrid.css';

const NewsGrid = ({ articles }) => {
  return (
    <div className="news-grid">
      <div className="container">
        <div className="grid">
          {/* {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))} */}
          {articles && articles.length > 0 ? (
             articles.map(article => <ArticleCard key={article.id} article={article} />)
           ) : (
             <p>Aucun article trouvé</p>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;