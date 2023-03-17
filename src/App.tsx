import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage'
import NotFound from './pages/NotFound'
import tripApi from './store/tripslice/tripThunk'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(tripApi())
  }, [dispatch])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/main' />} />
          <Route path='/main' element={<MainPage />}>
            <Route path=':name/:id' element={<MainPage />} />
          </Route>

          {/* <Route path='/reservations' element={<Reservations />} /> */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
