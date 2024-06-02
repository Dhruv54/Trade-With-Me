import React from 'react'

const PNL = (user) => {
  return (
    <>
      <div>
        {user && user.user.value ?
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