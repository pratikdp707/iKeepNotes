import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import { ToastContainer, toast } from 'react-toastify'
export const AddNote = () => {
    const context = useContext(noteContext);
    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const {addNote} = context;

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(note)
        addNote(note)
        toast.success("Note Added")
        document.getElementById('title').value = "";
        document.getElementById('tag').value = "";
        document.getElementById('description').value = "";
    }

    return (
        <div className="form-container">
            <ToastContainer/>
            <form action="">
                <input className="note-title" type="text" name="title" id="title" placeholder='Title (min 3 characters)' minLength={3} required onChange={onChange} />
                <input className="note-title" type="text" name="tag" id="tag" placeholder='Tag'  onChange={onChange} />
                <textarea className="note-content" name="description" id="description" placeholder='Take a note  (min 5 characters)' minLength={5} required rows="4" onChange={onChange}></textarea>
                <button disabled={note.title.length <3 || note.description.length <5} className='add-button btn' onClick={handleClick}><i className="fas fa-plus"></i></button>
            </form>
        </div>
    )
}
