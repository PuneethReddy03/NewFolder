import React, { useEffect } from 'react';
import { useBudgetContext } from '../../context/BudgetContext';

const BudgetSummary = () => {
  const { income, expenses, fetchIncome, fetchExpenses, loading } = useBudgetContext();

  useEffect(() => {
    const loadData = async () => {
      await fetchIncome();
      await fetchExpenses();
    };
    
    loadData();
  }, [fetchIncome, fetchExpenses]);

  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = totalIncome - totalExpenses;

  if (loading) {
    return <div className="p-4">Loading budget summary...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Budget Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h3 className="text-sm font-medium text-green-700">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="text-sm font-medium text-red-700">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className={`rounded-lg p-4 border ${balance >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <h3 className={`text-sm font-medium ${balance >= 0 ? 'text-blue-700' : 'text-yellow-700'}`}>Balance</h3>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
            ${Math.abs(balance).toFixed(2)}
            {balance < 0 && ' (Deficit)'}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Recent Transactions</h3>
        {income.length === 0 && expenses.length === 0 ? (
          <p className="text-gray-500">No transactions recorded yet.</p>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Combine and sort income and expenses by date */}
                {[...income.map(i => ({ ...i, type: 'income' })), ...expenses.map(e => ({ ...e, type: 'expense', source: e.category }))]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(0, 5) // Show only the 5 most recent transactions
                  .map((transaction, index) => (
                    <tr key={`${transaction.type}-${transaction.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.source || transaction.description || 'N/A'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {transaction.type}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetSummary;