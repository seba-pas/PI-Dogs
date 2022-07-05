const { Router } = require("express");
const { Temperament, Dog } = require("../db");
const { getApiDogs } = require("../controllers/dogsControllers");

const router = Router();

router.get("/", async (req, res) => {
  let allDogs = await getApiDogs();
  //arreglo dentro de arreglos
  let allTemperamentsArr = await allDogs.map((dog) =>
    dog.temperaments.split(",")
  );
  //recorrer multidimensional
  let temperamentsRepeated = allTemperamentsArr.map((e) => {
    for (let i = 0; i < e.length; i++) {
      return e[i];
    }
  });

  //armar un set para palabras repetidas
  let tempsSet = new Set(temperamentsRepeated);

  //un array del set para poder trabajarlo
  let finalArr = [];
  tempsSet.forEach((e) => finalArr.push(e));
  finalArr.sort();

  // sincronizar con base de datos
  finalArr.forEach((temp) => {
    Temperament.findOrCreate({
      where: { name: temp },
    });
  });
  //todos los temperamentos
  const totalTemperaments = await Temperament.findAll( {
    attributes: ["id", "name"],
    include: Dog,
  }
);
 
  res.send(totalTemperaments);

// const temp = await Temperament.findAll();
// res.send(temp)
});


module.exports = router;
