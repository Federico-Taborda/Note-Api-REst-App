import NoteService from "../services/note.services.js";
import UserService from "../services/user.services.js";

class NoteController {
    static async getAllNotes(req, res) {
        try {
            const notes = await NoteService.getAllNotes();

            if(!Array.isArray(notes) || notes.length === 0) {
                return res.status(400).send({
                    success: false,
                    message: 'No notes found'
                });
            }

            return res.status(200).send({
                success: true,
                message: "Notes retrieved successfully",
                data: notes
            });

        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }

    static async getNoteById(req, res) {
        try {
            const noteId = req.params.noteId;

            if(!Number.isInteger(noteId)) {
                return res.status(404).send({
                    success: false,
                    message:  `Id must be a integer no negative`
                });
            }

            const note = await NoteService.getNoteById(noteId);
            
            if(!note) {
                return res.status(404).send({
                    success: false,
                    message:  `Note not found with id ${noteId}`
                });
            }

            res.status(200).send({
                success: true,
                message: 'Note retrieved successfully',
                data: note
            });
        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }

    static async getNoteByTitle(req, res) {
        try {
            const noteTitle = req.params.noteTitle;
            const note = await NoteService.getNoteByTitle(noteTitle);
            console.log(note)
            
            if(!note) {
                return res.status(404).send({
                    success: false,
                    message:  `Note not found with title ${noteTitle}`
                });
            }

            res.status(200).send({
                success: true,
                message: 'Note retrieved successfully',
                data: note
            });
        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }

    static async getNotesByCreator(req, res) {
        try {
            const creator = req.params.creator;

            const notes = await NoteService.getNotesByCreator(creator);
        
            if(!notes) {
                return res.status(404).send({
                    success: false,
                    message: 'Notes not found'
                });
            }

            res.status(200).send({
                success: true,
                message: 'Notes retrieved succesfully',
                data: notes
            });
        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }

    static async createNote(req, res) {
        try {
            const note = req.body;
            const newNote = await NoteService.createNote(note);

            if(!newNote) {
                return res.status(400).send({
                    "success": false,
                    "message": "Note has already been created"
                });
            }

            return res.status(201).send({
                "success": true,
                "message": "Note created successfully",
                "data": newNote
            });
        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }

    static async deleteNote(req, res) {
        try {
            const { requestUser, noteId } = req.body;
            console.log(requestUser, noteId)
            const user = await UserService.getUserByName(requestUser);

            if(!user) {
                res.status(404).send({
                    success: false,
                    message: `User with name ${requestUser} not found`
                });
            }

            if(user.role !== 'admin') {
                res.status(403).send({
                    success: false,
                    message: `You are not authorized to perform this operation`
                });
            }

           
            await NoteService.deleteNote(noteId);

            res.status(200).send({
                success: true,
                message: `Note deleted successfully`
            });
        } catch (error) {
            return res.status(error?.statusCode || 500).send({ message: error?.message || error });
        }
    }
}

export default NoteController;