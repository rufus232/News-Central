import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';

// Vous pouvez ajouter d'autres composants/pages ici
// import Home from './pages/home';
// import Articles from './pages/articles';

const App = () => {
  // Vous pourriez avoir un état pour vérifier si l'utilisateur est authentifié
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <Routes>
        {/* Route par défaut - redirige vers la page de connexion */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Vous pourriez ajouter d'autres routes ici */}
        {/* <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/articles" element={isAuthenticated ? <Articles /> : <Navigate to="/login" />} /> */}
        
        {/* Route pour gérer les URL inexistantes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;