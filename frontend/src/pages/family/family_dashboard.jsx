import React, { useState } from 'react'
import FamilyCalendar from './family_calendar';
import FamilyAssigned from './family_assigned';
import axios from 'axios';

export const FamilyDashboard = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState(null)
    const fetchPlayer = async e => {
       e.preventDefault(); 
       setLoading(true);
       try {
            let response = await axios.get(`/api/sessions/family/${email}/sessions`);
            setSessions(response.data);
       } catch (error) {
            alert("Failed to get information for the player")
       } finally {
            setLoading(false);
       }
    }
  return (
    <main className='w-screen mt-20 flex flex-col justify-center items-center text-center'>
        <form className='bg-black max-w-[700px] text-white' onSubmit={fetchPlayer}>
            <div>
                <p className='text-7xl font-extrabold'><span className='text-orange-600'>Family</span> Dashboard</p>
                <p className='mt-8'>One place to see track kid's progress</p>
            </div>

            <div className='flex justify-center flex-col items-start mt-10'>
                <label htmlFor='email' className='mb-1'>
                Email
                </label>
                <input
                name='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                placeholder='Email address of the player'
                />
            </div>
            <button
                type="submit"
                className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
            >
                {loading ? "Searching..." : 'Search'}
            </button>

        </form>
            {sessions && <FamilyCalendar sessions = {sessions}/>}
            {sessions && <FamilyAssigned sessions = {sessions}/>}
    </main>
  )
}
