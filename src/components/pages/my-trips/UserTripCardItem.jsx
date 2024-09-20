import { useState, useEffect } from "react";
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && getMyTripPhoto();
    }, [trip]);

    const getMyTripPhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }

        const result = await getPlaceDetails(data).then((response) => {
            setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', response.data.places[0].photos[3].name));
        });
    }

    return (
        <Link to={`/view-trip/${trip?.id}`} className="hover:scale-105 transition-all cursor-pointer">
            <img src={photoUrl ?? ''} alt={trip?.userSelection?.location?.label} className="object-cover rounded h-[250px]" />
            <div className="mt-3">
                <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                <p className="text-sm text-gray-500">{trip?.userSelection?.numOfDays} day trip with a {trip?.userSelection?.budget} budget</p>
            </div>
        </Link>
    );
}

export default UserTripCardItem;