const { Router } = require("express");
const { getUsers, 
        updateUsers, 
        createUser, 
        deleteUser, 
        patchUser } = require("../controllers/users");

const router = new Router();

router.get("/", getUsers);

router.put("/:id", updateUsers);

router.post("/", createUser);

router.delete("/", deleteUser);

router.patch("/", patchUser);

module.exports = router;
