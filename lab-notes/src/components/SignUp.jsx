import React from 'react';
// import useHistory from "react-router-dom";
import { signUpWithGoogle, createUserWithEmail } from '../database/firebase';
import './SignUp.css';
import google from "../assests/img/google.png"
import logo from "../assests/img/logo.png"

// const styleInputUsername = {
// backgroundColor: '#C4C4C4'
// };

function SignUp (){
// const history = useHistory();

const signUpWithEmailAndPassword = () => {
  let username = document.getElementById('inputUsername').value;
  let email = document.getElementById('inputEmail').value;
  let password = document.getElementById('inputPassword').value;
createUserWithEmail(email, password, username).then((userCredential) => {
  if (userCredential) {
    alert ('creaste cuenta');
    // history.push('/notes')
  } 
});
}

    return(
        <React.Fragment>
        <h1 id='yourNotes'><img id='logo' src={logo}></img> {'\n'} Your notes</h1>
        <div id='slogan'>
        <p id='sloganPartOne'>If it's important for you,</p>
        <p id='sloganPartTwo'>it should be written on a post-it</p>
        </div>
        <br/>
        <div id='signupAndInputs'>
          <p id='signUp'>Sign up</p>
        <br/>
        <input type={'text'} placeholder='Username' className='inputSignUp' id='inputUsername'></input>
        <br/>
        <input type={'text'} placeholder='E-mail' className='inputSignUp' id='inputEmail'></input>
        <br/>
        <input type={'password'} placeholder='Password' className='inputSignUp' id='inputPassword'></input>
        <br/>
        <button type= 'submit' id='buttonContinue' onClick={signUpWithEmailAndPassword}>
            Continue
          </button>
          </div>
          <br/>
          <p id='or'>Or</p>
          <br/>
        <button type= 'submit' id='signUpGoogle' onClick={signUpWithGoogle}>
        <img id='logoGoogle' src={google}></img> {'\n'} Sign up with Google
          </button>
          <div id='loginHere'>
        <p id='loginHereOne'>Already have an account?</p>
        <p id='loginHereTwo'>Login here</p>
        </div>
      </React.Fragment>
    );
}

export default SignUp;