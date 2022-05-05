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
import add from "../assests/img/add.png";
import close from "../assests/img/close.png";
import "./AddNotes.css";
// import { async } from "@firebase/util";

const AddNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [id, setId] = useState("");
  const [modal, setModal] = useState (false);

  useEffect(() => {
   const getNotes = async () => {
     try {
    const data = await getDocs(collection(db, "notes"), orderBy('date', 'desc'))
    const arrayData = data.docs.map(doc => ({id : doc.id, ...doc.data()}))
    console.log(arrayData);
    setNotes(arrayData)
    } catch (error) {
    console.log(error)
    }
    }
    getNotes()
    }, [])

// useEffect(() => {
// const getNotes = async () => {
// try {
// const data = await onSnapshot(collection(db, "notes"))
// const arrayData = data.docs.map(doc => ({id : doc.id, ...doc.data()}))
// console.log(arrayData);
// setNotes(arrayData)
// } catch (error) {
// console.log(error)
// }
// }
// getNotes()
// }, [])

  // useEffect(() => {
  //  const getData = query(collection(db, "notes"), orderBy("created", "desc"));
  //  onSnapshot(getData, (querySnapshot) => {
  //  setNotes(
  //    querySnapshot.notes.map((notes) => ({
  //     id: doc.id,
  //     data: doc.data(),
  //     }))
  //    );
  //  });
  // }, []);

  // React.useEffect(() => {
  //   const getNotes = async () => {
  //     try {
  //    const getData = query(collection(db, "notes"), orderBy("created", "desc"));
  //    onSnapshot(getData, (querySnapshot) => {
  //   const arrayData = querySnapshot.notes.map((notes) => ({
  //     id: doc.id,
  //     data: doc.data(),
  //     }))
  //    setNotes(
  //     arrayData
  //     //  querySnapshot.notes.map((notes) => ({
  //     //   id: doc.id,
  //     //   data: doc.data(),
  //     //   }))
  //      );
  //     });
  //   } catch (error){
  //   }
  //   }
  //   getNotes()
  //   }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) {
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

  // const activateEditing = (item) => {
  //   setEditNotes(true);
  //   setNewNote(item.Descripción);
  //   setTitle(item.Titulo);
  //   setId(item.id);
  // };

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
      alert ('nota editada');
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


  return (
    <React.Fragment>
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

      {!modal && (
        <form onSubmit={editNotes ? edit : addReminder}>
          <button id="btnAddNote"  onClick={toggleModal}>
          <img id="btnAdd" src={add}></img>
          </button>
        </form>
      )}

      <div className="globalContainerNotes">
        <div className="rowNotes">
          <div className="containerNotes">
            <ul className="listGroup">
              {notes.map((item) => (
                <li className="listGroupItem" key={item.id}>
                  {/* <div id="sectionNotes"> */}
                  {/* <div id="savingNotes"> */}
                  <h3>{item.Titulo}</h3>
                  <p>{item.Descripción}</p>
                  {/* </div> */}
                  {/* <div id="btnDeleteAndEdit"> */}
                  <button
                    className="btnDelete"
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </button>

                  {!modal && (
                    <form onSubmit={toggleModal}>
                      <button
                        className="btnEdit"
                        onClick={() => activateEditing(item)}
                      >
                        Edit
                      </button>
                    </form>
                  )}
                    {/* </div> */}
                  {/* </div> */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
  export default AddNotes;