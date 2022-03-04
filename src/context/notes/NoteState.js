import { useState } from 'react';
import NoteContext from './NoteContext';
import axios from 'axios'

const NoteState = (props) => {
    const host = "http://localhost:5000/api/";
    const [notes, setNotes] = useState([]);

    //get all notes
    const getNotes = async() => {
        const response = await axios.get(host+"notes/fetchAllNotes", {
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MTRmZjc3ZThkYWUzNmY5NWNjMGMxIn0sImlhdCI6MTYzNTk0NjAwMn0.rIe3Q6LRJVCQf7tZcTtYLLjOp78O9Qhw2jvFTEr2B2E"
            }
        })
        setNotes(response.data.notes)
    }


    //add a note
    const addNote = async (note) => {
        await axios.post(host + "notes/addNote/", {
            "title" : note.title,
            "description" : note.description,
            "tag" : note.title
        }, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MTRmZjc3ZThkYWUzNmY5NWNjMGMxIn0sImlhdCI6MTYzNTk0NjAwMn0.rIe3Q6LRJVCQf7tZcTtYLLjOp78O9Qhw2jvFTEr2B2E"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MTRmZjc3ZThkYWUzNmY5NWNjMGMxIn0sImlhdCI6MTYzNTk0NjAwMn0.rIe3Q6LRJVCQf7tZcTtYLLjOp78O9Qhw2jvFTEr2B2E"
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4MTRmZjc3ZThkYWUzNmY5NWNjMGMxIn0sImlhdCI6MTYzNTk0NjAwMn0.rIe3Q6LRJVCQf7tZcTtYLLjOp78O9Qhw2jvFTEr2B2E"
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