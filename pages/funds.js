import React,{useState, useEffect} from 'react'

const Funds = (user) => {

  const [fundLimit, setfundLimit] = useState()

  const handlegetfunds = async () => {
    
    const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');

    try {
      const response = await fetch('/api/getfunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fyeraccesstoken)
      });
      if (response.ok) {
        const data = await response.json();
        setfundLimit(data.funds.fund_limit)
        console.log('fetch fund successful:', data);
      } else {
        console.error('fetch profile failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch profile:', error);
    }
  };

  useEffect(() => { 
    if(user)
        handlegetfunds(); 
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {fundLimit && (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Fund Limits</h2>
        <div className="grid grid-cols-2 gap-4">
          {fundLimit.map((limit) => (
            <div key={limit.id}>
              <p className="text-gray-700 font-semibold">{limit.title}:</p>
              <p className="text-gray-900">{`Equity: ${limit.equityAmount.toFixed(2)}`}</p>
              <p className="text-gray-900">{`Commodity: ${limit.commodityAmount.toFixed(2)}`}</p>
            </div>
          ))}
        </div>
      </div>
      )}
    </>
  )
}

export default Funds