import React from "react";
import styles from "./styles/Card.module.css";
import { Link} from 'react-router-dom'


export default function Card({ image, name, temperaments, weight, id }) {
  return (
    <div className={styles.container}>
      <Link style={{ textDecoration: 'none' }} to={`/dogs/${id}`}>
        <img
          className={styles.imagen}
          src={image}
          alt="no se encontro la imagen"
        />
        <h3 className={styles.name}>{name}</h3>
        <h4 className={styles.weight}>Weight: {weight}</h4>
        <h4 className={styles.temperaments}>Temperaments: {temperaments}</h4>
      </Link>
    </div>
  );
}
