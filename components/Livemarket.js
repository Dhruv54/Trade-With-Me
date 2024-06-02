import React, { useState } from 'react'
import Index from '@/components/Index'


const Livemarket = () => {

  const [livemarket, setlivemarket] = useState(null)

  const handlefyerslogin = async (e) => {
    e.preventDefault();
    console.log("handlesubmit")
    try {
      const response = await fetch('http://localhost:3000/api/livemarket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setlivemarket(data.livemarket.candles)
        console.log(livemarket)
        console.log('fetch profile successful:', data);
      } else {
        console.error('fetch profile failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch profile:', error);
    }
  };

  return (
    <>
      <Index />
      <form className="mt-8 space-y-6" onSubmit={handlefyerslogin} method="POST">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get market data</button>
      </form>
      {livemarket &&(
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Candle Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {livemarket.map((candle, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold">Candle {index + 1}</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <p className="font-semibold">Timestamp:</p>
                  <p>{candle[0]}</p>
                  <p className="font-semibold">Open:</p>
                  <p>{candle[1]}</p>
                  <p className="font-semibold">High:</p>
                  <p>{candle[2]}</p>
                  <p className="font-semibold">Low:</p>
                  <p>{candle[3]}</p>
                  <p className="font-semibold">Close:</p>
                  <p>{candle[4]}</p>
                  <p className="font-semibold">Volume:</p>
                  <p>{candle[5]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Livemarket