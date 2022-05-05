import React from 'react'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Notes from "../components/Notes";
import NotFound from "../components/NotFound";
// import { ProtectedRoute } from './components/ProtectedRoute'
import {
    Routes, Route
} from "react-router-dom";
import RequireAuth from '../components/RequireAuth';
// import { UserContext } from '../database/UserProvider';

const Views = () => {
    // const {user} = useContext(UserContext)
    // if (user === false){
    //     return <p>Loading...</p>
    // }

    // const { user } = useContext(UserContext);

    return (
        <Routes>
                <Route exact path='/' element={<Login />}/>
                <Route exact path='/signup' element={<SignUp />}/>
                <Route exact path='/notes' element={
                    <RequireAuth>
                        <Notes/>
                        {/* <Notes emailUser={user}/> */}
                    </RequireAuth>
                }/>
                <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  
  export default Views