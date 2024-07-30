// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth/login';
import PlayerDashboard from './pages/player/player_dashboard';
import CoachDashboard from './pages/coach/coach_dashboard';
import AdminDashboard from './pages/admin/admin_dashboard';
import CreateExerciseForm from './pages/admin/create_exercise_form';
import CreateSessionForm from './pages/admin/create_session_form';
import ShowAllSessions from './pages/admin/show_all_sessions';
import ShowAllExercises from './pages/admin/show_all_exercises';
import RegisterCoach from './pages/admin/register_coach';
import RegisterPlayer from './pages/coach/register_player';
import AllPlayers from './pages/coach/all_players';
import AssignSession from './pages/coach/assign_session';
import CoachAllSessions from './pages/coach/coach_all_sessions';
import PlayerAssigned from './pages/player/player_assigned';
import PlayerCalendar from './pages/player/player_calendar';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Auth />} />
      <Route path='/admin' element={<AdminDashboard />} />
      <Route path='/coach' element={<CoachDashboard />} />
      <Route path='/player' element={<PlayerDashboard />} />
      <Route path='/exercise' element={<CreateExerciseForm /> }/>
      <Route path='/admin/session' element={<CreateSessionForm />} />
      <Route path='/admin/showsession' element={<ShowAllSessions />} />
      <Route path='showexercise' element={<ShowAllExercises />} />
      <Route path='/admin/registercoach' element={<RegisterCoach />} />
      <Route path='/coach/registerplyaer' element={<RegisterPlayer />} />
      <Route path='/coach/coachplayers' element={<AllPlayers />} />
      <Route path='/coach/assign' element={<AssignSession />} />
      <Route path='/coach/sessions' element={<CoachAllSessions />} />
      <Route path='/player/sessions' element={<PlayerAssigned />} />
      <Route path='/player/calendar' element={<PlayerCalendar />} />
    </Routes>
  </Router>
);

export default AppRoutes;
