import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth; //<-- Obtiene el uid del usuario, que viene del estado de auth


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)); //<-- Accede a la base de datos a la colección de notas del usuario
        const setDocResp = await setDoc(newDoc, newNote); //<-- setDoc es una función de firebase que permite agregar un nuevo documento a la colección / newDoc es el documento que se va a agregar / newNote es el contenido del documento
        // console.log( {newDoc, setDocResp } );
        newNote.id = newDoc.id; //<-- Agrega el id al objeto newNote

        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        //dispatch ( activarNote )
    }
}

export const startLoadingNotes = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes(uid); //<-- Invoca la funcion que se encarga de cargar las notas del usuario.
        dispatch(setNotes(notes)); //<-- Se dispara la accion que se encarga de establecer las notas en el estado de Redux.

    }

}

export const startSaveNote = (note) => {    

    return async (dispatch, getState) => {

        dispatch( setSaving() );

        const { uid } = getState().auth; //<-- Obtiene el uid del usuario, que viene del estado de auth
        const { active:note } = getState().journal; //<-- Obtiene la nota activa del estado de journal

        const noteToFirestore = { ...note }; //<-- Crea una copia del objeto note, para no modificar el id original

        delete noteToFirestore.id; //<-- Elimina la propiedad id del objeto noteToFirestore

        //console.log(noteToFirestore);

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`); //<-- Accede a la base de datos a la colección de notas del usuario

        await setDoc(docRef, noteToFirestore, { merge: true }); //<-- setDoc es una función de firebase que permite agregar un nuevo documento a la colección / noteToFirestore es el contenido del documento / { merge: true } permite que se agreguen solo las propiedades que se van a modificar y no se sobreescriba todo el documento.

        dispatch( updateNote (note) ); //<-- Actualiza la nota en el estado de Redux    
    }

}

export const startDeletingNote = (id) => { 

    return async( disptch, getState ) => {

        const { uid } = getState().auth; //<-- Obtiene el uid del usuario, que viene del estado de auth
        const { active:note } = getState().journal; //<-- Obtiene la nota activa del estado de journal
        // console.log({uid, note});

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${ note.id }`); //<-- Accede a la base de datos a la colección de notas del usuario
        await deleteDoc( docRef ); //<-- Elimina el documento de la base de datos
       
        disptch( deleteNoteById(note.id) );

    }

}
