/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/

const express = require('express');
const router = express.Router();
const CostItemModel = require('../models/costitemmodel');

router.get('/', async (req, res) => {
  try {
      const developers = [
          {
              firstname: "Aviv",
              lastname: "Ben Shitrit",
              id: "313357766",
              email: "avivvardi@gmail.com"
          },
          {
              firstname: "Ariel",
              lastname: "Ben Haim",
              id: "206556417",
              email: "benhaimariel@gmail.com"
          }
      ];
      res.send(developers);
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while fetching developers.');
  }
});


  module.exports = router;