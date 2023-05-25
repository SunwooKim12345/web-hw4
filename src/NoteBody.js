import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Note from './Note';
import SearchPannel from './SearchPanelAndTextArea';
import Notes from './Notes';
import SearchPannelAndTextArea from './SearchPanelAndTextArea';
import { display_notes, handle_editText, add_selected, next_button, prev_button, plus_button, delete_note, 
    note_click, filterFunction, update_content, handleTextFunction } from './NoteBodyFunctions';


const NoteBody = () => {


    const note_sidebar = document.getElementsByClassName('text-container');
    const text_area = document.querySelector('.text-container-02');
    const text = document.querySelector('.edit-text-area');

    const [ noteList, setNoteList ] = useState([]);


    useEffect(() => {

        display_notes( );

    
    }, [note_sidebar]);

    useEffect(() => {

        add_selected();

        if(note_sidebar !== null ) {

            handle_editText();
            handleTextFunction();

        }

        
    }, []);

    useEffect(() => {

        handleTextFunction();
    }, [])

    useEffect(() => {

        filterFunction();

    
    }, [note_sidebar]);

    useEffect(() => {

       note_click();
    
    }, [noteList]);

    useEffect(() => {

        handleTextFunction();
    }, [text_area])

    


    return (
        <>
            <SearchPannelAndTextArea />
            <Notes />
        </>
        
    );
}



export { NoteBody, next_button, prev_button, plus_button, delete_note };
