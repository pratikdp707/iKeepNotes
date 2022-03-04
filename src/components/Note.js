import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

export const Note = (props) => {


    // const [note, setNote] = useState({
    //     title: props.note.title,
    //     tag: props.note.tag,
    //     description: props.note.description
    // })

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;

    // const onChange = (e) => {
    //     setNote({ ...note, [e.target.name]: e.target.value })
    // }

    // const updateNote = (e) => {
    //     e.preventDefault();
    //     editNote(props.note._id, note.title, note.description, note.tag)
    //     // document.getElementById('exampleModal').hidden();
    // }

    return (
        <div className="note text-start">
            
            <h1>{note.title}</h1>
            <h3>{note.tag}</h3>
            <p>{note.description}</p>
            <button className='btn-delete btn btn-sm' onClick={() => { deleteNote(props.note._id) }}><i className="fas fa-trash-alt"></i></button>
            <button className='btn-delete btn btn-sm' onClick={() => {updateNote(note)}}><i className="fas fa-pencil-alt"></i></button>
        </div>
    )
}
