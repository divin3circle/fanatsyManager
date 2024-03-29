const ars = require("../assests/images/team-logos/ars.png");
const avl = require("../assests/images/team-logos/avl.png");
const bha = require("../assests/images/team-logos/bha.png");
const bou = require("../assests/images/team-logos/bou.png");
const bre = require("../assests/images/team-logos/bre.png");
const bur = require("../assests/images/team-logos/bur.png");
const che = require("../assests/images/team-logos/che.png");
const cry = require("../assests/images/team-logos/cry.png");
const eve = require("../assests/images/team-logos/eve.png");
const ful = require("../assests/images/team-logos/ful.png");
const liv = require("../assests/images/team-logos/liv.png");
const lut = require("../assests/images/team-logos/lut.png");
const mci = require("../assests/images/team-logos/mci.png");
const mun = require("../assests/images/team-logos/mun.png");
const newc = require("../assests/images/team-logos/new.png");
const nfo = require("../assests/images/team-logos/nfo.png");
const shu = require("../assests/images/team-logos/shu.png");
const tot = require("../assests/images/team-logos/tot.png");
const whu = require("../assests/images/team-logos/whu.png");
const wol = require("../assests/images/team-logos/wol.png");

export const teams = [
  { id: 1, name: "Arsenal", logo: ars },
  { id: 2, name: "Aston Villa", logo: avl },
  { id: 3, name: "Brighton", logo: bha },
  { id: 4, name: "Bournemouth", logo: bou },
  { id: 5, name: "Brentford", logo: bre },
  { id: 6, name: "Burnley", logo: bur },
  { id: 7, name: "Chelsea", logo: che },
  { id: 8, name: " Palace", logo: cry },
  { id: 9, name: "Everton", logo: eve },
  { id: 10, name: "Fulham", logo: ful },
  { id: 11, name: "Liverpool", logo: liv },
  { id: 12, name: "Luton Town", logo: lut },
  { id: 13, name: "Man City", logo: mci },
  { id: 14, name: "Man United", logo: mun },
  { id: 15, name: "Newcastle", logo: newc },
  { id: 16, name: "Nottm Forest", logo: nfo },
  { id: 17, name: "Sheffield Utd", logo: shu },
  { id: 18, name: "Tottenham", logo: tot },
  { id: 19, name: "West Ham", logo: whu },
  { id: 20, name: "Wolves", logo: wol },
];

// export const fixtureTeams = [
//   {
//     id: 0,
//     name: "Dummy Team",
//     logo: ars,
//   },
//   {
//     id: 1,
//     name: "Arsenal",
//     logo: ars,
//   }
// ]
export const managerBanner = [
  {
    id: 1,
    name: "Mikel Arteta",
    team: "Arsenal",
    quote:
      "We have to create a culture, a way of living, a way of being around the club that is very much aligned with the values and the traditions.",
    image: require("../assests/images/managers/ars.png"),
    bgColor: " #EF0107",
  },
  {
    id: 2,
    name: "Pep Guardiola",
    team: "Manchester City",
    quote:
      "I will be the happiest person in the world if we can play the way we did today.",
    image: require("../assests/images/managers/mci.png"),
    bgColor: "#6CABDD",
  },
  {
    id: 3,
    name: "Jurgen Klopp",
    team: "Liverpool",
    quote:
      "I always said that the only reason I would leave is if I am asked to leave because I will not leave.",
    image: require("../assests/images/managers/liv.png"),
    bgColor: "#C8102E",
  },
  {
    id: 4,
    name: "Mauricio Pochettino",
    team: "Chelsea",
    quote:
      "I think the most important thing is to keep the culture of the club and the philosophy of the club.",
    image: require("../assests/images/managers/che.png"),
    bgColor: "#034694;",
  },
];
