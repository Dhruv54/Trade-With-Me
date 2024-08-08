import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = (user) => {
  const router = useRouter()

  const [fyersurl, setFyersUrl] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fyerAccessToken, setFyerAccessToken] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if(user.user.value)
    {
      try {
        const response = await fetch('/api/getfyersurl', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFyersUrl(data.redirecturl);
        } else {
          console.error('Fyers login failed:', response.statusText);
          toast.error('Fyers login failed');
        }
      } catch (error) {
        console.error('Error during Fyers login', error);
        toast.error('Error during Fyers login');
      }
    }else{
      toast.error('Please Login Again');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/fyerslogin', {
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

        console.log(data);
        // Store fyerstoken in localStorage
        localStorage.setItem('fyerstoken', data.fyerstoken);
        localStorage.setItem('fyeraccesstoken', data.response.access_token);

        // Show token in a pop-up and copy to clipboard
        toast.info(`Fyerstoken: ${data.response.access_token}`, {
          autoClose: false,
        });
        copyToClipboard(data.response.access_token);

        console.log('Fyers login success');
        // router.push('/home')
      } else {
        console.error('Fyers login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during Fyers login', error);
    }
  };

  return (
    <>
    <ToastContainer position="top-left" />

    {!user || !user.user.value || !user.fyersuser.value && <div className="mainbg relative overflow-hidden">
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
              <button onClick={() => copyToClipboard(fyersurl)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline">
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
    }
    </>
  );
};

export default Home;
