import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterPlayer = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        age: 0
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [coachId, setCoachId] = useState("");
    useEffect(() => {
        const storedUser = localStorage.getItem('nguser');
    
        if (storedUser) {
          const coach = JSON.parse(storedUser);
          setCoachId(coach._id);
        } else {
          navigate('/')
        }
      }, [])



    const loginHandler = async e => {
        e.preventDefault();
        const { name, email, password, age } = user;
        if (name.length < 1 || password.length < 1 || email.length < 1 || age < 1) {
            alert("Please fill all the details");
            return;
        }
        setLoading(true);
        try {
            let response = await axios.post('/api/player/register', { name, email, password, age, coachId });
            if (response.status === 201) {
                navigate('/coach');
            }
        } catch (error) {
            alert("An error occurred")
        } finally {
            setLoading(false);
        }
    };
  return (
    <main className='w-screen h-screen flex justify-center items-center text-center'>
        <form className='bg-black text-white' onSubmit={loginHandler}>
            <div>
                <p className='text-7xl font-extrabold'><span className='text-orange-600'>Register</span> Player</p>
                <p className='mt-4'>Register your students by setting up their ID</p>
            </div>

            <div className='flex justify-center flex-col items-start mt-10'>
                <label htmlFor='name' className='mb-1'>
                    Name
                </label>
                <input
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                    className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                    placeholder='me@ngcoaching.com'
                />

                <label htmlFor='email' className='mb-1'>
                    Email
                </label>
                <input
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                    placeholder='me@ngcoaching.com'
                />

                <label htmlFor='password' className='mb-1'>
                    Password
                </label>
                <input
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                    placeholder='••••••••••'
                />
                <label htmlFor='age' className='mb-1'>
                    Select a Number
                </label>
                <select
                    name='age'
                    type='number'
                    value={user.age}
                    onChange={e => setUser({ ...user, age: e.target.value })}
                    className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                >
                    <option value='' disabled>Select a number</option>
                    {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>


            <button
                type="submit"
                className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
            >
                {loading ? "Loading..." : 'Create Player Account'}
            </button>
        </form>
    </main>
  )
}

export default RegisterPlayer