import React from 'react';

const TotalItem = ({data}) => {
    return (
        <div
            className={`grid grid-cols-6 justify-center rounded bg-green-600 my-2 px-4 py-2`}
        >
            {data?.map((item, index) => <div key={index} className={'col-span-2 flex gap-2'}>
                <p>{`${item?.title}: `}</p>
                <p>
                    {item?.value}
                </p>
            </div>)}
        </div>
    )
}

export default TotalItem;
