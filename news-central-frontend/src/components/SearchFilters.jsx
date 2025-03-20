// src/components/SearchFilters.jsx
import { useState } from 'react';

const categories = [
  "business", "media", "general", "health", "science", "sports", "technology"
];

const SearchFilters = ({ filters, onFilterChange, onSearch }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };
  
  return (
    <div className="bg-gray-100 p-5 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          name="keyword"
          value={filters.keyword}
          onChange={handleInputChange}
          placeholder="Search for news..."
          className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        
        <button
          onClick={onSearch}
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition"
        >
          Search
        </button>
      </div>
      
      <div className="text-right">
        <button 
          className="text-pink-500 text-sm hover:underline"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
      </div>
      
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Range</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <input
              type="text"
              name="source"
              value={filters.source}
              onChange={handleInputChange}
              placeholder="News source..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Sort By</label>
            <select
              name="popularity"
              value={filters.popularity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Default</option>
              <option value="popularity">Popularity</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Content Search</label>
            <input
              type="text"
              name="contentSearch"
              value={filters.contentSearch}
              onChange={handleInputChange}
              placeholder="Search in article content..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Source URL</label>
            <input
              type="text"
              name="sourceUrl"
              value={filters.sourceUrl}
              onChange={handleInputChange}
              placeholder="Source website URL..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;