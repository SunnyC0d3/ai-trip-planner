
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import CreateTrip from './components/pages/CreateTrip.jsx'
import ViewTrip from './components/pages/view-trip/[tripId]/index.jsx'
import MyTrips from './components/pages/MyTrips.jsx'
import Home from './components/pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'create-trip',
        element: <CreateTrip />,
      },
      {
        path: 'view-trip/:tripId',
        element: <ViewTrip />,
      },
      {
        path: 'my-trips',
        element: <MyTrips />,
      }
    ]
  }
]);

export default router;