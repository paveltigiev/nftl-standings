const host: string = 'https://back-dev.fantazyapp.com'

export async function getStandingsRequest(league_id: number | undefined, round_name: string) {
  const response = await fetch(`${host}/public/standings?league_id=${league_id}&round=${round_name}`)
  const standingsInfo = await response.json()
  return standingsInfo.response
}
export async function getLeaguesAndRoundsRequest() {
  const response = await fetch(`${host}/public/rounds`)
  const leaguesAndRounds = await response.json()
  return leaguesAndRounds.response
}
