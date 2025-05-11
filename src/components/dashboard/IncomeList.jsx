import React from 'react';
import { useBudgetContext } from '../../context/BudgetContext';
import { Link } from 'react-router-dom';

const IncomeList = ({ limit = 10 }) => {
  const { income, loading } = useBudgetContext();

  if (loading) {
    return <div className="text-gray-500">Loading income data...</div>;
  }

  if (income.length === 0) {
    return <div className="text-gray-500">No income records found. Add your first income entry!</div>;
  }

  // Sort by date (newest first) and limit the number of entries
  const sortedIncome = [...income]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedIncome.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.source}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600">${Number(item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {income.length > limit && (
        <div className="mt-4 text-right">
          <Link to="/income" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all income →
          </Link>
        </div>
      )}
    </div>
  );
};

export default IncomeList;