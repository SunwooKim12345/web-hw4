import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SignUpSm = ( {close_signup_sm} ) => {

    return (

    <div>    
        <div>
            <div id="modal-signup-sm">
                <div id="modal-header-log">
                    <div className="title">Sign up</div>
                    <div className="close-button">
                        <button onClick={close_signup_sm}>&times;</button>
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
        </div>
    </div>
    );         

}    

export { SignUpSm };
