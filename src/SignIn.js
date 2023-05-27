import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SignUp, open_signup } from './SignUp';

const SignIn = () => {

    return (

    <div>    
        <div className='note-start'>Notes</div>
        <div className='note-intro'>Organize all your thoughts in one place</div>
        <div>
            <div id="login-page" className='active'>
                <div id="modal-body">
                        <form>
                            <div className="modal-label">

                                <label htmlFor="email-log">Email</label><br />
                                <input type="text" id="email-log" ></input><br />

                                <label htmlFor="password">Password</label><br />
                                <input type="text" id="password" ></input><br /><br />

                                <input type="button" id="login" value="Log in"></input><br /><br />
                                
                                <hr></hr>

                            </div>

                            <div>
                                <input className="login-button v-align-center" type="button" value="Create New Account" onClick={open_signup}></input>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    </div>
    );         

}    

export default SignIn;
