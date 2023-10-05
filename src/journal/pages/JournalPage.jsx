
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
export const JournalPage = () => {


  const dispatch = useDispatch ();
  const { isSaving, active } = useSelector( state => state.journal ); // <-- useSelector para obtener el estado de isSaving

  const onClickNewNote = () => {
    dispatch ( startNewNote () ); // <--dispatch de la acción startNewNote
  }

  return (

    <JournalLayout>

      {
        (!!active) //<-- !!active para convertir el valor en booleano
        ? <NoteView /> //<-- Si active es true, se muestra el componente NoteView
        : <NothingSelectedView /> //<-- Si active es false, se muestra el componente NothingSelectedView
      }



    <IconButton
    onClick={ onClickNewNote }
    size= 'large'
    disabled = { isSaving }
    sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9},
    position: 'fixed',
    right: 50,
    bottom: 50,
   }}
    >

      <AddOutlined sx= {{ fontSize: 30 }} />

    </IconButton>

    </JournalLayout>
  )
}
