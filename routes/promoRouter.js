const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Promos = require("../models/promo");
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter
  .route("/")
  .options(cors.corswithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Promos.find({})
      .then(
        (promos) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(promos);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.create(req.body)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotions");
  })
  .delete(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

promoRouter
  .route("/:promoId")
  .options(cors.corswithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    Promos.findById(req.params.promoId)
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST method not supported on /promotions/" + req.params.promoId);
  })
  .put(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promo) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(promo);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = promoRouter;
