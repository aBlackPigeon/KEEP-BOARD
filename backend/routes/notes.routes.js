import express from 'express';
import { createNote, deleteNote, getAllNote, updateNote , getNoteById} from '../controller/notes.controller.js';

const notesRouter = express.Router();

notesRouter.get('/' , getAllNote);
notesRouter.get('/:id' , getNoteById);
notesRouter.post('/' , createNote);
notesRouter.put('/:id' , updateNote);
notesRouter.delete('/:id' , deleteNote);

export default notesRouter;