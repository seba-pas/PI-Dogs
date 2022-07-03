import React from "react";
import Card from "./Card.jsx";
import styles from "./styles/Cards.module.css";

export default function Cards({ currentDogs }) {
  return (
    <div className={styles.tarjeta}>
      {currentDogs.map((el) => (
        <Card
          key={el.name}
          name={el.name}
          weight={el.weight}
          temperaments={el.temperaments}
          image={el.image}
          id={el.id}
        />
      ))}
    </div>
  );
}
