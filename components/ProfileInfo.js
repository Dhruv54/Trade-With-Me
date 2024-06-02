import React,{useState} from 'react'

const ProfileInfo = () => {

  const [fyerProfile, setfyerProfile] = useState()

  const handlefyerslogin = async (e) => {
    e.preventDefault();
    console.log("handlesubmit")
    try {
      const response = await fetch('http://localhost:3000/api/getprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        setfyerProfile(data)
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
      <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fyers Login</button>
      </form>
      {fyerProfile && (
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
      )}
    </>
  )
}

export default ProfileInfo