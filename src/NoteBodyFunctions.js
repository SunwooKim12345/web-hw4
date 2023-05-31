import Note from './Note';
import { NoteBody } from './NoteBody';
import axios from 'axios';
import _ from 'lodash';
import Cookies from 'js-cookie';

const user = Cookies.get('user');

const display_notes = () => {

    const user = Cookies.get('user');
    console.log("user: ");
    console.log( user );

    fetch("http://localhost:8080/notes")
    .then((response) => response.json())
    .then((data) => {
        let notesArray = Array.from(Object.values(data.notes));
        notesArray = notesArray.filter( (data) => data.userEmail == user );
        notesArray.sort((a, b) => {
            return b.lastUpdatedDate.localeCompare(a.lastUpdatedDate);
        });


        const notes_div = document.querySelector('.notes');

        if ( notesArray !== null ) {
            notesArray.forEach( ( note ) => {
                const note_div = document.createElement('div');
                note_div.classList.add('text-container');
                note_div.innerHTML =  note.text + '<br>' + note.lastUpdatedDate + "<div class='note-id'>" + note.id + '</div>'; 
                notes_div.appendChild(note_div);
            });
    
        }


                })
    .catch((error) => console.error("Error:", error));
};

const filterTextContainers = (inputText) => {
    const textContainers = document.querySelectorAll(".text-container");
    let index = 0;

    if( textContainers !== null ) {
        textContainers.forEach((container) => {
        if (container.textContent.toLowerCase().includes(inputText.toLowerCase())) {
            container.style.display = "block";

            if (index === 0) {
                container.classList.add("selected");
                index++;
              } else {
                container.classList.remove("selected");
                index++;
              }
        } else {
            container.style.display = "none";
        }
        });
    }

};

const filterFunction = () => {
    document.querySelector(".text-box").addEventListener("input", (event) => {
        const inputText = event.target.value;
        filterTextContainers(inputText);
    });
};



const add_selected = () => {

    fetch("http://localhost:8080/notes")
    .then((response) => response.json())
    .then((data) => {
        let notesArray = Array.from(Object.values(data.notes));

        if ( notesArray !== null && notesArray.length !== 0 ) {
            const note_selected = 
                document.getElementsByClassName('text-container')[0].classList.add('selected');
        }
                })
    .catch((error) => console.error("Error:", error));
}

const handle_editText = () => {
    
    fetch("http://localhost:8080/notes")
    .then((response) => response.json())
    .then((data) => {

        let notesArray = Array.from(Object.values(data.notes));

        if( notesArray.length !== 0 ) {

            const notes = document.getElementsByClassName('text-container');
            const edit_text = document.querySelector('.edit-text-area');
            const note_element = document.createElement('textarea');
            note_element.classList.add('text-container-02');
            edit_text.appendChild( note_element );
            const note_elements = document.getElementsByClassName('text-container-02');

    
            for( let length = 0; length < notes.length; length++ ) {

                let background_color = window.getComputedStyle( notes[ length ] ).backgroundColor;
                    if ( background_color === 'rgb(229, 241, 253)' ) {
                        const text = notes[length].innerHTML;
                        const index = text.indexOf('<');
                        const split = text.slice( 0, index );
                        note_element.innerText = split;
                    }
            
            }
        }

        note_click();


    })
    .catch((error) => console.error("Error:", error));

}

const update = () => {
    let now = new Date();
    let update_time = now.getFullYear() 
                    + "/"
                    + (now.getMonth() + 1).toString().padStart(2, "0")
                    + "/"
                    + now.getDate().toString().padStart(2, "0")
                    + " : "
                    + now.getHours().toString().padStart(2, "0")
                    + ":"
                    + now.getMinutes().toString().padStart(2, "0")
                    + ":"
                    + now.getSeconds().toString().padStart(2, "0");

    return update_time;
}

const handleTextChange = _.debounce((value) => {
    update_content();
    console.log("Text has not been changed for 1 second. Current text: " + value);
}, 1000);

const handleTextFunction = () => {


    fetch("http://localhost:8080/notes")
    .then((response) => response.json())
    .then((data) => {

        
        const textarea = document.querySelector('.text-container-02');
    
        textarea.addEventListener('input', (event) => {
            handleTextChange(event.target.value);
        });


    })
    .catch((error) => console.error("Error:", error));
}


