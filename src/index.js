import React from 'react';
import ReactDOM from 'react-dom/client';
import './note-app.css';
import NoteHeader from './NoteHeader';
import reportWebVitals from './reportWebVitals';
import NoteHeaderSm from './NoteHeaderSm';
import {NoteBody} from './NoteBody';
import Modal  from './Modal';
import SignIn from './SignIn';
import { SignUp } from './SignUp';
import { SignUpSm } from './SignUpSm';
import { useState } from 'react';

const App = () => {
  
  const [ isLoggedIn, setIsLoggedIn ] = useState( false );

  const makeLoggedIn = () => {
    setIsLoggedIn( !isLoggedIn );
  }

  return (
    <>
    { isLoggedIn && <NoteHeader /> }
    { isLoggedIn && <NoteHeaderSm /> }
    { isLoggedIn && <NoteBody /> }
    { !isLoggedIn && <SignIn login={makeLoggedIn}/> }
    <SignUp />
  </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
