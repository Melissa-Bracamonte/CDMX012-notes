import React, { useState, useEffect } from "react";
import { db } from "../database/firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";

const AddNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
  const getNotes = async () => {
    try {
   const data = await getDocs(collection(db, "notes"))
   const arrayData = data.docs.map(doc => ({id : doc.id, ...doc.data()}))
   console.log(arrayData);
   setNotes(arrayData)
   } catch (error) {
   console.log(error)
   }
   }
   getNotes()
   }, [])

  // React.useEffect(() => {
  //   const getData = query(collection(db, "notes"), orderBy("created", "desc"));
  //   onSnapshot(getData, (querySnapshot) => {
  //     setNotes(
  //       querySnapshot.notes.map((notes) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!newNote.trim() && !title.trim()) {
      console.log("sin texto");
      return;
    }
    try {
      const data = await addDoc(collection(db, "notes"), {
        Titulo: title,
        Descripción: newNote,
        date: new Date(),
      });
      setNotes([...notes, { title, id: data.id, ...newNote  }]);
    } catch (error) {
      console.log(error);
    }

    console.log(newNote);
    console.log(title);
  };

  const remove = async (id) => {
    try{
      await deleteDoc(doc(db, 'notes', id));
      const arrayFilter = notes.filter(item => item.id !== id);
      setNotes(arrayFilter)
      alert ('nota borrada');
    } catch (error) {
      console.log(error);
    }
  };

  const activateEditing = (item) => {
    setEditNotes(true);
    setNewNote(item.Descripción);
    setTitle(item.Titulo);
    setId(item.id);
  };

  const edit = async (e) => {
    e.preventDefault();
    if (!newNote.trim() && !title.trim()) {
      console.log("Vacio");
      return;
    }
    try{
      const updateNote = doc(db, 'notes', id);
      await updateDoc(updateNote, {
        Titulo: title,
        Descripción: newNote,
      });
      const editedArray = notes.map(item => (
        item.id == id ? {id: item.id, date: item.date, Titulo: title, Descripción: newNote} : item
        ))
      setNotes(editedArray)
      setEditNotes(false)
      setNewNote('')
      setTitle('')
      setId('')
      alert ('nota editada');
    } catch (error){
      console.log(error);
    }
  };

  return (
    <React.Fragment>
<div className="container mb-2">
    <div className="row">
    <div className="col-md-6">
      <h3>
        {
          editNotes ? 'Edit note' : 'Add note'
        }
      </h3>
            <form onSubmit={editNotes ? edit : addReminder}>
    <input 
        type="text" 
        className="form-control mb-2"
        placeholder='Ingrese titulo'
        value={title}
        onChange={e => setTitle(e.target.value)}
    />
    <input 
        type="text" 
        className="form-control mb-2"
        placeholder='Ingrese nota'
        value={newNote}
        onChange={e => setNewNote(e.target.value)}
    />
    <button 
        type='submit'
        className= 
        {
          editNotes ? 'btn btn-warning btn-block btn-sm' : 'btn btn-dark btn-block btn-sm'
        }
    >
        {
          editNotes ? 'Edit note' : 'Add note'
        }
    </button>
</form>

        </div>
        <div className="col-md-6">
            <h3>Notas</h3>
            <ul className="list-group">
            {
                notes.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.Titulo}</span>
                  <span>{item.Descripción}</span>
                    <button 
                        className="btn btn-danger btn-sm float-right"
                        onClick={() => remove(item.id)}
                    >
                        Remove
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                        onClick={() => activateEditing(item)}
                    >
                        Edit
                    </button>
                </li>
                ))
            }
            </ul>
        </div>
    </div>
</div>
</React.Fragment>
  );
};

export default AddNotes;
