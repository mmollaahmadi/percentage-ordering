import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../../api/axios.js";
import Loading from "../../atomic/loading";
import ActiveItem from "../../composite/active-item/index.js";

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
                    setData(response?.data?.orders.slice(0, 9));
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
                    value: parseFloat(accumulate.value) + parseFloat(current.value),
                    remain: parseFloat(accumulate.value) + parseFloat(current.value),
                    price: parseFloat(accumulate.price) + (parseFloat(current.price) * parseFloat(current.value)),
                }
            }, {value: 0, remain: 0, price: 0});

            setTotalResult({...sum, price: parseFloat(sum.price/sum.value)});
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
            <ActiveItem
                className={'bg-green-700 bg-opacity-100'}
                data={totalResult}
            />
        </div>
    );
}

export default ActiveTabContext;
