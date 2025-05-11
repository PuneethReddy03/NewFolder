import React from 'react';
import { useBudgetContext } from '../../context/BudgetContext';
import { Link } from 'react-router-dom';

const ExpenseList = ({ limit = 10 }) => {
  const { expenses, loading } = useBudgetContext();

  if (loading) {
    return <div className="text-gray-500">Loading expense data...</div>;
  }

  if (expenses.length === 0) {
    return <div className="text-gray-500">No expenses found. Add your first expense!</div>;
  }

  // Sort by date (newest first) and limit the number of entries
  const sortedExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedExpenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{expense.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-red-600">${Number(expense.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {expenses.length > limit && (
        <div className="mt-4 text-right">
          <Link to="/expenses" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all expenses →
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;