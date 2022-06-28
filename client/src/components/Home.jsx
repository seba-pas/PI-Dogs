import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, orderByName, orderByWeight } from "../actions";
import Cards from "./Cards";
import styles from "./styles/Home.module.css";
import Paginado from "./Paginado";

export default function Home() {
  // guardo los hooks en las constantes
  const allDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const [orden, setOrden] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);

  //creo constantes para el paginado
  const indexOfLastDog = dogsPerPage * currentPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  //seteo el estado con la constante numero de pagina
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //dispatch en el componentDidMount
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  //funcion para volver a cargar los perros (salir de los filtros, etc)
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1);
  }

  function handleSorted(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  function handleSortedW(e){
    e.preventDefault();
      dispatch(orderByWeight(e.target.value));
      setCurrentPage(1);
      setOrden(`orden ${e.target.value}`);
    
  }




  // render del componente
  return (
    <div>
      <h1 className={styles.title}>DogsApp</h1>

      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />

      <div className={styles.selectors}>
        <select onChange={(e) => handleSorted(e)}>
          <option>Alfabetico</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <button className={styles.boton} onClick={(e) => handleClick(e)}>
          Volver a cargar perros
        </button>
        <select onChange={(e) => handleSortedW(e)}>
          <option>Peso</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <select>
          <option>Existencia</option>
          <option value="all">Todos</option>
          <option value="api">Existente</option>
          <option value="created">Creado por nosotros</option>
        </select>
      </div>

      <Cards currentDogs={currentDogs} />
    </div>
  );
}
