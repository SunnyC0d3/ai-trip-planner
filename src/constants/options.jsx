export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just me',
        desc: 'A soul travels in exploration',
        people: '1 person',
        icon: '✈️'
    },
    {
        id: 2,
        title: 'A couple',
        desc: 'Two travels in tandem',
        people: '2 people',
        icon: '🥂'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group for a fun loving adventure',
        people: '3+ people',
        icon: '🏡'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch thrill seekers',
        people: '3+ people',
        icon: '⛴️'
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay concious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Don\'t worry about cost',
        icon: '💸'
    },
];

export const AI_PROMPT = 'Generate travel plan for location: {location}, for {totalDays} days for {traveler} with a {budget} budget, give me hotel options list with hotelName, hotelAddress, price, hotelImageUrl, geoCoordinates, rating, description and suggest itinerary with placeName, placeDetails, placeImageUrl, geoCoordinates, ticketPricing, timeToTravel for each of the locations for {totalDays} days with each day plan with best time to visit in JSON format.';