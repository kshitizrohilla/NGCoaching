import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './tailwind.css';

import PlayerNav from './player_nav.jsx';

const PlayerCalendar = () => {
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [highlightDates, setHighlightDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('nguser');
    if (storedUser) {
      const player = JSON.parse(storedUser);
      setUser(player);
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchAssignedSessions();
    }
  }, [user]);

  const fetchAssignedSessions = async () => {
    try {
      let response = await axios.get(`/api/sessions/player/${user._id}/sessions`);
      console.log('Fetched from the calendar:', response.data);
      setSessions(response.data);
      highlightSessionDates(response.data);
    } catch (e) {
      alert('Error fetching sessions');
    }
  };

  const highlightSessionDates = (sessions) => {
    const dates = [];
    sessions.forEach(session => {
      const startDate = new Date(session.startDate);
      const endDate = new Date(session.endDate);
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toDateString());
      }
    });
    setHighlightDates(dates);
  };

  const renderCalendar = () => {
    const startDay = new Date(currentYear, currentMonth, 1);
    const endDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = [];
    for (let d = startDay; d <= endDay; d.setDate(d.getDate() + 1)) {
      daysInMonth.push(new Date(d).toDateString());
    }

    const weeks = [];
    let week = [];
    for (let i = 0; i < startDay.getDay(); i++) {
      week.push(null);
    }

    daysInMonth.forEach(day => {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    });

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks.map((week, i) => (
      <div key={i} id="remove-white-background" className="flex justify-between">
        {week.map((day, j) => (
          <div
            key={j}
            className={`flex items-center justify-center h-12 w-12 border rounded-md ${
              highlightDates.includes(day) ? 'bg-orange-500 text-black' : 'bg-white text-black'
            }`}
          >
            {day ? new Date(day).getDate() : ''}
          </div>
        ))}
      </div>
    ));
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (<div>
  <PlayerNav />
    <div id="whole-calendar" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 id="player-calendar-heading" className="text-2xl font-bold mb-4">Player Calendar</h1>
      <div id="remove-white-bg" className="flex mb-4">
        <button id="nxt-prv-btns" onClick={handlePrevMonth} className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Previous</button>
        <button id="nxt-prv-btns" onClick={handleNextMonth} className="px-4 py-2 bg-blue-500 text-white rounded-md">Next</button>
      </div>
      <div id="no-white-background" className="grid grid-cols-7 gap-3.5 text-center bg-transparent text-orange-500">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="font-semibold">{day}</div>
        ))}
      </div>
      {renderCalendar()}
    </div>
  </div>);
};

export default PlayerCalendar;
