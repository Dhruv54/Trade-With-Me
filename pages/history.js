import React from 'react'

const History = (user) => {
  return (
    <>
    <div>
      
      {user && user.user.value && user.fyersuser.value ?
        (
          <div>history</div>
        ) : (
          <div>please login</div>
        )
      }
    </div>
  </>
  )
}

export default History