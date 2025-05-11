import React, { useState, useContext } from 'react';
import { BudgetContext } from '../../context/BudgetContext';
import Input from '../common/Input';
import Button from '../common/Button';

const AddExpenseForm = () => {
    const { addExpense } = useContext(BudgetContext);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount || !date) {
            setError('All fields are required');
            return;
        }
        addExpense({ description, amount: parseFloat(amount), date });
        setDescription('');
        setAmount('');
        setDate('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            <Input
                type="text"
                placeholder="Expense Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <Button type="submit" className="w-full">
                Add Expense
            </Button>
        </form>
    );
};

export default AddExpenseForm;