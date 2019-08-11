const { Router } = require('express');
const notesService = require('./notesService')

const router = Router();

router.get('/', (request, response, next) => {
    try {
        const notes = notesService.getNotes();
        response.json([...notes]);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', (request, response, next) => {
    try {
        const noteId = request.params.id;
        if (!noteId) throw new Error('Missing ID');

        const note = notesService.getNoteByID(noteId);
        if (!note) {
            response.status(404);
            response.send();
        }
        response.json({ ...note });        
    } catch (err) {
        next(err);
    }
});

router.post('/', (request, response, next) => {
    try {
        const noteText = request.body.text;
        if (!noteText) throw { code: 409, message: 'text is required'};

        const newNote = notesService.addNote(noteText);
        response.status(201);
        response.json({ ...newNote });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', (request, response, next) => {
    try {
        const noteId = request.params.id;
        if (!noteId) throw new Error('Missing ID');

        const noteText = request.body.text;
        if (!noteText) throw new Error('Missing Text');

        const newNote = notesService.editNote(noteId, noteText);
        if (!newNote) {
            response.status(404);
            response.send();
        }
        response.json({ ...newNote });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (request, response, next) => {
    try {
        const noteId = request.params.id;
        if (!noteId) throw new Error('Missing ID');
        
        const removedNote = notesService.deleteNote(noteId);
        if (!removedNote) {
            response.status(404);
            response.send();
        }

        response.status(200);
        response.send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;