// // components/SearchFilters.jsx
// import React, { useState } from 'react';

// const categories = [
//   { id: 'general', name: 'Générale' },
//   { id: 'business', name: 'Business' },
//   { id: 'health', name: 'Santé' },
//   { id: 'science', name: 'Science' },
//   { id: 'sports', name: 'Sports' },
//   { id: 'technology', name: 'Technologies' },
//   { id: 'media', name: 'Média' },
// ];

// const SearchFilters = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const filters = {
//       query: searchQuery,
//       category: selectedCategory,
//       sortBy,
//       startDate: startDate || null,
//       endDate: endDate || null,
//     };


    
//     onSearch(filters);
//   };
  
//   const resetFilters = () => {
//     setSearchQuery('');
//     setSelectedCategory('');
//     setSortBy('date');
//     setStartDate('');
//     setEndDate('');
    
//     onSearch({
//       query: '',
//       category: '',
//       sortBy: 'date',
//       startDate: null,
//       endDate: null,
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//       <form onSubmit={handleSubmit}>
//         {/* Search Bar */}
//         <div className="mb-4">
//           <div className="relative flex items-center">
//             <input
//               type="text"
//               placeholder="Rechercher des articles..."
//               className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button 
//               type="submit"
//               className="absolute right-2 p-2 text-gray-500 hover:text-blue-500"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//               </svg>
//             </button>
//           </div>
//         </div>
        
//         {/* Filter Options */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Category Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
//             <select 
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               <option value="">Toutes les catégories</option>
//               {categories.map((category) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           {/* Sort By Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
//             <select 
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//             >
//               <option value="date">Date (récent à ancien)</option>
//               <option value="popularity">Popularité</option>
//               <option value="relevance">Pertinence</option>
//             </select>
//           </div>
          
//           {/* Date Range Filter */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
//             <input 
//               type="date" 
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
//             <input 
//               type="date" 
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//         </div>
        
//         {/* Action Buttons */}
//         <div className="mt-4 flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={resetFilters}
//             className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
//           >
//             Réinitialiser
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Appliquer les filtres
//           </button>
//         </div>
//       </form>
//     </div>
    // Replace Tailwind classes with the custom CSS classes
// {/* <div className="search-filters">
//   <form onSubmit={handleSubmit}>
//     {/* Search Bar */}
//     <div className="search-input-wrapper">
//       <input
//         type="text"
//         placeholder="Rechercher des articles..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <button 
//         type="submit"
//         className="search-button"
//       >
//         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//         </svg>
//       </button>
//     </div>
    
//     {/* Filter Options */}
//     <div className="advanced-filters">
//       <div className="filter-row">
//         {/* Category Filter */}
//         <div className="filter-item">
//           <label>Catégorie</label>
//           <select 
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">Toutes les catégories</option>
//             {categories.map((category) => (
//               <option key={category.id} value={category.id}>
//                 {category.name}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         {/* Sort By Filter */}
//         <div className="filter-item">
//           <label>Trier par</label>
//           <select 
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="date">Date (récent à ancien)</option>
//             <option value="popularity">Popularité</option>
//             <option value="relevance">Pertinence</option>
//           </select>
//         </div>
        
//         {/* Date Range Filter */}
//         <div className="filter-item">
//           <label>Date de début</label>
//           <input 
//             type="date" 
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
        
//         <div className="filter-item">
//           <label>Date de fin</label>
//           <input 
//             type="date" 
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//       </div>
      
//       {/* Action Buttons */}
//       <div className="filter-actions">
//         <button
//           type="button"
//           onClick={resetFilters}
//           className="reset-button"
//         >
//           Réinitialiser
//         </button>
//         <button
//           type="submit"
//           className="apply-button"
//         >
//           Appliquer les filtres
//         </button>
//       </div>
//     </div>
//   </form>
// </div> */}
import React, { useState } from "react";

const categories = [
  { id: "general", name: "Générale" },
  { id: "business", name: "Business" },
  { id: "health", name: "Santé" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technologies" },
  { id: "media", name: "Média" },
];

const SearchFilters = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fonction qui applique les filtres
  const applyFilters = () => {
    onSearch({
      query: searchQuery,
      category: selectedCategory,
      sortBy,
      startDate: startDate || null,
      endDate: endDate || null,
    });
  };

  // Réinitialisation des filtres
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSortBy("date");
    setStartDate("");
    setEndDate("");

    onSearch({
      query: "",
      category: "",
      sortBy: "date",
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Barre de recherche */}
      <div className="mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Rechercher des articles..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filtres dynamiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trier par */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Trier par</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Date (récent à ancien)</option>
            <option value="popularity">Popularité</option>
            <option value="relevance">Pertinence</option>
          </select>
        </div>

        {/* Date de début */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* Date de fin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={resetFilters}
          className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Réinitialiser
        </button>
        <button
          type="button"
          onClick={applyFilters} // Exécute la recherche quand on clique
          className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
