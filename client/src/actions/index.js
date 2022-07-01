import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function getDogBySearch(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const createdFilter = (payload) => {
  return {
    type: "CREATED_FILTER",
    payload,
  };
};

export const orderByName = (payload) => {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
};

export const temperamentsFilter = (payload) => {
  return {
    type: "TEMPERAMENTS_FILTER",
    payload,
  };
};

export function postDog(payload) {
  return async function (dispatch) {
    let response = await axios.post("http://localhost:3001/dogs", payload);
    return {
      type: "POST_DOG",
     
    };
  };
}
