// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopBar from './Components/TopBar/TopBar';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import VideoSelectionForm from './Components/VideoSelectionForm/VideoSelectionForm';
import SessionList from './Components/SessionList/SessionList';
import Students from './Components/Students/Students';
import StudentRegistration from './Components/StudentRegistration/StudentRegistration';
import CoachRegistration from './Components/CoachRegistration/CoachRegistration';
import CoachDashboard from './Components/CoachDashboard/CoachDashboard';
import TrainingsDashboard from './Components/TrainingsDashboard/TrainingsDashboard';
import StudentCalendar from './Components/StudentCalendar/StudentCalendar';
import Coaches from './Components/Coaches/Coaches';

const AppRoutes = () => (
  <Router>
    <TopBar />
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
      <Route path="/student-calendar/:studentName" element={<StudentCalendar />} />
      <Route path="/" element={<p className="main-page-text">Welcome to NG Coaching. This is an empty welcome page. Explore other pages from the navbar on the top. </p>} />
    </Routes>
  </Router>
);

export default AppRoutes;
