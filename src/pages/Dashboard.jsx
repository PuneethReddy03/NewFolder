import React from 'react';
import { useBudgetContext } from '../context/BudgetContext';
import '../styles/animations.css';

const Dashboard = () => {
  const { income, expenses, user } = useBudgetContext();

  // Calculate summary data
  const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;

  // Get categories for expenses
  const categories = {};
  expenses.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += Number(expense.amount);
  });

  // First, update the main container div animation
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight drop-shadow-sm">
        Financial <span className="text-blue-600">Dashboard</span>
      </h1>
      
      {!user && (
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-8 rounded-lg shadow-md">
          <p className="text-blue-800 font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Viewing demo data.{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-800 font-semibold underline mx-1">Create an account</a> or{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-800 font-semibold underline mx-1">log in</a> to manage your budget.
          </p>
        </div>
      )}
      
      {/* Update the card components with staggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Total Income",
            amount: totalIncome,
            color: "green",
            // ... other props
          },
          {
            title: "Total Expenses",
            amount: totalExpenses,
            color: "red",
            // ... other props
          },
          {
            title: "Balance",
            amount: balance,
            color: "blue",
            // ... other props
          },
        ].map((card, index) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-lg p-6 
              transform hover:scale-105 hover:rotate-1
              transition-all duration-300 ease-out
              animate-slideIn"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative overflow-hidden">
              <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="flex justify-between items-center">
                <h2 className={`text-xl font-semibold text-gray-700 mb-3`}>{card.title}</h2>
                <div className={`p-2 bg-${card.color}-100 rounded-full`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-${card.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className={`text-4xl font-bold text-${card.color}-600`}>₹{card.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">{card.title === "Balance" ? (card.amount >= 0 ? 'Available funds' : 'Deficit') : `Total funds ${card.title === "Total Income" ? 'received' : 'spent'}`}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Recent Expenses</h2>
            <a href="/expenses" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.length > 0 ? expenses.slice(0, 5).map(expense => (
                  <tr 
                    key={expense.id} 
                    className="hover:bg-gray-50 transition-colors duration-200 
                      transform hover:scale-[1.01] hover:shadow-sm"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{expense.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 bg-${getCategoryColor(expense.category)}-500`}></span>
                        <span className="text-sm font-medium text-gray-800">{expense.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">₹{Number(expense.amount).toFixed(2)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-sm text-gray-500 text-center">No recent expenses to display</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700">Expense Breakdown</h2>
            <a href="/reports" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
              Full Report
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          {Object.keys(categories).length > 0 ? (
            <div className="space-y-6">
              {Object.entries(categories)
                .sort((a, b) => b[1] - a[1])
                .map(([category, amount], index) => (
                <div key={category} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 bg-${getCategoryColor(category, index)}-500`}></span>
                      <span className="text-sm font-semibold text-gray-700">{category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold text-gray-700">₹{amount.toFixed(2)}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        {Math.round((amount / totalExpenses) * 100)}%
                      </span>
                    </div>
                  </div>
                  <div 
                    className="w-full bg-gray-200 rounded-full h-3 overflow-hidden"
                  >
                    <div 
                      className={`bg-gradient-to-r from-${getCategoryColor(category, index)}-600 
                        to-${getCategoryColor(category, index)}-800 h-3 rounded-full 
                        transition-all duration-1000 ease-out transform hover:scale-y-110
                        animate-slideIn`}
                      style={{ 
                        width: `${(amount / totalExpenses) * 100}%`,
                        animationDelay: `${index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-gray-500">No expense data to display</div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Savings Rate</h2>
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
            {savingsRate >= 20 ? 'Excellent' : savingsRate >= 10 ? 'Good' : 'Needs Improvement'}
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="text-5xl font-bold text-blue-600">{savingsRate}%</div>
          <div className="ml-4">
            <div className="text-sm text-gray-600 font-medium">of income saved</div>
            <div className="text-xs text-gray-500">Target: 20%+</div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
            <div 
              className={`h-5 rounded-full transition-all duration-1000 ease-out 
                relative animate-slideIn ${
                savingsRate >= 20 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                savingsRate >= 10 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 
                'bg-gradient-to-r from-red-500 to-red-600'
              }`}
              style={{ 
                width: `${Math.min(100, Math.max(0, savingsRate))}%`,
                animationDelay: '0.5s'
              }}
            >
              {savingsRate > 5 && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold">
                  {savingsRate}%
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600 font-medium">
            <div>0%</div>
            <div>25%</div>
            <div>50%</div>
            <div>75%</div>
            <div>100%</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-3 bg-red-100 rounded-lg">
            <div className="text-xs font-medium text-gray-600">0-9%</div>
            <div className="text-sm font-medium text-red-600">Needs Work</div>
          </div>
          <div className="p-3 bg-yellow-100 rounded-lg">
            <div className="text-xs font-medium text-gray-600">10-19%</div>
            <div className="text-sm font-medium text-yellow-600">Good Progress</div>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <div className="text-xs font-medium text-gray-600">20%+</div>
            <div className="text-sm font-medium text-green-600">Great Job!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this at the top of your file, after the imports
const fadeInUpVariants = {
  initial: { y: 20, opacity: 0 },
  animate: (index) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: index * 0.1,
    },
  }),
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

export default Dashboard;