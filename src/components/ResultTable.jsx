import React from 'react';
import { parameters } from '../utils/parameters';

const ResultsTable = ({ data, sortConfig, onSort }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {parameters.map(param => (
                <th
                  key={param.field}
                  onClick={() => onSort(param.field)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  {param.display}
                  {sortConfig.key === param.field && (
                    <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((stock, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {parameters.map(param => (
                  <td key={param.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock[param.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;