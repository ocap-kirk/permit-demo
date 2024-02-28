var express = require('express');
var router = express.Router();
const { Permit } = require("permitio");

const data = {
  health_plans: {
    frodo: { id: "frodo", owner_id: "frodo", name: "Frodo's Health Plan" },
    Aragorn: { id: "aragorn", owner_id: "aragorn", name: "Aragorn's Health Plan" },
    gloin: { id: "gloin", owner_id: "gloin", name: "Glóin's Health Plan" },
    gimli: { id: "gimli", owner_id: "gloin", name: "Gimli's Health Plan" },
    samwise: { id: "samwise", owner_id: "samwise", name: "Samwise Gamgee's Health Plan" },
    faramir: { id: "faramir", owner_id: "faramir", name: "Faramir's Health Plan" },
    Arwen: { id: "arwen", owner_id: "arwen", name: "Arwen's Health Plan" },
    Eldarion: { id: "eldarion", owner_id: "eldarion", name: "Eldarion's Health Plan" },
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


/* GET Health Plan listing. */

router.get('/:userId', async function(req, res, next) {
  console.log("----In Get Health Plan----")
  // console.log(req.headers);
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Health Plan to Get: ${userToGet}`);
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"view",`Health_Plan:${userToGet}_healthplan`)
  if (permitted) {
    //return the data
    res.json(data.health_plans[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to view the health_plans`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to view the health_plans`);
  }


  console.log("----Leaving Get Health Plan----")
});








/* POST Health Plan listing. */

router.post('/:userId',async function(req, res, next) {
  console.log("----In POST Health Plan----");
  // console.log(req.headers);
  console.log();
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;
  var jsonBody = req.body;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Health Plan to Get: ${userToGet}`);
  console.log(`Health Plan : ` + JSON.stringify(data.health_plans[`${userToGet}`]));
  console.log(`Requeset Body: ` + JSON.stringify(jsonBody));
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"edit",`Health_Plan:${userToGet}_healthplan`)
  if (permitted) {
    //update the data, then return the result
    data.health_plans[`${userToGet}`] = jsonBody;
    res.json(data.health_plans[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to edit the health_plans`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to edit the health_plans`);
  }

  console.log();
  console.log("----Leaving POST health_plans----")
});

module.exports = router;
