/*
* Developers:
* Aviv Ben Shitrit - 313357766
* Ariel Ben Haim - 206556417
*/

const express = require('express');
const router = express.Router();
const UserModel = require('../models/usermodel');

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find().select('-__v');
        const totalUsers = await UserModel.countDocuments();
        res.json({ totalUsers, users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// router.post('/', async (req, res) => {
//     const requiredFields = ['user_id', 'firstname', 'lastname', 'birthday'];

//     // Check if all necessary fields are provided
//     const missingFields = requiredFields.filter(field => !(field in req.body));

//     // If there are missing fields, return an error response with an example JSON
//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         error: `Missing fields: ${missingFields.join(', ')}`,
//         example: {
//           user_id: "9 digit number",
//           firstname: "name",
//           lastname: "last name",
//           birthday: "YYYY-MM-DD" 
//         }
//       });
//     }

//     for (const field of requiredFields) {
//       if (!req.body[field]) {
//         return res.status(400).send(`Missing parameter in request: ${field}`);
//       }
//     }
  
//     const birthday = new Date(req.body.birthday);

// // Check if birthday is a valid date
// if (isNaN(birthday.getTime())) {
//   return res.status(400).send('Invalid date format for birthday. It should be YYYY-MM-DD');
// }

// // Create the current date
// const now = new Date();

// // Check if the birthday is within an acceptable range
// if (birthday < new Date(now.getFullYear() - 120, now.getMonth(), now.getDate()) || birthday > now) {
//      return res.status(400).send('Invalid birthday. The birthday must be between 120 years ago and today.');
// }
//     if (!/^\d{9}$/.test(req.body.user_id)) {
//       return res.status(400).send(`user_id must be a 9-digit number.`);
//     }

//     // Check if user with the same id already exists
//     const existingUser = await UserModel.findOne({ user_id: String(req.body.user_id) });
//     if (existingUser) {
//       return res.status(400).send(`User with id: ${req.body.user_id} already exists.`);
//     }

//     const newUser = new UserModel({
//       user_id: req.body.user_id,
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       birthday: req.body.birthday
//     });

//     newUser.save()
//     .then(() => res.status(200).send(`The user ${req.body.firstname} ${req.body.lastname} with the id ${req.body.user_id} created successfully.`))
//     .catch((error) => res.send(error));
//   });

module.exports = router;

