import React from 'react';
import { 
  createBrowserRouter, 
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expenses from './pages/Expenses';
import SavingsGoals from './pages/SavingsGoals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* All routes are public */}
      <Route index element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
      <Route path="/goals" element={<SavingsGoals />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

const App = () => {
  return (
    <BudgetProvider>
      <RouterProvider router={router} />
    </BudgetProvider>
  );
};

export default App;