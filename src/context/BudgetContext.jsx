import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Demo data for both guest and authenticated users
const demoIncome = [
  
];

const demoExpenses = [];

const demoSavingsGoals = [
];

// Initial state
const initialState = {
  income: demoIncome,
  expenses: demoExpenses,
  savingsGoals: demoSavingsGoals,
  user: null,
  loading: false,
  error: null,
  isInitialized: false
};

// Create context
export const BudgetContext = createContext(initialState);

// Reducer function
const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, isInitialized: true, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'SET_INCOME':
      return { ...state, income: action.payload, loading: false };
    case 'ADD_INCOME':
      return { ...state, income: [...state.income, action.payload], loading: false };
    case 'UPDATE_INCOME':
      return { 
        ...state, 
        income: state.income.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false 
      };
    case 'DELETE_INCOME':
      return { 
        ...state, 
        income: state.income.filter(item => item.id !== action.payload),
        loading: false 
      };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload, loading: false };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload], loading: false };
    case 'UPDATE_EXPENSE':
      return { 
        ...state, 
        expenses: state.expenses.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false 
      };
    case 'DELETE_EXPENSE':
      return { 
        ...state, 
        expenses: state.expenses.filter(item => item.id !== action.payload),
        loading: false 
      };
    case 'SET_SAVINGS_GOALS':
      return { ...state, savingsGoals: action.payload, loading: false };
    case 'ADD_SAVINGS_GOAL':
      return { ...state, savingsGoals: [...state.savingsGoals, action.payload], loading: false };
    case 'UPDATE_SAVINGS_GOAL':
      return { 
        ...state, 
        savingsGoals: state.savingsGoals.map(item => 
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false 
      };
    case 'DELETE_SAVINGS_GOAL':
      return { 
        ...state, 
        savingsGoals: state.savingsGoals.filter(item => item.id !== action.payload),
        loading: false 
      };
    default:
      return state;
  }
};

// Provider component
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Check for user in localStorage on initial load
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const storedUser = localStorage.getItem('budgetUser');
        const user = storedUser ? JSON.parse(storedUser) : null;
        dispatch({ type: 'INITIALIZE', payload: user });
      } catch (error) {
        console.error('Failed to initialize auth state:', error);
        dispatch({ type: 'INITIALIZE', payload: null });
      }
    };
    
    checkAuthentication();
  }, []);
  
  // Actions
  const setLoading = () => dispatch({ type: 'SET_LOADING', payload: true });
  
  const loginUser = async (credentials) => {
    setLoading();
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create mock user
      const user = { 
        id: 1, 
        name: credentials.name || 'Test User', 
        email: credentials.email 
      };
      
      // Save user to localStorage
      localStorage.setItem('budgetUser', JSON.stringify(user));
      
      dispatch({ type: 'SET_USER', payload: user });
      return user;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('budgetUser');
    dispatch({ type: 'SET_USER', payload: null });
  };

  const addIncome = async (income) => {
    setLoading();
    try {
      const newIncome = { ...income, id: Date.now() };
      dispatch({ type: 'ADD_INCOME', payload: newIncome });
      return newIncome;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateIncome = async (income) => {
    setLoading();
    try {
      dispatch({ type: 'UPDATE_INCOME', payload: income });
      return income;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteIncome = async (id) => {
    setLoading();
    try {
      dispatch({ type: 'DELETE_INCOME', payload: id });
      return id;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const addExpense = async (expense) => {
    setLoading();
    try {
      const newExpense = { ...expense, id: Date.now() };
      dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
      return newExpense;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateExpense = async (expense) => {
    setLoading();
    try {
      dispatch({ type: 'UPDATE_EXPENSE', payload: expense });
      return expense;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteExpense = async (id) => {
    setLoading();
    try {
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
      return id;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const addSavingsGoal = async (goal) => {
    setLoading();
    try {
      const newGoal = { ...goal, id: Date.now() };
      dispatch({ type: 'ADD_SAVINGS_GOAL', payload: newGoal });
      return newGoal;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateSavingsGoal = async (goal) => {
    setLoading();
    try {
      dispatch({ type: 'UPDATE_SAVINGS_GOAL', payload: goal });
      return goal;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteSavingsGoal = async (id) => {
    setLoading();
    try {
      dispatch({ type: 'DELETE_SAVINGS_GOAL', payload: id });
      return id;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const value = {
    ...state,
    loginUser,
    logoutUser,
    addIncome,
    updateIncome,
    deleteIncome,
    addExpense,
    updateExpense,
    deleteExpense,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal
  };

  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

// Custom hook to use the budget context
export const useBudgetContext = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgetContext must be used within a BudgetProvider');
  }
  return context;
};
