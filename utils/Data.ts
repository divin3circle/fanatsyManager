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
  { id: 3, name: "Bournemouth", logo: bou },
  { id: 4, name: "Brentford", logo: bre },
  { id: 5, name: "Brighton", logo: bha },
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
  { id: 16, name: "Nott'm Forest", logo: nfo },
  { id: 17, name: "Sheff Utd", logo: shu },
  { id: 18, name: "Spurs", logo: tot },
  { id: 19, name: "West Ham", logo: whu },
  { id: 20, name: "Wolves", logo: wol },
];

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
    name: "Bou",
    jerseyImage: require("../assests/images/jerseys/bou.png"),
  },
  {
    id: 4,
    name: "Bre",
    jerseyImage: require("../assests/images/jerseys/bre.png"),
  },
  {
    id: 5,
    name: "Bha",
    jerseyImage: require("../assests/images/jerseys/bri.png"),
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

export const mid = [
  {
    id: 1,
    team_id: 7,
    name: "Palmer",
    position: 3,
    price: 6.9,
    combined_index: 99,
    ict_index: 600,
  },
  {
    id: 2,
    team_id: 14,
    name: "Fernandes",
    position: 3,
    price: 8.4,
    combined_index: 55,
    ict_index: 150,
  },
  {
    id: 3,
    team_id: 14,
    name: "Rashford",
    position: 3,
    price: 6.9,
    combined_index: 70,
    ict_index: 200,
  },
];

export const def = [
  {
    id: 1,
    team_id: 1,
    name: "Saliba",
    position: 2,
    price: 5.4,
    combined_index: 50,
    ict_index: 100,
  },
  {
    id: 2,
    team_id: 15,
    name: "Tripier",
    position: 2,
    price: 6.4,
    combined_index: 60,
    ict_index: 150,
  },
  {
    id: 3,
    team_id: 13,
    name: "Dias",
    position: 2,
    price: 5.6,
    combined_index: 70,
    ict_index: 290,
  },
];

export const strikers = [
  {
    id: 1,
    team_id: 11,
    name: "Nunez",
    position: 4,
    price: 7.3,
    combined_index: 78,
    ict_index: 400,
  },
  {
    id: 2,
    team_id: 2,
    name: "Watkins",
    position: 4,
    price: 8.8,
    combined_index: 87,
    ict_index: 500,
  },
  {
    id: 3,
    team_id: 20,
    name: "Sarabia",
    position: 4,
    price: 7.2,
    combined_index: 90,
    ict_index: 600,
  },
];

export const gks = [
  {
    id: 1,
    team_id: 1,
    name: "Raya",
    position: 1,
    price: 5.5,
    combined_index: 70,
    ict_index: 200,
  },
  {
    id: 2,
    team_id: 11,
    name: "Alisson",
    position: 1,
    price: 6.0,
    combined_index: 80,
    ict_index: 300,
  },
];

export const carouselData = [
  {
    id: 1,
    image: require("../assests/images/players/che.jpeg"),
    title: "What is Combined Index(CI)",
    description:
      "Combined Index is a metric that combines the ICT Index and the player's price to give a value that represents the player's overall performance.",
  },
  {
    id: 2,
    image: require("../assests/images/players/tot.jpeg"),
    title: "Get FPL Team ID",
    description:
      "To get your FPL Team ID, login to your FPL account and go to the 'My Team' page. Your Team ID is the number at the end of the URL.",
  },
  {
    id: 6,
    image: require("../assests/images/players/ars.jpeg"),
    title: "Captaincy Picks",
    description:
      "Captaincy Picks is a feature that helps you choose the best captain for your FPL team based on the player's form, fixtures and other factors. The app uses further 5 indicators such availability, form, XGI, XG and XA to determine the best captaincy pick.",
  },
  {
    id: 3,
    image: require("../assests/images/players/mci.jpeg"),
    title: "Get your Manager ID",
    description:
      "To get your Manager ID, login to your FPL account and go to the 'My Team' page. Your Manager ID is also the number at the end of the URL.",
  },
  {
    id: 4,
    image: require("../assests/images/players/mun.jpeg"),
    title: "What is ICT Index",
    description:
      "ICT Index is a metric that combines the player's influence, creativity and threat to give a value that represents the player's overall performance.",
  },
  {
    id: 5,
    image: require("../assests/images/players/liv.jpeg"),
    title: "About Pro-Manager",
    description:
      "With less than a dollar a month you can enjoy premium features of the app such as detailed cup & league stats, player stats, ad-free experience and more.",
  },
];
