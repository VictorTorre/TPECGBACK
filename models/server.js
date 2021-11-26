const express = require("express");
const cors = require('cors')

require("dotenv").config();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.polarPath = '/';
    
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors())

    // Body read and parse
    this.app.use(express.json());

    //public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.polarPath, require('../routes/systemHearth'))
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
