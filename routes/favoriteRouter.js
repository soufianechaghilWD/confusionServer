const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const Favorites = require("../models/favorite");
const cors = require("./cors");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

function notDuplicate(x, y) {
  for (let i = 0; i < y.length; i++) {
    if (!x.some((j) => j == y[i])) x.push(y[i]);
  }
  return x;
}

favoriteRouter
  .route("/")
  .options(cors.corswithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .populate(["dishes", "user"])
      .then(
        (favs) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(favs);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then((fav) => {
        if (fav === null) {
          var newFav = new Favorites({ user: req.user._id });
          newFav.dishes = req.body.dishesId;
          Favorites.create(newFav)
            .then(
              (fav) => {
                res.statusCode = 200;
                res.setHeader("content-Type", "application/json");
                res.json(fav);
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        } else {
          fav.dishes = notDuplicate(fav.dishes, req.body.dishesId);
          fav
            .save()
            .then(
              (fav) => {
                res.statusCode = 200;
                res.setHeader("content-Type", "application/json");
                res.json(fav);
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        }
      })
      .catch((err) => next(err));
  })
  .delete(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOneAndRemove({ user: req.user._id })
      .then(
        (fav) => {
          res.statusCode = 200;
          res.setHeader("content-Type", "application/json");
          res.json(fav);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

favoriteRouter
  .route("/:dishId")
  .options(cors.corswithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (fav) => {
          if (fav === null) {
            var newFav = new Favorites({ user: req.user._id });
            newFav.dishes = [req.params.dishId];
            Favorites.create(newFav)
              .then(
                (fav) => {
                  res.statusCode = 200;
                  res.setHeader("content-Type", "application/json");
                  res.json(fav);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          } else {
            fav.dishes = notDuplicate(fav.dishes, [req.params.dishId]);
            fav
              .save()
              .then(
                (fav) => {
                  res.statusCode = 200;
                  res.setHeader("content-Type", "application/json");
                  res.json(fav);
                },
                (err) => next(err)
              )
              .catch((err) => next(err));
          }
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(cors.corswithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id })
      .then(
        (fav) => {
          const index = fav.dishes.indexOf(req.params.dishId);
          if (index > -1) fav.dishes.splice(index, 1);
          fav
            .save()
            .then(
              (fav) => {
                res.statusCode = 200;
                res.setHeader("content-Type", "application/json");
                res.json(fav);
              },
              (err) => next(err)
            )
            .catch((err) => next(err));
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
module.exports = favoriteRouter;
