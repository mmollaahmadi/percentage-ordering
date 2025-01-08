import React from 'react';

const ActiveItem = ({data, className=''}) => {
    return (
        <div
            className={`grid grid-cols-6 justify-center rounded bg-gray-600 bg-opacity-50 my-2 px-4 py-2 ${className}`}
        >
            <div className={'col-span-2 flex gap-2'}>
                <p>باقیمانده: </p>
                <p>
                    {data?.remain}
                </p>
            </div>
            <div className={'col-span-2 flex gap-2'}>
                <p>قیمت: </p>
                <p>
                    {data?.price}
                </p>
            </div>
            <div className={'col-span-2 flex gap-2'}>
                <p>ارزش: </p>
                <p>
                    {data?.value}
                </p>
            </div>
        </div>
    )
}

export default ActiveItem;
