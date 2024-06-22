import React, { useEffect } from 'react'

const PNL = (user) => {

  useEffect(() => {
    // Function to run on component load
    const fetchData = async () => {
        // Your code here, e.g., fetch data from an API
        console.log(user);
    };

    fetchData();
}, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div>
        {user && user.user.value && user.fyersuser.value?
          (
            <div>PNL</div>
          ) : (
            <div>please login</div>
          )
        }
      </div>
    </>
  );
}

export default PNL