import React, { useState,useEffect } from 'react'

const ProfileInfo = (user) => {

  const [fyerProfile, setfyerProfile] = useState()

  const handlefyersgetprofile = async (e) => {
    const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');
    try {
      const response = await fetch('/api/getprofile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fyeraccesstoken)
      });
     
      if (response.ok) {
        const data = await response.json();
        setfyerProfile(data)
        console.log('fetch profile successfully:', data);
      } else {
        console.error('fetch profile failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during fetch profile:', error);
    }
  };

  useEffect(() => { 
    if(user && user.user.value && user.fyersuser.value)
      handlefyersgetprofile(); 
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div>
        {user && user.user.value && user.fyersuser.value &&  fyerProfile?
          (
            <div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Profile Info</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 font-semibold">Name:</p>
                    <p className="text-gray-900">{fyerProfile.profile.data.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Email:</p>
                    <p className="text-gray-900">{fyerProfile.profile.data.email_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">Mobile Number:</p>
                    <p className="text-gray-900">{fyerProfile.profile.data.mobile_number}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-semibold">PAN:</p>
                    <p className="text-gray-900">{fyerProfile.profile.data.PAN}</p>
                  </div>
                </div>
              </div>
            </div>

          ) : (<div>please login</div>)
        }
      </div>
    </>
  )
}

export default ProfileInfo