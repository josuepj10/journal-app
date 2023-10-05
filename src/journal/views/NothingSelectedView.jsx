import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
  return (

    <Grid  //<--Grid con el diseño y tema del fondo
    className="animate__animated animate__fadeIn animate__faster"
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: "primary.main", borderRadius: 3}}
  >

    <Grid item  xs={ 12 }  color="inherit">
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
    </Grid>
    <Grid item  xs={ 12 }  color="inherit">
        <Typography color="white" variant= 'h5'>Seleciona o crea una nota</Typography>
    </Grid>

  </Grid>

  )
}
