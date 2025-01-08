import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../../api/axios.js";
import Loading from "../../atomic/loading";
import ActiveItem from "../../composite/active-item";
import Decimal from "decimal.js";
import TotalItem from "../../composite/total-item";
import CustomInput from "../../atomic/input";
import CustomButton from "../../atomic/button/CustomButton.jsx";

const ActiveTabContext = ({type}) => {
    const [loading, setLoading] = React.useState(false);
    const {marketId} = useParams();
    const [data, setData] = React.useState(null);
    const [totalResult, setTotalResult] = React.useState(null);
    const [percentageValue, setPercentageValue] = React.useState(0);
    const [calculatedValue, setCalculatedValue] = React.useState([
        {
            code: 'remain',
            title: 'مجموع حجم ارز قابل دریافت',
            value: null,
        },
        {
            code: 'price',
            title: 'میانگین قیمت ارز',
            value: null,
        },
        {
            code: 'total',
            title: 'مجموع مبلغ قابل پرداخت',
            value: null,
        }
    ]);

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
        setPercentageValue(0);
        setCalculatedValue([
            {
                code: 'remain',
                title: 'مجموع حجم ارز قابل دریافت',
                value: null,
            },
            {
                code: 'price',
                title: 'میانگین قیمت ارز',
                value: null,
            },
            {
                code: 'total',
                title: 'مجموع مبلغ قابل پرداخت',
                value: null,
            }
        ])

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
                {code: 'remain', title: 'مجموع باقیمانده', value: sum?.remain},
                {code: 'price', title: 'میانگین وزنی قیمت', value: new Decimal(sum.price).dividedBy(sum.value).toFixed(3).toString()},
                {code: 'total', title: 'مجموع ارزش', value: sum?.value},
            ]);

            // if percentage is entered then run calculate method too
            if(percentageValue > 0 && calculatedValue?.every(a => a.value !== null)){
                updateCalculatedValues();
            }
        } catch (e) {
            console.error(e);
        }
    }

    const updateCalculatedValues = () =>{
        try {
            const temp = calculatedValue?.map((item) => ({
                ...item,
                value: percentageValue * totalResult?.filter(tr => tr.code === item.code)[0].value / 100,
            }))
            setCalculatedValue(temp)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        calculateSummations();
    }, [data]);

    return loading ? <Loading/> : (
        <div className={'flex flex-col w-full'}>
            <div className={'grid grid-cols-8 gap-2 bg-gray-100 dark:bg-gray-800 w-full p-3 items-end rounded-lg'}>
                <div className={'col-span-2 flex gap-2 items-end'}>
                    <CustomInput
                        label={'درصد ورودی'}
                        value={percentageValue}
                        onChange={setPercentageValue}
                        min={0}
                        max={100}
                        type="number"
                    />
                    <CustomButton
                        onClick={() => {
                            updateCalculatedValues()
                        }}
                        label={'محاسبه'}
                        disabled={!percentageValue || percentageValue === 0}
                    />
                </div>

                {calculatedValue?.map((item, index) => <div key={index} className={'col-span-2 flex gap-2'}>
                    <p>{item?.title}:</p>
                    <p>
                        {item?.value ?? '--'}
                    </p>
                </div>)}
            </div>
            <TotalItem
                data={totalResult}
            />
            <div className={'border-t border-gray-500 mt-3'}></div>

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
