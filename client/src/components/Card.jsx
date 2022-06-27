import React from 'react'
import styles from './styles/Card.module.css'


export default function Card ({image, name, temperaments, weight}) {
  return (
    <div className={styles.container}>
      <img className={styles.imagen} src={image} alt='no se encontro la imagen' />
      <h3 className={styles.name}>{name}</h3>
      <h4 className={styles.weight}>Weight: {weight}</h4>
      <h4 className={styles.temperaments}>Temperaments: {temperaments}</h4>
    </div>
  )
}
