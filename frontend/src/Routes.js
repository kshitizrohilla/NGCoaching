// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoSelectionForm from './Components/VideoSelectionForm/VideoSelectionForm';
import SessionList from './Components/SessionList/SessionList';
import Students from './Components/Students/Students';
import StudentRegistration from './Components/StudentRegistration/StudentRegistration';
import CoachRegistration from './Components/CoachRegistration/CoachRegistration';
import TrainingsDashboard from './Components/TrainingsDashboard/TrainingsDashboard';
import StudentCalendar from './Components/StudentCalendar/StudentCalendar';
import Coaches from './Components/Coaches/Coaches';
import Auth from './pages/auth/login';
import PlayerDashboard from './pages/player/player_dashboard';
import CoachDashboard from './pages/coach/coach_dashboard';
import AdminDashboard from './pages/admin/admin_dashboard';
import CreateExerciseForm from './pages/admin/create_exercise_form';
import CreateSessionForm from './pages/admin/create_session_form';
import ShowAllSessions from './pages/admin/show_all_sessions';
import ShowAllExercises from './pages/admin/show_all_exercises';
import RegisterCoach from './pages/admin/register_coach';

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
      {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/video-selection" element={<VideoSelectionForm />} />
      <Route path="/session-list" element={<SessionList />} />
      <Route path="/students" element={<Students />} />
      <Route path="/student-registration" element={<StudentRegistration />} />
      <Route path="/coach-registration" element={<CoachRegistration />} />
      <Route path="/coach-dashboard" element={<CoachDashboard />} />
      <Route path="/coach-dashboard/:coachName" element={<CoachDashboard />} />
      <Route path="/trainings-dashboard" element={<TrainingsDashboard />} />
      <Route path="/coaches" element={<Coaches />} />
      <Route path="/student-calendar" element={<StudentCalendar />} />
      <Route path="/student-calendar/:studentName" element={<StudentCalendar />} /> */}
      {/* <Route path="/" element={<p className="main-page-text">Welcome to NG Coaching. This is an empty welcome page. Explore other pages from the navbar on the top. </p>} /> */}
    </Routes>
  </Router>
);

export default AppRoutes;
