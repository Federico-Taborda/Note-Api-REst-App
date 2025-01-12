import { Router } from "express";

import NoteController from "../../controllers/note.controllers.js";

// Validations
import { 
    noteUpdateValidationSchema, 
    noteCreationValidationSchema, 
    noteFilterValidationSchema 
} from "../../middlewares/noteValidations.js"
import handleValidation from "../../middlewares/validationHandler.js";

const noteRouter = Router();

// GET METHOD
noteRouter.get('/', NoteController.getAllNotes);

noteRouter.get('/id/:noteId', NoteController.getNoteById);

noteRouter.get('/title/:noteTitle', NoteController.getNoteByTitle);

noteRouter.get('/creator/:creator', NoteController.getNotesByCreator);

noteRouter.get('/filter', noteFilterValidationSchema, handleValidation, NoteController.getNotesByFilter);

// POST METHOD
noteRouter.post('/', noteCreationValidationSchema, handleValidation, NoteController.createNote);

// PATCH METHOD
noteRouter.patch('/:id', noteUpdateValidationSchema, handleValidation, NoteController.updateNote);

// DELETE METHOD
noteRouter.delete('/', NoteController.deleteNote);

export default noteRouter;