
// seeds

let Team = CreateTeam()
let Player = CreatePlayer()
let tm1 = new Team('Sixers', 'Philadelphia')
let pl1 = new Player('jim jim', tm1, "Denver")
let pl2 = new Player('bob bob', tm1, "Ithaca")
let tm2 = new Team('Seveners', 'East Hiawatha')
let pl3 = new Player('steve steve', tm2, "Chappaqua")
let pl4 = new Player('james james', tm2, "Queens")
console.log('created seeds')
pl1.points = 332
pl2.points = 198
pl3.points = 247
pl4.points = 34


function render(html, where) {
  $(html).appendTo(where)
}

function renderTeams(where) {
  $(where).empty()
  store.teams.forEach((team) => {
    render(teamHTML(team), where)
  })

}

function renderTopPlayers(teamId) {
  let team = Team.find(teamId)
  let players = team.players()
  $('.player-table').data("current_team", team)
  $('.player-h3').text(`${team.city} ${team.name}`)
  let sortedPlayers = getTopPlayers(players, 3)
  $(".player-list-js").empty()
  sortedPlayers.forEach((player => {
    render(playerHTML(player), ".player-list-js")
  }))
}

function getTopPlayers(playerList, numOfPlayers) {
  let sortedList = playerList.sort((playerA, playerB) => {
    if(playerA.points > playerB.points) {
      return -1;
    }
    if(playerA.points < playerB.points) {
      return 1;
    }
    if(playerA.points == playerB.points) {
      return 0;
    }
  })
  return sortedList.slice(0, numOfPlayers)
}


function deletePlayer(id) {
  $(`#player_${id}.player-row-js`).remove()
  let playerToDelete = store.players.find(function(player) {
    return player.id == id
  })
  teamId = playerToDelete.team.id
  playerToDelete.destroy()
  renderTopPlayers(teamId)

}
