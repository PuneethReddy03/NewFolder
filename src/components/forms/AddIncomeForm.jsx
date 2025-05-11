import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Input from '../common/Input';
import Button from '../common/Button';

const AddIncomeForm = () => {
    const { addIncome } = useContext(BudgetContext);
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || !source) {
            setError('Please fill in all fields');
            return;
        }
        addIncome({ amount: parseFloat(amount), source });
        setAmount('');
        setSource('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <Input
                type="number"
                placeholder="Income Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <Input
                type="text"
                placeholder="Income Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
            />
            <Button type="submit" className="w-full">
                Add Income
            </Button>
        </form>
    );
};

export default AddIncomeForm;