const next_button = () => {

    fetch("http://localhost:8080/notes")
    .then((response) => response.json())
    .then((data) => {

        let index = 0;
        const edit_text_element = document.getElementsByClassName( "edit-text-area" );
        const notes = document.getElementsByClassName('text-container');
        const edit_text = document.querySelector('.edit-text-area');
    
        for ( index = 0; index < notes.length; index++ ) {
            const background_color = window.getComputedStyle(notes[index]).backgroundColor;
            const note_element = document.getElementsByClassName('text-container-02')[0];
    
            if (background_color === 'rgb(229, 241, 253)') {
                                            
                    notes[index].classList.remove("selected");
                    index === notes.length-1 ? notes[0].classList.add("selected") : notes[index+1].classList.add("selected");
                    const text = index === notes.length-1 ? notes[0].innerHTML : notes[index+1].innerHTML;
                    const idx = text.indexOf('<');
                    const split = text.slice( 0, idx );
        
                    note_element.value = split;
        
        
                    break;
    
    
            }
        }
    })
    .catch((error) => console.error("Error:", error));



};

const prev_button = () => {

    let index = 0;
    const notes = document.getElementsByClassName('text-container');
    const edit_text = document.querySelector('.edit-text-area');
  
    for ( index = 0; index < notes.length; index++ ) {
        const background_color = window.getComputedStyle(notes[index]).backgroundColor;
        const note_element = document.getElementsByClassName('text-container-02')[0];

        if (background_color === 'rgb(229, 241, 253)') {

            notes[index].classList.remove("selected");
            index === 0 ? notes[notes.length-1].classList.add("selected") : notes[index-1].classList.add("selected");
            const text = index === 0 ? notes[notes.length-1].innerHTML : notes[index-1].innerHTML;
            const idx = text.indexOf('<');
            const split = text.slice( 0, idx );
            note_element.value = split;
            break;
        }
    }
};

const plus_button = () => {

    const edit_text = document.querySelector('.edit-text-area');
    const note_sidebar = document.getElementsByClassName('notes')[0];
    const update_time = update();
    const note_element =  document.getElementsByClassName('text-container-02')[0];
    const text_content = document.getElementsByClassName('text-box')[0];
    const textContainers = document.querySelectorAll(".text-container");

    textContainers.forEach((container) => {
        container.style.display = "block";
    });

    text_content.value = "";
    const newNote = new Note( 'New Note', update_time, user );

    axios.post("http://localhost:8080/notes", newNote )
    .then( response => {
        console.log( response.data ); 

        note_sidebar.innerHTML = '<div class="text-container">' 
        + newNote.text 
        + '<br>' 
        + newNote.lastUpdatedDate 
        +"<div class='note-id'>" + response.data.insertId + '</div>'
        +'</div>' 
        + note_sidebar.innerHTML;
    
        const notes = document.getElementsByClassName('text-container');
    
        for ( let index = 0; index < notes.length; index++ ) {
            const background_color = window.getComputedStyle(notes[index]).backgroundColor;
            const note_element = document.getElementsByClassName('text-container-02')[0];
    
            if (background_color === 'rgb(229, 241, 253)') {
    
    
                notes[index].classList.remove("selected");
                notes[0].classList.add("selected");
                const text = notes[0].innerHTML;
                const idx = text.indexOf('<');
                const split = text.slice( 0, idx );
                note_element.value = split;
                break;
            }
        }
    
    
        if ( notes.length === 1 ) {
    
            const new_text = document.createElement('textarea');
    
            notes[0].classList.add('selected');
            const text = notes[0].innerHTML;
            const idx = text.indexOf('<');
            const split = text.slice( 0, idx );
            new_text.value = split;
            new_text.classList.add('text-container-02');
            const edit_text_area = document.querySelector('.edit-text-area');
            edit_text_area.appendChild(new_text);
    
        }
    
        
        note_click();
        handleTextFunction();
        
    })
    .catch( error => console.error( error ) );


}

