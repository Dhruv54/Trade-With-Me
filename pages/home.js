import { data } from 'autoprefixer';
import React from 'react'
import { useState, useEffect } from 'react';
const Home = ({ user, globalAccessToken }) => {

    const [marketStatus, setmarketStatus] = useState(null)

    const [currentPrice, setcurrentPrice] = useState(0)

    const [prev1hr20candles, setprev1hr20candles] = useState(null)

    const [prevcandlelow, setprevcandlelow] = useState(null)

    const calculatePercentageIncrease = async (candles) => {

         // Get the low price of the previous candle
         if(data.market_status)
        {
            if(data.market_status.candles.length>0)
            {
                const previousCandleLow = candles[candles.length - 2][3]; // Assuming the low price is at index 3
                console.log('Previous Candle Low:', previousCandleLow);
                setprevcandlelow(previousCandleLow);
            }
        }
        else{
            return
        }
        // Get the last 20 candles
        const last20Candles = candles.slice(-20);

       
       
        // Calculate min price of the last 20 candles
        const minPrice = Math.min(...last20Candles.map(candle => candle[3])); // Assuming the low price is at index 3
        console.log('Min Price of Last 20 Candles:', minPrice);
        // Calculate percentage increase from min price to current price
        const percentageIncrease = ((currentPrice - minPrice) / minPrice) * 100;
        console.log('Min Price of Last 20 Candles:', percentageIncrease);
        return {
            minPrice,
            percentageIncrease
        };
    }

    const fetch1hr20Data = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/1hrcandle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'access_token': 'invalid',
                })
            });
            if (response.ok) {
                const data = await response.json();
                setprev1hr20candles(data.market_status);
                console.log('Fetch market status successful:', data);
                console.log(calculatePercentageIncrease(data.market_status.candles));

            } else {
                console.error('Fetch market status failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch market status:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/marketstatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'access_token': 'invalid',
                })
            });
            if (response.ok) {
                const data = await response.json();
                setmarketStatus(data.market_status);
                console.log('Fetch market status successful:', data);
                let currPrice = 0;
                if(data.market_status)
                {
                    if(data.market_status.candles.length>0)
                    {
                        currPrice = data.market_status.candles[data.market_status.candles.length - 1][4]; // Assuming the closing price is at index 4
                        setcurrentPrice(currPrice)
                    }
                }
                console.log('Current Price:', currPrice);
                console.log('prevcandlelow:', prevcandlelow);
                if(currPrice < prevcandlelow)
                    {
                        // make an entry
                        console.log("currPrice :", currPrice, "prevcandlelow :",prevcandlelow)
                    }
            } else {
                console.error('Fetch market status failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during fetch market status:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch1hr20Data();
        }, 10000); // 10000 milliseconds = 10 second

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);
    return (
        <>
            <div>
                {user && user.value ?
                    (
                        <section className="text-gray-600 body-font">
                            <h1 className="text-center text-3xl font-bold mb-4">SENSEX : {currentPrice}</h1>
                            <div className="container px-5 py-5 mx-auto">
                                {marketStatus ? (
                                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                                        <table className="table-auto w-full text-left whitespace-no-wrap">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Open</th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">High</th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Low</th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Close</th>
                                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Volume</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {marketStatus.candles.slice().reverse().map((candle, index) => (
                                                    <tr key={index}>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{new Date(candle[0] * 1000).toLocaleString()}</td>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{candle[1]}</td>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{candle[2]}</td>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{candle[3]}</td>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{candle[4]}</td>
                                                        <td className="border-t-2 border-gray-200 px-4 py-3">{candle[5]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p>Error fetching Fyers data</p>
                                )}
                            </div>
                        </section>
                    ) : (
                        <div>please login</div>
                    )
                }
            </div>
        </>
    )
}

export default Home