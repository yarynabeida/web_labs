import React from 'react';
import './App.css';
import './style.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/profile';
import EditUser from './components/edituser';

function App() {
  return (
    <>
    <Router>
			<Routes>
        <Route index element={<Main />} />
        <Route exact path ='/login' element={<Login />} />
        <Route exact path ='/register' element={<Register />} />
        <Route exact path ='/profile' element={<Profile />} />
        <Route exact path ='/edituser' element={<EditUser />} />
			</Routes>
		</Router>
    </>
  );
}

export default App;
