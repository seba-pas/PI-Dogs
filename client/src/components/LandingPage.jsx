import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "./styles/img/dog.png";

export default function LandingPage() {
  return (
    <div>
      <Link to="/home">
        
        <img
         className={styles.imagen}
          src={image}
          alt="sorry, could not find img"
        />

      </Link>
      
    </div>
  );
}
