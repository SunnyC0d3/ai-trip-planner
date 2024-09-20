import React, { useEffect, useState } from 'react';
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function PlaceInfo({ place }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        place && getPlacePhoto();
    }, [place]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }

        const result = await getPlaceDetails(data).then((response) => {
            setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name));
        });
    }

    return (
        <div className="my-3">
            <p className="font-medium text-sm text-orange-600">{place?.bestTime}</p>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${place?.placeName + " " + place?.geoCoordinates[0] + " " + place?.geoCoordinates[1]}`} target="_blank">
                <div className="border rounded-xl p-3 mt-5 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer">
                    <img className="w-[130px] h-[130px] rounded-xl" src={photoUrl ?? ''} alt={place?.placeName} />
                    <div>
                        <p className="font-bold text-lg mb-3">{place?.placeName}</p>
                        <p className="text-sm text-gray-400">{place?.placeDetails}</p>
                        <p className="mt-2 text-sm">🕙 {place?.timeToTravel}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PlaceInfo;