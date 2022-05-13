import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "../database/firebase-config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import add from "../assests/img/add.png";
import close from "../assests/img/close.png";
import editImg from "../assests/img/editImg.png";
import deleteImg from "../assests/img/deleteImg.png";
import women from "../assests/img/women.png";
import "./AddNotes.css";
import { UserContext } from "../database/UserProvider";

const AddNotes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [editNotes, setEditNotes] = useState(false);
  const [id, setId] = useState("");
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [idDeletedNote, setIdDeletedNote] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const q = query(collection(db, "notes"), where("uid", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
          let arrayData = [];
          querySnapshot.docs.map((doc) => {
            arrayData.push({
              id: doc.id,
              ...doc.data(),
              date: new Date(doc.data().date.seconds * 1000),
            });
          });
          arrayData.sort((a, b) => b.date - a.date);
          setNotes(arrayData);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getNotes();
  }, []);

  const addReminder = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) {
      console.log("sin texto");
      return;
    }
    try {
      const userlogin = auth.currentUser;
      const uid = userlogin.uid;
      await addDoc(collection(db, "notes"), {
        Titulo: title,
        Descripción: newNote,
        date: new Date(),
        uid: uid,
      });
      setModal(!modal);
      setTitle("");
      setNewNote("");
    } catch (error) {
      console.log(error);
    }

    console.log(newNote);
    console.log(title);
  };

  const remove = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      const arrayFilter = notes.filter((item) => item.id !== id);
      setNotes(arrayFilter);
    } catch (error) {
      console.log(error);
    }
    toggleModalDelete();
  };

  const activateEditing = (item) => {
    setEditNotes(true);
    setNewNote(item.Descripción);
    setTitle(item.Titulo);
    setId(item.id);
    setModal(!modal);
  };

  const edit = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !title.trim()) {
      console.log("Vacio");
      return;
    }
    try {
      const updateNote = doc(db, "notes", id);
      await updateDoc(updateNote, {
        Titulo: title,
        Descripción: newNote,
      });
      const editedArray = notes.map((item) =>
        item.id == id
          ? {
              id: item.id,
              date: item.date,
              Titulo: title,
              Descripción: newNote,
            }
          : item
      );
      setNotes(editedArray);
      setEditNotes(false);
      setNewNote("");
      setTitle("");
      setId("");
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const deleteNote = (id) => {
    setIdDeletedNote(id);
    toggleModalDelete();
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (modalDelete) {
    document.body.classList.add("active-modal-delete");
  } else {
    document.body.classList.remove("active-modal-delete");
  }

  return (
    <React.Fragment>
      {/* {!modal && (
        <form onSubmit={editNotes ? edit : addReminder}>
          <button className="btnAddNote" onClick={toggleModal}>
            <img className="btnAdd" src={add}></img>
          </button>
        </form>
      )} */}

      {notes.length >= 1 && (
        <form onSubmit={editNotes ? edit : addReminder}>
          <button className="btnAddNote" onClick={toggleModal}>
            <img className="btnAdd" src={add}></img>
          </button>
        </form>
      )}

      {notes.length < 1 && (
        <section id="beforeNotes">
          <img className="imgWomen" src={women}></img>
          <p className="welcome">
            Los post-it son el lugar en el que guardas tus notas, ahí puedes
            escribir recordatorios, tus tareas del día y cualquier cosa que sea
            importante para ti.
          </p>
          <p className="welcome">
            ¡No te preocupes, nosotres guardamos tus notas!
          </p>
          <form onSubmit={addReminder}>
            <button id="btnFirstNote" onClick={toggleModal}>
              Create your first note
            </button>
          </form>
        </section>
      )}

      {modal && (
        <section className="modal">
          <section className="overlay"></section>
          <section className="modal-content">
            <h2 className="editOrAdd">
              {editNotes ? "Edit note" : "Add note"}
            </h2>
            <form
              id="modalForm"
              className="modalElements"
              onSubmit={editNotes ? edit : addReminder}
            >
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
                placeholder="Create a note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
              <button type="submit" className="btnEditOrAdd">
                {editNotes ? "Edit note" : "Add note"}
              </button>
            </form>
          </section>
        </section>
      )}

      <section className="containerNotes">
        <ul className="listGroup">
          {notes.map((item) => (
            <li className="listGroupItem" key={item.id}>
              <section id="btnDeleteAndEdit">
                <button
                  className="deleteAndEdit"
                  onClick={() => deleteNote(item.id)}
                >
                  <img className="imgDelete" src={deleteImg}></img>
                </button>
                {modalDelete && (
                  <section className="modalDelete">
                    <section className="overlayDelete"></section>
                    <section className="modal-content-delete">
                      <h2 className="deleteOrCancel">
                        Are you sure you want to delete this note?
                      </h2>
                      <section className="deleteAndCancel">
                        <button
                          className="deleteYes"
                          onClick={() => remove(idDeletedNote)}
                        >
                          Delete
                        </button>
                        <button
                          type="submit"
                          className="cancel"
                          onClick={toggleModalDelete}
                        >
                          Cancel
                        </button>
                      </section>
                    </section>
                  </section>
                )}
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
      </section>
    </React.Fragment>
  );
};
export default AddNotes;
