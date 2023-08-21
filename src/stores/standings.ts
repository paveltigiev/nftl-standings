import { defineStore } from 'pinia'
import { getStandingsRequest, getLeaguesAndRoundsRequest } from '../api'
import { StandingInfo, LeagueAndRounds } from '../types'

interface StandingsState {
  standingInfo: StandingInfo | null,
  leaguesAndRounds: LeagueAndRounds[] | null
}

// export const useStandingsStore = defineStore("standingsStore", () => {
export const useStandingsStore = defineStore('standingsStore', {
  state: (): StandingsState => {
    return {
      standingInfo: null,
      leaguesAndRounds: null
    }
  },
  actions: {
    async getStandings(league_id: number | undefined, round_name: string) {
      try {
        const standingInfo  = await getStandingsRequest(league_id, round_name)
        this.standingInfo = standingInfo
      } catch (error) {
        console.error('Error fetching standingInfo:', error)
      }
    },
    async getLeaguesAndRounds() {
      try {
        const rounds = await getLeaguesAndRoundsRequest()
        this.leaguesAndRounds = rounds
      } catch (error) {
        console.error('Error fetching rounds:', error)
      }
    },
  }
})
