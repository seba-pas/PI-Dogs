import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogBySearch } from "../actions";
import styles from "./styles/Home.module.css"


export const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e){
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getDogBySearch(name))
  }

  return (
    <div className={styles.searchbar}>
      <input 
      placeholder="Search..." 
      type='text'
      onChange={e => handleChange(e)}
      />
      <button className={styles.boton2} onClick={e=> handleSubmit(e)} type='submit'>Search</button>
    </div>
  );
};
