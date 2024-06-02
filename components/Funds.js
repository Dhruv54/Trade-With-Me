import React,{useState} from 'react'
import Index from '@/components/Index'


const Funds = () => {

  const [fundLimit, setfundLimit] = useState()

  const handlefyerslogin = async (e) => {
    e.preventDefault();
    console.log("handlesubmit")
    try {
      const response = await fetch('http://localhost:3000/api/getfunds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setfundLimit(data.funds.fund_limit)
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
      <form className="mt-8 space-y-6" onSubmit={handlefyerslogin} method="POST">
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Funds</button>
      </form>
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