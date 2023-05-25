import { useState, useEffect, useRef } from 'react';
import Profile from './profile.jpg';
import Square from './square-16.jpg';
import axios from 'axios';

const open_modal = () => {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');

    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

const close_modal = ( event ) => {

    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');

    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }


}

const Modal = () => {

    const [ name, setName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ color, setColor ] = useState( 'light' );
    const [ profile, setProfile ] = useState( null );

    const file_input = useRef( null );

    const file_change = ( event ) => {
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = ( event ) => {
            axios.put("http://localhost:8080/users/1/image", {"image": event.target.result} )
            .then( response => console.log( response.data ) )
            .catch( error => console.error( error ) );      

            setProfile( event.target.result );
            document.getElementsByClassName( 'img' )[0].classList.remove( 'img-square' );
            document.getElementsByClassName( 'img' )[0].classList.add( 'img-round' );
            document.getElementsByClassName( 'img' )[1].classList.remove( 'img-square' );
            document.getElementsByClassName( 'img' )[1].classList.add( 'img-round' );
            document.getElementsByClassName('img')[0].src = event.target.result;
            document.getElementsByClassName('img')[1].src = event.target.result;
            document.getElementsByClassName('img')[2].src = event.target.result;

            console.log(event.target.result)
            

        };

        reader.readAsDataURL(file);
        
        


    }
    const file_select = (event) => {
        event.preventDefault();
        file_input.current.click();
    }

    const save_modal = () => {
        if (document.getElementById('name').value !== name) {
            setName(document.getElementById('name').value);
        }
        if (document.getElementById('email').value !== email) {
            setEmail(document.getElementById('email').value);
        }
        if (document.getElementById('color').value !== color) {
            setColor(document.getElementById('color').value);
        }

        axios.put("http://localhost:8080/users/1" , {"name": name, "email": email, "colorScheme" : color } )
        .then( response => console.log( response.data ) )
        .catch( error => console.error( error ) );
        
        const modal = document.querySelector('#modal');
        const overlay = document.querySelector('#overlay');
        
        if (modal && overlay) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }   
        const parent = document.getElementById('modal');
        const children = parent.querySelectorAll('*');


        if ( color == 'light' || color === null ) {
            parent.classList.add('light-mode');
            parent.classList.remove('dark-mode');
    
            children.forEach( child => {
                child.classList.add('light-mode-child');
                child.classList.remove('dark-mode-child');
    
            });
            
        } else {
            parent.classList.remove('light-mode');
            parent.classList.add('dark-mode');
            children.forEach( child => {
                child.classList.add('dark-mode-child');
                child.classList.remove('light-mode-child');
    
            });
        }
    }

    
    useEffect(() => {
    
        fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((data) => {
            const userData = Array.from(Object.values(data.users));
            console.log( userData[0].colorScheme );

            const stored_name = userData[0].name;
            const stored_email = userData[0].email;
            const stored_color = userData[0].colorScheme;
            const stored_profile = userData[0].image;
            
            if ( stored_name !== null ) { 
                setName(stored_name); 
            } else {
                setName('');
            }
        
            if ( stored_email !== null ) { 
                setEmail( stored_email ); 
            } else {
                setEmail('');
            }
        
            if ( stored_color !== null ) { 
                setColor( stored_color ); 
            } else {
                setColor('light');
            } 
        
            if ( stored_profile !== null ) {
                setProfile( stored_profile );
                document.getElementsByClassName('img')[0].classList.remove("img-square");
                document.getElementsByClassName('img')[0].classList.add("img-round");
                document.getElementsByClassName('img')[1].classList.remove("img-square");
                document.getElementsByClassName('img')[1].classList.add("img-round");
            } else {
                setProfile( Square );
                document.getElementsByClassName('img')[0].classList.add("img-square");
                document.getElementsByClassName('img')[0].classList.remove("img-round");
                document.getElementsByClassName('img')[1].classList.add("img-square");
                document.getElementsByClassName('img')[1].classList.remove("img-round");
            }
            const parent = document.getElementById('modal');
            const children = parent.querySelectorAll('*');

             if ( stored_color == 'light' || stored_color === null ) {
            parent.classList.add('light-mode');
            parent.classList.remove('dark-mode');
    
            children.forEach( child => {
                child.classList.add('light-mode-child');
                child.classList.remove('dark-mode-child');
    
            });
            
            } else {
                parent.classList.add('dark-mode');
                parent.classList.remove('light-mode');

                children.forEach( child => {
                    child.classList.add('dark-mode-child');
                    child.classList.remove('light-mode-child');
        
                });
            }


    
                    })
        .catch((error) => console.error("Error:", error));
                    
    }, []);


    return (

    <div>    
        <div>
            <div id="modal">
                <div id="modal-header">
                    <div className="title">Edit Profile</div>
                    <div className="close-button">
                        <button onClick={close_modal}>&times;</button>
                    </div>
                </div>
                <div id="modal-body">
                        <form>
                            <div className="grid-container-01">
                                <div className="profile-img"><img className="img img-round" src={profile} alt="profile"></img></div>
                                <div>
                                    <button id="add-img" onClick={file_select}>Add New Image</button>
                                    <input className="v-align-center" type="file" style={{ display: 'none' }} 
                                                            ref={file_input} onChange={file_change}/>
                                </div>
                                <div><input className="v-align-right" type="button" value="Remove Image"></input></div>
                            </div>
                            <br />

                            <div className="modal-label">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)}></input><br />

                                <label htmlFor="email">Email</label><br />
                                <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)}></input><br />

                                <label htmlFor="color">Color Scheme</label><br />
                                <select id="color" name="color"  value={color} onChange={(event) => setColor(event.target.value)}>
                                    <option value="light" selected>light</option>
                                    <option value="dark">dark</option>
                                </select>

                            </div>

                            <div className="grid-container-03">
                                <div id="save"><input className="save-button v-align-left" type="button" value="Save" onClick={save_modal}></input></div>
                                <div id="logout"><input className="v-align-right" type="button" value="Logout" onClick={close_modal}></input></div>
                            </div>
                        </form>
                </div>
            </div>
            <div id="overlay" onClick={close_modal}></div>
        </div>
    </div>
    );         

}    

export { Modal , open_modal };
