const { Router } = require("express");
const getDataWereable = require("../controllers/systemHeart");

const router = new Router();

router.get("/", getDataWereable);

module.exports = router;
