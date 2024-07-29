import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginHandler = async e => {
        e.preventDefault();
        const { email, password, role } = user;
        if (email.length < 1 || password.length < 1 || role.length < 1) {
            alert("Please fill all the details");
            return;
        }
        setLoading(true);

        try {
            let response = await axios.post(`/api/auth/${role}/login`, { email, password });
            if (response.status === 200) {
                console.log(response.data.user)
                localStorage.setItem('nguser', JSON.stringify(response.data.user));
                navigate(`/${role}`);
            }
        } catch (error) {
            alert("Login failed")
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='w-screen h-screen flex justify-center items-center text-center'>
            <form className='bg-black text-white' onSubmit={loginHandler}>
                <div>
                    <p className='text-7xl font-extrabold'><span className='text-orange-600'>NG</span> Coaching</p>
                    <p className='italic'>The next generation sports ®</p>
                </div>

                <div className='flex justify-center flex-col items-start mt-10'>
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

                    <label htmlFor='role' className='mb-1'>
                        I am
                    </label>
                    <select
                        name='role'
                        value={user.role}
                        onChange={e => setUser({ ...user, role: e.target.value })}
                        className='px-2 py-2 border rounded-md border-gray-300 mb-5 w-full cursor-pointer'
                    >
                        <option value='' disabled>Select your role</option>
                        <option value='admin'>Admin</option>
                        <option value='coach'>Coach</option>
                        <option value='player'>Player</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
                >
                    {loading ? "Loading..." : 'Sign in'}
                </button>
            </form>
        </main>
    );
};

export default Auth;