import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import userContext from '../context/users/UserContext';
import { AddNote } from './AddNote';
import { Navbar } from './Navbar';
import { Note } from './Note'
import { getCookie } from '../helpers/auth';
import {toast, ToastContainer} from 'react-toastify'

export const Home = () => {

    const context = useContext(noteContext)
    const uContext = useContext(userContext)
    const { notes, getNotes, editNote } = context;
    const { getUser } = uContext;
    const [note, setNote] = useState({
        etitle: "",
        edescription: "",
        etag: "",
        id: ""
    });
    const authToken = getCookie('token');

    const ref = useRef(null);
    const refClose = useRef(null);
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        // e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        toast.success("Note updated")
        refClose.current.click();

    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            etitle: currentNote.title,
            etag: currentNote.tag,
            edescription: currentNote.description,
            id: currentNote._id
        });
    }


    useEffect(() => {
        getNotes();
        getUser(authToken);
    }, [])


    return (
        <>
            <Navbar/>
            <ToastContainer/>
            <div className='bg-light min-vh-100 pt-5'>
                <AddNote />
                <button type="button" ref={ref} className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade mt-5" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content form-container">
                            <form action="">
                                <input className="note-title" type="text" name="etitle" id="etitle" placeholder='Title (min 3 charaters)' value={note.etitle} minLength={3} required onChange={onChange} />
                                <input className="note-title" type="text" name="etag" id="etag" placeholder='Tag' value={note.etag} onChange={onChange} />
                                <textarea className="note-content" name="edescription" id="edescription" placeholder='Take a note (min 5 charaters)' rows="4" minLength={5} required value={note.edescription} onChange={onChange}></textarea>

                            </form>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} className='add-button btn' onClick={handleClick}><i className="fas fa-edit"></i></button>
                            <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>





                <div className='container'>
                    <div className="container pt-5 mt-5">
                        <h3>
                            {notes.length === 0 && 'No Notes to display'}
                        </h3>
                    </div>
                    <div className="row">
                        {
                            notes.map((notee) => (
                                <div className="col col-md-3 col-sm-12 col-12 p-3" key={notee._id}>
                                    <Note note={notee} updateNote={updateNote} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
