import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import Tabs from "../../components/composite/tabs/index.js";
import ActiveTabContext from "../../components/screen/active-tab-context/index.js";
import MatchTabContext from "../../components/screen/match-tab-context/index.js";

const MarketDetails = () => {
    const {marketId} = useParams();
    const navigate = useNavigate();

    return (
        <div className={'flex flex-col gap-3'}>
            <div className={'flex items-center justify-center gap-10'}>
                <p>{`سفارشات و معاملات ${marketId}`}</p>
                <button
                    className={'w-fit px-3 '}
                    onClick={() => navigate(-1)}
                >
                    بازگشت
                </button>
            </div>
            <Tabs
                tabsData={[
                    {
                        id: 1,
                        title: 'سفارشات خرید',
                        context: <ActiveTabContext type="buy" />
                    },
                    {
                        id: 2,
                        title: 'سفارشات فروش',
                        context: <ActiveTabContext type="sell" />
                    },
                    {
                        id: 3,
                        title: 'معاملات',
                        context: <MatchTabContext />
                    }
                ]}
            />
        </div>
    )
}

export default MarketDetails;
