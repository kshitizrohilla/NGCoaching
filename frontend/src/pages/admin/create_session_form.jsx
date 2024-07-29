import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Switcher from '../../Components/toggle';

const CreateSessionForm = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllExercises();
  }, []);

  const fetchAllExercises = async () => {
    try {
      let response = await axios.get('/api/exercise/all');
      console.log(response.data);
      setExercises(response.data);
    } catch (e) {
      console.log("Can't fetch all exercises");
    }
  };

  const createSession = async e => {
    e.preventDefault();
    if (name.length < 1 || selectedExercises.length < 1 || tags.length < 1) {
      alert("Please fill all the details");
      return;
    }
    setLoading(true);
    try {
      console.log("Selected Exercises before submission:", selectedExercises); // Check state before submission
      let response = await axios.post('/api/sessions/create', { 
        sessionName: name,
        sessionTags: tags.split(',').map(tag => tag.trim()),
        exercises: selectedExercises
      });
      if (response.status === 201) {
        navigate('/admin');
      }
    } catch (error) {
      alert("Error: try again");
    } finally {
      setLoading(false);
    }
  };

  const toggleExerciseSelection = (exerciseId) => {
    setSelectedExercises(prevSelected => {
      const updatedSelection = prevSelected.includes(exerciseId)
        ? prevSelected.filter(id => id !== exerciseId)
        : [...prevSelected, exerciseId];
      console.log("Updated Selection:", updatedSelection); // Log updated selection
      return updatedSelection;
    });
  };

  const logout = () => {
    localStorage.removeItem('nguser');
  };

  return (
    <main className='w-screen h-screen flex justify-center items-center text-center'>
      <form className='bg-black text-white' onSubmit={createSession}>
        <div>
          <p className='text-7xl font-extrabold'><span className='text-orange-600'>New</span> Session</p>
          <p className='mt-8'>Fill all the details to create new exercise</p>
        </div>

        <div className='flex justify-center flex-col items-start mt-10'>
          <label htmlFor='name' className='mb-1'>
            Name
          </label>
          <input
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
            className='px-3 py-2 border rounded-md border-gray-300 mb-5 w-full'
            placeholder='Session Name'
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

          <label className='mb-1'>
            Select Exercises
          </label>
          <div className="exercise-list">
            {exercises.map(exercise => (
              <div key={exercise._id} className="exercise-tile w-full text-left mt-4 flex border border-white px-2 py-3 rounded-full items-center">
                <Switcher
                  isChecked={selectedExercises.includes(exercise._id)} 
                  onToggle={() => toggleExerciseSelection(exercise._id)}
                />
                  <h2 className='ml-2'>{exercise.title}</h2>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className='w-full my-4 bg-orange-600 font-semibold rounded-md py-4 text-white hover:bg-orange-600/80 cursor-pointer'
          >
            {loading ? "Loading..." : 'Create'}
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateSessionForm;