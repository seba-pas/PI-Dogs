const { Router } = require("express");
const server = require("../app");
const { Sequelize } = require("sequelize");
const { Dog, Temperament } = require("../db");
const { getAllDogs, getApiDogs } = require("../controllers/dogsControllers");

const router = Router();

router.get("/", async (req, res) => {
  const name = req.query.name;
  let allDogsInfo = await getAllDogs();
  let allDogs = allDogsInfo.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      image: dog.image,
      weight: dog.weight,
      temperaments: dog.temperament ? dog.temperament : dog.temperaments,
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
    if (id.length > 6) {
      dogsFromDb = await Dog.findAll({
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
    }
    console.log(dogsFromDb);
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
    const { name, height, weight, life_span, temperaments, image } = req.body;
    
    const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });

    let temperamentsDb = await Temperament.findAll({
      where: { name: temperaments.map((e) => e) },
    });
    console.log(temperaments);
    console.log(temperamentsDb);

    newDog.addTemperament(temperamentsDb);
    res.send("New breed Added!");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
