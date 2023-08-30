const express = require("express");
const router = express.Router();
const continents = require("../services/continents");
const northAmerica = [
  {
    country: "Kanada",
    img: "canada.svg",
  },
  {
    country: "Gwatemala",
    img: "guatemala.svg",
  },
  {
    country: "Meksyk",
    img: "mexico.svg",
  },
  {
    country: "USA",
    img: "united-states-minor-outlying-islands.svg",
  },
];
const southAmerica = [
  {
    country: "Argentyna",
    continent_id: 3,
    img: "argentina.svg",
  },
  {
    country: "Boliwia",
    continent_id: 3,
    img: "bolivia.svg",
  },
  {
    country: "Brazylia",
    continent_id: 3,
    img: "brazil.svg",
  },
  {
    country: "Chile",
    continent_id: 3,
    img: "chile.svg",
  },
  {
    country: "Kolumbia",
    continent_id: 3,
    img: "colombia.svg",
  },
  {
    country: "Ekwador",
    continent_id: 3,
    img: "ecuador.svg",
  },
  {
    country: "Peru",
    continent_id: 3,
    img: "peru.svg",
  },
  {
    country: "Urugwaj",
    continent_id: 3,
    img: "uruguay.svg",
  },
];
const africa = [
  {
    country: "RPA",
    continent_id: 1,
    img: "south-africa.svg",
  },
  {
    country: "Eswatini",
    continent_id: 1,
    img: "swaziland.svg",
  },
  {
    country: "Botswana",
    continent_id: 1,
    img: "botswana.svg",
  },
  {
    country: "Lesotho",
    continent_id: 1,
    img: "lesotho.svg",
  },
  {
    country: "Uganda",
    continent_id: 1,
    img: "uganda.svg",
  },
  {
    country: "Kenia",
    continent_id: 1,
    img: "kenya.svg",
  },
  {
    country: "Rwanda",
    continent_id: 1,
    img: "rwanda.svg",
  },
  {
    country: "Ghana",
    continent_id: 1,
    img: "ghana.svg",
  },
  {
    country: "Nigeria",
    continent_id: 1,
    img: "nigeria.svg",
  },
  {
    country: "Senegal",
    continent_id: 1,
    img: "senegal.svg",
  },
  {
    country: "Tunezja",
    continent_id: 1,
    img: "tunisia.svg",
  },
];
const asia = [
  {
    country: "Bhutan",
    continent_id: 4,
    img: "bhutan.svg",
  },
  {
    country: "Hongkong",
    continent_id: 4,
    img: "hong-kong.svg",
  },
  {
    country: "Japonia",
    continent_id: 4,
    img: "japan.svg",
  },
  {
    country: "Kambodża",
    continent_id: 4,
    img: "cambodia.svg",
  },
  {
    country: "Tajlandia",
    continent_id: 4,
    img: "thailand.svg",
  },
  {
    country: "Korea Południowa",
    continent_id: 4,
    img: "korea.svg",
  },
  {
    country: "Zjednoczone Emiraty Arabskie",
    continent_id: 4,
    img: "the-united-arab-emirates.svg",
  },
  {
    country: "Jordania",
    continent_id: 4,
    img: "jordan.svg",
  },
  {
    country: "Katar",
    continent_id: 4,
    img: "qatar.svg",
  },
  {
    country: "Izrael",
    continent_id: 4,
    img: "israel.svg",
  },
  {
    country: "Kirgistan",
    continent_id: 4,
    img: "kyrgyzstan.svg",
  },
  {
    country: "Mongolia",
    continent_id: 4,
    img: "mongolia.svg",
  },
  {
    country: "Indonezja",
    continent_id: 4,
    img: "indonesia.svg",
  },
  {
    country: "Malezja",
    continent_id: 4,
    img: "malaysia.svg",
  },
  {
    country: "Wietnam",
    continent_id: 4,
    img: "vietnam.svg",
  },
  {
    country: "Laos",
    continent_id: 4,
    img: "laos.svg",
  },
  {
    country: "Filipiny",
    continent_id: 4,
    img: "the-philippines.svg",
  },
  {
    country: "Sri Lanka",
    continent_id: 4,
    img: "sri-lanka.svg",
  },
  {
    country: "Bangladesz",
    continent_id: 4,
    img: "bangladesh.svg",
  },
  {
    country: "Indie",
    continent_id: 4,
    img: "india.svg",
  },
  {
    country: "Singapur",
    continent_id: 4,
    img: "singapore.svg",
  },
  {
    country: "Turcja",
    continent_id: 4,
    img: "turkey.svg",
  },
];
const oceania = [
  {
    country: "Autralia",
    continent_id: 5,
    img: "australia.svg",
  },
  {
    country: "Nowa Zelandia",
    continent_id: 5,
    img: "new-zealand.svg",
  },
];
const europe = [
  {
    country: "Irlandia",
    continent_id: 6,
    img: "ireland.svg",
  },
  {
    country: "Wielka Brytania",
    continent_id: 6,
    img: "great-britain.svg",
  },
  {
    country: "Portugalia",
    continent_id: 6,
    img: "portugal.svg",
  },
  {
    country: "Hiszpania",
    continent_id: 6,
    img: "spain.svg",
  },
  {
    country: "Andora",
    continent_id: 6,
    img: "andorra.svg",
  },
  {
    country: "Francja",
    continent_id: 6,
    img: "france.svg",
  },
  {
    country: "Belgia",
    continent_id: 6,
    img: "belgium.svg",
  },
  {
    country: "Holandia",
    continent_id: 6,
    img: "the-netherlands.svg",
  },
  {
    country: "Luksemburg",
    continent_id: 6,
    img: "luxembourg.svg",
  },
  {
    country: "Włochy",
    continent_id: 6,
    img: "italy.svg",
  },
  {
    country: "Norwegia",
    continent_id: 6,
    img: "norway.svg",
  },
  {
    country: "Szwecja",
    continent_id: 6,
    img: "sweden.svg",
  },
  {
    country: "Finlandia",
    continent_id: 6,
    img: "finland.svg",
  },
  {
    country: "Dania",
    continent_id: 6,
    img: "denmark.svg",
  },
  {
    country: "Niemcy",
    continent_id: 6,
    img: "germany.svg",
  },
  {
    country: "Austria",
    continent_id: 6,
    img: "austria.svg",
  },
  {
    country: "Szwajcaria",
    continent_id: 6,
    img: "switzerland.svg",
  },
  {
    country: "Polska",
    continent_id: 6,
    img: "poland.svg",
  },
  {
    country: "Litwa",
    continent_id: 6,
    img: "lithuania.svg",
  },
  {
    country: "Łotwa",
    continent_id: 6,
    img: "latvia.svg",
  },
  {
    country: "Estonia",
    continent_id: 6,
    img: "estonia.svg",
  },
  {
    country: "Czechy",
    continent_id: 6,
    img: "the-czech-republic.svg",
  },
  {
    country: "Słowacja",
    continent_id: 6,
    img: "slovakia.svg",
  },
  {
    country: "Słowenia",
    continent_id: 6,
    img: "slovenia.svg",
  },
  {
    country: "Węgry",
    continent_id: 6,
    img: "hungary.svg",
  },
  {
    country: "Chorwacja",
    continent_id: 6,
    img: "croatia.svg",
  },
  {
    country: "Albania",
    continent_id: 6,
    img: "albania.svg",
  },
  {
    country: "Grecja",
    continent_id: 6,
    img: "greece.svg",
  },
  {
    country: "Rumunia",
    continent_id: 6,
    img: "romania.svg",
  },
  {
    country: "Czarnogóra",
    continent_id: 6,
    img: "montenegro.svg",
  },
  {
    country: "Serbia",
    continent_id: 6,
    img: "serbia.svg",
  },
  {
    country: "Macedonia",
    continent_id: 6,
    img: "macedonia.svg",
  },
  {
    country: "Bułgaria",
    continent_id: 6,
    img: "bulgaria.svg",
  },
  {
    country: "Ukraina",
    continent_id: 6,
    img: "ukraine.svg",
  },
  {
    country: "Rosja",
    continent_id: 6,
    img: "russia.svg",
  },
  {
    country: "Malta",
    continent_id: 6,
    img: "malta.svg",
  },
];
router.get("/", async (req, res, next) => {
  try {
    res.json({ message: "Working good" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

router.get("/africa", async function (req, res, next) {
  try {
    res.json(await continents.getAfricaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/northAmerica", async function (req, res, next) {
  try {
    res.json(await continents.getNorthAmericaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/southAmerica", async function (req, res, next) {
  try {
    res.json(await continents.getSouthAmericaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/asia", async function (req, res, next) {
  try {
    res.json(await continents.getAsiaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/oceania", async function (req, res, next) {
  try {
    res.json(await continents.getOceaniaCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});
router.get("/europe", async function (req, res, next) {
  try {
    res.json(await continents.getEuropeCountries(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;
