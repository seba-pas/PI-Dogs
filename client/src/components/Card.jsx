import React from "react";
import styles from "./styles/Card.module.css";
import { Link } from "react-router-dom";



export default function Card({ image, name, temperaments, weight, id }) {
  var temperX = "";

  if (Array.isArray(temperaments)) {
    if (temperaments[0].name) {
      var temp = temperaments.map((e) => e.name);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i + 1]) {
          temperX += temp[i] + ", ";
        } else {
          temperX += temp[i];
        }
      }
    } else {
      var temper = temperaments.map((e) => e);
      for (let i = 0; i < temper.length; i++) {
        if (temper[i + 1]) {
          temperX += temper[i] + ", ";
        } else {
          temperX += temper[i];
        }
      }
      //  console.log('temperX de creado => ',temperX);
    }
  } else {
    temperX = temperaments;
  }

  return (
    <div className={styles.container}>
      <Link style={{ textDecoration: "none" }} to={`/dogs/${id}`}>
        <img
          className={styles.imagen}
          src={image}
          alt="no se encontro la imagen"
        />
        <h3 className={styles.name}>{name}</h3>
        <h4 className={styles.weight}>Weight: {weight} Kg</h4>
        <h4 className={styles.temperaments}>Temperaments: {temperX}</h4>
      </Link>
    </div>
  );
}
