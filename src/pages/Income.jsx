import React, { useState, useEffect } from 'react';
import { useBudgetContext } from '../context/BudgetContext';

const Income = () => {
  const {
    income: contextIncome,
    addIncome,
    updateIncome,
    deleteIncome,
    loading
  } = useBudgetContext();

  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({
    amount: '',
    source: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    if (contextIncome && contextIncome.length > 0) {
      setIncomes(contextIncome);
    }
  }, [contextIncome]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setNewIncome({
      amount: '',
      source: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const incomeData = {
      source: newIncome.source,
      amount: parseFloat(newIncome.amount),
      date: newIncome.date,
      notes: newIncome.notes
    };

    try {
      if (editingId) {
        const updatedIncome = { ...incomeData, id: editingId };

        if (updateIncome) {
          await updateIncome(updatedIncome);
        } else {
          setIncomes((prev) =>
            prev.map((item) => (item.id === editingId ? updatedIncome : item))
          );
        }
      } else {
        if (addIncome) {
          const result = await addIncome(incomeData);
          const savedIncome = result?.id ? { ...incomeData, id: result.id } : { ...incomeData, id: Date.now() };
          if (!contextIncome?.length) {
            setIncomes((prev) => [savedIncome, ...prev]);
          }
        } else {
          setIncomes((prev) => [{ ...incomeData, id: Date.now() }, ...prev]);
        }
      }

      resetForm();
    } catch (err) {
      console.error("Failed to save income:", err);
    }
  };

  const handleEdit = (income) => {
    setNewIncome({
      amount: income.amount.toString(),
      source: income.source,
      date: income.date,
      notes: income.notes || ''
    });
    setEditingId(income.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (confirmDelete === id) {
        if (deleteIncome) {
          await deleteIncome(id);
        } else {
          setIncomes((prev) => prev.filter((item) => item.id !== id));
        }
        setConfirmDelete(null);
      } else {
        setConfirmDelete(id);
        setTimeout(() => {
          setConfirmDelete((prevId) => (prevId === id ? null : prevId));
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to delete income:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Income</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Income
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Income' : 'Add New Income'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                  type="text"
                  name="source"
                  value={newIncome.source}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Salary, Freelance, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={newIncome.amount}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
                  value={newIncome.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={newIncome.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
              >
                {loading ? 'Saving...' : editingId ? 'Update Income' : 'Save Income'}
              </button>
              <button
                type="button"
                onClick={resetForm}
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
          <h2 className="text-xl font-semibold">Income History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incomes.length > 0 ? (
                incomes.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {income.source}
                    </td>
                    <td className="text-sm text-gray-900">₹{income.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                      {income.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingId === income.id ? (
                        <span className="text-blue-600">Editing...</span>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(income)}
                            className="text-blue-600 hover:text-blue-900 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(income.id)}
                            className={`${
                              confirmDelete === income.id
                                ? 'text-red-800 font-medium'
                                : 'text-red-600'
                            } hover:text-red-900 hover:underline`}
                          >
                            {confirmDelete === income.id ? 'Confirm?' : 'Delete'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No income entries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;
