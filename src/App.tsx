import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MainPage from './pages/MainPage'
import NotFound from './pages/NotFound'
import tripApi from './store/trip/tripThunk'
import { AppDispatch } from './store/store'
import NavigationPage from './pages/NavigationPage'
import Reservation from './pages/Reservation'

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(tripApi())
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavigationPage />}>
            <Route path='/' element={<Navigate to='/main' />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/reservations' element={<Reservation />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
