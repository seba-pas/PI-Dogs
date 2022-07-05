const { Router } = require("express");
const dogsRoutes = require("./dogsRoutes");
const temperamentsRoutes = require("./temperamentsRoutes");

const router = Router();

router.use("/temperaments", temperamentsRoutes);
router.use("/dogs", dogsRoutes);

module.exports = router;
