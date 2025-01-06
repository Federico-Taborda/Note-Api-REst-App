import Note from "../models/noteModel.js";

class NoteService {
    static async getAllNotes() {
        try {
            return await Note.findAll({where: { visibility: 'public' }})
        } catch (error) {
            
        }
    }

    static async getNoteById(noteId) {
        try {
            
        } catch (error) {
            
        }
    }

    static async createNote(newNote) {
        try {
            const note = await Note.create(newNote);
            return note
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log('Error: Note has already been created.');
            }
        }
    }
}

export default NoteService;