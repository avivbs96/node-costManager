/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/

const express = require('express');
const router = express.Router();
const CostItemModel = require('../models/costitemmodel');
const UserModel = require('../models/usermodel'); 

router.get('/', async (req, res) => {
  const categories = ["food", "health", "housing", "sport", "education", "transportation", "other"];
  const { user_id } = req.query;
  const month = Number(req.query.month);
  const year = Number(req.query.year);

  if (!user_id || !month || !year) {
    return res.status(400).json({ 
      error: "Missing user_id, month, or year in query parameters.",
      example: "Here is an example of how you should write the endpoint: http://localhost:3000/report?user_id=313357766&month=5&year=2023",
    
    });
  }

  // Check for valid month
  if(month < 1 || month > 12) {
    return res.status(400).json({ error: "Month must be between 1 and 12." });
  }

  // Check for valid year
  if(year < 2000 || year > 2023) {
    return res.status(400).json({ error: "Year must be between 2000 and 2023." });
  }

  const user = await UserModel.findOne({ user_id: user_id });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  const costItemsByQuery = await CostItemModel.find({
    user_id,
    month,
    year,
  });

  const report = {
    report_title: `Report for ${user.firstname} ${user.lastname} For Date - ${month}/${year}`,
    food: [],
    health: [],
    housing: [],
    sport: [],
    education: [],
    transportation: [],
    other: []
  };

  costItemsByQuery.forEach(({ user_id, day, description, sum, category }) => {
    if (categories.includes(category)) {
      const item = { day, description, sum };
      report[category].push(item);
    }
  });

  res.status(200).json(report);
});

module.exports = router;

