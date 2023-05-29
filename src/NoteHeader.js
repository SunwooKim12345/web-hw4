import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState, useEffect } from 'react';
import { next_button, prev_button, plus_button, delete_note } from './NoteBody';
import { saveToLocalStorage, getFromLocalStorage } from './NoteBody';
import { Modal, open_modal } from './Modal';
import Profile from './profile.jpg';
import Square from './square-16.jpg';

const NoteHeader = () => {
	
	const [ profile, setProfile ] = useState( null );
	const [ isVisible, setIsvisible ] = useState( true );

    const makeVisible = () => {
        setIsvisible( !isVisible );
    }

	const profile_change = () => {
		if ( document.getElementsByClassName('img')[0].src !== 
		document.getElementsByClassName('img')[1].src
		) {
			setProfile( document.getElementsByClassName('img')[1].src );
		}
	}

	useEffect(() => {
		fetch("http://localhost:8080/users")
        .then((response) => response.json())
        .then((data) => {
			const userData = Array.from(Object.values(data.users));
            const stored_profile =  userData[0].image;

			if ( stored_profile !== null ) {
				setProfile( stored_profile );
			} else {
				setProfile( Square );
			}
		})
        .catch((error) => console.error("Error:", error));

	}, []);

	
	useEffect(() => {
		profile_change();
		document.getElementsByClassName('img')[0].src =
		document.getElementsByClassName('img')[1].src;
	}, []);


  	return (
	<>
		<div className="header grid-container full-screen">
			<div className="mn-item grid-container-01" id="mn-item-01">
				<div id="mn-img" className="mn-item v-align-left">
					<button data-modal-target="#modal" className="img-container" onClick={open_modal} type="button">
						<img className="img img-round" src={profile}></img>
					</button>
				</div>
				<div id="note-name" className="mn-item v-align-center" >My Notes</div>
				<div className="mn-item v-align-right">
					<button type="button" onClick={plus_button}><span className="fa fa-plus-circle"></span></button>
				</div>
			</div>
			<div id="mn-item-02"  className="mn-item v-align-left">
				<button type="button" onClick={prev_button}><span className="fa fa-circle-arrow-left"></span></button>
			</div>
			<div id="mn-item-03"  className="mn-item v-align-center">
				<button type="button" onClick={next_button}><span className="fa fa-circle-arrow-right"></span></button>
			</div>
			<div id="mn-item-04"  className="mn-item v-align-right">
				<button type="button" onClick={delete_note}><span className="fa fa-trash"></span></button>
			</div>
		</div>
		<Modal />

	</>


	
		
  	);
}

export default NoteHeader;
