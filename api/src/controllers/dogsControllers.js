const axios = require("axios");
const server = require("../app");
const { Dogs, Temperaments } = require("../db");
const YOUR_API_KEY = process.env;

//Los perros de la api
async function getApiDogs(req, res, next) {
  try {
    let dogsApi = (
      await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    ).data;
    let dogsApiInfo = dogsApi.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        height: dog.height.metric,
        weight: dog.weight.metric,
        life_span: dog.life_span,
        temperaments: dog.temperament
          ? dog.temperament
          : "No hay temperamentos asignados",
      };
    });
    return dogsApiInfo;
  } catch (error) {
    console.log("error in getApidogs", error);
  }
}

// los perros de la db
async function getDbDogs(req, res) {
  try {
    return await Dogs.findAll({
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });   
  } catch (error) {
    console.log("error in getApidogs", error);
  }
}

async function getAllDogs() {
  try {
    let dogsFromApi = await getApiDogs();
    let dogsFromDb = await getDbDogs();
    if (dogsFromDb[0]) {
      let allDogs = dogsFromApi.concat(dogsFromDb);
      return allDogs;
    } else {
      return dogsFromApi;
    }
  } catch (error) {
    console.log("error in getalldogs", error);
  }
}

module.exports = {
  getAllDogs,
  getDbDogs,
  getApiDogs,
};
