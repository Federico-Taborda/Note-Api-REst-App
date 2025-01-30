import NoteService from '../services/note.services.js'
import UserService from '../services/user.services.js'

// Utils
import filterParamsData from '../utils/filters.js'
import { AppError, NotFoundError, UnauthorizedError } from '../utils/errors.js'

const sendResponse = (res, statusCode, clientMessage, data = null) => {
  res.status(statusCode).send({
    success: statusCode < 400,
    status: statusCode,
    message: clientMessage,
    data: data || ''
  })
}

class NoteController {
  static async getAllNotes (req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const pageNumber = parseInt(page, 10)
      const limitNumber = parseInt(limit, 10)
      const offset = (pageNumber - 1) * limitNumber

      const notes = await NoteService.getAllNotes(limitNumber, offset)

      if (!notes) {
        throw new NotFoundError('Notes not found', 'No notes created yet')
      }

      return sendResponse(res, 200, 'Notes retrieved successfully', notes)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getNoteById (req, res) {
    try {
      const noteId = req.params.noteId

      if (!Number.isInteger(noteId)) {
        return sendResponse(res, 404, 'Type id error', 'Id must be a integer no negative')
      }

      const note = await NoteService.getNoteById(noteId)

      if (!note) {
        throw new NotFoundError('Note not found', `Note not found with id ${noteId}`)
      }

      return sendResponse(res, 200, 'Note retrieved successfully', note)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getNoteByTitle (req, res) {
    try {
      const noteTitle = req.params.noteTitle
      const note = await NoteService.getNoteByTitle(noteTitle)

      if (!note) {
        throw new NotFoundError('Note not found', `Note not found with title ${noteTitle}`)
      }

      return sendResponse(res, 200, 'Note retrieved successfully', note)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getNotesByCreator (req, res) {
    try {
      const creator = req.params.creator
      const notes = await NoteService.getNotesByCreator(creator)

      if (!notes) {
        throw new NotFoundError('Note not found', `No notes finded by creator: ${creator}`)
      }

      return sendResponse(res, 200, 'Notes retrieved successfully', notes)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async createNote (req, res) {
    try {
      const note = req.body
      const newNote = await NoteService.createNote(note)

      if (!newNote) {
        return sendResponse(res, 400, 'Creation failed', 'Note has already been created')
      }

      return sendResponse(res, 201, 'Note created successfully', newNote)
    } catch (error) {
      console.log(error)
    }
  }

  static async deleteNote (req, res) {
    try {
      const { requestUser, noteId } = req.body
      const user = await UserService.getUserByName(requestUser)

      if (!user) {
        throw new NotFoundError('User not found', `No user finded with name ${requestUser}`)
      }

      if (user.role !== 'admin') {
        throw new UnauthorizedError('Unauthorized', 'You are not authorized to perform this operation')
      }

      await NoteService.deleteNote(noteId)

      return sendResponse(res, 200, 'Note deleted successfully')
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async updateNote (req, res) {
    try {
      const noteId = req.params.id
      const note = await NoteService.getNoteById(noteId)

      if (!note) {
        throw new NotFoundError('Note not found', `Note with id ${noteId} not found`)
      }

      const filters = filterParamsData(req, res)
      await NoteService.updateNote(noteId, filters)
      const updatedNote = await NoteService.getNoteById(noteId)

      return sendResponse(res, 200, 'Note updated successfully', updatedNote)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }

  static async getNotesByFilter (req, res) {
    try {
      const filters = filterParamsData(req, res)
      filters.visibility = 'public'
      const notes = await NoteService.getNotesByFilters(filters)

      if (!notes) {
        throw new NotFoundError('Notes not found', `No notes finded by filters: ${filters}`)
      }

      return sendResponse(res, 200, 'Notes retrieved successfully', notes)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).send(error.response)
      }

      console.log(error)
    }
  }
}

export default NoteController
