import React, { useState, useEffect } from "react";
import { db, auth } from "../database/firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import add from "../assests/img/add.png";
import close from "../assests/img/close.png";
import editImg from "../assests/img/editImg.png";
import deleteImg from "../assests/img/deleteImg.png";
import "./AddNotes.css";
 
const AddNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [id, setId] = useState("");
  const [modal, setModal] = useState (false);
  // const [uid, setUid] = useState("");
 
  useEffect(() => {
   const getNotes = async () => {
     try {
    // const data = await getDocs(collection(db, "notes"), orderBy('date', 'desc'))
    const q = query(collection(db, "notes"), where("uid", "==", window.user.uid));
    const data = await getDocs(q)
    const arrayData = data.docs.map(doc => ({id : doc.id, ...doc.data()}))
    const newArrayData = arrayData.sort((a, b) => new Date(a.date) - new Date(b.date));
     console.log(newArrayData);
    setNotes(newArrayData);
    } catch (error) {
    console.log(error);
    }
    }
    getNotes();
    }, [])
 
  const addReminder = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) {
      console.log("sin texto");
      return;
    }
    try {
      const userlogin = auth.currentUser;
      const uid = userlogin.uid;
      // setUid(uid);
      const data = await addDoc(collection(db, "notes"), {
        Titulo: title,
        Descripción: newNote,
        date: new Date(),
        uid: uid
      });
      setNotes([...notes, { uid, title, id: data.id, ...newNote  }]);
    } catch (error) {
      console.log(error);
    }
 
    console.log(newNote);
    console.log(title);
    window.location.reload();
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
    setModal(!modal)
  };
 
  const edit = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) {
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
      // alert ('nota editada');
    } catch (error){
      console.log(error);
    }
    //  window.location.reload();
  };
 
  const toggleModal = () => {
    setModal(!modal);
  };
 
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
 
  // const containsUser = id.includes(uid);
  // const containsUser = newNote.includes(uid);
 
 
  return (
    <React.Fragment>
      {!modal && (
        <form onSubmit={editNotes ? edit : addReminder}>
          <button id="btnAddNote"  onClick={toggleModal}>
          <img id="btnAdd" src={add}></img>
          </button>
        </form>
      )}
 
      {modal && (
        <section className="modal">
          <section className="overlay"></section>
          <section className="modal-content">
            <h2>{editNotes ? "Edit note" : "Add note"}</h2>
 
            <form onSubmit={editNotes ? edit : addReminder}>
              <button className="close-modal" onClick={toggleModal}>
              <img className="btnclose" src={close}></img>
              </button>
              <input
                type="text"
                className="inputTitle"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="inputNote"
                placeholder="Write your note"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button
                type="submit"
                className='btnEditOrAdd'
              >
                {editNotes ? "Edit note" : "Add note"}
              </button>
            </form>
          </section>
        </section>
      )}
 
{/* {containsUser && */}
      <div className="globalContainerNotes">
        <div className="rowNotes">
          <div className="containerNotes">
            <ul className="listGroup">
              {notes.map((item) => (
                <li className="listGroupItem" key={item.id}>
                  <section id="btnDeleteAndEdit">
                  <button
                    className="deleteAndEdit"
                    onClick={() => remove(item.id)}
                  >
                    <img className="imgDelete" src={deleteImg}></img>
                  </button>
 
                  {!modal && (
                    <form onSubmit={toggleModal}>
                      <button
                        className="deleteAndEdit"
                        onClick={() => activateEditing(item)}
                      >
                        <img className="imgEdit" src={editImg}></img>
                      </button>
                    </form>
                  )}
                  </section>
 
                  <h3>{item.Titulo}</h3>
                  <p id="h3Note">{item.Descripción}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
        {/* } */}
    </React.Fragment>
  );
};
  export default AddNotes;
