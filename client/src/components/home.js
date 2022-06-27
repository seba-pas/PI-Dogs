import React from 'react'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs } from '../actions';



export default function Home () {


    const dispatch = useDispatch();
    conste allDogs =useSelector(state => state.dogs)



  return (
    <div>home</div>
  )
}
