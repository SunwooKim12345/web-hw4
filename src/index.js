import React from 'react';
import ReactDOM from 'react-dom/client';
import './note-app.css';
import NoteHeader from './NoteHeader';
import reportWebVitals from './reportWebVitals';
import NoteHeaderSm from './NoteHeaderSm';
import {NoteBody} from './NoteBody';
import Modal  from './Modal';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <NoteHeader />
    <NoteHeaderSm />
    <NoteBody />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
