import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import hashutil from "./hashutil.mjs";
import Cookies from 'js-cookie';


const SignUpSm = ( {close_signup_sm, login} ) => {

    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const sign_up = () => {
       
        const symbolAt = email.indexOf( "@" );
        console.log( "email" + email );
    
        const passwordHash = hashutil( email, password );
    
        if ( symbolAt == -1 
            || email.substring(0,symbolAt).length == 0 
            || password.length < 6 ) {
                if( symbolAt == -1 ) {
                    alert( "Put an @ symbol in email address.");
                } else if ( email.substring(0,symbolAt).length == 0 ) {
                    alert( "Ensure the email address has at least 1 character before an @ symbol.");
                } else {
                    alert( "Passwords should be a minimum of 6 characters.");
                }
        }
        else {
            axios.post("http://localhost:8080/users", {"name": name, "email": email, "password": passwordHash})
            .then( response => console.log( response.data ) ) 
            .catch( error => console.error( error ) );
            
            Cookies.set( 'user', email );
            login();
    
        }
    };

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
                                <input type="text" id="name-log" onChange={(event) => setName(event.target.value)}></input><br />

                                <label htmlFor="email-log">Email</label><br />
                                <input type="text" id="email-log" onChange={(event) => setEmail(event.target.value)} ></input><br />

                                <label htmlFor="password">Password</label><br />
                                <input type="text" id="password" onChange={(event) => setPassword(event.target.value)}></input><br />

                            </div>
                            <br />
                            <div>
                                <input className="log-out v-align-center" type="button" value="Sign up" onClick={sign_up}></input>
                            </div>                        
                        </form>
                </div>
            </div>
        </div>
    </div>
    );         

}    

export { SignUpSm };
