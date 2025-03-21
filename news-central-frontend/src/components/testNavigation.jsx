import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaUndo, FaCalendarAlt } from "react-icons/fa";

const categories = [
  { id: "", name: "Toutes les catégories" },
  { id: "business", name: "Business" },
  { id: "entertainment", name: "Entertainment" },
  { id: "health", name: "Santé" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technologies" },
  { id: "lifestyle", name: "Lifestyle" },
];

const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

const Navigation = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [byPopularity, setByPopularity] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  // Date picker state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(new Date().getMonth());
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(new Date().getMonth());
  const [yearView, setYearView] = useState({ start: false, end: false });
  
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);

  // Formatage des dates pour l'affichage
  const formatDisplayDate = (year, month) => {
    return year ? `${year}, ${months[month]}` : "Sélectionner";
  };

  // Gestion des clics en dehors des date pickers
  useEffect(() => {
    function handleClickOutside(event) {
      if (startDatePickerRef.current && !startDatePickerRef.current.contains(event.target)) {
        setShowStartDatePicker(false);
        setYearView({...yearView, start: false});
      }
      if (endDatePickerRef.current && !endDatePickerRef.current.contains(event.target)) {
        setShowEndDatePicker(false);
        setYearView({...yearView, end: false});
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [startDatePickerRef, endDatePickerRef, yearView]);

  // Définir l'année de départ pour le sélecteur d'années (2016-2027 comme dans l'exemple)
  const startYearRange = 2016;
  const yearRangeSize = 12; // Nombre d'années à afficher

  // Générer les années pour le sélecteur
  const generateYearRange = (startYear) => {
    return Array.from({ length: yearRangeSize }, (_, i) => startYear + i);
  };

  // Sélection de date
  const handleYearSelect = (year, isStart) => {
    if (isStart) {
      setStartYear(year);
      setYearView({...yearView, start: false});
    } else {
      setEndYear(year);
      setYearView({...yearView, end: false});
    }
  };

  const handleMonthSelect = (month, isStart) => {
    if (isStart) {
      setStartMonth(month);
      setStartDate(`${startYear}-${(month + 1).toString().padStart(2, '0')}-01`);
      setShowStartDatePicker(false);
    } else {
      setEndMonth(month);
      // Dernier jour du mois
      const lastDay = new Date(endYear, month + 1, 0).getDate();
      setEndDate(`${endYear}-${(month + 1).toString().padStart(2, '0')}-${lastDay}`);
      setShowEndDatePicker(false);
    }
  };

  const handleSearch = () => {
    onSearch({
      query: searchQuery,
      category: selectedCategory,
      byPopularity: byPopularity,
      startDate: startDate || null,
      endDate: endDate || null,
    });
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setByPopularity(false);
    setStartDate("");
    setEndDate("");
    setStartYear(new Date().getFullYear());
    setStartMonth(new Date().getMonth());
    setEndYear(new Date().getFullYear());
    setEndMonth(new Date().getMonth());

    onSearch({
      query: "",
      category: "",
      byPopularity: false,
      startDate: null,
      endDate: null,
    });
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 py-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center mb-4 md:mb-0">
          <a href="/" className="flex items-center">
            <img
              src="https://i.pinimg.com/736x/e9/05/88/e905887f0889e833e7d02cb7e8978676.jpg"
              alt="ECHOIZ"
              className="h-10 mr-2 rounded"
            />
            <span className="text-purple-600 font-bold text-xl">News Central</span>
          </a>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {/* Sélecteur de catégorie */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          {/* Case à cocher pour la popularité */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="popularityCheckbox"
              checked={byPopularity}
              onChange={() => setByPopularity(!byPopularity)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="popularityCheckbox" className="ml-2 text-sm text-gray-700">
              Popularité
            </label>
          </div>

          {/* Sélecteur de date de début */}
          <div className="relative" ref={startDatePickerRef}>
            <div
              className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer w-40"
              onClick={() => setShowStartDatePicker(!showStartDatePicker)}
            >
              <span className="text-sm text-gray-700">
                {startDate ? formatDisplayDate(startYear, startMonth) : "Date début"}
              </span>
              <FaCalendarAlt className="text-gray-400" />
            </div>
            
            {showStartDatePicker && (
              <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64">
                <div className="p-2">
                  <div className="flex justify-between items-center mb-2 border-b pb-2">
                    <span className="text-sm font-medium">Sélectionner période</span>
                    {yearView.start ? (
                      <div className="flex items-center">
                        <button className="p-1 focus:outline-none" onClick={() => setYearView({...yearView, start: false})}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-sm mx-2">
                          {startYearRange}-{startYearRange + yearRangeSize - 1}
                        </span>
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          className="text-sm mx-2 focus:outline-none"
                          onClick={() => setYearView({...yearView, start: true})}
                        >
                          {startYear}
                        </button>
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {yearView.start ? (
                    <div className="grid grid-cols-4 gap-2">
                      {generateYearRange(startYearRange).map(year => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year, true)}
                          className={`text-sm py-2 rounded-md ${
                            year === startYear 
                              ? 'bg-black text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month, idx) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(idx, true)}
                          className={`text-sm py-2 rounded-md ${
                            idx === startMonth && startYear === new Date().getFullYear()
                              ? 'bg-black text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Sélecteur de date de fin */}
          <div className="relative" ref={endDatePickerRef}>
            <div
              className="flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 bg-white cursor-pointer w-40"
              onClick={() => setShowEndDatePicker(!showEndDatePicker)}
            >
              <span className="text-sm text-gray-700">
                {endDate ? formatDisplayDate(endYear, endMonth) : "Date fin"}
              </span>
              <FaCalendarAlt className="text-gray-400" />
            </div>
            
            {showEndDatePicker && (
              <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-64">
                <div className="p-2">
                  <div className="flex justify-between items-center mb-2 border-b pb-2">
                    <span className="text-sm font-medium">Sélectionner période</span>
                    {yearView.end ? (
                      <div className="flex items-center">
                        <button className="p-1 focus:outline-none" onClick={() => setYearView({...yearView, end: false})}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="text-sm mx-2">
                          {startYearRange}-{startYearRange + yearRangeSize - 1}
                        </span>
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          className="text-sm mx-2 focus:outline-none"
                          onClick={() => setYearView({...yearView, end: true})}
                        >
                          {endYear}
                        </button>
                        <button className="p-1 focus:outline-none" onClick={() => {}}>
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {yearView.end ? (
                    <div className="grid grid-cols-4 gap-2">
                      {generateYearRange(startYearRange).map(year => (
                        <button
                          key={year}
                          onClick={() => handleYearSelect(year, false)}
                          className={`text-sm py-2 rounded-md ${
                            year === endYear 
                              ? 'bg-black text-white' 
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {months.map((month, idx) => (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(idx, false)}
                          className={`text-sm py-2 rounded-md ${
                            idx === endMonth && endYear === new Date().getFullYear()
                              ? 'bg-black text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Barre de recherche comme dans l'image 2 */}
        <div className="flex items-center mt-4 md:mt-0">
          <div className="flex">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 border-r-0 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-100 border border-gray-300 rounded-r-md px-3 py-2 flex items-center justify-center"
            >
              <FaSearch className="text-gray-500" />
            </button>
          </div>
          <button
            onClick={resetFilters}
            className="ml-2 bg-gray-100 border border-gray-300 rounded-md p-2 flex items-center justify-center hover:bg-gray-200"
            title="Réinitialiser les filtres"
          >
            <FaUndo className="text-gray-500" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;