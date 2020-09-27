const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send all promotions back to u");
  })
  .post((req, res, next) => {
    res.end(
      "wild add the promotion: " +
        req.body.name +
        "with details: " +
        req.body.description
    );
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete((req, res, next) => {
    res.end("Deleting all the promotons");
  });

promoRouter
  .route("/:promoId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("content-Type", "text/plain");
    next();
  })
  .get((req, res, next) => {
    res.end("Will send the promotion " + req.params.promoId + " back to u");
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("POST method not supported on /promotions/" + req.params.promoId);
  })
  .put((req, res, next) => {
    res.write("Updating the promotion: " + req.params.promoId + "\n");
    res.end(
      "Will update the promotion: " +
        req.body.name +
        " with details: " +
        req.body.description
    );
  })
  .delete((req, res, next) => {
    res.end("Deleting  the promotion: " + req.params.promoId);
  });
module.exports = promoRouter;
