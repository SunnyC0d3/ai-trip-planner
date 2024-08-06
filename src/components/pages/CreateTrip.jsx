import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/input';
import { SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '../ui/Button';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState();

  function handleInputChange(name, value) {
    setFormData({
      ...formField,
      [name]: value
    });
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is the destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (value) => { setPlace(value); handleInputChange('location', v) }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input placeholder={'Ex. 3'} type="number" />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <p>The budget is exclusively allocated for activities and dining purposes.</p>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {
              SelectBudgetOptions.map((item, index) => (
                <div key={item.id} className="p-4 border cursor-pointer rounded-lg hover:shadow-lg">
                  <span className="text-4xl">{item.icon}</span>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on travelling with on your next adventure?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {
              SelectTravelsList.map((item, index) => (
                <div key={item.id} className="p-4 border cursor-pointer rounded-lg hover:shadow-lg">
                  <span className="text-4xl">{item.icon}</span>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button>Generate Trip</Button>
        </div>
      </div>
    </div>
  )
}

export default CreateTrip