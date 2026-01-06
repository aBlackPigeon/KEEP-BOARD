import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect } from 'react'
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note,setNotes}) => {

  const handleDelete = async(e,id) =>{
    e.preventDefault(); // get rid of default behaviour -> wrapped in link navigate -> detail page
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try{
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id)); // get rid of deleted note
      toast.success("Note deleted Successfully");
    }catch(error){
      console.log("Error in deleting note" , error);
      toast.error("Error in deleting note")
    }
  }

  return (
    <Link to={`/note/${note._id}`} 
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#F5C71A]">
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4"/>
              <button className="btn btn-ghost btn-xs text-error">
                <Trash2Icon className="size-4" onClick={(e) => handleDelete(e,note._id)}/>
              </button>
            </div>
          </div>
        </div>

      </Link>
  )
}

export default NoteCard
