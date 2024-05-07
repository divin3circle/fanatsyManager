import asyncHandler from "express-async-handler";
import DreamTeam, {
  PlayerData,
  Suggestions,
  ElementSummary,
} from "../models/fantasyModels.js";

const weights = {
  gk: {
    saves: 0.3,
    clean_sheets: 0.2,
    chance_of_playing: 0.1,
    form: 0.1,
    points_per_game: 0.1,
    ict: 0.1,
    xgc: 0.1,
  },
  def: {
    clean_sheets: 0.3,
    goals_scored: 0.2,
    chance_of_playing: 0.1,
    form: 0.1,
    points_per_game: 0.1,
    xgi: 0.1,
    ict: 0.1,
  },
  mid: {
    goals_scored: 0.3,
    assists: 0.2,
    chance_of_playing: 0.1,
    form: 0.1,
    points_per_game: 0.1,
    xgi: 0.1,
    ict: 0.1,
  },
  fwd: {
    goals_scored: 0.3,
    assists: 0.2,
    chance_of_playing: 0.1,
    form: 0.1,
    points_per_game: 0.1,
    xgi: 0.1,
    ict: 0.1,
  },
};

const fetchDreamTeam = asyncHandler(async () => {
  let fullDreamTeam = [];

  const fixtureResponse = await fetch(
    "https://fantasy.premierleague.com/api/fixtures/?future=1"
  );
  const fixtureData = await fixtureResponse.json();
  const fixtureID = fixtureData[4]?.event - 1;

  const dreamTeamResponse = await fetch(
    `https://fantasy.premierleague.com/api/dream-team/${fixtureID}/`
  );
  const dreamTeamData = await dreamTeamResponse.json();
  const dreamTeam = dreamTeamData.team;

  fullDreamTeam = await Promise.all(
    dreamTeam.map(async (player) => {
      const elementSummaryResponse = await fetch(
        `https://fantasy.premierleague.com/api/element-summary/${player.element}/`
      );
      const elementSummaryData = await elementSummaryResponse.json();
      const firstFixture = elementSummaryData.fixtures[0];
      const teamId = firstFixture.is_home
        ? firstFixture.team_h
        : firstFixture.team_a;

      const bootstrapStaticResponse = await fetch(
        "https://fantasy.premierleague.com/api/bootstrap-static/"
      );
      const bootstrapStaticData = await bootstrapStaticResponse.json();
      const players = bootstrapStaticData.elements;
      const playerInfo = players.find((p) => p.id === player.element);

      const dreamPlayer = {
        element: player.element,
        form: playerInfo.form,
        totalPoints: playerInfo.total_points,
        ict: playerInfo.ict_index,
        ownership: playerInfo.selected_by_percent,
        name: playerInfo.web_name,
        teamID: teamId,
      };

      return dreamPlayer;
    })
  );

  return fullDreamTeam;
});

const fetchSuggestedPlayers = asyncHandler(async () => {
  const bootstrapStaticResponse = await fetch(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );
  const bootstrapStaticData = await bootstrapStaticResponse.json();
  const players = bootstrapStaticData.elements;

  const suggestions = await Promise.all(
    players.map((player) => {
      const combined_index = indexCalculator(
        player,
        player.element_type,
        players
      );
      return {
        element: player.id,
        name: player.web_name,
        ownership: player.selected_by_percent,
        index: player.element_type,
        position:
          player.element_type === 1
            ? "GK"
            : player.element_type === 2
            ? "DEF"
            : player.element_type === 3
            ? "MID"
            : "FWD",
        teamID: player.team,
        combined_index: combined_index ? combined_index : 0,
      };
    })
  );

  return suggestions;
});

//get max value of a stat
const sortStat = (players, stat) => {
  const sortedPlayers = players.sort((a, b) => b[stat] - a[stat]);
  return sortedPlayers[0][stat];
};
//normalize data field
const normalize = (value, max, min) => (value - min) / (max - min);

