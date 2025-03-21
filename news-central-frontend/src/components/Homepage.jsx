import './Homepage.css';
import { useState, useEffect } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import MainContent from './MainContent';
import NewsGrid from './NewsGrid';
import Footer from './Footer';

function Homepage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Charger les articles une seule fois au montage du composant, puis lors des changements de page
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Différencier le chargement initial du chargement "voir plus"
        if (page === 1) {
          setInitialLoading(true);
        } else {
          setLoading(true);
        }

        // IMPORTANT: Assurez-vous que votre API backend implémente correctement la pagination
        // et retourne seulement 12 articles à la fois, pas tous les articles
        const response = await fetch(`http://localhost:5001/api/news?page=${page}&limit=12`);
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (page === 1) {
          // Pour la première page, remplacer complètement le tableau d'articles
          setArticles(data.articles);
        } else {
          // Pour les pages suivantes, ajouter aux articles existants
          setArticles(prevArticles => [...prevArticles, ...data.articles]);
        }
        
        // Vérifier s'il y a plus d'articles à charger
        setHasMore(data.articles.length === 12);
        
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        setError("Impossible de charger les articles. Veuillez réessayer plus tard.");
      } finally {
        setInitialLoading(false);
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [page]);

  const loadMoreArticles = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="homepage">
      <Header />
      <Navigation />
      <MainContent />
      
      {error && <div className="error-message">{error}</div>}
      
      {initialLoading ? (
        <div className="loading">Chargement des articles...</div>
      ) : (
        <>
          {articles.length > 0 ? (
            <NewsGrid articles={articles} />
          ) : !error ? (
            <div className="no-articles">Aucun article disponible pour le moment.</div>
          ) : null}
          
          {loading && <div className="loading-more">Chargement d'articles supplémentaires...</div>}
          
          {hasMore && !loading && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={loadMoreArticles}
                disabled={loading}
              >
                {loading ? 'CHARGEMENT...' : 'VOIR PLUS'}
              </button>
            </div>
          )}
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default Homepage;