import { Router } from "express";

import NoteController from "../../controllers/note.controllers.js";

import noteValidationSchema from "../../middlewares/noteValidations.js";
import handleValidation from "../../middlewares/validationHandler.js";

const noteRouter = Router();

// GET METHOD
noteRouter.get('/', NoteController.getAllNotes);

noteRouter.get('/id/:noteId', NoteController.getNoteById);

noteRouter.get('/title/:noteTitle', NoteController.getNoteByTitle);

// POST METHOD
noteRouter.post('/', noteValidationSchema, handleValidation, NoteController.createNote);

// PATCH METHOD

// DELETE METHOD



export default noteRouter;