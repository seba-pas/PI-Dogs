import React from "react";
import {Link} from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <h3>Welcome to DogsApp</h3>
      <Link to='/home'>
        <button>Ingresar</button>        
      </Link>
    </div>
  );
};

export default LandingPage;
