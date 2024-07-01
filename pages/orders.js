import React, { useEffect } from 'react'

const Orders = (user) => {

    const handleClickEntry = async (e) => {
        const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');

        e.preventDefault();
        try {
            const response = await fetch('/api/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fyeraccesstoken)
            });
            if (response.ok) {
                console.log('Entry Perfect');
            } else {
                console.error('Entry failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during placing Entry', error);
        }
    };

    const handleClickExit = async (e) => {
        const fyeraccesstoken = localStorage.getItem('fyeraccesstoken');

        e.preventDefault();
        try {
            const response = await fetch('/api/exitorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fyeraccesstoken)
            });
            if (response.ok) {
                console.log('Exit Perfect');
            } else {
                console.error('Exit failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during placing Entry', error);
        }
    };

    return (
        <>
            <div>
                {user && user.user.value && user.fyersuser.value ?
                    (
                        <div>
                            <button onClick={handleClickEntry} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                                Entry
                            </button>
                            <button onClick={handleClickExit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
                                Exit
                            </button>
                        </div>
                    ) : (
                        <div>please login</div>
                    )
                }
            </div>
        </>
    );
}

export default Orders