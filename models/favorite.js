const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var favoritechema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
    },
  ],
});

module.exports = mongoose.model("Favourite", favoritechema);
