var express = require('express');
var router = express.Router();
const { Permit } = require("permitio");

const data = {
  profiles: {
    frodo: { id: "pr_1", name: "Frodo's Profile", age: 33, gender: "male", blood_type: "O+" },
    Aragorn: { id: "pr_2", name: "Aragorn's Profile", age: 88, gender: "male", blood_type: "A+" },
    gloin: { id: "pr_3", name: "Glóin's Profile", age: 252, gender: "male", blood_type: "B-" },
    gimli: { id: "pr_4", name: "Gimli's Profile", age: 139, gender: "male", blood_type: "B+" },
    samwise: { id: "pr_5", name: "Samwise Gamgee's Profile", age: 38, gender: "male", blood_type: "AB+" },
    faramir: { id: "pr_6", name: "Faramir's Profile", age: 41, gender: "male", blood_type: "A-" },
    Arwen: { id: "pr_7", name: "Arwen's Profile", age: 2900, gender: "female", blood_type: "AB-" },
    Eldarion: { id: "pr_8", name: "Eldarion's Profile", age: 20, gender: "male", blood_type: "A+" },
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


/* GET profile listing. */

router.get('/:userId', async function(req, res, next) {
  console.log("----In Get Profile----")
  // console.log(req.headers);
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Profile to Get: ${userToGet}`);
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"view",`Profile:${userToGet}`)
  if (permitted) {
    //return the data
    res.json(data.profiles[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to view the profile`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to view the profile`);
  }


  console.log("----Leaving Get Profile----")
});








/* POST profile listing. */

router.post('/:userId',async function(req, res, next) {
  console.log("----In POST Profile----");
  // console.log(req.headers);
  console.log();
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;
  var jsonBody = req.body;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Profile to Get: ${userToGet}`);
  console.log(`Profile : ` + JSON.stringify(data.profiles[`${userToGet}`]));
  console.log(`Request Body : ` + JSON.stringify(jsonBody));
  
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"edit",`Profile:${userToGet}`)
  if (permitted) {
    //update the data, then return the result
    data.profiles[`${userToGet}`] = jsonBody;
    res.json(data.profiles[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to edit the profile`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to edit the profile`);
  }

  console.log();
  console.log("----Leaving POST Profile----")
});

module.exports = router;
