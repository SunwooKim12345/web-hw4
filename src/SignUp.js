import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const open_signup = () => {
    const modal = document.querySelector('#modal-signup');
    const overlay = document.querySelector('#overlay');

    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

const close_signup = ( event ) => {

    const modal = document.querySelector('#modal-signup');
    const overlay = document.querySelector('#overlay');

    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }


}

const SignUp = () => {

    return (

    <div>    
        <div>
            <div id="modal-signup">
                <div id="modal-header-log">
                    <div className="title">Sign up</div>
                    <div className="close-button">
                        <button onClick={close_signup}>&times;</button>
                    </div>
                </div>
                <div id="modal-body">
                        <form>
                            <div className="modal-label">
                                <label htmlFor="name-log">Name</label><br />
                                <input type="text" id="name-log"></input><br />

                                <label htmlFor="email-log">Email</label><br />
                                <input type="text" id="email-log" ></input><br />

                                <label htmlFor="password">Password</label><br />
                                <input type="text" id="password" ></input><br />

                            </div>
                            <br />
                            <div>
                                <input className="log-out v-align-center" type="button" value="Sign up"></input>
                            </div>                        
                        </form>
                </div>
            </div>
            <div id="overlay" onClick={close_signup}></div>
        </div>
    </div>
    );         

}    

export { SignUp , open_signup };
