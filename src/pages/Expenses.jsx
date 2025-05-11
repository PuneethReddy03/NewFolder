import React, { useState } from 'react';
import { useBudgetContext } from '../context/BudgetContext';

const Expenses = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, loading } = useBudgetContext();
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const categories = [
    'Housing', 'Transportation', 'Food', 'Utilities',
    'Healthcare', 'Entertainment', 'Personal Care',
    'Education', 'Clothing', 'Gifts', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        category: newExpense.category,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        description: newExpense.description
      };

      if (editingId) {
        await updateExpense({ ...expenseData, id: editingId });
        setEditingId(null);
      } else {
        await addExpense(expenseData);
      }

      setNewExpense({
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setNewExpense({
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      description: expense.description || ''
    });
    setEditingId(expense.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (confirmDelete === id) {
        await deleteExpense(id);
        setConfirmDelete(null);
      } else {
        setConfirmDelete(id);
        setTimeout(() => {
          setConfirmDelete(prevId => prevId === id ? null : prevId);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewExpense({
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    setIsAdding(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Expenses</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Expense
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Expense' : 'Add New Expense'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={newExpense.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newExpense.amount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newExpense.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newExpense.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional description"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
              >
                {loading ? 'Saving...' : (editingId ? 'Update Expense' : 'Save Expense')}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Expense History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map(expense => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{expense.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">₹{expense.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">{expense.description || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === expense.id ? (
                      <span className="text-blue-600">Editing...</span>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="text-blue-600 hover:text-blue-900 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className={`${confirmDelete === expense.id ? 'text-red-800 font-medium' : 'text-red-600'} hover:text-red-900 hover:underline`}
                        >
                          {confirmDelete === expense.id ? 'Confirm?' : 'Delete'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
