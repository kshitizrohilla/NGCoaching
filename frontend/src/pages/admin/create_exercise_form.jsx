import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateExerciseForm = () => {
    const [url, setUrl] = useState("");
    const [title, setTitile] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([""]);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const createExercise = async e => {
        e.preventDefault();
        if (url.length < 1 || title.length < 1 || description.length < 1 || tags.length < 1) {
            alert("Please fill all the details");
            return;
        }
        setLoading(true);
        try {
            let response = await axios.post(`/api/exercise/create`, { url, title, description, tags: tags.split(',').map(tag => tag.trim()) });
            if (response.status === 201) {
                navigate('/admin');
            }
        } catch (error) {
            alert("Error: try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='w-screen h-screen flex justify-center items-center text-center'>
            <form className='bg-black text-white' onSubmit={createExercise}>
                <div>
                    <p className='text-7xl font-extrabold'><span className='text-orange-600'>New</span> Excercise</p>
                    <p className='mt-8'>Fill all the details to create new exercise</p>
                </div>

                <div className='flex justify-center flex-col items-start mt-10'>
                    <label htmlFor='url' className='mb-1'>
                        URL
                    </label>
                    <input
                        name='url'
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
                        placeholder='youtube.com/watch?'
                    />

                    <label htmlFor='title' className='mb-1'>
                        Title
                    </label>
                    <input
                        name='title'
                        value={title}
                        onChange={e => setTitile(e.target.value)}
                        className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                        placeholder='Video'
                    />
                    <label htmlFor='desc' className='mb-1'>
                    
                    Description
                    </label>
                    <textarea
                        name='desc'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                        placeholder='Add more information about the video'
                    />

                    <label htmlFor='tags' className='mb-1'>
                        Tags
                    </label>
                    <input
                        name='tags'
                        value={tags}
                        onChange={e => setTags(e.target.value)}
                        className='px-3 py-2 w-full border rounded-md border-gray-300 mb-5'
                        placeholder='Enter related tags separated by commas'
                    />

                    
                </div>

                <button
                    type="submit"
                    className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
                >
                    {loading ? "Loading..." : 'Create'}
                </button>
            </form>
        </main>
    );
}

export default CreateExerciseForm