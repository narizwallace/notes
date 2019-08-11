const uuid4 = require('uuid4');

let notes = [
    { id: '374add18-7182-4c8d-9994-9047e3110a99', text: 'First note.' }
];
const notesService = {};

notesService.addNote = (text) => {
    const newNote = {
        id: uuid4(),
        text: text 
    }
    notes.push({...newNote});    
    return newNote;
};

notesService.deleteNote = (id) => {
    let  removedNote = null;
    const index = notes.findIndex(n => n.id === id)
    if (index > -1) {
        removedNote = { ...notes.splice(index, 1) };
    }
    return removedNote;
};

notesService.editNote = (id, text) => {
    let editedNote = null;
    const index = notes.findIndex(n => n.id === id);
    if (index > -1) {
        notes[index].text = text;
        editedNote = { ...notes[index] };
    }    
    return editedNote;
};

notesService.getNoteByID = (id) => {
    let foundNote = null;
    const index = notes.findIndex(n => n.id === id); 
    if (index > -1) {
        foundNote = { ...notes[index] }
    }
    return foundNote
};

notesService.getNotes = () => {
    return [ ...notes ];
};

module.exports = notesService;