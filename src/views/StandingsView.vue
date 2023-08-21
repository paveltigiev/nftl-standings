<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStandingsStore } from '../stores/standings'
// import { LeaguesAndRounds, Round } from '../types'

const standingsStore = useStandingsStore()
const leaguesAndRounds = computed(() => standingsStore.leaguesAndRounds)
const standingInfo = computed(() => standingsStore.standingInfo)
const selectedRound = ref()
const selectedLeague = ref()
const rounds = ref()
const loadStandings = () => standingsStore.getStandings(selectedRound.value.league_id, selectedRound.value.name)
const setRounds = () => rounds.value = selectedLeague.value.rounds
standingsStore.getLeaguesAndRounds()

const activeIndex = ref<number | null>(null)
const toggleDetails = (idx: number | null) => activeIndex.value = activeIndex.value === idx ? null : idx
</script>

<template>
  <section>

    <div class="card">
      <div class="select-group">
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
      </div>
    </div>

    <h1 v-if="!selectedLeague">
      Select league
    </h1>
    <h1 v-if="selectedLeague && !selectedRound">
      Select round
    </h1>

    <div class="card" v-if="standingInfo">
      <div class="card-row">
        <div class="card-row__name">The prize fund</div>
        <div class="card-row__value">
          {{ standingInfo.prize_pool }}
          <span title="TON">TON</span>
          <!-- <span class="" style="color: rgb(113, 117, 121);">
            ≈ <span>$0.06</span>
          </span> -->
        </div>
      </div>
      <div class="card-row">
        <div class="card-row__name">League name</div>
        <div class="card-row__value">
          {{ standingInfo.league_name }}
        </div>
      </div>
      <div class="card-row">
        <div class="card-row__name">Round name</div>
        <div class="card-row__value">
          {{ standingInfo.round }}
        </div>
      </div>
    </div>

    <div class="card card--tabbed" v-if="standingInfo">

      <div class="tx-history-wrap desktop-table">
        <table class="tx-table">
          <thead>
            <tr>
              <th></th>
              <th><div class="tx-table__cell">Wallet</div></th>
              <th><div class="tx-table__cell tx-table__cell--align-right">Points</div></th>
              <th><div class="tx-table__cell tx-table__cell--align-right">Position</div></th>
              <th><div class="tx-table__cell tx-table__cell--align-right">Ton wins</div></th>
              <th><div class="tx-table__cell tx-table__cell--align-right">Season</div></th>
              <th><div class="tx-table__cell tx-table__cell--align-right"></div></th>
            </tr>
          </thead>
          <tbody class="sub-list" v-for="(standing, idx) in standingInfo.standings" :key="standing.ID">
            <tr>
              <td>
                <a :href='`https://tonscan.org/address/${standing.wallet}`' class="tx-table-cell-icon" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class=""><path stroke="currentColor" stroke-linecap="round" stroke-width="1.3" d="M7.665 9.301c-.155-.067-.338-.206-.549-.417a2.6 2.6 0 010-3.677l1.768-1.768a2.6 2.6 0 013.677 3.677l-1.167 1.167m-3.06-1.584c.156.067.339.206.55.417a2.6 2.6 0 010 3.677l-1.768 1.768A2.6 2.6 0 113.44 8.884l1.167-1.167"></path></svg>
                </a>  
              </td>
              <td>
                <div class="tx-table__cell">
                  <span class="address-link ui-looong">{{ standing.wallet }}</span>
                </div>
              </td>
              <td><div class="tx-table__cell tx-table__cell--align-right">{{ standing.points }}</div></td>
              <td><div class="tx-table__cell tx-table__cell--align-right">{{ standing.pos }}</div></td>
              <td><div class="tx-table__cell tx-table__cell--align-right">{{ standing.ton_wins }}</div></td>
              <td><div class="tx-table__cell tx-table__cell--align-right">{{ standing.season }}</div></td>
              <td>
                <div class="tx-table__cell tx-table__cell--align-right">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none"
                    class="tx-table-expand-caret"
                    @click="toggleDetails(idx)"
                    :class="{ 'tx-table-expand-caret--expanded': activeIndex === idx }"
                  >
                    <path stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" d="M1.5 4.75l5.5 5.5 5.5-5.5"></path>
                  </svg>
                </div>
              </td>
            </tr>
            <tr class="tx-table-row-details" v-if="activeIndex !== null && activeIndex === idx">
              <td colspan="7">
                <div class="user-nft__header">Winners</div> 
                <section class="user-nfts">
                  <a :href="`https://tonscan.org/nft/${item.nft_address}`" target="_blank" class="user-nft" v-for="item in standing.winners" :key="item.player_id">
                    <div class="user-nft__image">
                      <img :src="item.image_url" alt="" class="user-nft__image__img">
                    </div>
                    <footer class="user-nft__footer">
                      <a :href="`https://tonscan.org/nft/${item.nft_address}`" class="user-nft__collection">
                        <span class="user-nft__collection__text">{{ item.league_name }}</span>
                      </a>
                      <h3 class="user-nft__name">{{ item.player_club }}</h3>
                    </footer>
                  </a>
                </section>
                <div class="user-nft__header">Bench</div> 
                <section class="user-nfts">
                  <a :href="`https://tonscan.org/nft/${item.nft_address}`" target="_blank" class="user-nft" v-for="item in standing.bench" :key="item.player_id">
                    <div class="user-nft__image">
                      <img :src="item.image_url" alt="" class="user-nft__image__img">
                    </div>
                    <footer class="user-nft__footer">
                      <a :href="`https://tonscan.org/nft/${item.nft_address}`" class="user-nft__collection">
                        <span class="user-nft__collection__text">{{ item.league_name }}</span>
                      </a>
                      <h3 class="user-nft__name">{{ item.player_club }}</h3>
                    </footer>
                  </a>
                </section>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </section>

