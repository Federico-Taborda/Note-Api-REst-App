import { Router } from "express";

import NoteController from "../../controllers/note.controllers.js";

import { noteUpdateValidationSchema, noteValidationSchema } from "../../middlewares/noteValidations.js"
import handleValidation from "../../middlewares/validationHandler.js";

const noteRouter = Router();

// GET METHOD
noteRouter.get('/', NoteController.getAllNotes);

noteRouter.get('/id/:noteId', NoteController.getNoteById);

noteRouter.get('/title/:noteTitle', NoteController.getNoteByTitle);

noteRouter.get('/creator/:creator', NoteController.getNotesByCreator);

// POST METHOD
noteRouter.post('/', noteValidationSchema, handleValidation, NoteController.createNote);

// PATCH METHOD
noteRouter.patch('/:id', noteUpdateValidationSchema, handleValidation, NoteController.updateNote);

// DELETE METHOD
noteRouter.delete('/', NoteController.deleteNote);

export default noteRouter;