import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ drawerWith = 280 }) => {


  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch( startLogout() );
  }

  return (
    <AppBar
      display="flex"
      sx={{ 
        width: { sm: `calc(100% - ${drawerWith}px)` }, 
        ml: { sm: `${drawerWith}px` },
    }}
    >
      <Toolbar>
        <IconButton
         color="inherit"
         edge="start"
         sx={{ mr: 2, display: { sm: "none" } }}
         >
          <MenuOutlined />
        </IconButton>

    <Grid container justifyContent='space-between' direction="row" alignItems="center">
        <Typography variant="h6" noWrap component="div">JornalApp </Typography>

        <IconButton 
        onClick={ onLogout }
        color="error">
            <LogoutOutlined />
        </IconButton>

        </Grid> 

      </Toolbar>
    </AppBar>
  );
};
