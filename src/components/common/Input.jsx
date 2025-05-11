import React from 'react';

const Input = ({ type = 'text', placeholder, value, onChange, error }) => {
    return (
        <div className="mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`border rounded-lg p-2 w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default Input;