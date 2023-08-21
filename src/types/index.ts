export interface StandingInfo {
  prize_pool: number
  league_name: string
  round: string
  [key: string]: any
}

export interface Standing {
  ID: number
  wallet: string
  points: number
  pos: number
  ton_wins: number
  round: string
  league: number
  season: string
  winners: Winner[]
}
export interface Winner {
  round: string
  league: number
  points: number
  season: string
  image_url: string
  player_id: string
  player_pos: string
  content_url: string
  league_name: string
  nft_address: string
  player_club: string
  owner_address: string
  starting_lineup: string
}

export interface LeagueAndRounds {
  league_id: number,
  league_name: string,
  rounds: Round[]
  [key: string]: any
}

export interface Round {
  ID: number,
  name: string,
  league_id: number,
  league_name: string,
  start_time: string,
  end_time: string,
  status: string,
  prize_pool: number
}
