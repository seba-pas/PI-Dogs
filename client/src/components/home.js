import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../actions";


export default function Home() {
  // guardo los hooks en las constantes
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);

  //dispatch en el componentDidMount
  useEffect(() => {
    dispatch(getDogs());
  }, []);

  //funcion para volver a cargar los perros (salir de los filtros, etc)
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  // render del componente
  return (
    <div>
      <link to="/dogs">Crear nueva raza</link>
      <h1>Bienevenido a perros</h1>
      <button onClick={(e) => handleClick(e)}>Volver a cargar perros</button>
    </div>
  );
}
