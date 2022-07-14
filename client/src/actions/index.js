import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    let json = await axios.get("/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    let json = await axios.get("/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`/dogs/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function setDetails() {
  return {
    type: "SET_DETAIL_DOGS",
  };
}

export function getDogBySearch(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`/dogs?name=${name}`);
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

// export function postDog(payload) {
//   return async function (dispatch) {
//     let response = await axios.post("http://localhost:3001/dogs", payload);
//     return {
//       type: "POST_DOG",
//       payload: response

//     };
//   };
// }

export function postDog(payload) {
  return async function (dispatch) {
    const post = {
      name: payload.name,
      height: `${payload.height_min} - ${payload.height_max}`,
      weight: `${payload.weight_min} - ${payload.weight_max}`,
      life_span: `${payload.life_span_min} - ${payload.life_span_max}`,
      image: payload.image,
      temperaments: payload.temperaments,
    };

    const created = await axios.post("/dogs", post);

    dispatch({
      type: "POST_DOG",
      payload: created.data,
    });
  };
}
