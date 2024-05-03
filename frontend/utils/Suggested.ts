//fetch players data, and sort them by positions i.e, 1, 2, 3, 4 for gk, def, mid and st respectively
//sort them by ict index, then from each position, select the top 3 players
//calculate the combined index of each player, and select the top 3 players from each position
//display the top 3 players from each position in the UI

type PlayerData = {
  chance_of_playing_next_round: number;
  chance_of_playing_this_round: number;
  code: number;
  cost_change_event: number;
  cost_change_event_fall: number;
  cost_change_start: number;
  cost_change_start_fall: number;
  dreamteam_count: number;
  element_type: number;
  ep_next: string;
  ep_this: string;
  event_points: number;
  first_name: string;
  form: string;
  id: number;
  in_dreamteam: boolean;
  news: string;
  news_added: string;
  now_cost: number;
  photo: string;
  points_per_game: string;
  second_name: string;
  selected_by_percent: string;
  special: boolean;
  squad_number: null | number;
  status: string;
  team: number;
  team_code: number;
  total_points: number;
  transfers_in: number;
  transfers_in_event: number;
  transfers_out: number;
  transfers_out_event: number;
  value_form: string;
  value_season: string;
  web_name: string;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  influence_rank: number;
  influence_rank_type: number;
  creativity_rank: number;
  creativity_rank_type: number;
  threat_rank: number;
  threat_rank_type: number;
  ict_index_rank: number;
  ict_index_rank_type: number;
  corners_and_indirect_freekicks_order: number;
  corners_and_indirect_freekicks_text: string;
  direct_freekicks_order: null | number;
  direct_freekicks_text: string;
  penalties_order: null | number;
  penalties_text: string;
  expected_goals_per_90: number;
  saves_per_90: number;
  expected_assists_per_90: number;
  expected_goal_involvements_per_90: number;
  expected_goals_conceded_per_90: number;
  goals_conceded_per_90: number;
  now_cost_rank: number;
  now_cost_rank_type: number;
  form_rank: number;
  form_rank_type: number;
  points_per_game_rank: number;
  points_per_game_rank_type: number;
  selected_rank: number;
  selected_rank_type: number;
  starts_per_90: number;
  clean_sheets_per_90: number;
  combined_index?: number;
};

//fetching function
const fetchData = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

//sorting function
const sortPlayers = (players: PlayerData[]) => {
  const gks: PlayerData[] = players.filter(
    (player) => player.element_type === 1
  );
  const def: PlayerData[] = players.filter(
    (player) => player.element_type === 2
  );
  const mid: PlayerData[] = players.filter(
    (player) => player.element_type === 3
  );
  const st: PlayerData[] = players.filter(
    (player) => player.element_type === 4
  );
  return { gks, def, mid, st };
};
//sort by ict index
const sortByIndex = (players: PlayerData[]) => {
  return players.sort(
    (a, b) => parseFloat(b.ict_index) - parseFloat(a.ict_index)
  );
};

//normalize data
const normalizeField = (maxStat: number, playerStat: number) => {
  return (playerStat - 0) / (maxStat - 0);
};
//calculate combined index
const combinedIndexCalculator = (players: PlayerData[]) => {
  //pick top 3 players
  const suggestedPlayers = players.slice(0, 3);
  //calculate combined index
  suggestedPlayers.forEach((player) => {
    const normalizedICT = normalizeField(300, parseFloat(player.ict_index));
    const normalizedForm = normalizeField(15, parseFloat(player.form));
    const normalizedOwnership = normalizeField(
      100,
      parseFloat(player.selected_by_percent)
    );
    const normalizedValue = normalizeField(2, parseFloat(player.value_season));
    const normalizedXGI = normalizeField(
      10,
      parseFloat(player.expected_goal_involvements)
    );
    const normalizedAvailability = normalizeField(
      100,
      player.chance_of_playing_this_round ?? 0
    );
    const combinedIndex =
      normalizedICT +
      normalizedForm +
      normalizedOwnership +
      normalizedValue +
      normalizedXGI +
      normalizedAvailability;
    player["combined_index"] = combinedIndex;
  });
  //sort by combined index
  return suggestedPlayers.sort((a, b) => b.combined_index! - a.combined_index!);
};
const combinedIndexCalculatorGks = (players: PlayerData[]) => {
  //pick top 3 players
  const suggestedPlayers = players.slice(0, 3);
  //calculate combined index
  suggestedPlayers.forEach((player) => {
    const normalizedICT = normalizeField(300, parseFloat(player.ict_index));
    const normalizedForm = normalizeField(15, parseFloat(player.form));
    const normalizedOwnership = normalizeField(
      100,
      parseFloat(player.selected_by_percent)
    );
    const normalizedValue = normalizeField(2, parseFloat(player.value_season));
    const normalizedXGC = normalizeField(
      3,
      parseFloat(player.expected_goals_conceded_per_90.toString())
    );
    const normalizedXCS = normalizeField(
      1,
      parseFloat(player.clean_sheets_per_90.toString())
    );
    const normalizedAvailability = normalizeField(
      100,
      player.chance_of_playing_this_round ?? 0
    );
    const combinedIndex =
      normalizedICT +
      normalizedForm +
      normalizedOwnership +
      normalizedValue -
      normalizedXGC -
      normalizedXCS +
      normalizedAvailability;
    player["combined_index"] = combinedIndex;
  });
  //sort by combined index
  return suggestedPlayers.sort((a, b) => b.combined_index! - a.combined_index!);
};

//rank by combined index
// const rankByIndex = (players: PlayerData[]) => {};

const combinedIndexCalculatorForCaptainPicks = (players: PlayerData[]) => {
  //pick top 3 contenders
  const suggestedPlayers = players.slice(0, 3);
  //calculate combined index for captain picks
  suggestedPlayers.forEach((player) => {
    const normalizedICT = normalizeField(300, parseFloat(player.ict_index));
    const normalizedForm = normalizeField(15, parseFloat(player.form));
    const normalizedOwnership = normalizeField(
      100,
      parseFloat(player.selected_by_percent)
    );
    const normalizedValue = normalizeField(2, parseFloat(player.value_season));
    const normalizedXGI = normalizeField(
      10,
      parseFloat(player.expected_goal_involvements)
    );
    const normalizedXG90 = normalizeField(2, player.expected_goals_per_90);
    const normalizedXA90 = normalizeField(2, player.expected_assists_per_90);
    const normalizedAvailability = normalizeField(
      100,
      player.chance_of_playing_this_round ?? 0
    );
    const normalizedBPS = normalizeField(30, player.bonus);
    const combinedIndex =
      normalizedICT +
      normalizedForm +
      normalizedOwnership +
      normalizedValue +
      normalizedXGI +
      normalizedXG90 +
      normalizedXA90 +
      normalizedAvailability +
      normalizedBPS;

    player["combined_index"] = combinedIndex;
  });
};

export {
  fetchData,
  sortPlayers,
  sortByIndex,
  combinedIndexCalculator,
  combinedIndexCalculatorForCaptainPicks,
  combinedIndexCalculatorGks,
  PlayerData,
};
