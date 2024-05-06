import asyncHandler from "express-async-handler";
import DreamTeam, { Suggestions } from "../models/fantasyModels.js";

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
};
