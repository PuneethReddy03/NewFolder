import React, { useState, useEffect } from 'react';
import { useBudgetContext } from '../context/BudgetContext';

const SavingsGoals = () => {
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, loading } = useBudgetContext();
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    current: '',
    deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
    notes: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    // Reset form when switching between add/edit mode
    if (!isAdding) {
      setNewGoal({
        title: '',
        target: '',
        current: '',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
        notes: ''
      });
      setEditingId(null);
    }
  }, [isAdding]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create goal data object
      const goalData = {
        title: newGoal.title,
        target: parseFloat(newGoal.target),
        current: parseFloat(newGoal.current),
        deadline: newGoal.deadline,
        notes: newGoal.notes
      };

      if (editingId) {
        // Update existing goal
        const updatedGoal = { ...goalData, id: editingId };
        await updateSavingsGoal(updatedGoal);
        
        // Clear editing state
        setEditingId(null);
      } else {
        // Add new goal
        await addSavingsGoal(goalData);
      }

      // Reset form and exit add mode
      setNewGoal({
        title: '',
        target: '',
        current: '',
        deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
        notes: ''
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const handleEdit = (goal) => {
    // Set form data to the goal being edited
    setNewGoal({
      title: goal.title,
      target: goal.target.toString(),
      current: goal.current.toString(),
      deadline: goal.deadline,
      notes: goal.notes || ''
    });
    
    // Set editing state
    setEditingId(goal.id);
    setIsAdding(true);

    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      if (confirmDelete === id) {
        // User confirmed deletion
        await deleteSavingsGoal(id);
        setConfirmDelete(null);
      } else {
        // First click - ask for confirmation
        setConfirmDelete(id);
        // Auto-cancel confirmation after 3 seconds
        setTimeout(() => {
          setConfirmDelete(prevId => prevId === id ? null : prevId);
        }, 3000);
      }
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewGoal({
      title: '',
      target: '',
      current: '',
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split('T')[0],
      notes: ''
    });
    setIsAdding(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Savings Goals</h1>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Goal
          </button>
        )}
      </div>
      
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Savings Goal' : 'Create New Savings Goal'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                <input
                  type="text"
                  name="title"
                  value={newGoal.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Vacation, Emergency Fund, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                <input
                  type="number"
                  name="target"
                  value={newGoal.target}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Amount</label>
                <input
                  type="number"
                  name="current"
                  value={newGoal.current}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={newGoal.deadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  name="notes"
                  value={newGoal.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Optional notes"
                  rows="2"
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? 'Saving...' : (editingId ? 'Update Goal' : 'Save Goal')}
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savingsGoals.length === 0 && (
          <div className="col-span-full bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            No savings goals found. Create your first goal!
          </div>
        )}
        
        {savingsGoals.map(goal => {
          const percentage = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{goal.title}</h2>
                <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">{goal.notes}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-lg font-bold text-gray-800">₹{parseFloat(goal.current).toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Target</p>
                    <p className="text-lg font-bold text-gray-800">₹{parseFloat(goal.target).toFixed(2)}</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-1">Deadline</p>
                <p className="text-sm text-gray-800">{goal.deadline}</p>
              </div>
              
              <div className="border-t border-gray-100 px-6 py-3 flex justify-end space-x-3">
                {editingId === goal.id ? (
                  <span className="text-blue-600 text-sm">Editing...</span>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEdit(goal)}
                      className="text-blue-600 hover:text-blue-900 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(goal.id)}
                      className={`${confirmDelete === goal.id ? 'text-red-800 font-medium' : 'text-red-600'} hover:text-red-900 hover:underline text-sm`}
                    >
                      {confirmDelete === goal.id ? 'Confirm?' : 'Delete'}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;
