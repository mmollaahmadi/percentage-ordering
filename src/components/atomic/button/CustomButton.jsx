import React from 'react';

const CustomButton = ({ label, onClick, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`px-6 py-1 focus:border-none border-none rounded-lg ${disabled ? 'bg-gray-600' : 'bg-[#00d890] hover:bg-opacity-80'}`}
        >
            {label}
        </button>
    )
}


export default CustomButton
