import NoteService from "../services/note.services.js";
import UserService from "../services/user.services.js";

// Utils
import filterParamsData from '../utils/filters.js';

class NoteController {
    static async getAllNotes(req, res) {
        try {
            const { page = 1, limit = 10} = req.query;
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
            const offset = (pageNumber - 1) * limitNumber;

            const notes = await NoteService.getAllNotes(limitNumber, offset);

            if(!notes) {
                return res.status(400).send({
                    "success": false,
                    "status": 400,
                    "message": 'Notes not found',
                    "detail": "No notes created yet"
                });
            }

            return res.status(200).send({
                "success": true,
                "status": 200,
                "message": "Notes retrieved successfully",
                "data": notes
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getNoteById(req, res) {
        try {
            const noteId = req.params.noteId;

            if(!Number.isInteger(noteId)) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": "Type id error",
                    "detail": "Id must be a integer no negative"
                });
            }

            const note = await NoteService.getNoteById(noteId);
            
            if(!note) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": "Note not found",
                    "detail": `Note not found with id ${noteId}`
                });
            }

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": 'Note retrieved successfully',
                "data": note
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getNoteByTitle(req, res) {
        try {
            const noteTitle = req.params.noteTitle;
            const note = await NoteService.getNoteByTitle(noteTitle);
            
            if(!note) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": "Note not found",
                    "detail": `Note not found with title ${noteTitle}`
                });
            }

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": 'Note retrieved successfully',
                "data": note
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getNotesByCreator(req, res) {
        try {
            const creator = req.params.creator;
            const notes = await NoteService.getNotesByCreator(creator);
        
            if(!notes) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": 'Notes not found',
                    "detail": `No notes finded by creator: ${creator}`
                });
            }

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": 'Notes retrieved succesfully',
                "data": notes
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async createNote(req, res) {
        try {
            const note = req.body;
            const newNote = await NoteService.createNote(note);

            if(!newNote) {
                return res.status(400).send({
                    "success": false,
                    "status": 404,
                    "message": "Creation failed",
                    "detail": "Note has already been created"
                });
            }

            return res.status(201).send({
                "success": true,
                "status": 201,
                "message": "Note created successfully",
                "data": newNote
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteNote(req, res) {
        try {
            const { requestUser, noteId } = req.body;
            const user = await UserService.getUserByName(requestUser);

            if(!user) {
                res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": "User not found",
                    "detail": `User with name ${requestUser} not found`
                });
            }

            if(user.role !== 'admin') {
                res.status(403).send({
                    "success": false,
                    "status": 403,
                    "message": "Unauthorized",
                    "detail": `You are not authorized to perform this operation`
                });
            }

            await NoteService.deleteNote(noteId);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": `Note deleted successfully`
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async updateNote(req, res) {
        try {
            const noteId = req.params.id;
            const note = await NoteService.getNoteById(noteId);

            if(!note) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": "Note not found",
                    "detail": `Note with id ${noteId} not found`
                });
            }

            const filters = filterParamsData(req, res);
            await NoteService.updateNote(noteId, filters);

            res.status(200).send({
                "success": true,
                "status": 200,
                "message": `Note updated`,
                "data": await NoteService.getNoteById(noteId)
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getNotesByFilter(req, res) {
        try {
            const filters = filterParamsData(req, res);
            filters.visibility = 'public';
            const notes = await NoteService.getNotesByFilters(filters);

            if(!notes) {
                return res.status(404).send({
                    "success": false,
                    "status": 404,
                    "message": `Notes not found`,
                    "detail": `No notes finded by filters: ${filters}`
                });
            }

            res.status(200).send({
                "success": true,
                "message": `Notes retrieved successfully`,
                "data": notes
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default NoteController;