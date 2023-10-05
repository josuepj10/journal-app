import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";


//SideBarItem se encarga de mostrar los items de la lista de notas

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {


    const dispatch = useDispatch(); //<-- dispatch para activar la nota

   const onClickNote = () => {  
    dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
   }
   
    const newTitle = useMemo(() => { //<-- useMemo se encarga de que el titulo no sea mayor a 17 caracteres
        return title.length > 17
        ? title.substring(0, 17) + "..."
        : title;
    }, [title]);

  return (
    <ListItem disablePadding>
    <ListItemButton onClick={ onClickNote }>
      <ListItemIcon>
        <TurnedInNot />
      </ListItemIcon>
      <Grid container>
        <ListItemText primary={ newTitle } />
        <ListItemText
          secondary={ body }
        />
      </Grid>
    </ListItemButton>
  </ListItem>
  );
};
