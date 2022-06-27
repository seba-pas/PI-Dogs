import React from 'react';
import Card from './Card.jsx';
import styles from './styles/Cards.module.css';
import { useSelector} from 'react-redux'

export default function Cards() {
  // acá va tu código
  // tip, podés usar un map
  const allDogs = useSelector((state) => state.dogs);


  return ( <div className={styles.tarjeta}>  
  {
   allDogs && allDogs.map(el =>
    <Card
    key={el.name}
    name={el.name}
    weight={el.weight}
    temperaments={el.temperaments}
    image={el.image}    
       />   
    )
  }     
    </div> 
)
}

  
