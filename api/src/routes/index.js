const { Router } = require("express");
const dogsRoutes = require("./dogsRoutes");
const temperamentsRoutes = require("./temperamentsRoutes");

const router = Router();

router.use("/dogs", dogsRoutes);
router.use("/temperaments", temperamentsRoutes);

module.exports = router;
