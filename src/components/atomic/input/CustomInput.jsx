import React from 'react';

const CustomInput = ({ label, value, onChange, ...rest }) => {
    const handleChange = (e) => {
        let value = e.target.value;
        if (rest.type === 'number' && value !== '') {
            value = parseFloat(value);
            if (!isNaN(value)) {
                if(rest?.max || rest?.min) {
                    if(
                        ((rest?.max && value < rest.max) && (rest?.min && value > rest.min)) ||
                        ((rest?.min && value > rest.min)) ||
                        ((rest?.max && value < rest.max))
                    ) {
                        onChange && onChange(value);
                    }
                } else {
                    onChange && onChange(value);
                }
            }
        } else {
            onChange && onChange(value);
        }
    }
    return (
        <div className={'flex items-start gap-1 flex-col'}>
            <label className={'text-xs'}>{label}</label>
            <input
                className={'w-fit px-4 rounded-lg min-w-32 bg-gray-200 dark:bg-gray-600'}
                value={value}
                onChange={handleChange}
                {...rest}
            />
        </div>
    )
}

export default CustomInput;