const indexCalculator = (player, position, players) => {
  switch (position) {
    case 1:
      return (
        normalize(player.saves, sortStat(players, "saves"), 0) *
          weights.gk.saves +
        normalize(player.clean_sheets, sortStat(players, "clean_sheets"), 0) *
          weights.gk.clean_sheets +
        normalize(
          player.chance_of_playing_this_round,
          sortStat(players, "chance_of_playing_this_round"),
          0
        ) *
          weights.gk.chance_of_playing +
        normalize(player.form, sortStat(players, "form"), 0) * weights.gk.form +
        normalize(
          player.points_per_game,
          sortStat(players, "points_per_game"),
          0
        ) *
          weights.gk.points_per_game +
        normalize(player.ict_index, sortStat(players, "ict_index"), 0) *
          weights.gk.ict +
        normalize(
          player.expected_goals_conceded,
          sortStat(players, "expected_goals_conceded"),
          0
        ) *
          weights.gk.xgc
      );
      break;
    case 2:
      return (
        normalize(player.clean_sheets, sortStat(players, "clean_sheets"), 0) *
          weights.def.clean_sheets +
        normalize(player.goals_scored, sortStat(players, "goals_scored"), 0) *
          weights.def.goals_scored +
        normalize(
          player.chance_of_playing_this_round,
          sortStat(players, "chance_of_playing_this_round"),
          0
        ) *
          weights.def.chance_of_playing +
        normalize(player.form, sortStat(players, "form"), 0) *
          weights.def.form +
        normalize(
          player.points_per_game,
          sortStat(players, "points_per_game"),
          0
        ) *
          weights.def.points_per_game +
        normalize(player.ict_index, sortStat(players, "ict_index"), 0) *
          weights.def.ict +
        normalize(
          player.expected_goal_involvements,
          sortStat(players, "expected_goal_involvements"),
          0
        ) *
          weights.def.xgi
      );
      break;
    case 3:
      return (
        normalize(player.goals_scored, sortStat(players, "goals_scored"), 0) *
          weights.mid.goals_scored +
        normalize(player.assists, sortStat(players, "assists"), 0) *
          weights.mid.assists +
        normalize(
          player.chance_of_playing_this_round,
          sortStat(players, "chance_of_playing_this_round"),
          0
        ) *
          weights.mid.chance_of_playing +
        normalize(player.form, sortStat(players, "form"), 0) *
          weights.mid.form +
        normalize(
          player.points_per_game,
          sortStat(players, "points_per_game"),
          0
        ) *
          weights.mid.points_per_game +
        normalize(player.ict_index, sortStat(players, "ict_index"), 0) *
          weights.mid.ict +
        normalize(
          player.expected_goal_involvements,
          sortStat(players, "expected_goal_involvements"),
          0
        ) *
          weights.mid.xgi
      );
      break;
    default:
      return (
        normalize(player.goals_scored, sortStat(players, "goals_scored"), 0) *
          weights.fwd.goals_scored +
        normalize(player.assists, sortStat(players, "assists"), 0) *
          weights.fwd.assists +
        normalize(
          player.chance_of_playing_this_round,
          sortStat(players, "chance_of_playing_this_round"),
          0
        ) *
          weights.fwd.chance_of_playing +
        normalize(player.form, sortStat(players, "form"), 0) *
          weights.fwd.form +
        normalize(
          player.points_per_game,
          sortStat(players, "points_per_game"),
          0
        ) *
          weights.fwd.points_per_game +
        normalize(player.ict_index, sortStat(players, "ict_index"), 0) *
          weights.fwd.ict +
        normalize(
          Number(player.expected_goal_involvements),
          sortStat(players, "expected_goal_involvements"),
          0
        ) *
          weights.fwd.xgi
      );
  }
};

