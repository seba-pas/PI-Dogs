import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "./styles/img/dog.png";

export default function LandingPage() {
  return (
    <div>
      <Link to="/home">
        
        <img
          style={{
            marginTop: "100px",
            display: "flex",
            marginLeft: "30%",
            height: "400px",
            width: "auto",
            filter: "drop-shadow(10px 10px 10px black)",
          }}
          src={image}
          alt="sorry, could not find img"
        />

      </Link>
        <div className={styles.div}><h3>Pet The Dog</h3></div>
    </div>
  );
}
