import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/service/FirebaseConfig';
import UserTripCardItem from './UserTripCardItem';

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
                    <UserTripCardItem key={index} trip={trip} />
                ))}
            </div>
        </div>
    );
}

export default MyTrips;