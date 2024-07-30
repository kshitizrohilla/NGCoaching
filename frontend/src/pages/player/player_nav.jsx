import React from 'react'
import { useNavigate } from 'react-router-dom';

const PlayerNav = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('nguser');
        navigate('/')
    };
  return (
    <div className='px-20 flex justify-between fixed top-0 left-0 right-0 h-20 bg-orange-900'>
        <div className='text-2xl font-extrabold  bg-transparent flex items-center justify-center'>
            NG Coaching | Player Dashboard
        </div>
        <div className='text-lg font-bold flex space-x-4 bg-transparent justify-center items-center'>
            <div onClick={logout} className='text-green-300 bg-transparent cursor-pointer'>Logout</div>
        </div>
    </div>
  )
}

export default PlayerNav