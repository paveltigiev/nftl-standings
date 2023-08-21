<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStandingsStore } from '../stores/standings'
// import { LeaguesAndRounds, Round } from '../types'

const standingsStore = useStandingsStore()

// const league_id = ref<number | undefined>()
// const round_name = ref<string>('')

const leaguesAndRounds = computed(() => standingsStore.leaguesAndRounds)
const standingsInfo = computed(() => standingsStore.standingsInfo)
const selectedRound = ref()
const selectedLeague = ref()
const rounds = ref()

standingsStore.getLeaguesAndRounds()
const loadStandings = () => {
  standingsStore.getStandings(selectedRound.value.league_id, selectedRound.value.name)
}

const setRounds = () => {
  rounds.value = selectedLeague.value.rounds
}
</script>

<template>

  <select v-model="selectedLeague" @change="setRounds()">
    <option
      v-for="league in leaguesAndRounds"
      :key="league.league_id"
      :value="league"
    >
      {{ league.league_name }}
    </option>
  </select>

  <select v-model="selectedRound" @change="loadStandings()" v-if="selectedLeague">
    <option
      v-for="round in rounds"
      :key="round.ID"
      :value="round"
    >
    {{round.name}}
    </option>
  </select>

  <pre>
    {{ standingsInfo }}
  </pre>

</template>

<style>

select {
  padding: 8px 16px;
  margin-right: 16px;
}

</style>