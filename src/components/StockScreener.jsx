import React, { useState, useEffect } from 'react';
import QueryInput from './QueryInput';
import ResultsTable from './ResultTable';
import Pagination from './Pagination';
import { loadExcelData, evaluateCondition } from '../utils/sortUtils';
import ErrorMessage from './ErrorMessage';


const itemsPerPage = 10;

const StockScreener = () => {
  const [stocks, setStocks] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        await loadExcelData(setStocks, setLoading);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Error loading data. Please try again later.');
      }
    };
    loadData();
  }, []);

  const runQuery = (query) => {
    setLoading(true);
    setError(null);
    try {
      const conditions = query.replace(/\band\b/gi, "AND").split(' AND ').map(c => c.trim()).filter(c => c);
      let filtered = stocks.slice();

      filtered = filtered.filter(stock =>
        conditions.every(condition => evaluateCondition(condition, stock))
      );

      setFilteredData(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error running query:', error);
      setError('Error running the query. Please check your input and try again.');
    }
    setLoading(false);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] === b[key]) return 0;
      if (direction === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setFilteredData(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
      <div className="max-w-6xl mx-auto p-8">
        <QueryInput onQueryRun={runQuery} />
        {error && <ErrorMessage message={error} />}
        {filteredData.length > 0 && (
          <div>
            <ResultsTable
              data={paginatedData}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  
};

export default StockScreener;