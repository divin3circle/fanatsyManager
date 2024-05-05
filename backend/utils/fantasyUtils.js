import asyncHandler from "express-async-handler";
import DreamTeam from "../models/fantasyModels.js";

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

const insertDreamTeam = asyncHandler(async (dreamTeam) => {
  await DreamTeam.deleteMany();
  const insertedDreamTeam = await DreamTeam.insertMany(dreamTeam);
  return insertedDreamTeam;
});

export { insertDreamTeam, fetchDreamTeam };
