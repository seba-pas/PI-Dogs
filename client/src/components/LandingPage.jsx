import React from "react";
import { Link } from "react-router-dom";
import {styles} from './styles/LandingPage.module.css'
import image from "./styles/img/dog.png";

export default function LandingPage() {
  return (
    <div>
      <img src={image} alt="sorry, could not find img" />

      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
