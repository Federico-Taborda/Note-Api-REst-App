import Note from "../models/noteModel.js";

class NoteService {
    static async getAllNotes() {
        try {
            return await Note.findAll({where: { visibility: 'public' }})
        } catch (error) {
            throw error;
        }
    }

    static async getNoteById(id) {
        try {
            return await Note.findOne({where: { id }});
        } catch (error) {
            throw error;
        }
    }

    static async getNoteByTitle(title) {
        try {
            return await Note.findOne({where: { title }});
        } catch (error) {
            throw error;
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

    static async deleteNote(noteId) {
        try {
            console.log(noteId)
            return await Note.destroy({ where: { id: noteId } });
        } catch (error) {
            throw error;
        }
    }
}

export default NoteService;