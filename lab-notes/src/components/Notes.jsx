import React, { useContext } from 'react';
import { UserContext } from '../database/UserProvider';
import { useNavigate } from 'react-router-dom';
import logo from "../assests/img/logo.png"
import './Notes.css';
import AddNotes from './AddNotes'
import ListNotes from './ListNotes'

function Notes(){
    const { user, logOut } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickLogout = async() => {
        try{
          await logOut ();
          navigate('/');
        } catch (error){
          console.log(error);
        }
        };

    return(
        <React.Fragment>
        <img id='logoHome' src={logo}></img>
        <h1 id='yourNotesHome'> {'\n'} Your notes</h1>
        <div id='sloganHome'>
        <p id='sloganPartOneHome'>If it's important for you,</p>
        <p id='sloganPartTwoHome'>it should be written on a post-it</p>
        </div>
        <br/>
            <button type= 'submit' id='buttonLogOut' onClick={handleClickLogout}>
            Log out
          </button>
          <AddNotes/>
          <ListNotes/>
        </React.Fragment>
    );
};

export default Notes;