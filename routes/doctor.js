var express = require('express');
var router = express.Router();
const { Permit } = require("permitio");

const data = {
  doctors: {
    Gandalf: { name: "Gandalf", id: "dr_gandalf", specialty: "Wizardry", hospital: "Middle-earth Medical Center" },
    Elrond: { name: "Elrond", id: "dr_elrond", specialty: "Healing Arts", hospital: "Rivendell Healing House" },
    Celeborn: { name: "Celeborn", id: "dr_celeborn", specialty: "Elven Healing", hospital: "Lothlórien Healing Sanctuary" }
  },
  doctors_schedule: {
    Gandalf: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "Not Available" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 1:00 PM" },
    ],
    Elrond: [
      { day: "Monday", hours: "8:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "8:00 AM - 4:00 PM" },
      { day: "Wednesday", hours: "8:00 AM - 12:00 PM" },
      { day: "Thursday", hours: "Not Available" },
      { day: "Friday", hours: "8:00 AM - 4:00 PM" },
    ],
    Dwalin: [
      { day: "Monday", hours: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 2:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
      { day: "Friday", hours: "Not Available" },
    ],
    Celeborn: [
      { day: "Monday", hours: "9:00 AM - 4:00 PM" },
      { day: "Tuesday", hours: "9:00 AM - 4:00 PM" },
      { day: "Wednesday", hours: "Not Available" },
      { day: "Thursday", hours: "9:00 AM - 4:00 PM" },
      { day: "Friday", hours: "9:00 AM - 1:00 PM" },
    ]
  }
};

const permit = new Permit({
  // your API Key
  token: "permit_key_GjmDCog6mjdcypt3De9BdFNuG3yW4XOQrOxLTi3agO0co5wSfM3jYfPc7ILBP1EMY9jEn8k8WJg4XDYiX1IFrv",
  // in production, you might need to change this url to fit your deployment
  pdp: "http://localhost:7766",
  // if you want the SDK to emit logs, uncomment this:
  log: {
    level: "debug",
  },
});

/* GET Doctor listing. */
router.get('/:userId', async function(req, res, next) {
  console.log("----In Get Doctor----")
  // console.log(req.headers);
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Doctor to Get: ${userToGet}`);
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"view",`Doctor:${userToGet}`)
  if (permitted) {
    //return the data
    res.json(data.doctors[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to view the Doctor`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to view the Doctor`);
  }


  console.log("----Leaving Get Doctor----")
});








/* POST Doctor listing. */

router.post('/:userId',async function(req, res, next) {
  console.log("----In POST Doctor----");
  // console.log(req.headers);
  console.log();
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;
  var jsonBody = req.body;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Doctor to Get: ${userToGet}`);
  console.log(`Doctor : ` + JSON.stringify(data.doctors[`${userToGet}`]));
  
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"edit",`Doctor:${userToGet}`)
  if (permitted) {
    //update the data, then return the result
    data.doctors[`${userToGet}`] = jsonBody;
    res.json(data.doctors[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to edit the Doctor`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to edit the Doctor`);
  }

  console.log();
  console.log("----Leaving POST Doctor----")
});









/*****
 * Dr Schedule Section
 */







/* GET Doctor Schedule listing. */
router.get('/:userId/schedule', async function(req, res, next) {
  console.log("----In Get Doctor Schedule----")
  // console.log(req.headers);
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Doctor to Get: ${userToGet}`);
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"view",`Doctor_Schedule:${userToGet}_doctor_schedule`)
  if (permitted) {
    //return the data
    res.json(data.doctors_schedule[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to view the Doctors Schedule`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to view the Doctors Schedule`);
  }


  console.log("----Leaving Get Doctor Sechedule----")
});

/* POST Doctor Schedule listing. */

router.post('/:userId/schedule',async function(req, res, next) {
  console.log("----In POST Doctor Schedule----");
  // console.log(req.headers);
  console.log();
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;
  var jsonBody = req.body;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Doctor Schedule to Get: ${userToGet}`);
  console.log(`Doctor Schedule : ` + JSON.stringify(data.doctors_schedule[`${userToGet}`]));
  
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"book",`Doctor_Schedule:${userToGet}_doctor_schedule`)
  if (permitted) {
    //update the data, then return the result
    data.doctors_schedule[`${userToGet}`] = jsonBody;
    res.json(data.doctors_schedule[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to book the Doctor Schedule`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to book the Doctor Schedule`);
  }

  console.log();
  console.log("----Leaving POST Doctor----")
});
module.exports = router;