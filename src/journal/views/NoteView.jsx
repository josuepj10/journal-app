import { DeleteOutline, SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
// import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { setActiveNote, startDeletingNote, startSaveNote } from "../../store/journal"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {


  const dispatch = useDispatch(); //<-- useDispatch para despachar la accion de la nota activa

  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal ); //<-- useSelector para obtener la nota activa

  const { title, body, onInputChange, formState, date } = useForm( note ); //<-- useForm para obtener los valores de la nota activa


  const dateString = useMemo(() => {  //<-- useMemo para obtener la fecha de la nota activa
    const newDate = new Date( date );
    return newDate.toUTCString();
  }, [ note.date ]);

  useEffect(() => {   
    dispatch( setActiveNote(formState) )    
  }, [formState]);
  
  useEffect(() => {  //<-- useEffect para mostrar un mensaje de exito al guardar la nota    
    if( messageSaved.length > 0 ) {
      Swal.fire('Nota guardada', messageSaved, 'success');
    }
  }, [messageSaved])
  
  

  const onSaveNote = () => {  //<-- Funcion para guardar la nota activa
    dispatch( startSaveNote() ); 
  }

  const onDelete = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, ¡borrar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(startDeletingNote());
            Swal.fire(
                '¡Borrado!',
                'La nota ha sido eliminada.',
                'success'
            );
        }
    });
}


  return (
   
    <Grid container direction='row' justifyContent='space-between' sx={{mb:1}} className="animate__animated animate__fadeIn animate__faster">
    
    <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>
         { dateString }
        </Typography>
    </Grid>

    <Grid item>
    <Button
    disabled={ isSaving }
    onClick={ onSaveNote }
     color="primary" 
     sx={{ padding:2 }}
     >
    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
     Guadar
    </Button>
    </Grid>

    <Grid container>

     <TextField 
     type="text"
     variant="filled"
     fullWidth
     placeholder="Ingrese un titulo"
     label="Titulo"
     sx={{ mb: 1, border: 'none' }}
     name="title"
     value={ title }
     onChange={ onInputChange }
     />

     <TextField 
     type="text"
     variant="filled"
     fullWidth
     multiline
     placeholder="Que sucedio hoy?"
     minRows={ 5 }
     name="body"
    value={ body }
    onChange={ onInputChange }
     />
    </Grid>

    <Grid container justifyContent='end'>

    <Button
    onClick={ onDelete }
    sx={{ mt:2 }}
    color="error"
    >

    <DeleteOutline />
    Borrar

    </Button>

    </Grid>

    {/* Image gallery */}
    {/* <ImageGallery /> */}
    
    </Grid>


  )
}
