import { useState, useEffect } from 'react';
import { useBudgetContext } from '../context/BudgetContext';

export const useBudget = () => {
  const { 
    income, 
    expenses, 
    fetchIncome, 
    fetchExpenses, 
    addIncome, 
    addExpense,
    loading 
  } = useBudgetContext();
  
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savingsRate: 0,
    categories: {}
  });

  useEffect(() => {
    const loadData = async () => {
      if (income.length === 0) await fetchIncome();
      if (expenses.length === 0) await fetchExpenses();
    };
    
    loadData();
  }, [income.length, expenses.length, fetchIncome, fetchExpenses]);

  useEffect(() => {
    const totalIncome = income.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const balance = totalIncome - totalExpenses;
    
    // Calculate spending by category
    const categories = {};
    expenses.forEach(expense => {
      const category = expense.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = 0;
      }
      categories[category] += Number(expense.amount);
    });

    // Calculate savings rate (if income > 0)
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    setSummary({
      totalIncome,
      totalExpenses,
      balance,
      savingsRate,
      categories
    });
  }, [income, expenses]);

  // Function to get monthly data for charts
  const getMonthlyData = () => {
    const monthlyIncome = {};
    const monthlyExpenses = {};
    
    // Process income
    income.forEach(item => {
      const month = item.date.substring(0, 7); // YYYY-MM
      if (!monthlyIncome[month]) {
        monthlyIncome[month] = 0;
      }
      monthlyIncome[month] += Number(item.amount);
    });
    
    // Process expenses
    expenses.forEach(item => {
      const month = item.date.substring(0, 7); // YYYY-MM
      if (!monthlyExpenses[month]) {
        monthlyExpenses[month] = 0;
      }
      monthlyExpenses[month] += Number(item.amount);
    });
    
    // Create array of months (sorted)
    const months = Array.from(new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpenses)])).sort();
    
    // Create chart data
    return {
      labels: months.map(month => {
        const [year, mon] = month.split('-');
        return `${mon}/${year.substring(2)}`;
      }),
      datasets: [
        {
          label: 'Income',
          data: months.map(month => monthlyIncome[month] || 0),
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1
        },
        {
          label: 'Expenses',
          data: months.map(month => monthlyExpenses[month] || 0),
          backgroundColor: 'rgba(239, 68, 68, 0.5)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1
        }
      ]
    };
  };

  return {
    summary,
    income,
    expenses,
    loading,
    addIncome,
    addExpense,
    getMonthlyData
  };
};

export default useBudget;