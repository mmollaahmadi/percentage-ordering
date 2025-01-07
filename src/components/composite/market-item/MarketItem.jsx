import React from 'react';
import {prepareNumbersToDisplay} from "../../../utils/index.js";
import {LeftArrowIcon} from "../../../assets/icons/index.jsx";

const MarketItem = ({data}) => {
    console.log(data);
    return (
        <div
            className={'grid grid-cols-8 bg-gray-600 bg-opacity-50 hover:bg-opacity-80 hover:cursor-pointer rounded-lg my-2 py-2 px-4'}>
            <div className={'col-span-1 flex gap-2 items-center'}>
                <img className={'w-6'} src={data?.currency2?.image} alt="market-image"/>
                <p>{data?.currency2?.title_fa} / {data?.currency2?.title}</p>
            </div>
            <div className={'col-span-2 flex gap-2 items-center'}>
                <img className={'col-span-1 w-6'} src={data?.currency1?.image} alt="market-image"/>
                <p className={'bg-gray-600 rounded px-2 py-1'}>{data?.currency1?.title_fa} ({data?.currency1?.title})</p>
            </div>
            <div className={'col-span-2 flex gap-1 items-center'}>
                <p>قیمت: </p>
                <p className={'bg-gray-600 rounded px-2 py-1'}>{prepareNumbersToDisplay(data?.price_info?.price)}
                    <p
                        className={'text-gray-400 inline mr-2'}> تومان </p>
                </p>
            </div>
            <div className={'col-span-2 flex gap-1 items-center'}>
                <p>تغییرات: </p>
                <p className={`bg-gray-600 rounded px-2 py-1 ${data?.order_book_info?.change < 0 ? 'text-red-600' : 'text-green-600'}`}
                   style={{direction: 'ltr'}}>
                    {data?.order_book_info?.change}
                </p>
            </div>
            <div className={'col-span-1 flex gap-1 items-center'}>
                <p>اطلاعات بیشتر</p>
                <LeftArrowIcon/>
            </div>
        </div>
    )
}

export default MarketItem;
