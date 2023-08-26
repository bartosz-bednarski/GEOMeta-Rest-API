const express = require("express");

const router = express.Router();

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
    img: "argentina.svg",
  },
  {
    country: "Boliwia",
    img: "bolivia.svg",
  },
  {
    country: "Brazylia",
    img: "brazil.svg",
  },
  {
    country: "Chile",
    img: "chile.svg",
  },
  {
    country: "Kolumbia",
    img: "colombia.svg",
  },
  {
    country: "Ekwador",
    img: "ecuador.svg",
  },
  {
    country: "Peru",
    img: "peru.svg",
  },
  {
    country: "Urugwaj",
    img: "uruguay.svg",
  },
];
const africa = [
  {
    country: "RPA",
    img: "south-africa.svg",
  },
  {
    country: "Botswana",
    img: "botswana.svg",
  },
  {
    country: "Lesotho",
    img: "lesotho.svg",
  },
  {
    country: "Uganda",
    img: "uganda.svg",
  },
  {
    country: "Kenia",
    img: "kenya.svg",
  },
  {
    country: "Rwanda",
    img: "rwanda.svg",
  },
  {
    country: "Ghana",
    img: "ghana.svg",
  },
  {
    country: "Nigeria",
    img: "nigeria.svg",
  },
  {
    country: "Senegal",
    img: "senegal.svg",
  },
  {
    country: "Tunezja",
    img: "tunisia.svg",
  },
];
const asia = [
  {
    country: "Bhutan",
    img: "bhutan.svg",
  },
  {
    country: "Hongkong",
    img: "hong-kong.svg",
  },
  {
    country: "Japonia",
    img: "japan.svg",
  },
  {
    country: "Kambodża",
    img: "cambodia.svg",
  },
  {
    country: "Tajlandia",
    img: "thailand.svg",
  },
  {
    country: "Korea Południowa",
    img: "korea.svg",
  },
  {
    country: "Zjednoczone Emiraty Arabskie",
    img: "the-united-arab-emirates.svg",
  },
  {
    country: "Jordania",
    img: "jordan.svg",
  },
  {
    country: "Katar",
    img: "qatar.svg",
  },
  {
    country: "Izrael",
    img: "israel.svg",
  },
  {
    country: "Palestyna",
    img: "palestinian-authority.svg",
  },
  {
    country: "Kirgistan",
    img: "kyrgyzstan.svg",
  },
  {
    country: "Mongolia",
    img: "mongolia.svg",
  },
  {
    country: "Indonezja",
    img: "indonesia.svg",
  },
  {
    country: "Malezja",
    img: "malaysia.svg",
  },
  {
    country: "Wietnam",
    img: "vietnam.svg",
  },
  {
    country: "Laos",
    img: "laos.svg",
  },
  {
    country: "Filipiny",
    img: "the-philippines.svg",
  },
  {
    country: "Sri Lanka",
    img: "sri-lanka.svg",
  },
  {
    country: "Bangladesz",
    img: "bangladesh.svg",
  },
  {
    country: "Indie",
    img: "india.svg",
  },
  {
    country: "Singapur",
    img: "singapore.svg",
  },
  {
    country: "Turcja",
    img: "turkey.svg",
  },
];
const oceania = [
  {
    country: "Autralia",
    img: "australia.svg",
  },
  {
    country: "Nowa Zelandia",
    img: "new-zealand.svg",
  },
];
const europe = [
  {
    country: "Irlandia",
    img: "ireland.svg",
  },
  {
    country: "Wielka Brytania",
    img: "great-britain.svg",
  },
  {
    country: "Portugalia",
    img: "portugal.svg",
  },
  {
    country: "Hiszpania",
    img: "spain.svg",
  },
  {
    country: "Andora",
    img: "andorra.svg",
  },
  {
    country: "Francja",
    img: "france.svg",
  },
  {
    country: "Belgia",
    img: "belgium.svg",
  },
  {
    country: "Holandia",
    img: "the-netherlands.svg",
  },
  {
    country: "Luksemburg",
    img: "luxembourg.svg",
  },
  {
    country: "Włochy",
    img: "italy.svg",
  },
  {
    country: "Norwegia",
    img: "norway.svg",
  },
  {
    country: "Szwecja",
    img: "sweden.svg",
  },
  {
    country: "Finlandia",
    img: "finland.svg",
  },
  {
    country: "Dania",
    img: "denmark.svg",
  },
  {
    country: "Niemcy",
    img: "germany.svg",
  },
  {
    country: "Austria",
    img: "austria.svg",
  },
  {
    country: "Szwajcaria",
    img: "switzerland.svg",
  },
  {
    country: "Polska",
    img: "poland.svg",
  },
  {
    country: "Litwa",
    img: "lithuania.svg",
  },
  {
    country: "Łotwa",
    img: "latvia.svg",
  },
  {
    country: "Estonia",
    img: "estonia.svg",
  },
  {
    country: "Czechy",
    img: "the-czech-republic.svg",
  },
  {
    country: "Słowacja",
    img: "slovakia.svg",
  },
  {
    country: "Słowenia",
    img: "slovenia.svg",
  },
  {
    country: "Węgry",
    img: "hungary.svg",
  },
  {
    country: "Chorwacja",
    img: "croatia.svg",
  },
  {
    country: "Albania",
    img: "albania.svg",
  },
  {
    country: "Grecja",
    img: "greece.svg",
  },
  {
    country: "Rumunia",
    img: "romania.svg",
  },
  {
    country: "Czarnogóra",
    img: "montenegro.svg",
  },
  {
    country: "Serbia",
    img: "serbia.svg",
  },
  {
    country: "Macedonia",
    img: "macedonia.svg",
  },
  {
    country: "Bułgaria",
    img: "bulgaria.svg",
  },
  {
    country: "Ukraina",
    img: "ukraine.svg",
  },
  {
    country: "Rosja",
    img: "russia.svg",
  },
  {
    country: "Malta",
    img: "malta.svg",
  },
];
router.get("/", async (req, res, next) => {
  res.json({ message: "Working good" });
});

router.get("/northAmerica", async (req, res, next) => {
  res.json({ data: northAmerica });
});
router.get("/southAmerica", async (req, res, next) => {
  res.json({ data: southAmerica });
});
router.get("/europe", async (req, res, next) => {
  res.json({ data: europe });
});
router.get("/africa", async (req, res, next) => {
  res.json({ data: africa });
});
router.get("/asia", async (req, res, next) => {
  res.json({ data: asia });
});
router.get("/oceania", async (req, res, next) => {
  res.json({ data: oceania });
});

module.exports = router;
