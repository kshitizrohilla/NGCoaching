// src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalLogin from './Components/GLOBAL_LOGIN/GlobalLogin';
import CoachRegistration from './Components/COACH/CoachRegistration';
import AdminDashboard from './Components/ADMIN/AdminDashboard';
import ExercisesList from './Components/ADMIN/ExercisesList';
import SessionsList from './Components/ADMIN/SessionsList';
import CreateSessions from './Components/ADMIN/CreateSessions';
import CreateExercises from './Components/ADMIN/CreateExercises';
import AllTrainings from './Components/COACH/AllTrainings';
import CoachDashboard from './Components/COACH/CoachDashboard';
import StudentRegistration from './Components/COACH/StudentRegistration';
import AllStudents from './Components/COACH/AllStudents';
import StudentDashboard from './Components/STUDENT/StudentDashboard';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/exercises-list" element={<ExercisesList />} />
      <Route path="/sessions-list" element={<SessionsList />} />
      <Route path="/create-exercises" element={<CreateExercises />} />
      <Route path="/create-sessions" element={<CreateSessions />} />
      <Route path="/student-registration" element={<StudentRegistration />} />
      <Route path="/all-trainings" element={<AllTrainings />} />
      <Route path="/all-students" element={<AllStudents />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/coach-registration" element={<CoachRegistration />} />
      <Route path="/coach-dashboard/" element={<CoachDashboard />} />
      <Route path="/" element={<GlobalLogin />} />
    </Routes>
  </Router>
);

export default AppRoutes;
