import React, { useContext } from 'react'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Notes from "../components/Notes";
import NotFound from "../components/NotFound";
import {
    Routes, Route
} from "react-router-dom";
// import RequireAuth from '../components/RequireAuth';
import { UserContext } from "../database/UserProvider";
//import { Navigate } from "react-router-dom";
// import { auth } from "../database/firebase-config";
// import { useNavigate } from 'react-router-dom';

const Views = () => {
    const {user} = useContext(UserContext);
    // const navigate = useNavigate();

    return (
        <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route exact path='/signup' element={<SignUp />}/>
{user &&(
                <Route exact path='/notes' element={
                    // window.user ? <Notes/> : navigate('/')
                    // <RequireAuth>
                    <Notes/>
                    // </RequireAuth>
                }/>
)}
                <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  
  export default Views