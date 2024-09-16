import React, { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/Input';
import logo from '../../assets/logo.svg'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '@/constants/options';
import { Button } from '../ui/Button';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { useGoogleLogin } from '@react-oauth/google';

function CreateTrip() {
  const [place, setPlace] = useState('');
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  function handleInputChange(name, value) {
    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function onGenerateTrip() {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.numOfDays > 5 && !formData?.location || !formData?.budget || !formData?.travellers) {
      toast('Please fill all the details.');
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location.label)
      .replace('{totalDays}', formData?.numOfDays)
      .replace('{traveler}', formData?.travellers)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.numOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);
  }

  useEffect(() => {

  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    })
      .then((response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.data));
        setOpenDialog(false);
        onGenerateTrip();
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
              onChange: (value) => { setPlace(value); handleInputChange('location', value) }
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input placeholder={'Ex. 3'} type="number" onChange={(event) => { handleInputChange('numOfDays', event.target.value) }} />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <p>The budget is exclusively allocated for activities and dining purposes.</p>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {
              SelectBudgetOptions.map((item, index) => (
                <div key={item.id} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget === item.title ? 'shadow-lg' : ''}`} onClick={() => { handleInputChange('budget', item.title) }}>
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
                <div key={item.id} className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.travellers === item.people ? 'shadow-lg' : ''}`} onClick={() => { handleInputChange('travellers', item.people) }}>
                  <span className="text-4xl">{item.icon}</span>
                  <h2 className="font-bold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className="my-10 justify-end flex">
          <Button onClick={onGenerateTrip}>Generate Trip</Button>
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <img className="w-20 h-20 mb-5" src={logo} alt="logo" />
              <DialogTitle>Sign in with Google</DialogTitle>
              <DialogDescription>
                Sign in to the App with Google authentication securely
                <Button className="w-full mt-5 flex gap-4 items-center" onClick={login}><FcGoogle className="h-7 w-7" /> Sign in with Google</Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CreateTrip