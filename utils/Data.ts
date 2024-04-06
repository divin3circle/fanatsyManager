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

export const news = [
  {
    id: 1,
    name: "Arsenal",
    title: "Arsenal to sign new striker",
    logo: require("../assests/images/team-logos/ars.png"),
    imgUrl:
      "https://images.teamtalk.com/content/uploads/2023/07/08083856/Kylian-Mbappe-Arsenal-target.jpg",
    description:
      "Arsenal are set to sign a new striker in the January transfer window. The Gunners have been linked with a number of forwards in recent weeks,including PSG's start Forward Kylian Mbappe, and it is believed that they are close to completing a deal for a new striker.",
    date: "12/09/2021",
    time: "23:00",
  },
  {
    id: 2,
    name: "Chelsea",
    title: "Chelsea expect Recce James to return soon",
    logo: require("../assests/images/team-logos/che.png"),
    imgUrl:
      "https://cdn1.thechelseachronicle.com/uploads/17/2023/08/GettyImages-1619312313.jpg",
    description:
      "Chelsea are expecting Recce James to return to action soon after the right-back suffered an injury in the Blues' 1-0 win over Newcastle United.",
    date: "12/09/2021",
    time: "12:00",
  },
  {
    id: 3,
    name: "Liverpool",
    title: "Klopps says Salah will be ready for Man United Clash",
    logo: require("../assests/images/team-logos/liv.png"),
    imgUrl:
      "https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2021/10/24/3242638-66370028-2560-1440.jpg",
    description:
      " Liverpool manager Jurgen Klopp has confirmed that Mohamed Salah will be available for the Reds' clash with Manchester United on Sunday. After missing the 2-2 draw with Brighton, Salah has returned to training and is expected to be fit for the game at Old Trafford.",
    date: "12/09/2021",
    time: "17:00",
  },
  {
    id: 4,
    name: "Man City",
    title: "Another injury blow for De Bruyne",
    logo: require("../assests/images/team-logos/mci.png"),
    imgUrl:
      "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt761d635ce9fb2473/64d6902a9eab6d1b5a44bfad/GettyImages-1608161788.jpg",
    description:
      "Manchester City have been dealt another injury blow with Kevin De Bruyne set to miss the next few weeks with a muscle injury. The Belgian midfielder has been in fine form this season, but will now be sidelined for the next few weeks.",
    date: "12/09/2021",
    time: "14:00",
  },
  {
    id: 5,
    name: "Man United",
    title: "Luke Shaw out for 6 weeks",
    logo: require("../assests/images/team-logos/mun.png"),
    imgUrl:
      "https://assets.manutd.com/AssetPicker/images/0/0/13/244/914531/A94T2869_2020071393147234_202007130936051594673400856_large.jpg",
    description:
      "Manchester United have been dealt a major injury blow with Luke Shaw set to miss the next six weeks with a hamstring injury. The left-back has been in fine form this season, but will now be sidelined for the next six weeks.",
    date: "12/09/2021",
    time: "14:00",
  },
  {
    id: 6,
    name: "Tottenham",
    title: "Spurs keen to keep a special player",
    logo: require("../assests/images/team-logos/tot.png"),
    imgUrl:
      "https://www.telegraph.co.uk/content/dam/football/2024/01/09/TELEMMGLPICT000362097540_17048282798380_trans_NvBQzQNjv4BqwRnwQ0KgCqCTKamrqQKaYl5NUcTKNHKqy85KLqtvPLE.jpeg?imwidth=680",
    description:
      "Tottenham are keen to keep Timo Werner at the club despite interest from other clubs. The German striker has been linked with a move away from Spurs, but the club are keen to keep hold of him.",
    date: "12/09/2021",
    time: "20:00",
  },
  {
    id: 7,
    name: "Chelsea",
    title: "Osimhen remains Chelsea's top target for the sumer",
    logo: require("../assests/images/team-logos/che.png"),
    imgUrl:
      "https://images.ps-aws.com/c?url=https%3A%2F%2Fimages.teamtalk.com%2Fcontent%2Fuploads%2F2024%2F01%2F27121309%2Fnapoli-striker-victor-osimhen-chelsea-manager-mauricio-pochettino.jpg",
    description:
      "Chelsea are set to make a move for Victor Osimhen in the summer transfer window. The Blues have been tracking the Napoli striker for some time and are keen to bring him to Stamford Bridge.",
    date: "12/09/2021",
    time: "23:00",
  },
];

export const jerseys = [
  {
    id: 0,
    name: "Dummy Team",
    jerseyImage: require("../assests/images/jerseys/ars.png"),
  },
  {
    id: 1,
    name: "Ars",
    jerseyImage: require("../assests/images/jerseys/ars.png"),
  },
  {
    id: 2,
    name: "Avl",
    jerseyImage: require("../assests/images/jerseys/asv.png"),
  },
  {
    id: 3,
    name: "Bha",
    jerseyImage: require("../assests/images/jerseys/bri.png"),
  },
  {
    id: 4,
    name: "Bou",
    jerseyImage: require("../assests/images/jerseys/bou.png"),
  },
  {
    id: 5,
    name: "Bre",
    jerseyImage: require("../assests/images/jerseys/bre.png"),
  },
  {
    id: 6,
    name: "Bur",
    jerseyImage: require("../assests/images/jerseys/bur.png"),
  },
  {
    id: 7,
    name: "Che",
    jerseyImage: require("../assests/images/jerseys/che.png"),
  },
  {
    id: 8,
    name: "Cry",
    jerseyImage: require("../assests/images/jerseys/cry.png"),
  },
  {
    id: 9,
    name: "Eve",
    jerseyImage: require("../assests/images/jerseys/eve.png"),
  },
  {
    id: 10,
    name: "Ful",
    jerseyImage: require("../assests/images/jerseys/ful.png"),
  },
  {
    id: 11,
    name: "Liv",
    jerseyImage: require("../assests/images/jerseys/liv.png"),
  },
  {
    id: 12,
    name: "Lut",
    jerseyImage: require("../assests/images/jerseys/lut.png"),
  },
  {
    id: 13,
    name: "Mci",
    jerseyImage: require("../assests/images/jerseys/mci.png"),
  },
  {
    id: 14,
    name: "Mun",
    jerseyImage: require("../assests/images/jerseys/mun.png"),
  },
  {
    id: 15,
    name: "New",
    jerseyImage: require("../assests/images/jerseys/new.png"),
  },
  {
    id: 16,
    name: "Nfo",
    jerseyImage: require("../assests/images/jerseys/not.png"),
  },
  {
    id: 17,
    name: "Shu",
    jerseyImage: require("../assests/images/jerseys/shu.png"),
  },
  {
    id: 18,
    name: "Tot",
    jerseyImage: require("../assests/images/jerseys/tot.png"),
  },
  {
    id: 19,
    name: "Whu",
    jerseyImage: require("../assests/images/jerseys/whu.png"),
  },
  {
    id: 20,
    name: "Wol",
    jerseyImage: require("../assests/images/jerseys/wol.png"),
  },
];
