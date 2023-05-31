import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SignUp, open_signup } from './SignUp';
import { SignUpSm } from './SignUpSm';


const SignIn = ( {login} ) => {

    const [ isLoggedIn, setIsLoggedIn ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( false );
    const [ isMainVisible, setIsMainVisible ] = useState( true );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const makeVisible = () => {
        setIsVisible( !isVisible );
        setIsMainVisible( !isMainVisible );
    }
    

    return (
    !isLoggedIn && <div> 
        { isMainVisible && <div>
            <div className='note-start'>Notes</div>
            <div className='note-intro'>Organize all your thoughts in one place</div>
            <div>
                <div id="login-page" className='active'>
                    <div id="modal-body">
                            <form>
                                <div className="modal-label">

                                    <label htmlFor="email-log">Email</label><br />
                                    <input type="text" id="email-log" onChange={(event) => setEmail(event.target.value)}></input><br />

                                    <label htmlFor="password">Password</label><br />
                                    <input type="text" id="password" onChange={(event) => setPassword(event.target.value)}></input><br /><br />

                                    <input type="button" id="login" value="Log in" onClick={login}></input><br /><br />
                                    
                                    <hr></hr>

                                </div>

                                <div>
                                    <input className="login-button v-align-center" type="button" value="Create New Account" onClick={open_signup}></input>
                                    <input className="login-button-sm v-align-center" type="button" value="Create New Account" onClick={makeVisible}></input>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div> }
        {isVisible && <SignUpSm login={login} close_signup_sm={makeVisible} />}
    </div> 
    );         

}    

export default SignIn;
