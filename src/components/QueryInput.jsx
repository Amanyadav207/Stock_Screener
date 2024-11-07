import React, { useState, useRef, useEffect } from 'react';
import { parameters, operators } from '../utils/parameters';

const QueryInput = ({ onQueryRun }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (showSuggestions) {
      inputRef.current.addEventListener('keydown', handleKeydown);
    } else {
      inputRef.current.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      inputRef.current.removeEventListener('keydown', handleKeydown);
    };
  }, [showSuggestions]);
  const handleKeydown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev === 0 ? suggestions.length - 1 : prev - 1
        );
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev === suggestions.length - 1 ? 0 : prev + 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedSuggestionIndex !== -1) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          onQueryRun(query);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
      default:
        setSelectedSuggestionIndex(-1);
        break;
    }
  };


  const handleQueryChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    if (input) {
      const words = input.split(' ');
      const currentWord = words[words.length - 1].toLowerCase();
      const prevWord = words[words.length - 2];

      if (prevWord && operators.some(op => op.value === prevWord)) {
        setSuggestions([]);
        setShowSuggestions(false);
      } else if (prevWord && prevWord.toLowerCase() === 'and') {
        setSuggestions(parameters.filter(param =>
          param.display.toLowerCase().includes(currentWord)
        ));
        setShowSuggestions(true);
      } else if (parameters.some(param => param.value === prevWord)) {
        setSuggestions(operators.filter(op =>
          op.display.toLowerCase().includes(currentWord)
        ));
        setShowSuggestions(true);
      } else {
        setSuggestions(parameters.filter(param =>
          param.display.toLowerCase().includes(currentWord)
        ));
        setShowSuggestions(true);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
  const words = query.split(' ');
  words.pop();
  const newQuery = [...words, suggestion.display].join(' ') + ' ';
  setQuery(newQuery);
  setShowSuggestions(false);
  setSelectedSuggestionIndex(-1);
};

  const handleSubmit = (event) => {
    event.preventDefault();
    onQueryRun(query);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-semibold mb-6">Create a Search Query</h2>
      <form onSubmit={(event) => { event.preventDefault(); onQueryRun(query); }}>
        <div className="mb-6 md:mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Query</label>
          <div className="relative">
            <textarea
              ref={inputRef}
              value={query}
              onChange={handleQueryChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
              placeholder="Start typing your query..."
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm ${
                      index === selectedSuggestionIndex ? 'bg-indigo-50' : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.display}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 bg-blue-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-900 mb-2">Custom query example</h3>
          <p className="text-gray-600">
            Market capitalization &lt; 500 AND<br />
            Price to earning &lt; 15 AND<br />
            Return on capital employed &gt; 22%
          </p>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="mr-2">▶</span>
            RUN THIS QUERY
          </button>
        </div>
      </form>
    </div>
  );
};

export default QueryInput;