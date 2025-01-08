import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import api from "../../../api/axios.js";
import Loading from "../../atomic/loading";
import {preparedTimeToDisplay, prepareNumbersToDisplay} from "../../../utils";

const MatchTabContext = () => {
    const [loading, setLoading] = React.useState(false);
    const {marketId} = useParams();
    const [data, setData] = React.useState(null);

    const getData = () => {
        try {
            api.get(`/v1/mth/matches/${marketId}/`).then((response) => {
                if (response.status === 200) {
                    setLoading(false);
                    setData(response?.data?.slice(0, 10));
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

        return () => clearInterval(intervalId)
    }, []);

    return loading ? <Loading /> : (
        <div className={'flex flex-col w-full'}>
            <div>
                {
                    data?.map((item, index) => (
                        <div
                            className={'grid grid-cols-2 md:grid-cols-6 justify-center rounded bg-gray-100 bg-opacity-50 my-2 px-4 py-2'}
                            key={index}
                        >
                            <div className={'col-span-2 flex gap-2'}>
                                <p>مقدار: </p>
                                <p>
                                    {item?.match_amount}
                                </p>
                            </div>
                            <div className={'col-span-2 flex gap-2'}>
                                <p>قیمت: </p>
                                <p>
                                    {prepareNumbersToDisplay(item?.price)}
                                </p>
                            </div>
                            <div className={'col-span-2 flex gap-2'}>
                                <p>زمان: </p>
                                <p>
                                    {preparedTimeToDisplay(item?.time)}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default MatchTabContext;
