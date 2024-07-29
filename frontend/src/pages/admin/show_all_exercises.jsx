import axios from 'axios';
import React, { useEffect, useState } from 'react'


const ShowAllExercises = () => {
    const [exercises, setExercises] = useState([]);
    
    useEffect(() => {
        fetchAllSessions();
    }, [])
    
    const fetchAllSessions = async () => {
        try{
            let response = await axios.get('/api/exercise/all');
            setExercises(response.data);
        } catch (e) {
            alert('Error fetching sessions');
        }
    }
  return (
    <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-5xl font-bold mb-8 text-white">All Exercise</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map(exercise => (
            <div key={exercise._id} className="bg-gray-800 p-4 rounded-2xl shadow-lg">
            <div className="relative pb-56 mb-4 overflow-hidden rounded-xl">
                <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg bg-transparent"
                src={`https://www.youtube.com/embed/${exercise.url.split('v=')[1]}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={exercise.title}
                />
            </div>
            <h2 className="text-2xl font-semibold mb-2 bg-transparent">{exercise.title}</h2>
            <p className="text-gray-400 mb-4 line-clamp-3 bg-transparent">{exercise.description}</p>
            <div className="flex flex-wrap gap-2 bg-transparent">
                {exercise.tags.map((tag, index) => (
                <span key={index} className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm">
                    {tag}
                </span>
                ))}
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}

export default ShowAllExercises