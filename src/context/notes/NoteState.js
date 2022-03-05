import { useState } from 'react';
import NoteContext from './NoteContext';
import axios from 'axios'
import {getCookie, } from '../../helpers/auth'

const NoteState = (props) => {
    const host = "https://ikeepnotes.herokuapp.com/api/";
    const [notes, setNotes] = useState([]);
    const authToken = getCookie('token');
    //get all notes
    const getNotes = async() => {
        const response = await axios.get(host+"notes/fetchAllNotes", {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            }
        })

        console.log(response.data)
        setNotes(response.data.notes)
    }


    //add a note
    const addNote = async (note) => {
        await axios.post(host + "notes/addNote/", {
            "title" : note.title,
            "description" : note.description,
            "tag" : note.tag
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            }
        })
        getNotes();
        
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {

        // console.log("Hello");
        // console.log(id, title, description, tag);

        await axios.put(host + "notes/updateNote/" + id, {
            title,
            description,
            tag
        },{
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            }
        });
        getNotes();
    }

    //delete a note
    const deleteNote = async (id) => {
        // console.log(id);
        await axios.delete(host + "notes/deleteNote/" + id,{
            headers: {
                "Content-Type": "application/json",
                "auth-token": authToken
            }
        });
        getNotes()
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;