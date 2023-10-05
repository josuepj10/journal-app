import { Box, Divider, Drawer, List, Toolbar, Typography, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";


export const SideBar = ({ drawerWidth }) => {

   const { displayName } = useSelector( state => state.auth );
   const { notes } = useSelector( state => state.journal ); //<--

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
          notes.map( note  => (           
            <SideBarItem key={ note.id } { ...note } /> //<-- llamamos al componente SideBarItem y le pasamos la nota
          ))
          }
        </List>
      </Drawer>
    </Box>
  );
};
