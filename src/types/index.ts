export interface Standing {
  prize_pool: number
  league_name: string
  round: string
  [key: string]: any
}

export interface LeaguesAndRounds {
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