const mergePlayerStats = asyncHandler(async () => {
  const bootstrapStaticResponse = await fetch(
    "https://fantasy.premierleague.com/api/bootstrap-static/"
  );
  const bootstrapStaticData = await bootstrapStaticResponse.json();
  const players = bootstrapStaticData.elements;
  let delay = 500;
  const ipv6Addresses = [
    "2001:db8:3c4d:1542:dead:beef:cafe:f00d",
    "fec0:0:0:0:cafe:babe:1001:1a2b",
    "2a02:1588:3f41:89ab:cdef:0123:4567:89ab",
    "2001:470:1ffe:7ffe:0:0:0:8080",
    "fd42:4242:4242:4242::1234:5678",
    "2607:f8b0:4c0a:8cac:0:0:1337:beef",
    "2002:ac10:10a::1:2:3:4",
    "fcfe::5678:90ab:cdef:0123",
    "2a01:4f8:1020:2131::dead:beef",
    "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
    "2001:db8:beef:cafe:0:0:1:2345",
    "fc00::1234:5678:90ab:cdef",
    "2a00:2345:6789:abcd::ef01",
    "2002:ac10:2021:4041::dead:c0de",
    "fec3::cafe:babe:0123:4567",
    "2400:cb00:789a:bcde:0:0:1a2b:3c4d",
    "2001:4869:ef12:3456::7890:abcd",
    "fdcd::dead:beef:0000:0000:1111:2222",
    "2606:f000:1234:5678::9abc:def0",
    "2001:0db8:85a3:0000:0000:ffff:ffff:ffff",
  ];

  const mergedPlayers = await Promise.all(
    players.map(async (player) => {
      // const getElementSummary = async () => {
      //   try {
      //     await new Promise((resolve) => setTimeout(resolve, delay));
      //     const randIndex = Math.floor(Math.random() * ipv6Addresses.length);
      //     const randomIP = ipv6Addresses[randIndex];
      //     const elementSummaryResponse = await fetch(
      //       `https://fantasy.premierleague.com/api/element-summary/${player.id}`,
      //       {
      //         headers: {
      //           "X-Forwarded-For": randomIP,
      //         },
      //       }
      //     );
      //     if (elementSummaryResponse.status === 429) {
      //       delay *= 2; // double the delay if a 429 response is received
      //       return getElementSummary(); // retry the request
      //     } else if (!elementSummaryResponse.ok) {
      //       throw new Error(
      //         `HTTP error! status: ${elementSummaryResponse.status}`
      //       );
      //     }
      //     const elementSummaryData = await elementSummaryResponse.json();
      //     delay = 500; // reset the delay after a successful request
      //     return elementSummaryData;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // };
      // const elementSummaryData = await getElementSummary();
      return { ...player };
    })
  );

  return mergedPlayers;
});

const fetchElementSummaries = async () => {
  const elementSummaries = [];
  let delay = 200; // start with a delay of 500 milliseconds

  for (let id = 1; id <= 859; id++) {
    while (true) {
      // keep trying until the request is successful
      try {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const response = await fetch(
          `https://fantasy.premierleague.com/api/element-summary/${id}`
        );
        if (response.status === 429) {
          delay *= 2; // double the delay if a 429 response is received
        } else {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          delay = 500; // reset the delay after a successful request
          elementSummaries.push(data); // add the fetched data to the array
          break; // exit the while loop and move on to the next ID
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return elementSummaries;
};

const insertElementSummary = asyncHandler(async (summary) => {
  await ElementSummary.deleteMany();
  const insertedSummary = await ElementSummary.insertMany(summary);
  return insertedSummary;
});

const insertMergedPlayers = asyncHandler(async (mergedPlayers) => {
  await PlayerData.deleteMany();
  const insertedMergedPlayers = await PlayerData.insertMany(mergedPlayers);
  return insertedMergedPlayers;
});

const insertDreamTeam = asyncHandler(async (dreamTeam) => {
  await DreamTeam.deleteMany();
  const insertedDreamTeam = await DreamTeam.insertMany(dreamTeam);
  return insertedDreamTeam;
});

const insertSuggestions = asyncHandler(async (suggestions) => {
  await Suggestions.deleteMany();
  const insertedSuggestions = await Suggestions.insertMany(suggestions);
  return insertedSuggestions;
});

export {
  insertDreamTeam,
  fetchDreamTeam,
  fetchSuggestedPlayers,
  insertSuggestions,
  insertMergedPlayers,
  mergePlayerStats,
  insertElementSummary,
  fetchElementSummaries,
};
