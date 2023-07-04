import Signup from  './components/pages/signup';
import Mainscreen from './components/pages/mainscreen'
import React from 'react';



import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/mainscreen' element={<Mainscreen/>}/>
      </Routes>
    </Router>
  );
}

