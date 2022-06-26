const { Router } = require("express");
const server = require("../app");
const { Dogs, Temperaments } = require("../db");
const {
  getAllDogs,
  getDbDogs,
  getApiDogs,
} = require("../controllers/dogsControllers");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  let allDogsInfo = await getAllDogs();
  let allDogs = allDogsInfo.map((dog) => {
    return {
      name: dog.name,
      image: dog.image,
      weight: dog.weight,
      temperaments: dog.temperaments,
    };
  });
  if (name) {
    let search = await allDogs.filter((dog) =>
      dog.name.toLowerCase().includes(name.toLowerCase())
    );
    search.length
      ? res.status(200).send(search)
      : res.status(400).send(`No Breeds including ${name}`);
  } else {
    res.status(200).send(allDogs);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let dogsFromDb = [];
    if (id >= 265) {
      dogsFromDb = await Dogs.findAll({
        where: { id: id },
        include: Temperaments,
      });
    }
    if (dogsFromDb.length) {
      res.send(dogsFromDb);
    } else {
      const dogsFromApi = await getApiDogs();
      let found = dogsFromApi.filter((dog) => dog.id == id);
      if (found) {
        res.status(200).send(found);
      } else {
        res.send(`could not find any dog with id ${id}`);
      }
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, height, weight, life_span, temperament, image } = req.body;
    const newDog = await Dogs.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    newDog.addTemperaments(temperament);
    res.status(201).json(newDog);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