const delete_note = () => {
    let index = 0;
    const notes = document.getElementsByClassName('text-container');
    const edit_text = document.querySelector('.edit-text-area');
    let note_length = notes.length;

    for ( index = 0; index < notes.length; index++ ) {
        const background_color = window.getComputedStyle( notes[index] ).backgroundColor;
        const note_element = document.getElementsByClassName( 'text-container-02' )[0];

        if ( background_color === 'rgb(229, 241, 253)' ) {

            const innerHTML = notes[ index ].innerHTML;
            const start = innerHTML.indexOf('<div class="note-id">') + '<div class="note-id">'.length;
            const end = innerHTML.indexOf('</div>', start);
            const id = innerHTML.substring(start, end);

            if ( index === 0 ) {
                prev_button();
                notes[index].remove();

                
                axios.delete("http://localhost:8080/notes/" + user )
                .then( response => console.log( response.data ) )
                .catch( error => console.error( error ) );

                if ( notes.length === 0 ) {
                    note_element.remove();
                    break;
                }

                notes[notes.length-1].classList.remove("selected");
                notes[0].classList.add("selected");


            }
            else if ( index === notes.length -1 ){
                prev_button();
                notes[index].remove();

                axios.delete("http://localhost:8080/notes/" + id )
                .then( response => console.log( response.data ) )
                .catch( error => console.error( error ) );

                if ( notes.length === 0 ) {
                    note_element.remove();
                }
            }
            else {
                prev_button();
                notes[index].remove();

                axios.delete("http://localhost:8080/notes/" + id )
                .then( response => console.log( response.data ) )
                .catch( error => console.error( error ) );

                if ( notes.length === 0 ) {
                    note_element.remove();
                }
            }
            
        }
    }

    
    note_click();
}

const note_click = () => {
    const notes = document.getElementsByClassName('text-container');
    const note_element = document.getElementsByClassName('text-container-02')[0];

    if ( notes !== null ) {

        for( let index = 0; index < notes.length; index ++ ) {
            
    
                notes[ index ].addEventListener("click", () => {
                    for( let idx = 0; idx < notes.length; idx++ ) {
                        const background_color = window.getComputedStyle(notes[idx]).backgroundColor;
        
                        if (background_color === 'rgb(229, 241, 253)') {

                            if ( notes[index] != null ) {
                                notes[idx].classList.remove("selected");
                                notes[index].classList.add("selected");
                                const text = notes[index].innerHTML;
                                const jdx = text.indexOf('<');
                                const split = text.slice( 0, jdx );
                                note_element.value = split;
                            }
        
                        }
        
        
                        
                    }
        
        
                })
        }
    }

}

const update_content = () => {
    const note_element = document.querySelector('.text-container.selected');
    const innerHTML = note_element.innerHTML;
    const start = innerHTML.indexOf('<div class="note-id">') + '<div class="note-id">'.length;
    const end = innerHTML.indexOf('</div>', start);
    const id = innerHTML.substring(start, end);
    const notes = document.getElementsByClassName('text-container');
    console.log(id);
    if( note_element ) {
        const text_element = document.querySelector('.text-container-02');
        if( text_element ) {
            note_element.innerHTML = text_element.value + "<br>" + update() + 
                                        "<div class='note-id'>" + id + '</div>';
        }
        const new_data = new Note( text_element.value, update(), user );

        axios.put("http://localhost:8080/notes/" + user, new_data )
        .then( response => console.log( response.data ) )
        .catch( error => console.error( error ) );
    }

    for ( let idx = 0; idx < notes.length; idx++ ) {
        const background_color = window.getComputedStyle(notes[idx]).backgroundColor;
        
        if (background_color === 'rgb(229, 241, 253)') {
            const selected_note = notes[idx].innerHTML;
            notes[idx].classList.remove('selected');

            for( let jdx = idx; jdx > 0; jdx-- ) {
                notes[ jdx ].innerHTML = notes[ jdx-1 ].innerHTML;
            }

            notes[0].innerHTML = selected_note;
            notes[0].classList.add('selected');
        }
    }
 


};

export { display_notes, handle_editText, add_selected, next_button, prev_button, plus_button, delete_note, 
    note_click, filterFunction, update_content, handleTextFunction };
