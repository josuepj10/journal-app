import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";
import PublicNotePage from "../journal/pages/PublicNotePage";

export const AppRouter = () => {

  const status = useCheckAuth(); //<-- Se obtiene el estado de la autenticación

  if( status === 'checking' ) { //<-- Si el estado es 'checking' se muestra el componente CheckingAuth
    return <CheckingAuth/>
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
        ? <Route path="/*" element={ < JournalRoutes /> } /> //<-- Si el estado es 'authenticated' se muestra el componente JournalRoutes
        : <Route path="/auth/*" element={ < AuthRoutes /> } /> //<-- Si el estado es 'unauthenticated' se muestra el componente AuthRoutes
      }

       {/* Ruta para notas públicas */}
       <Route path="/public/:noteName" element={<PublicNotePage />} />

      <Route path="/*" element={ <Navigate to= '/auth/login' />} /> 
      
      {/* Login and registration */}
      {/* <Route path="/auth/*" element={ < AuthRoutes /> } /> */}

      {/* JournalApp */}
      {/* // <Route path="/*" element={ < JournalRoutes /> } /> */}

    </Routes>
  );
};

