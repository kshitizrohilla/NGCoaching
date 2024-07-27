import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import CoachNavbar from './CoachNavbar';

const AllTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userType = Cookies.get('userType');

    if (userType !== 'coach') {
      navigate('/');
      return;
    }

    fetchTrainings();
  }, [navigate]);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fetch-trainings');
      const trainingsData = response.data;

      const studentIds = [];
      trainingsData.forEach(training => {
        studentIds.push(...training.students_list);
      });

      const uniqueStudentIds = [...new Set(studentIds)];

      const studentResponse = await axios.post('http://localhost:5000/fetch-students-by-id', { ids: uniqueStudentIds });
      const studentMap = studentResponse.data.reduce((map, student) => {
        map[student._id] = student.name;
        return map;
      }, {});

      const updatedTrainings = trainingsData.map(training => ({
        ...training,
        students_list: training.students_list.map(studentId => studentMap[studentId] || 'Unknown Student')
      }));

      setTrainings(updatedTrainings);
    } catch (error) {
      console.error('Error fetching trainings or students:', error);
    }
  };

  const renderVideo = (video, index) => {
    try {
      return (
        <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
          <iframe
            className="w-full h-40 rounded-lg"
            src={video}
            title={`Video ${index + 1}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      );
    } catch (error) {
      console.error('Error embedding video:', error);
      return (
        <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
          <p>Cannot display video. <a href={video} target="_blank" rel="noopener noreferrer">View on external site</a></p>
        </div>
      );
    }
  };

  return (
    <>
      <CoachNavbar />
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
          <div className="bg-gradient-to-r from-teal-400 to-blue-500 sm:rounded-3xl p-6">
            <div className="relative px-4 py-10 bg-white sm:rounded-3xl sm:p-20">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold">All Training Sessions</h1>
                <div className="divide-y divide-gray-200">
                  {trainings.map((training) => (
                    <div key={training._id} className="py-8">
                      <div className="flex flex-col space-y-4">
                        <h2 className="text-xl font-bold">{training.sessionName}</h2>
                        <p className="text-gray-600">
                          Start Date: {new Date(training.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          End Date: {new Date(training.endDate).toLocaleDateString()}
                        </p>
                        <h3 className="text-lg font-semibold">Students</h3>
                        <ul className="list-disc list-inside">
                          {training.students_list.map((student, index) => (
                            <li key={index} className="text-gray-600">{student}</li>
                          ))}
                        </ul>
                        <h3 className="text-lg font-semibold">Videos</h3>
                        <div className="flex flex-wrap">
                          {training.videos_list.map((video, index) => renderVideo(video, index))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllTrainings;
