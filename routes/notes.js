const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//ROUTE 1
//fetch all the notes using GET request ---- api/notes/fetchAllNotes
router.get('/fetchAllNotes', fetchuser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });
    res.json({success:true,notes});
})


//ROUTE 2
//Add a new note using POST request ---- api/notes/addNote
router.post('/addNote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        //If there are errors, return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({success:false, errors: errors.array() });
        }
        const { title, description, tag } = req.body;

        const note = await new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save();

        res.send(savedNote);
    } catch (error) {
        console.log(error);
        res.json({"success":false, error: "Some error occured"});
    }
})

//ROUTE 3
//Update an existing note using PUT request ---- api/notes/updateNote
router.put('/updateNote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

    const { title, description, tag } = req.body;

    //create a new note object
    try {
        const newNote = {
        }
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.json({success:false, error: "Note Not Found"});
        }
        if (note.user.toString() != req.user.id) {
            return res.json({success:false, error:"Access Declined"});
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({succes:true, note });
    } catch {
        console.log(error);
        res.send({success: false, error:"Some error occured"});
    }
})

//ROUTE 4
//Delete an existing note using DELETE request ---- api/notes/deleteNote
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    try {
        if (!note) {
            return res.json({success:false, error:"Note Not Found"});
        }
        if (note.user.toString() != req.user.id) {
            return res.json({success:false, error:"Access Declined"});
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success":true, msg: "note has been deleted" });
    } catch {
        console.log(error);
        res.json({succes:false, error:"Some error occured"});
    }

})

module.exports = router;