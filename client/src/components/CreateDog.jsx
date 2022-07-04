import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";
import style from './styles/Home.module.css'

export default function CreateDog() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: '',
    image: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div className={style.containerC}>
      <h1> Add a new Breed !</h1>
      <form>
        <div>
          <label>Name</label>
          <input type="text" value={input.name} name="name" />
        </div>
        <div>
          <label>Image</label>
          <input type="text" value={input.image} name="image" />
        </div>
        <div>
          <label>Min. Height</label>
          <input type="text" value={input.height_min} name="height_min" />
        </div>
        <div>
          <label>Max. Height</label>
          <input type="text" value={input.height_max} name="height_max" />
        </div>
        <div>
          <label>Min. Weight</label>
          <input type="text" value={input.weight_min} name="weight_min" />
        </div>
        <div>
          <label>Max. Weight</label>
          <input type="text" value={input.weight_max} name="weight_max" />
        </div>
        <div>
          <label>Life Span Min</label>
          <input type="text" value={input.life_span_min} name="life_span_min" />
        </div>
        <div>
          <label>Life Span Max</label>
          <input type="text" value={input.life_span_max} name="life_span_max" />
        </div>
        <div>
          <label>Temperaments</label>
          <select>
            {temperaments.length > 0?
              temperaments.map((temps) => {
                return (
                  <option key={temps.id} value={temps.name}>
                    {temps.name}
                  </option>
                );
              }):<option>Loading...</option>}
          </select>
        </div>
      </form>
      <Link to="/">
        <button>Back</button>
      </Link>
    </div>
  );
}
