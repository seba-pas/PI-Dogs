import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  orderByName,
  orderByWeight,
  getTemperaments,
  temperamentsFilter,
  createdFilter,
} from "../actions";
import Cards from "./Cards";
import styles from "./styles/Home.module.css";
import Paginado from "./Paginado";
import { SearchBar } from "./SearchBar";
import { SpinnerCircular } from "spinners-react";

import { Link } from "react-router-dom";

export default function Home() {
  // guardo los hooks en las constantes
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
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
  useEffect(() => {
    dispatch(getTemperaments());
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

  function handleFilterWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`orden ${e.target.value}`);
  }

  function handleFilterTemperaments(e) {
    e.preventDefault();
    dispatch(temperamentsFilter(e.target.value));
    setCurrentPage(1);
    setOrden(`orden ${e.target.value}`);
  }

  function handleCreatedFilter(e) {
    e.preventDefault();
    dispatch(createdFilter(e.target.value));
    setCurrentPage(1);
    setOrden(`Orden ${e.target.value}`);
  }

  // render del componente
  return (
    <div>
      <h1 className={styles.title}>DogsApp</h1>

      <div className={styles.selectors}>
        {/* alfabetic filter */}
        <select onChange={(e) => handleSorted(e)}>
          <option hidden selected>
            Alphabetic
          </option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>

        {/* weight Filter */}
        <select onChange={(e) => handleFilterWeight(e)}>
          <option hidden selected>
            Weight
          </option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select onChange={(e) => handleFilterTemperaments(e)}>
          {/* temperamentsFilter */}
          <option hidden selected>
            Temperaments
          </option>
          <option value="all">All</option>
          {temperaments &&
            temperaments.map((temps) => {
              return (
                <option key={temps.id} value={temps.name}>
                  {temps.name}
                </option>
              );
            })}
        </select>

        {/* existence filter */}
        <select onChange={(e) => handleCreatedFilter(e)}>
          <option hidden selected>
            Existence
          </option>
          <option value="all">All</option>
          <option value="api">from API</option>
          <option value="created">Created</option>
        </select>
      </div>

      <SearchBar />
      {currentDogs.length > 0 ? (
        <div>
          <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          />
          <div className={styles.cont}>
            <button className={styles.boton} onClick={(e) => handleClick(e)}>
              All Dogs
            </button>
            <Link to="/createdog">
              <button className={styles.boton}>Add a New Breed</button>
            </Link>
          </div>
          <Cards currentDogs={currentDogs} />
        </div>
      ) : (
        <div className={styles.spinner}>
          <SpinnerCircular color="white" size="300px" />
        </div>
      )}
    </div>
  );
}
