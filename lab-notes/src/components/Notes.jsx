import React, { useContext } from 'react';
import { UserContext } from '../database/UserProvider';
import { useNavigate } from 'react-router-dom';
import logo from "../assests/img/logo.png"
import logout from "../assests/img/logout.png"
import './Notes.css';
import AddNotes from './AddNotes'

function Notes(){
    // const { user, logOut } = useContext(UserContext);
    const { logOut, user } = useContext(UserContext);
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
          <header>
            <section id='identity'>
        <img id='logoHome' src={logo}></img>
        <section id='nameAndSloganHome'>
        <h1 id='yourNotesHome'> {'\n'} Your notes</h1>
        <div id='sloganHome'>
        <p id='sloganPartOneHome'>If it's important for you,</p>
        <p id='sloganPartTwoHome'>it should be written on a post-it</p>
        </div>
        </section>
        </section>
        
        <br/>
            <button type= 'submit' id='buttonLogOut' onClick={handleClickLogout}>
            <img id='btnLogout' src={logout}></img>
          </button>
          </header>
          <h2 id='yourNotesAndName'> {'\n'} Your notes {user.displayName} </h2>
          <AddNotes/>
        </React.Fragment>
    );
};

export default Notes;