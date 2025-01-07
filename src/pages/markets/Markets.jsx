import React, {useEffect, useState} from 'react';
import api from "../../api/axios.js";
import Tabs from "../../components/composite/tabs";
import MarketTabContext from "../../components/screen/market-tab-context";

const Markets = () => {
    const [loading, setLoading] = useState(false);
    const [tabsData, setTabsData] = useState([
        {
            id: 1,
            code: 'IRT',
            title: 'بازارهای پایه تومان',
            data: null,
            selectedPageNumber: 1,
        },
        {
            id: 2,
            code: 'USDT',
            title: 'بازارهای پایه تتر',
            data: null,
            selectedPageNumber: 1,
        }
    ]);

    const onChangePageNumber = (pageNumber, id) => {
        try {
            setTabsData((previousTabsData) =>
                previousTabsData?.map(item => item.id === id ? {...item, selectedPageNumber: pageNumber} : item)
            );
        } catch (e) {
            console.error(e);
        }
    }

    const getMarketsInformation = () => {
        try {
            setLoading(true);
            api.get('/v1/mkt/markets/').then((response) => {
                if (response.status === 200) {
                    ['IRT', 'USDT']?.forEach((code) => {
                            setTabsData((previousTabsData) =>
                                previousTabsData?.map(item => item.code === code ? {
                                    ...item,
                                    data: (response.data?.results?.filter((r) => r.currency2?.code === code))
                                } : item)
                            );
                        }
                    )
                }
                setLoading(false);
            });
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getMarketsInformation();
    }, []);

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'flex flex-col'}>بازارهای موجود</div>
            <Tabs
                tabsData={tabsData?.map((item) => (
                    {
                        ...item,
                        context: loading ?
                            <p className={'text-gray-500 text-center w-full my-3'}>در حال بارگزاری...</p> :
                            <MarketTabContext
                                selectedPageNumber={item?.selectedPageNumber}
                                onChangePageNumber={onChangePageNumber}
                                key={item?.id}
                                id={item?.id}
                                data={item?.data}
                            />,
                    }
                ))}
            />
        </div>
    )
}

export default Markets;
