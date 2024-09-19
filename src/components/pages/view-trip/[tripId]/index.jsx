import React, { useEffect, useState } from 'react';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import placeholderImg from '@/assets/placeholderImg.jpg'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/Button';

function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    async function getTripData() {
        const docRef = doc(db, 'AI Trip Planner', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        } else {
            toast('No trip found.');
        }
    }

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    return (
        <div className="p-10 md:px-20 lg:px-44 xl:px-56">
            <img src={placeholderImg} className="h-[340px] w-full object-cover rounded" />
            <h2 className="font-bold text-2xl my-5">{trip?.userSelection?.location?.label}</h2>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-5">
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📅 {trip?.userSelection?.numOfDays} Day</span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💰 {trip?.userSelection?.budget} Budget</span>
                        <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🥂 No. Of Traveler: {trip?.userSelection?.travellers}</span>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>
        </div>
    )
}

export default ViewTrip;