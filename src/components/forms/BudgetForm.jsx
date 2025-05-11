import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Input from '../common/Input';
import Button from '../common/Button';

const BudgetForm = () => {
    const { addBudget } = useContext(BudgetContext);
    const [budget, setBudget] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!budget || isNaN(budget) || budget <= 0) {
            setError('Please enter a valid budget amount.');
            return;
        }
        addBudget(parseFloat(budget));
        setBudget('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Set Your Budget</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <Input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Enter your budget"
                className="mb-4"
            />
            <Button type="submit" className="w-full">
                Save Budget
            </Button>
        </form>
    );
};

export default BudgetForm;