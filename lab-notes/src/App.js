// import './App.css';
import React from 'react';
import { SignUp } from './components/SignUp'

// function App() {
//   const nom="Melissa"
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//          {nom}
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <React.Fragment>
      <SignUp />
    </React.Fragment>
    );
}

export default App;
