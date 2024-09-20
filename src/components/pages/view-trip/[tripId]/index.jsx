import React, { useEffect, useState } from 'react';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/Button';
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import HotelInfo from './HotelInfo';
import PlaceInfo from './PlaceInfo';

function ViewTrip() {
    const { tripId } = useParams();

    const [trip, setTrip] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();

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

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }

        const result = await getPlaceDetails(data).then((response) => {
            setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name));
        });
    }

    return (
        <>
            <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                <div className="w-full aspect-[16/9]">
                    <img src={photoUrl} className="w-full h-full object-cover rounded" alt="placeholder image" />
                </div>
                <h1 className="font-bold text-2xl my-5">{trip?.userSelection?.location?.label}</h1>
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
                <div>
                    <h2 className="font-bold text-xl my-5">Hotel Recommendation</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                            <HotelInfo key={index} hotel={hotel} />
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-xl my-5">Places to visit</h2>
                    <div>
                        {trip?.tripData?.itinerary?.map((itinerary, itineraryIndex) => (
                            <div className="mt-5" key={itineraryIndex}>
                                <h3 className="font-medium text-lg">Day {itinerary.day}</h3>
                                <div className="grid md:grid-cols-2 gap-5">
                                    {
                                        itinerary.plan.map((place, placeIndex) => (
                                            <PlaceInfo key={placeIndex} place={place} />
                                        ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}

export default ViewTrip;