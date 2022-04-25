import React from 'react'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Notes from "../components/Notes";
import NotFound from "../components/NotFound";
// import { ProtectedRoute } from './components/ProtectedRoute'
import {
    Routes, Route
} from "react-router-dom";

const Views = () => {
    return (
        <Routes>
                {/* <Route path='/notes' >
                    <ProtectedRoute>
                    <Notes />
                    </ProtectedRoute>
                </Route> */}
                <Route exact path='/' element={<Login />}/>
                <Route exact path='/signup' element={<SignUp />}/>
                <Route exact path='/notes' element={<Notes />}/>
                <Route path='*' element={<NotFound />}/>
                {/* <Route path='/' >
                    <Home />
                </Route> */}
        </Routes>
    )
  }
  
  export default Views