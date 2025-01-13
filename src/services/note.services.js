import Note from "../models/noteModel.js";

class NoteService {
    static async getAllNotes() {
        try {
            const notes = await Note.findAll({where: { visibility: 'public' }});
            return notes;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getNoteById(id) {
        try {
            const note = await Note.findOne({where: { id }});
            return note;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getNoteByTitle(title) {
        try {
            const note = await Note.findOne({where: { title }});
            return note;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getNotesByCreator(creator) {
        try {
            const notes = await Note.findAll({where: { userId: creator }});
            return notes;
        } catch (error) {
            console.log(error.message);
        }
    }

    static async createNote(newNote) {
        try {
            const note = await Note.create(newNote);
            return note;
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                console.log('Error: Note has already been created.');
            }
        }
    }

    static async deleteNote(noteId) {
        try {
            return await Note.destroy({ where: { id: noteId } });
        } catch (error) {
            console.log(error.message);
        }
    }

    static async updateNote(noteId, filters) {
        try {
            return await Note.update(filters, { where: { id: noteId } });
        } catch (error) {
            console.log(error.message);
        }
    }

    static async getNotesByFilters(filters) {
        try {
            const notes =  await Note.findAll({where: filters});
            return notes;
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default NoteService;