var express = require('express');
var router = express.Router();
const { Permit } = require("permitio");

const data = {
  medical_records: {
    frodo: [
      { id: "mr_frodo_1", diagnosis: "Ring-related anxiety", treatment: "Hobbit therapy", date: "2024-02-22" },
      { id: "mr_frodo_2", diagnosis: "Sting wound", treatment: "Elvish healing salve", date: "2024-01-15" },
      { id: "mr_frodo_3", diagnosis: "Mithril mail chafing", treatment: "Rest and ointment", date: "2023-11-30" },
    ],
    Aragorn: [
      { id: "mr_aragorn_1", diagnosis: "Ranger's fatigue", treatment: "Rest and athelas", date: "2024-02-20" },
      { id: "mr_aragorn_2", diagnosis: "Barrow-wight encounter", treatment: "Tom Bombadil's song", date: "2023-12-10" },
      { id: "mr_aragorn_3", diagnosis: "Isengard injury", treatment: "Ent-draught", date: "2023-10-05" },
    ],
    gloin: [
      { id: "mr_gloin_1", diagnosis: "Dwarf beard rash", treatment: "Beard oil", date: "2024-02-15" },
      { id: "mr_gloin_2", diagnosis: "Axe-related injury", treatment: "Bandage and rest", date: "2023-09-20" },
      { id: "mr_gloin_3", diagnosis: "Gold fever", treatment: "Return to Erebor", date: "2023-06-30" },
    ],
    gimli: [
      { id: "mr_gimli_1", diagnosis: "Beard tangle", treatment: "Dwarf comb", date: "2024-01-10" },
      { id: "mr_gimli_2", diagnosis: "Battle fatigue", treatment: "Dwarven ale", date: "2023-08-05" },
      { id: "mr_gimli_3", diagnosis: "Deep-hall cough", treatment: "Dwarf herbal remedy", date: "2023-04-15" },
    ],
    samwise: [
      { id: "mr_samwise_1", diagnosis: "Gardening strain", treatment: "Rest and Gamgee family poultice", date: "2024-01-28" },
      { id: "mr_samwise_2", diagnosis: "Ring-bearer fatigue", treatment: "Return to the Shire", date: "2023-11-15" },
      { id: "mr_samwise_3", diagnosis: "Sting first aid", treatment: "Hobbit bandages", date: "2023-09-05" },
    ],
    faramir: [
      { id: "mr_faramir_1", diagnosis: "Ranger's injury", treatment: "Athelas and rest", date: "2024-02-18" },
      { id: "mr_faramir_2", diagnosis: "Warg scratch", treatment: "Healing herbs", date: "2023-10-30" },
      { id: "mr_faramir_3", diagnosis: "Rohirrim infection", treatment: "Eorlingas medicine", date: "2023-08-12" },
    ],
    Arwen: [
      { id: "mr_arwen_1", diagnosis: "Immortality stress", treatment: "Elven meditation", date: "2024-02-25" },
      { id: "mr_arwen_2", diagnosis: "Broken heart", treatment: "Time and healing", date: "2023-12-20" },
      { id: "mr_arwen_3", diagnosis: "Wraith fear", treatment: "Return to Lothlórien", date: "2023-09-10" },
    ],
    Eldarion: [
      { id: "mr_eldarion_1", diagnosis: "Gondorian fever", treatment: "Healing draught", date: "2024-02-15" },
      { id: "mr_eldarion_2", diagnosis: "Swordplay injury", treatment: "Healing herbs", date: "2023-10-20" },
      { id: "mr_eldarion_3", diagnosis: "Royalty fatigue", treatment: "Rest and relaxation", date: "2023-07-05" },
    ],
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


/* GET Health Record listing. */

router.get('/:userId', async function(req, res, next) {
  console.log("----In Get Health Record----")
  // console.log(req.headers);
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Health Record to Get: ${userToGet}`);
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"view",`Medical_Records:${userToGet}_medical_records`)
  if (permitted) {
    //return the data
    res.json(data.medical_records[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to view the medical_records`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to view the medical_records`);
  }


  console.log("----Leaving Get Health Record----")
});








/* POST Health Record listing. */

router.post('/:userId',async function(req, res, next) {
  console.log("----In POST Health Record----");
  // console.log(req.headers);
  console.log();
  var loggedInUsername = req.headers.currentusername;
  var userToGet = req.params.userId;
  var jsonBody = req.body;

  console.log(`Logged In User from Headers: ${req.headers.currentusername}`);
  console.log(`Health Record to Get: ${userToGet}`);
  console.log(`Health Record : ` + JSON.stringify(data.medical_records[`${userToGet}`]));
  
  
  
  //Check permission and handle
  const permitted = await permit.check(loggedInUsername,"edit",`Medical_Records:${userToGet}_medical_records`)
  if (permitted) {
    //update the data, then return the result
    data.medical_records[`${userToGet}`] = jsonBody;
    res.json(data.medical_records[`${userToGet}`]);
    console.log(`${loggedInUsername} IS PERMITTED to edit the medical_records`);
  } else {
    res.status(405).send();
    console.log(`${loggedInUsername} is NOT PERMITTED to edit the medical_records`);
  }

  console.log();
  console.log("----Leaving POST medical_records----")
});

module.exports = router;
