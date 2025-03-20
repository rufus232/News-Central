import './ArticleCard.css';

const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
        <div className="article-image">
          <img src={article.image} alt={article.title} />
          <span className="category">{article.category}</span>
        </div>
        <div className="article-content">
          <h3><a href="#">{article.title}</a></h3>
          <p>{article.content}</p>
          <div className="article-meta">
            <span className="date">{article.date}</span>
            <span className="comments">{article.comments} Comments</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;