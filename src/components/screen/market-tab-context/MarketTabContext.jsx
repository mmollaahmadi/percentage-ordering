import React from 'react';
import MarketItem from "../../composite/market-item";

const ITEMS_PER_PAGE = 10;
const MarketTabContext = ({ selectedPageNumber, onChangePageNumber, data, id}) => {

    const numberOfTotalPages = Math.ceil(data?.length / ITEMS_PER_PAGE);
    const start = (selectedPageNumber - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return data ? (
        <div className={'flex flex-col w-full'}>
            <div>
                {
                    data?.slice(start, end)?.map(
                        (item, index) =>
                            <MarketItem data={item} key={index}/>
                    )
                }
            </div>
            {
                <div className={'flex gap-1'}>
                    {[...Array(numberOfTotalPages).keys()]
                        ?.slice(
                            Math.max(selectedPageNumber - 5, 0),
                            Math.min(selectedPageNumber + 5, numberOfTotalPages)
                        )?.map((pageNumber, index) =>
                            <button
                                onClick={() => onChangePageNumber(pageNumber + 1, id)}
                                className={`p-1 border-0 ${selectedPageNumber === pageNumber + 1 ? 'text-white' : 'text-gray-500'}`}
                                key={index}>{pageNumber + 1}
                            </button>)
                    }
                </div>
            }
        </div>
    ) : null;
}

export default MarketTabContext;
