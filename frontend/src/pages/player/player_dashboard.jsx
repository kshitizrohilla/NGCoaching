import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/footer';
import PlayerNav from './player_nav';

const PlayerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  useEffect(() => {
    const storedUser = localStorage.getItem('nguser');

    if (storedUser) {
      const player = JSON.parse(storedUser);
      setUser(player);
    } else {
      navigate('/')
    }
  }, [])
  return (
    <div className='w-screen flex flex-col justify-center items-center'>
      <PlayerNav />
        <main className='w-screen px-20 pt-10 mt-20'>
          <p className='text-5xl font-semibold text-gray-400'>Welcome</p>
          <p className='text-7xl font-bold mt-8 text-gray-200'>{user && user.name}</p>

          <div className='flex justify-around mt-20'>
            <div onClick={() => navigate('/player/sessions')} className='relative flex justify-center items-end rounded-3xl border border-white overflow-hidden cursor-pointer'>
              <img 
                src='https://img.freepik.com/free-photo/top-view-football-field-still-life_23-2148849141.jpg?t=st=1724955825~exp=1724959425~hmac=d6342d870460001fe56fab4c82d258476c84ad3a94538917f1cd1734376ef755&w=1380' 
                alt="Your Sessions"
                width={500}
                className='inline-block rounded-3xl'
              />
              <p className='absolute bottom-8 z-10 flex items-center justify-center text-black text-6xl font-bold bg-transparent'>Your Sessions</p>
            </div>
            <div onClick={() => navigate('/player/calendar')}  className='relative flex justify-center items-end rounded-3xl border-blue-600 border-2 shadow-xl shadow-gray-700 overflow-hidden cursor-pointer'>
              <img 
                src='https://img.freepik.com/free-vector/gradient-football-field-background_23-2149010664.jpg?t=st%3D1724955888~exp%3D1724959488~hmac%3Dd349e353bb2d098c4a09d5b72beff1936af47a742434d72040249afc4708cf3d&w=1380' 
                alt="Calendar"
                width={500}
                className='inline-block'
              />
              <p className='absolute bottom-8 z-10 flex items-center justify-center text-white text-6xl font-bold bg-transparent'>Calendar</p>
            </div>
          </div>
        </main>
      <Footer />
    </div>
  )
}

export default PlayerDashboard