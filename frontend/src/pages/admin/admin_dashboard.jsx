import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/footer';
import AdminNav from './admin_nav';

const AdminDashboard = () => {
  const [user, setuser] = useState("admin")
  useEffect(() => {
    const storedUser = localStorage.getItem('nguser');

    if (storedUser) {
      const admin = JSON.parse(storedUser);
      setuser(admin);
    } else {
      navigate('/')
    }
  }, [])
  
  const navigate = useNavigate();
  return (
    <div className='w-screen flex flex-col justify-center items-center'>
    <AdminNav />
    <main className='w-screen p-20 mt-20'>
      <p className='text-5xl font-semibold text-gray-400'>Welcome</p>
      <p className='text-7xl font-bold mt-8 text-gray-200'>{user.name}</p>

      <div className='flex justify-around mt-20'>
        <div onClick={() => navigate('/admin/session')} className='relative flex justify-center items-end rounded-3xl border border-white overflow-hidden cursor-pointer'>
          <img 
            src='https://img.freepik.com/free-photo/green-grass-cinematic-lighting-football-stadium_1409-7657.jpg?t=st=1722250911~exp=1722254511~hmac=b42166555c2cebbfaee17c012dd82425642e5998d1f6ecc4737ed577c729b725&w=1800' 
            alt="Create Exercise"
            width={500}
            className='inline-block rounded-3xl'
          />
          <p className='absolute bottom-8 z-10 flex items-center justify-center text-white text-6xl font-bold bg-transparent'>Create Session</p>
        </div>
        <div onClick={() => navigate('/admin/exercise')}  className='relative flex justify-center items-end rounded-3xl border border-white overflow-hidden cursor-pointer'>
          <img 
            src='https://img.freepik.com/free-vector/dynamic-gradient-football-background_23-2149007789.jpg?t=st=1722250984~exp=1722254584~hmac=e212b48af0269bbb31df7db6439d465b0203e526af03eab43cb5487e89cbbea3&w=1800' 
            alt="Create Session"
            width={500}
            className='inline-block'
          />
          <p className='absolute bottom-8 z-10 flex items-center justify-center text-white text-6xl font-bold bg-transparent'>Create Exercise</p>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  )
}

export default AdminDashboard