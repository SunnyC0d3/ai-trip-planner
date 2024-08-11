import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './components/pages/CreateTrip.jsx'
import Header from './components/ui/Header.jsx'
import Container from './components/ui/Container.jsx'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/create-trip',
    element: <CreateTrip />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Toaster />
    <Container>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>,
)
