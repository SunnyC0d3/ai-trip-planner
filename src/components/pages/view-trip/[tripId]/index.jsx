import React, { useEffect, useState } from 'react';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/Button';
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function ViewTrip() {
    const { tripId } = useParams();

    const [trip, setTrip] = useState([]);
    const [photoUrl, setPhotoUrl] = useState();
    const [hotelPhotoUrlArray, setHotelPhotoUrlArray] = useState([]);
    const [itineraryPhotoUrlArray, setItineraryPhotoUrlArray] = useState([]);

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

        trip && trip?.tripData?.hotelOptions?.map((hotel, index) => {
            async function getHotelPhotos(hotel) {
                const data = {
                    textQuery: hotel?.hotelName
                }

                const result = await getPlaceDetails(data).then((response) => {
                    setHotelPhotoUrlArray((prevArray) => [...prevArray, PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name)]);
                });
            }

            getHotelPhotos(hotel);
        });

        trip && trip?.tripData?.itinerary?.map((itinerary, itineraryIndex) => {
            itinerary.plan.map((place, placeIndex) => {
                async function getItineraryPlacePhotos() {
                    const data = {
                        textQuery: place?.placeName
                    }

                    const result = await getPlaceDetails(data).then((response) => {
                        const photoUrl = PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name);

                        setItineraryPhotoUrlArray((prevArray) => {
                            const updatedArray = [...prevArray];

                            if (!updatedArray[itineraryIndex]) {
                                updatedArray[itineraryIndex] = [];
                            }

                            updatedArray[itineraryIndex].push(photoUrl);

                            return updatedArray;
                        });
                    });
                }

                getItineraryPlacePhotos();
            });
        });
    }, [trip]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }

        const result = await getPlaceDetails(data).then((response) => {
            setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name));
        });
    }

    console.log(itineraryPhotoUrlArray);

    return (
        <>
            <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
                <img src={photoUrl} className="h-[340px] w-full object-cover rounded" alt="placeholder image" />
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
                            <Link key={index} to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName + " " + hotel?.hotelAddress}`} target="_blank">
                                <div className="hover:scale-105 transition-all cursor-pointer">
                                    <img src={hotelPhotoUrlArray[index]} className="rounded-xl h-[180px] w-full object-cover" />
                                    <div className="my-2">
                                        <h3 className="font-small">{hotel?.hotelName}</h3>
                                        <p className="text-xs text-gray-400">📍 {hotel?.hotelAddress}</p>
                                        <p className="text-sm">💰 ${hotel?.price}</p>
                                        <p className="text-sm">⭐ {hotel?.rating}</p>
                                    </div>
                                </div>
                            </Link>
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
                                            <div className="my-3" key={placeIndex}>
                                                <p className="font-medium text-sm text-orange-600">{place?.bestTime}</p>
                                                <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName + " " + place?.geoCoordinates[0] + " " + place?.geoCoordinates[1]}`} target="_blank">
                                                    <div className="border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer">
                                                        {/* {itineraryPhotoUrlArray[itineraryIndex][placeIndex] && <img className="w-[130px] h-[130px] rounded-xl" src={itineraryPhotoUrlArray[itineraryIndex][placeIndex]} alt="" />} */}
                                                        <div>
                                                            <p className="font-bold text-lg mb-3">{place?.placeName}</p>
                                                            <p className="text-sm text-gray-400">{place?.placeDetails}</p>
                                                            <p className="mt-2 text-sm">🕙 {place?.timeToTravel}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
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