import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemperaments} from "../actions";
import style from "./styles/Home.module.css";

function validate(input) {
  let errors = {};

  if (!input.name) {
    errors.name = "Name needed";
  } else if (!input.image) {
    errors.image = "image needed";
  } else if (!input.height_min) {
    errors.height_min = "min height needed ";
  } else if (!input.height_max) {
    errors.height_max = "max height needed";
  } else if (!input.weight_min) {
    errors.weight_min = "min weight needed ";
  } else if (!input.weight_max) {
    errors.weight_max = "max weight needed";
  } else if (!input.life_span_min) {
    errors.life_span_min = "min life span needed ";
  } else if (!input.life_span_max) {
    errors.life_span_max = "max life span needed";
  } 
  if (parseInt(input.height_min) > parseInt(input.height_max)){
    errors.height_min = 'height min must be lower than height max'
    errors.height_max = 'height min must be lower than height max'
  }
  if (parseInt(input.weight_min) > parseInt(input.weight_max)){
    errors.weight_min = 'weight min must be lower than weight max'
    errors.weight_max = 'weight min must be lower than weight max'
  }
  if (parseInt(input.life_span_min) > parseInt(input.life_span_max)){
    errors.life_span_min = 'life span min must be lower than life span max'
    errors.life_span_max = 'life span min must be lower than life span max'
  }
  
  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
 

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    e.preventDefault();
    if (
      !input.temperaments.includes(e.target.value) &&
      e.target.value !== "Choose temperaments" 
    )
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    const alerts = validate(input);
    if (Object.values(alerts).length !== 0) {
      alert("Please fix errors given");
    } else {

      dispatch(postDog(input));
      alert("New Breed Created");
      setInput({
        name: "",
        image: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span_min: "",
        life_span_max: "",
        temperaments: [],
      });
    }
  }
function handleDel(e){
  setInput({
    ...input,
    temperaments: input.temperaments.filter(c=> c !== e  )
})
}

 

  return (
    <div className={style.containerC}>
      <h1> Add a new Breed !</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <h5 className='error'>{errors.name}</h5>}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <h5 className="error">{errors.image}</h5>}
        </div>
        <div>
          <label>Min. Height (cm)</label>
          <input
            type="number"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_min && <h5 className="error">{errors.height_min}</h5>}
        </div>
        <div>
          <label>Max. Height (cm):</label>
          <input
            type="number"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_max && <h5 className="error">{errors.height_max}</h5>}
        </div>
        <div>
          <label>Min. Weight (kg):</label>
          <input
            type="number"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_min && <h5 className="error">{errors.weight_min}</h5>}
        </div>
        <div>
          <label>Max. Weight (kg):</label>
          <input
            type="number"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_max && <h5 className="error">{errors.weight_max}</h5>}
        </div>
        <div>
          <label>Life Span Min(years)</label>
          <input
            type="number"
            value={input.life_span_min}
            name="life_span_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span_min && (
            <h5 className="error">{errors.life_span_min}</h5>
          )}
        </div>
        <div>
          <label>Life Span Max(years)</label>
          <input
            type="number"
            value={input.life_span_max}
            name="life_span_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span_max && (
            <h5 className="error">{errors.life_span_max}</h5>
          )}
        </div>
        <div>
          <label>Temperaments:</label>
          <select onChange={(e) => handleSelect(e)}>
            <option value="temperaments">Choose Temperaments</option>

            {temperaments.length > 0 ? (
              temperaments.map((temps) => {
                return (
                  <option key={temps.id} value={temps.name}>
                    {temps.name}
                  </option>
                );
              })
            ) : (
              <option>Loading...</option>
            )}
          </select>
          <h5 className="chosen">Selected Temperaments: {input.temperaments.map((e) => e + " ")}</h5>
          {
            input.temperaments.map(e => <p onClick={() => handleDel(e)}><button >x</button></p>)
          }
          
          

          <button style={{ textDecoration: "none" }} type="submit">
            Create Breed
          </button>
        </div>
      </form>
      <Link to="/home">
        <button>Back</button>
      </Link>
    </div>
  );
}
