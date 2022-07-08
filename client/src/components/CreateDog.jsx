import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import style from "./styles/Home.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name needed";
  } else if (!input.image) {
    errors.name = "image needed";
  } else if (!input.height_min) {
    errors.name = "min height needed";
  } else if (!input.height_max) {
    errors.name = "max height needed";
  } else if (!input.weight_min) {
    errors.name = "min weight needed";
  } else if (!input.weight_max) {
    errors.name = "max weight needed";
  } else if (!input.life_span_min) {
    errors.name = "min life span needed";
  } else if (!input.life_span_max) {
    errors.name = "max life span needed";
  }
  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  let temperaments = useSelector((state) => state.temperaments);
  temperaments = temperaments.sort((a, b) => {
    return a.name - b.name;
  });
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    height: "",
    weight: "",
    life_span: "",
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
      alert("All fields must be completed");
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

  return (
    <div className={style.containerC}>
      <h1> Add a new Breed !</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
          {errors.image && <h4 className="error">{errors.image}</h4>}
        </div>
        <div>
          <label>Min. Height</label>
          <input
            type="text"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_min && <h4 className="error">{errors.height_min}</h4>}
        </div>
        <div>
          <label>Max. Height</label>
          <input
            type="text"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.height_max && <h4 className="error">{errors.height_max}</h4>}
        </div>
        <div>
          <label>Min. Weight</label>
          <input
            type="text"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_min && <h4 className="error">{errors.weight_min}</h4>}
        </div>
        <div>
          <label>Max. Weight</label>
          <input
            type="text"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight_max && <h4 className="error">{errors.weight_max}</h4>}
        </div>
        <div>
          <label>Life Span Min</label>
          <input
            type="text"
            value={input.life_span_min}
            name="life_span_min"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span_min && (
            <h4 className="error">{errors.life_span_min}</h4>
          )}
        </div>
        <div>
          <label>Life Span Max</label>
          <input
            type="text"
            value={input.life_span_max}
            name="life_span_max"
            onChange={(e) => handleChange(e)}
          />
          {errors.life_span_max && (
            <h4 className="error">{errors.life_span_max}</h4>
          )}
        </div>
        <div>
          <label>Temperaments</label>
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
          <h5 className="chosen">{input.temperaments.map((e) => e + " ")}</h5>
          {errors.name && <h5 style={{fontWeight: 'bold'}}>{errors.name}</h5>}

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
