import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import style from "./styles/Home.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name needed";
  }
  if (!input.image) {
    errors.name = "image needed";
  }
  if (!input.height_min) {
    errors.name = "min height needed";
  }
  if (!input.height_max) {
    errors.name = "max height needed";
  }
  if (!input.weight_min) {
    errors.name = "min weight needed";
  }
  if (!input.weight_max) {
    errors.name = "max weight needed";
  }
  if (!input.life_span_min) {
    errors.name = "min life span needed";
  }
  if (!input.life_span_max) {
    errors.name = "max life span needed";
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
    height: "",
    weight: "",
    life_span: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

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
        </div>
        <div>
          <label>Min. Height</label>
          <input
            type="text"
            value={input.height_min}
            name="height_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Max. Height</label>
          <input
            type="text"
            value={input.height_max}
            name="height_max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Min. Weight</label>
          <input
            type="text"
            value={input.weight_min}
            name="weight_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Max. Weight</label>
          <input
            type="text"
            value={input.weight_max}
            name="weight_max"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Life Span Min</label>
          <input
            type="text"
            value={input.life_span_min}
            name="life_span_min"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Life Span Max</label>
          <input
            type="text"
            value={input.life_span_max}
            name="life_span_max"
            onChange={(e) => handleChange(e)}
          />
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
          <h3>
            Temperaments Chosen: {input.temperaments.map((e) => e + ". ")}
          </h3>

          <button style={{ textDecoration: "none" }} type="submit">
            Create Breed
          </button>
        </div>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}
