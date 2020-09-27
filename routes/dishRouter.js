const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all dishes back to u");
  })
  .post((req, res, next) => {
    res.end(
      "wild add the dish: " +
        req.body.name +
        "with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the dishes");
  });

dishRouter
  .route("/:dishId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send the dishe " + req.params.dishId + " back to u");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST method not supported on /dishes/" + req.params.dishId);
  })
  .put((req, res, next) => {
    res.write("Updating the dish: " + req.params.dishId + "\n");
    res.end(
      "Will update the dish: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting the dishe: " + req.params.dishId);
  });
module.exports = dishRouter;
