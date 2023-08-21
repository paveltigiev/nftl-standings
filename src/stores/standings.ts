import { defineStore } from 'pinia'
import { getStandingsRequest, getLeaguesAndRoundsRequest } from '../api'
import { Standing, LeaguesAndRounds } from '../types'

interface StandingsState {
  standingsInfo: Standing[],
  leaguesAndRounds: LeaguesAndRounds[]
}

// export const useStandingsStore = defineStore("standingsStore", () => {
export const useStandingsStore = defineStore('standingsStore', {
  state: (): StandingsState => {
    return {
      standingsInfo: [],
      leaguesAndRounds: []
    }
  },
  actions: {
    async getStandings(league_id: number | undefined, round_name: string) {
      try {
        const standingsInfo  = await getStandingsRequest(league_id, round_name)
        this.standingsInfo = standingsInfo
      } catch (error) {
        console.error('Error fetching standingsInfo:', error)
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
