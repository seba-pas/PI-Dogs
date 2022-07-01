import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions";



export default function CreateDog() {
    const dispatch =  useDispatch();
    const temperaments = useSelector(state => state.temperaments)

    const [input, setInput] = useState({
    name:'',
 height_min: 0,
 height_max: 0,
 weight_min: 0,
 weight_max: 0,
 life_span: '',
 temperaments: []

    })


    

  return {};
}
