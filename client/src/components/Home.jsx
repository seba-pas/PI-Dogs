import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../actions";
import Cards from './Cards'
import styles from './styles/Home.module.css'

export default function Home() {
  // guardo los hooks en las constantes
  const dispatch = useDispatch();
  

  //dispatch en el componentDidMount
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  //funcion para volver a cargar los perros (salir de los filtros, etc)
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  // render del componente
  return (
    <div>
      
      <h1 className={styles.title}>DogsApp</h1>
      {/* <button onClick={(e) => handleClick(e)}>Volver a cargar perros</button>
      <div>
        <select>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option value="all">Todos</option>
          <option value="api">Existente</option>
          <option value="created">Creado por nosotros</option>
        </select>
      </div> */}
      
      <Cards />
    </div>
  );
}
