import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/FirebaseConfig';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        getUserTrips();
    }, []);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/');
            return;
        }

        const q = query(collection(db, 'AI Trip Planner'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]); 
        querySnapshot.forEach((doc) => {
            setUserTrips((prevData) => [...prevData, doc.data()]);
        });
    }

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h1 className="font-bold text-3xl">My Trips</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-5">
                {userTrips.map((trip, index) => (
                    <div key={index}>
                        <img src="" alt="" className="object-cover rounded" />
                        <div>
                            <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                            <p className="text-sm text-gray-500">{trip?.userSelection?.numOfDays} day trip with a {trip?.userSelection?.budget} budget</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyTrips;