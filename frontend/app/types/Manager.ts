type CupMatch = {
  id: number;
  entry_1_entry: number;
  entry_1_name: string;
  entry_1_player_name: string;
  entry_1_points: number;
  entry_1_win: number;
  entry_1_draw: number;
  entry_1_loss: number;
  entry_1_total: number;
  entry_2_entry: number;
  entry_2_name: string;
  entry_2_player_name: string;
  entry_2_points: number;
  entry_2_win: number;
  entry_2_draw: number;
  entry_2_loss: number;
  entry_2_total: number;
  is_knockout: boolean;
  league: number;
  winner: number;
  seed_value: null;
  event: number;
  tiebreak: null;
  is_bye: boolean;
  knockout_name: string;
};

type Cup = {
  matches: [];
  status: {
    qualification_event: null;
    qualification_numbers: null;
    qualification_rank: null;
    qualification_state: null;
  };
  cup_matches: CupMatch[];
};

type Classic = {
  id: number;
  name: string;
  short_name: string;
  created: string;
  closed: boolean;
  rank: number | null;
  max_entries: number | null;
  league_type: string;
  scoring: string;
  admin_entry: number | null;
  start_event: number;
  entry_can_leave: boolean;
  entry_can_admin: boolean;
  entry_can_invite: boolean;
  has_cup: boolean;
  cup_league: number;
  cup_qualified: boolean;
  rank_count: number;
  entry_percentile_rank: number;
  entry_rank: number;
  entry_last_rank: number;
};

type League = {
  classic: Classic[];
  h2h: [];
  cup: Cup;
};

type PlayerData = {
  id: number;
  joined_time: string;
  started_event: number;
  favourite_team: number;
  player_first_name: string;
  player_last_name: string;
  player_region_id: number;
  player_region_name: string;
  player_region_iso_code_short: string;
  player_region_iso_code_long: string;
  years_active: number;
  summary_overall_points: number;
  summary_overall_rank: number;
  summary_event_points: number;
  summary_event_rank: number;
  current_event: number;
  leagues: League;
  name: string;
  name_change_blocked: boolean;
  entered_events: number[];
  kit: null;
  last_deadline_bank: number;
  last_deadline_value: number;
  last_deadline_total_transfers: number;
};

export type { PlayerData, Classic, League, Cup, CupMatch };
