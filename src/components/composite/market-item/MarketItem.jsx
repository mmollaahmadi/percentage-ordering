import React from 'react';
import {prepareNumbersToDisplay} from "../../../utils/index.js";
import {LeftArrowIcon} from "../../../assets/icons/index.jsx";
import {useNavigate} from "react-router-dom";

const MarketItem = ({data}) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate('/market/' + data.id)}
            className={'grid grid-cols-2 md:grid-cols-8 gap-2 bg-gray-300 dark:bg-gray-600 bg-opacity-50 dark:bg-opacity-50 hover:bg-opacity-90 dark:hover:bg-opacity-80 hover:cursor-pointer rounded-lg my-2 py-2 px-4'}
        >
            <div className={'col-span-2 md:col-span-1 flex gap-2 items-center'}>
                <img className={'w-6'} src={data?.currency2?.image} alt="market-image"/>
                <p>{data?.currency2?.title_fa} / {data?.currency2?.title}</p>
            </div>
            <div className={'col-span-2 flex gap-2 items-center'}>
                <img className={'col-span-1 w-6'} src={data?.currency1?.image} alt="market-image"/>
                <p className={'bg-gray-400 dark:bg-gray-600 rounded-lg px-2 py-1'}>{data?.currency1?.title_fa} ({data?.currency1?.title})</p>
            </div>
            <div className={'col-span-2 flex gap-1 items-center'}>
                <p>قیمت: </p>
                <p className={'bg-gray-400 dark:bg-gray-600 rounded-lg px-2 py-1'}>{prepareNumbersToDisplay(data?.price_info?.price)}
                    <p
                        className={'text-gray-600 dark:text-gray-400 inline mr-2'}> تومان </p>
                </p>
            </div>
            <div className={'col-span-2 flex gap-1 items-center'}>
                <p>تغییرات: </p>
                <p className={`bg-gray-400 dark:bg-gray-600 rounded-lg px-2 py-1 ${data?.order_book_info?.change < 0 ? 'text-red-600' : 'text-green-600'}`}
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
