import React from 'react'

const Position = (user) => {
  return (
    <>
      {user && user.user.value && user.fyersuser.value?
      (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-5 mx-auto">
            <div className="flex flex-col text-center w-full mb-5">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Open Positions</h1>
            </div>
            <div className="lg:w-2/3 w-full mx-auto overflow-auto">
              <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                  <tr>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Option</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Qty</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Entry</th>
                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Current</th>
                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3">NIFTY 21 Mar 21900 Put</td>
                    <td className="px-4 py-3">50/50</td>
                    <td className="px-4 py-3">89</td>
                    <td className="px-4 py-3 text-lg text-gray-900">122</td>
                    <td className="w-10 text-center">
                      {/* <input name="plan" type="radio"> */}
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-gray-200 px-4 py-3">NIFTY 21 Mar 21200 Call</td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">50/50</td>
                    <td className="border-t-2 border-gray-200 px-4 py-3">92</td>
                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">58</td>
                    <td className="border-t-2 border-gray-200 w-10 text-center">
                    </td>
                  </tr>
                  <tr>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">P&L</td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3"></td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3"></td>
                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">+152</td>
                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
              <a className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">Go to Chart
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded">Exit All</button>
            </div>
          </div>
        </section>
      ):(
        <h1 className="sm:text-2xl text-2xl font-medium title-font mb-2 text-gray-900">please login</h1>
      )
      }
    </>
  )
}

export default Position