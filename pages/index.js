import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Home = ({setGlobalToken}) => {
  const router = useRouter()

  const [fyersurl, setFyersUrl] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fyerAccessToken, setFyerAccessToken] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/getfyersurl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFyersUrl(data.redirecturl);
      } else {
        console.error('Fyers login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during Fyers login', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fyersurl);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/fyerslogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth_code: inputText
        })
      });
      if (response.ok) {
        const data = await response.json();
        setFyerAccessToken(data.response.access_token);
        setGlobalToken(fyerAccessToken);
        router.push('/home');
      } else {
        console.error('Fyers login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during Fyers login', error);
    }
  };

  return (
    <div className="mainbg relative overflow-hidden">
      <Image src="/bg.jpg" alt="Background Image" layout="fill" objectFit="cover" className="object-cover" quality={75} priority={true} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white font-bold mb-20">
        <h1 className="text-3xl lg:text-5xl mb-24">Trade With Dhruv</h1>
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 text-slate-700">Welcome to My App</h2>
          <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
            Fyers Login
          </button>
          {fyersurl && (
            <div className="mb-4">
              <input className="border border-gray-300 rounded px-3 py-2 w-full mb-2 text-black" type="text" value={fyersurl} readOnly />
              <button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline">
                Copy URL
              </button>
              <textarea className="border border-gray-300 rounded px-3 py-2 w-full mb-2 text-black" value={inputText} onChange={handleInputChange} rows={3} placeholder="Enter text"></textarea>
              <button onClick={handleAuthenticate} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Authenticate
              </button>
            </div>
          )}

          {fyerAccessToken && (
            <p className="text-green-500 mt-4">Success</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
