const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all leaders back to u");
  })
  .post((req, res, next) => {
    res.end(
      "wild add the leader: " +
        req.body.name +
        "with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /leaders");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the leaders");
  });

leaderRouter
  .route("/:leaderId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send the leader " + req.params.leaderId + " back to u");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST method not supported on /leaders/" + req.params.leaderId);
  })
  .put((req, res, next) => {
    res.write("Updating the leader: " + req.params.leaderId + "\n");
    res.end(
      "Will update the leader: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting  the leader: " + req.params.leaderId);
  });

module.exports = leaderRouter;
