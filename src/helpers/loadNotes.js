import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async( uid = '' ) => {  //<-- Funcion que se encarga de cargar las notas del usuario.

    if( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`) //<-- Obtiene la referencia a la coleccion de notas del usuario.
    const docs = await getDocs( collectionRef ); //<-- Obtiene los documentos de la coleccion de notas del usuario.

    const notes = []; //<-- Array que contendra las notas del usuario.
    docs.forEach(doc => { //<-- Recorre los documentos de la coleccion de notas del usuario.
        // console.log(doc.data());
        notes.push({  //<-- Agrega las notas al array.
            id: doc.id,  //<-- Obtiene el id del documento.
            ...doc.data() //<-- Obtiene los datos del documento.
        })
    }); 
    // console.log(notes);
    return notes;

}