import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, setDetails } from "../actions";
import { useEffect } from "react";
import styles from "./styles/Home.module.css";
import { SpinnerCircular } from 'spinners-react';

export default function DogDetail() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogDetails);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(setDetails);
    };
  }, [dispatch, id]);

  console.log(dogs)

  return (
    <div>
      {
        dogs.length > 0 ? <div className={styles.containerD}>
   
     
  
        <img
          className={styles.imagen}
          src={dogs[0].image}
          alt="no se encontro la imagen"
        />
        <h3 className={styles.name}>{dogs[0].name}</h3>
        <h4 className={styles.weight}>Weight: {dogs[0].weight}</h4>
        <h4 className={styles.weight}>height: {dogs[0].height}</h4>
        <h4 className={styles.weight}>life span: {dogs[0].life_span}</h4>
        <h4 className={styles.temperaments}>Temperaments: {dogs[0].temperaments}</h4>
        <Link style={{ textDecoration: 'none' }} to="/"><button> Volver</button> </Link>
  
      </div> : <div className={styles.spinner}><SpinnerCircular color='white' size="300px" />
      </div>
      }
      
      
    
    </div>
  );
}