</template>

<style lang="scss" scoped>

.select-group {
  display: flex;
  flex-direction: row;
  padding: 12px;
}

select {
  padding: 8px 16px;
  margin-right: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  background-color: white;
  outline: none; /* Убираем стандартный фокусовый бордер */
}

/* Стили для опций в выпадающем списке */
select option {
  font-size: 14px;
  color: #333;
}

/* Стили для активной опции */
select option:checked {
  background-color: #f5f5f5;
}

/* Стили для активной кнопки */
.active {
  background-color: #007bff;
  color: white;
  border: none;
}

.user-nft__header {
  padding: 12px 20px 0 20px;
  font-weight: 500;
  font-size: 1.2em;
  text-transform: uppercase;
}

// TabUserNFTs

.user-nft {
  background: var(--user-nft-list-item-background);
  border-radius: 8px;
  box-shadow: 1px 1px var(--user-nft-list-item-box-shadow-blur) rgba(0,0,0,.19);
  color: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: background .2s ease;
}
.user-nft, .user-nft:hover {
  text-decoration: none;
}
.user-nft__image {
  aspect-ratio: 1/1;
  display: block;
  font-size: 0;
  overflow: hidden;
}
.user-nft__image, .user-nft__image__img {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
}
.user-nft {
  background: var(--user-nft-list-item-background);
  border-radius: 8px;
  box-shadow: 1px 1px var(--user-nft-list-item-box-shadow-blur) rgba(0,0,0,.19);
  color: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transition: background .2s ease;
}
.user-nft, .user-nft:hover {
  text-decoration: none;
}
.user-nfts {
  grid-column-gap: 24px;
  grid-row-gap: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  padding: 24px;
}
.user-nft, .user-nft:hover {
  text-decoration: none;
}
.user-nft__footer {
  padding: 12px 12px 10px;
}
.user-nft__collection {
  align-items: center;
  color: var(--user-nft-list-item-text-muted-color);
  display: flex;
  font-size: 13px;
  font-weight: 400;
  margin: -4px;
  padding: 4px 4px 8px;
  white-space: nowrap;
}
.user-nft__collection__text {
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-nft__name {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>