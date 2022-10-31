import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import PasswordResetPage from './pages/PasswordResetPage'
import VerifyPage from './pages/VerifyPage'
import PasswordResetPage2 from './pages/PasswordResetPage2'
import VerifyFailedPage from './pages/VerifyFailedPage'
import VerifySuccessfulPage from './pages/VerifySuccessfulPage'
import DashboardPage from './pages/DashboardPage';

import PrivateRoute from "./routes/PrivateRoute";


const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path= "/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/verification-successful" element={<VerifySuccessfulPage />}/>
      <Route path="/verification-failed" element={<VerifyFailedPage />}/>
      <Route path="/resetpage" element={<PasswordResetPage />}/>
      <Route path="/verifyAccount/:userID/:uniqueEmailToken" element={<VerifyPage />}/>
      <Route path="/resetPassword/:userID/:passwordResetToken" element={<PasswordResetPage2 />}/>

      <Route element={<PrivateRoute />}>
        <Route path="/landing/" element={code ? <DashboardPage code={code} /> : <LandingPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
}

export default App
