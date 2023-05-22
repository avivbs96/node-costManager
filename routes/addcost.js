/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/

const express = require('express');
const router = express.Router();
const UserModel = require('../models/usermodel'); // To validate user_id
const CostItemModel = require('../models/costitemmodel');

router.post('/', async (req, res) => {
  const requiredFields = ['user_id', 'year', 'month', 'day', 'description', 'category', 'sum'];
  const categories = ["food", "health", "housing", "sport", "education", "transportation", "other"];
  const exampleFormat = `\nExample of a valid format:
  {
    "user_id": "111111111",
    "year": 2023,
    "month": 5,
    "day": 20,
    "description": "description",
    "category": "category",
    "sum": 200
  }`;

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send(`Missing parameter in request: ${field}.${exampleFormat}`);
    }

    if (field === 'user_id') {
      const user = await UserModel.findOne({ user_id: String(req.body.user_id) });
    
      if (!user) {
        return res.status(400).send(`No user found with id: ${req.body.user_id}. Please make sure the user exists before adding a cost item.${exampleFormat}`);
    }
    
      // validate user_id for 9-digit numbers
      if (!/^\d{9}$/.test(req.body.user_id)) {
        return res.status(400).send(`user_id must be a 9-digit number.${exampleFormat}`);
      }
      
    }
    if (field === 'year' && (req.body.year < 2000 || req.body.year > 2023)) {
      return res.status(400).send(`Invalid year. Year should be between 2000 and 2023.${exampleFormat}`);
    }

    if (field === 'month' && (req.body.month < 1 || req.body.month > 12)) {
      return res.status(400).send(`Invalid month. Month should be between 1 and 12.${exampleFormat}`);
    }

    if (field === 'day' && (req.body.day < 1 || req.body.day > 31)) {
      return res.status(400).send(`Invalid day. Day should be between 1 and 31.${exampleFormat}`);
    }

    if (field === 'category' && !categories.includes(req.body.category)) {
      return res.status(400).send(`Invalid category. Valid categories are: ${categories.join(', ')}${exampleFormat}`);
    }

    if (field === 'sum' && req.body.sum < 0) {
      return res.status(400).send(`Invalid sum. Sum should be a positive number.${exampleFormat}`);
    }
  }

  const newCostItem = new CostItemModel({
    user_id: req.body.user_id,
    year: req.body.year,
    month: req.body.month,
    day: req.body.day,
    description: req.body.description,
    category: req.body.category,
    sum: req.body.sum
  });

  newCostItem.save()
  .then(async () => {
    const user = await UserModel.findOne({ user_id: String(req.body.user_id) });
    res.send(`Cost item added successfully to the user: ${user.firstname} ${user.lastname} and to the category: ${req.body.category}`);
  })
  .catch((error) => {
    console.error(error);  // log the error in your server console.
    res.status(500).send('An error occurred while adding the cost item.'); 
  });
});

module.exports = router;

