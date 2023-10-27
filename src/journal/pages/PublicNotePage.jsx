import React from 'react';
import { useParams } from 'react-router-dom';

const PublicNotePage = () => {
  const { noteName } = useParams();
  
  return (
    <div>
      <h1>Nota Pública: {noteName}</h1>
      {/* Agregar aquí el contenido de la nota */}
    </div>
  );
};

export default PublicNotePage;
