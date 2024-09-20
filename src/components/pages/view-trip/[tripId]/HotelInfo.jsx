import React, { useEffect, useState } from 'react';
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function HotelInfo({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && getPlacePhoto();
    }, [hotel]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }

        const result = await getPlaceDetails(data).then((response) => {
            setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name));
        });
    }

    return (
        <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName + " " + hotel?.hotelAddress}`} target="_blank">
            <div className="hover:scale-105 transition-all cursor-pointer">
                <img src={photoUrl ?? ''} className="rounded-xl h-[180px] w-full object-cover" alt={hotel?.hotelName} />
                <div className="my-2">
                    <h3 className="font-small">{hotel?.hotelName}</h3>
                    <p className="text-xs text-gray-400">📍 {hotel?.hotelAddress}</p>
                    <p className="text-sm">💰 ${hotel?.price}</p>
                    <p className="text-sm">⭐ {hotel?.rating}</p>
                </div>
            </div>
        </Link>
    );
}

export default HotelInfo;