import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    let json = await axios.get("https://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function postDog() {
  return async function (dispatch) {
    let json = await axios.post("https://localhost:3001/dogs");
    return dispatch({
      type: "POST_DOG",
      payload: json.data,
    });
  };
}
