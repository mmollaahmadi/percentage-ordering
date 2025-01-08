import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../../api/axios.js";
import Loading from "../../atomic/loading";
import ActiveItem from "../../composite/active-item";
import Decimal from "decimal.js";
import TotalItem from "../../composite/total-item";

const ActiveTabContext = ({ type }) => {
    const [loading, setLoading] = React.useState(false);
    const {marketId} = useParams();
    const [data, setData] = React.useState(null);
    const [totalResult, setTotalResult] = React.useState(null);

    const getData = () => {
        try {
            api.get(`/v2/mth/actives/${marketId}/?type=${type}`).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setData(response?.data?.orders.slice(0, 10));
                }
            })
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getData();

        const intervalId = setInterval(() => {
            getData();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [type]);


    const calculateSummations = () => {
        try {
            const sum = data?.reduce((accumulate, current) => {
                return {
                    value: new Decimal(accumulate.value).plus(current.value).toString(),
                    remain: new Decimal(accumulate.remain).plus(current.remain).toString(),
                    price: new Decimal(accumulate.price).plus(new Decimal(current.price).times(current.value)),
                }
            }, {value: 0, remain: 0, price: 0});

            setTotalResult([
                {title: 'مجموع باقیمانده', value: sum?.remain},
                {title: 'میانگین وزنی قیمت', value: new Decimal(sum.price).dividedBy(sum.value).toFixed(3).toString()},
                {title: 'مجموع ارزش', value: sum?.value},
            ]);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
       calculateSummations();
    }, [data]);

    return loading ? <Loading /> : (
        <div className={'flex flex-col w-full'}>
            {
                data?.map((item, index) => (
                    <ActiveItem data={item} key={index}/>
                ))
            }
            <div className={'border-t mt-3'}></div>
            <TotalItem
                className={'bg-green-700 bg-opacity-100'}
                data={totalResult}
            />
        </div>
    );
}

export default ActiveTabContext;
