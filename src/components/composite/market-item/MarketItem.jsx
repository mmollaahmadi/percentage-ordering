import React from 'react';

const MarketItem = ({data}) => {
    return(
        <div className={'bg-gray-600 bg-opacity-50 rounded-2xl my-2 py-2'}>
            {data?.id}
        </div>
    )
}

export default MarketItem;
