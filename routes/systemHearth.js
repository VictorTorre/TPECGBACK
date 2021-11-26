const { Router } = require("express");
const {
    getDataWereable,
    getResultLectures,
    getResultLecturesAnomality} = require("../controllers/systemHeart");

const router = new Router();

router.get("/web/result_lectures/:id", getResultLectures);
router.get("/web/result_abnormality/:id", getResultLecturesAnomality);
router.get("/:id", getDataWereable);

module.exports = router;
