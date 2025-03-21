import './ArticleCard.css';

const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
        <div className="article-image">
        <img src={article.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png"} alt={article.title} />
          <span className="category">{article.category}</span>
        </div>
        <div className="article-content">
          <h3><a href="#">{article.title}</a></h3>
          <p>{article.content}</p>
          <div className="article-meta">
            <span className="date">{article.date}</span>
            <span className="comments">{article.comments} Comments</span>
          </div>
          <div className="article-actions">
        {/* Bouton "Consulter l'article" */}
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <button className="view-article-btn">Consulter l'article</button>
        </a>
      </div>
        </div>
      </div>
    );
  };
  
  export default ArticleCard;