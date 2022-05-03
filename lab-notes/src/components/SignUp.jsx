import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../database/UserProvider";
import './SignUp.css';
import google from "../assests/img/google.png"
import logo from "../assests/img/logo.png"


function SignUp (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {createUser, loginGoogle} = useContext(UserContext);

  const handleSubmit = async(e) => {
  e.preventDefault();
  console.log(email, password);
  try{
    await createUser (email, password);
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
      console.log(error);
    }
    };

  const navigateToLogin = async(e) => {
    navigate('/');
  };

    return(
        <React.Fragment>
          {/* <h2>{
            user ? 'en línea' : 'offline'
}</h2> */}
        <h1 id='yourNotes'><img id='logo' src={logo}></img> {'\n'} Your notes</h1>
        <div id='slogan'>
        <p id='sloganPartOne'>If it's important for you,</p>
        <p id='sloganPartTwo'>it should be written on a post-it</p>
        </div>
        <br/>
        <form onSubmit={handleSubmit}>
        <div id='signupAndInputs'>
          <p id='signUp'>Sign up</p>
        <br/>
        {/* <input type={'text'} placeholder='Username' className='inputSignUp' id='inputUsername'></input> */}
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
          <p id='or'>Or</p>
          <br/>
        <button type= 'submit' id='signUpGoogle' onClick={signUpWithGoogle}>
        <img id='logoGoogle' src={google}></img> {'\n'} Sign up with Google
          </button>
          <div id='loginHere'>
        <p id='loginHereOne'>Already have an account?</p>
        <p id='loginHereTwo' onClick={navigateToLogin}>Login here</p>
        </div>
      </React.Fragment>
    );
}

export default SignUp;