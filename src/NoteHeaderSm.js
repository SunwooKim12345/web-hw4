import '@fortawesome/fontawesome-free/css/all.min.css';
import Profile from './profile.jpg';
import React, { useState, useEffect } from 'react';
import Square from './square-16.jpg';
import { next_button, prev_button, plus_button, delete_note } from './NoteBody';
import Modal from './Modal';
import { saveToLocalStorage, getFromLocalStorage } from './NoteBody';


const open_modal = () => {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');
    
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
}

const close_modal = () => {
    const modal = document.querySelector('#modal');
    const overlay = document.querySelector('#overlay');

    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    
}

const NoteHeaderSm = () => {


    const [ profile, setProfile ] = useState( null );

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
        <div className="header grid-container-sm small-screen">
            <div id="mn-item-01"  className="mn-item grid-container-03 small-screen">
				<div id="mn-img" className="mn-item v-align-left">
					<button data-modal-target="#modal" className="img-container" onClick={open_modal} type="button">
						<img className="img img-round" src={profile}></img>
					</button>
				</div>
                <div className="mn-item v-align-center">
				    <button type="button" onClick={prev_button}><span className="fa fa-circle-arrow-left"></span></button>
                </div>
            </div>
            <div id="mn-item-02"  className="mn-item v-align-center small-screen">
                <button type="button" onClick={plus_button}><span className="fa fa-plus-circle"></span></button>
            </div>
            <div id="mn-item-03"  className="mn-item v-align-center small-screen">
                <button type="button" onClick={next_button}><span className="fa fa-circle-arrow-right"></span></button>
            </div>
            <div id="mn-item-04"  className="mn-item v-align-right small-screen">
                <button type="button" onClick={delete_note}><span className="fa fa-trash"></span></button>
            </div>
        </div>
    );
}

export default NoteHeaderSm