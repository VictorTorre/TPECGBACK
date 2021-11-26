const { Router } = require("express");
const {
    getDataWereable,
    getMobileResultLectures,
    getWebResultLectures,
    getWebResultAbnormality} = require("../controllers/systemHeart");

const router = new Router();

router.get("/mobile/result_lectures/:id", getMobileResultLectures);
router.get("/web/result_lectures/:id", getWebResultLectures);
router.get("/web/result_abnormality/:id", getWebResultAbnormality);
router.get("/:id", getDataWereable);

module.exports = router;
