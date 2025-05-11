import React from 'react';
import { useBudgetContext } from '../context/BudgetContext';

const Reports = () => {
  const { income, expenses } = useBudgetContext();
  
  // Use context data without demo data
  const demoExpenses = expenses || [];
  const demoIncome = income || [];
  
  // Group expenses by category
  const expensesByCategory = {};
  demoExpenses.forEach(expense => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += Number(expense.amount);
  });

  // Calculate total income and expenses
  const totalIncome = demoIncome.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = demoExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
  
  // Sort expense categories by amount (highest first)
  const sortedExpenseCategories = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1]);
  
  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight drop-shadow-sm">
        Financial <span className="text-blue-600">Reports</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3zm12-3a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" clipRule="evenodd" />
            </svg>
            Income vs Expenses
          </h2>
          <div className="flex items-center justify-center h-64 p-4">
            <div className="w-full max-w-md">
              <div className="mb-4 group transition-all duration-300 hover:translate-x-1">
                <div className="flex justify-between mb-1 items-center">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    Income
                  </span>
                  <span className="text-sm font-semibold text-green-600">₹{totalIncome.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-5 rounded-full group-hover:brightness-110 transition-all" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div className="mb-4 group transition-all duration-300 hover:translate-x-1">
                <div className="flex justify-between mb-1 items-center">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    Expenses
                  </span>
                  <span className="text-sm font-semibold text-red-600">₹{totalExpenses.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-5 rounded-full group-hover:brightness-110 transition-all" 
                    style={{ width: `${totalIncome > 0 ? Math.min((totalExpenses / totalIncome) * 100, 100) : 0}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-800 flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                    Net {totalIncome > totalExpenses ? "Savings" : "Deficit"}
                  </span>
                  <span className={`font-bold ${totalIncome > totalExpenses ? "text-green-600" : "text-red-600"} text-lg`}>
                    ₹{Math.abs(totalIncome - totalExpenses).toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-center mt-3 text-gray-500">
                  {totalIncome > totalExpenses 
                    ? `You're saving ${((1 - totalExpenses / totalIncome) * 100).toFixed(1)}% of your income` 
                    : "Your expenses exceed your income"}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Expense Breakdown
          </h2>
          
          {sortedExpenseCategories.length > 0 ? (
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {sortedExpenseCategories.map(([category, amount], index) => (
                <div key={category} className="group transition-all duration-300 hover:translate-x-1">
                  <div className="flex justify-between mb-1 items-center">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full bg-${getCategoryColor(category, index)}-500 mr-2`}></span>
                      {category}
                    </span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-800">₹{amount.toFixed(2)}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 ml-2">
                        {Math.round((amount / totalExpenses) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div 
                      className={`bg-gradient-to-r from-${getCategoryColor(category, index)}-500 to-${getCategoryColor(category, index)}-600 h-2.5 rounded-full group-hover:brightness-110 transition-all`}
                      style={{ width: `${totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              No expense data available
              <span className="text-xs mt-1 text-gray-400">Add expenses to see your breakdown</span>
            </div>
          )}
          
          {sortedExpenseCategories.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-center text-gray-500">
              Top expense category: <span className="font-semibold text-gray-700">{sortedExpenseCategories[0]?.[0]}</span> at {Math.round((sortedExpenseCategories[0]?.[1] / totalExpenses) * 100)}% of total expenses
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Monthly Summary
        </h2>
        
        {(demoIncome.length > 0 || demoExpenses.length > 0) ? (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Income</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Savings</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Savings Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">May 2025</div>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Current</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹{totalIncome.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹{totalExpenses.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">₹{(totalIncome - totalExpenses).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-16 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden`}>
                        <div 
                          className={`${getSavingsRateColor(totalIncome > 0 ? ((1 - totalExpenses / totalIncome) * 100) : 0)} h-2 rounded-full`} 
                          style={{ width: `${totalIncome > 0 ? Math.min(Math.max(((1 - totalExpenses / totalIncome) * 100), 0), 100) : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">
                        {totalIncome > 0 ? `${((1 - totalExpenses / totalIncome) * 100).toFixed(1)}%` : '0%'}
                      </span>
                    </div>
                  </td>
                </tr>
                {/* Only show this demo data if there's no actual data */}
                {demoIncome.length === 0 && demoExpenses.length === 0 && (
                  <>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">April 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,200.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹2,800.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">₹400.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12.5%' }}></div>
                          </div>
                          <span className="text-sm text-gray-900">12.5%</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">March 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,200.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">₹2,700.00</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">₹500.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15.6%' }}></div>
                          </div>
                          <span className="text-sm text-gray-900">15.6%</span>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            No data available to generate monthly summary
            <span className="text-xs mt-2 text-gray-400">Add income and expenses to see your monthly summary</span>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
              Add Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Utility function to get a consistent color for categories
function getCategoryColor(category, index = 0) {
  const colors = ['blue', 'indigo', 'purple', 'green', 'red', 'yellow', 'pink', 'cyan'];
  
  const categoryMap = {
    'Housing': 'blue',
    'Food': 'green',
    'Transportation': 'indigo',
    'Utilities': 'yellow',
    'Entertainment': 'purple',
    'Healthcare': 'red',
    'Personal Care': 'pink',
    'Education': 'cyan',
    'Clothing': 'emerald',
    'Other': 'gray'
  };
  
  return categoryMap[category] || colors[index % colors.length];
}

// Utility function to get color for savings rate
function getSavingsRateColor(rate) {
  if (rate >= 20) return 'bg-green-500';
  if (rate >= 10) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default Reports;