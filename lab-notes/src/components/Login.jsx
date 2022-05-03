import React, { useContext, useState } from 'react';
import { UserContext } from '../database/UserProvider';
import { useNavigate } from 'react-router-dom';
// import { signUpWithGoogle} from '../database/firebase';
import './Login.css';
import google from "../assests/img/google.png"
import logo from "../assests/img/logo.png"

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser, loginGoogle } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
          await loginUser (email, password);
          console.log('Inició sesión');
          navigate('/notes');
        } catch (error){
          console.log(error);
        }
    };

    const signUpWithGoogle = async(e) => {
      e.preventDefault();
        try{
          await loginGoogle ();
          navigate('/notes');
        } catch (error){
           // navigate('/');
          }
    };

    const navigateToSignup = async(e) => {
       navigate('/signup');
      };

    return(
<React.Fragment>
        <h1 id='yourNotes'><img id='logo' src={logo}></img> {'\n'} Your notes</h1>
        <div id='slogan'>
        <p id='sloganPartOne'>If it's important for you,</p>
        <p id='sloganPartTwo'>it should be written on a post-it</p>
        </div>
        <br/>
        <form onSubmit={handleSubmit}>
        <div id='signupAndInputs'>
          <p id='signUp'>Login</p>
        <br/>
        <input type={'email'} placeholder='E-mail' className='inputSignUp' id='inputEmail' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <input type={'password'} placeholder='Password' className='inputSignUp' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <br/>
        <button type= 'submit' id='buttonContinue'>
            Continue
          </button>
          </div>
          </form>
          <br/>
          <div id='orGoogle'>
          <p id='or'>Or login with</p>
          <br/>
        <button type= 'submit' id='loginGoogle' onClick={signUpWithGoogle}>
        <img id='logoGoogleLogin' src={google}></img>
          </button>
          </div>
          <div id='signupHere'>
        <p id='signupHereOne'>Don't have an account?</p>
        <p id='signupHereTwo' onClick={navigateToSignup}>Sign up here</p>
        </div>
      </React.Fragment>
    );
}

export default Login;