import React, { useEffect } from 'react';
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

function ViewTrip() {
    const { tripId } = useParams();

    async function getTripData() {
        const docRef = doc(db, 'AI Trip Planner', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
        } else {
            toast('No trip found.');
        }
    }

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    return (
        <div>ViewTrip</div>
    )
}

export default ViewTrip;