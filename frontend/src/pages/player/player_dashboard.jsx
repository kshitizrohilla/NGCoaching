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
        <main className='w-screen p-20 mt-20'>
          <p className='text-5xl font-semibold text-gray-400'>Welcome</p>
          <p className='text-7xl font-bold mt-8 text-gray-200'>{user && user.name}</p>

          <div className='flex justify-around mt-20'>
            <div onClick={() => navigate('/player/sessions')} className='relative flex justify-center items-end rounded-3xl border border-white overflow-hidden cursor-pointer'>
              <img 
                src='https://img.freepik.com/free-photo/burning-young-caucasian-male-football-soccer-player-sportwear-boots-kicking-ball-goal-mixed-light-dark-wall-concept-healthy-lifestyle-professional-sport-hobby_155003-38683.jpg?t=st=1722281656~exp=1722285256~hmac=7434250188afe44188cfcee4bd61bd2a4042898c268107db5b638d4fd4b66daa&w=2000' 
                alt="Your Sessions"
                width={500}
                className='inline-block rounded-3xl'
              />
              <p className='absolute bottom-8 z-10 flex items-center justify-center text-white text-6xl font-bold bg-transparent'>Your Sessions</p>
            </div>
            <div onClick={() => navigate('/player/calendar')}  className='relative flex justify-center items-end rounded-3xl border-blue-600 border-2 shadow-xl shadow-gray-700 overflow-hidden cursor-pointer'>
              <img 
                src='https://img.freepik.com/free-vector/flat-football-players-illustrated_52683-65298.jpg?t=st=1722281082~exp=1722284682~hmac=0e4e9e6577f8c1e536569b8c54804f2ee78427cab7c7a9eef715aa448890b059&w=1800' 
                alt="Calendar"
                width={500}
                className='inline-block'
              />
              <p className='absolute bottom-8 z-10 flex items-center justify-center text-black text-6xl font-bold bg-transparent'>Calendar</p>
            </div>
          </div>
        </main>
      <Footer />
    </div>
  )
}

export default PlayerDashboard