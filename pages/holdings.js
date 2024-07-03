import React,{useState,useEffect} from 'react'

const Holdings = (user) => {

  const [holdings, setholdings] = useState(null)
  const [overall, setoverall] = useState(null)

  const handlegetholdings = async () => {
    const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');
    try {
      const response = await fetch('/api/getholdings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fyeraccesstoken)
      });

      if (response.ok) {
        const data = await response.json();
        setholdings(data.holdings.holdings)
        setoverall(data.holdings.overall)
        console.log('get holding success:', data);
      } else {
        console.error('get holding failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during get holding:', error);
    }
  };

  useEffect(() => { 
    if(user)
        handlegetholdings(); 
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      {holdings && (
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Holdings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {holdings.map((holding) => (
            <div key={holding.id} className="p-4 border border-gray-200 rounded-lg">
              <p className="text-lg font-semibold">{holding.symbol}</p>
              <p>Quantity: {holding.quantity}</p>
              <p>Cost Price: {holding.costPrice.toFixed(2)}</p>
              <p>Market Value: {holding.marketVal.toFixed(2)}</p>
              <p>PL: {holding.pl.toFixed(2)}</p>
              <p>LTP: {holding.ltp.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Overall</h2>
          <p>Total Investments: {overall.total_investment.toFixed(2)}</p>
          <p>Total Current Value: {overall.total_current_value.toFixed(2)}</p>
          <p>Total PL: {overall.total_pl.toFixed(2)}</p>
          <p>PnL Percentage: {overall.pnl_perc.toFixed(2)}%</p>
        </div>
      </div>
      )}
    </>
  )
}

export default Holdings