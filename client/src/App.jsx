import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateCar />
    },
    {
      path:'/drinks',
      element: <ViewCars />
    },
    {
      path: '/drinks/:id',
      element: <CarDetails />
    },
    {
      path: '/drinks/:id/edit',
      element: <EditCar />
    },
    {
      path: '*',
      element: <main className="studio"><h1>Page not found</h1><a href="/">Return to Tea Studio</a></main>
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
