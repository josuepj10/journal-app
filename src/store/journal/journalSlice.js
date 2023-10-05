import { createSlice } from "@reduxjs/toolkit";


export const journalSlice = createSlice({

    name: 'journal',
    initialState: {
        isSaving: false,         /* <-- Bandera booleana  que indica si esta salvando o no*/
        messageSaved: '',
        notes: [],              /* <-- Arreglo de notas */
        active: null,           /* <-- Nota activa */
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrl: []
        // },

    },
    reducers: {

        savingNewNote: (state) => {     /* <-- Establece el estado de salvado en true */     
            state.isSaving = true;    
        },  

        addNewEmptyNote: (state, action) => {  /* <-- Agrega una nueva entrada */

            state.notes.push( action.payload ); //<-- Agrega la nueva entrada al arreglo de notas
            state.isSaving = false;             //<-- Establece el estado de salvado en false
        },

        setActiveNote: (state, action) => {    /* <-- Establece la nota activa */
            state.active = action.payload;     
            state.messageSaved = '';
        },

        setNotes: (state, action) => {          /* <-- Establece las notas */                
            state.notes = action.payload;       
        },

        setSaving: (state) => {         /* <-- Establece el estado de salvado */

        state.isSaving = true;
        state.messageSaved = '';

        },

        updateNote: (state, action) => {    /* <-- Actualiza una nota */
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) { //<-- Si el id de la nota es igual al id de la nota que se esta actualizando, se retorna la nota actualizada
                    return action.payload;
                }
                return note;
            });

            state.messageSaved = `${ action.payload.title } actualizada correctamente.`;
        },

        clearNotesLogout: (state) => {      /* <-- Limpia las notas al hacer logout */
           state.isSaving = false;
           state.messageSaved = '';
           state.notes = [];
           state.active = null;
        },

        deleteNoteById: (state, action) => {    /* <-- Elimina una nota */
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload); //<-- Filtra las notas, y retorna todas las notas que no coincidan con el id de la nota que se esta eliminando
                           
        },

    }

});

export const {  /* <-- Exporta las acciones para poder utilizar los reducers */

    addNewEmptyNote,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    clearNotesLogout,


} = journalSlice.actions;