const { response } = require('express')

const getUsers = (req, res = response) => {
    res.json({
      msg: "get API - controller",
    });
  }
const updateUsers = (req, res = response) => {
    const id = req.params.id;
    res.json({
      msg: "put API - controller",
      id
    });
  }
const createUser = (req, res = response) => {
    const body = req.body;
    res.json({
      msg: "post API - controller",
      body
    });
  }
const deleteUser = (req, res = response) => {
    res.json({
      msg: "delete API - controller",
    });
  }
const patchUser = (req, res = response) => {
    res.json({
      msg: "patch API - controller",
    });
  }


  module.exports = {
      getUsers,
      updateUsers,
      createUser,
      deleteUser,
      patchUser
  }