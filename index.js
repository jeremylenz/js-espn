$(function() {

console.log('document ready')

renderTeams(".team-list-js")

$('body').on('click', '.del_x', function(event) {
  let playerId = parseInt(this.id.split("_")[1],10)
  deletePlayer(playerId)
})

$('body').on('click', '.display-players', function(event) {
  let teamId = parseInt(this.id.split("_")[1],10)
  $('.player-table').show()
  renderTopPlayers(teamId)
})

$('.submit').on('click', function(event) {
  event.preventDefault()
  let teamName = $('#team_name').val()
  let teamCity = $('#team_city').val()
  $('#team_name').val("")
  $('#team_city').val("")
  new Team(teamName, teamCity)
  renderTeams(".team-list-js")
})

})


const store = {players: [], teams: []}


function CreateTeam () {
  let nextId = 0

  return class {
    constructor (name, city) {
      this.name = name
      this.city = city
      this.id = ++nextId
      store.teams.push(this)
    }

    players() {
      return store.players.filter((player) => {
        return player.team === this
      })
    }

  }
}

function CreatePlayer (){
  let nextId = 0

  return class  {
    constructor (name, team, hometown) {
      this.name = name
      this.team = team
      this.hometown = hometown
      this.id = ++nextId
      this.points = 0
      store.players.push(this)
    }

    destroy() {
      let ind = store.players.indexOf(this)
      // store.players.splice(ind, 1)
      this.team = "Free Agent"
    }

  }
}

let Team = CreateTeam()
let Player = CreatePlayer()
let tm1 = new Team('sixers', 'philly')
let pl1 = new Player('jim jim', tm1, "Denver")
let pl2 = new Player('bob bob', tm1, "Ithaca")
let tm2 = new Team('seveners', 'east hiawatha')
let pl3 = new Player('steve steve', tm2, "Chappaqua")
let pl4 = new Player('james james', tm2, "Queens")
console.log('created seeds')
pl1.points = 332
pl2.points = 198
pl3.points = 247
pl4.points = 34

function teamHTML(team) {
  return `<tr id=team_${team.id} class="team-row-js">
    <td>${team.name}</td>
    <td>${team.city}</td>
    <td class="display-players" id="team_${team.id}"><button type="button" class="display-players" id="team_${team.id}_display">Display Team</button></td>
  </tr>`
}

  // <td><button type="button" class="display-players" id="team_0_display">Display Team</button></td>

function renderTeams(where) {
  $(where).empty()
  store.teams.forEach((team) => {
    render(teamHTML(team), where)
  })

}


function playerHTML(player) {
  return `<tr id=player_${player.id} class="player-row-js">
    <td>${player.name}</td>
    <td>${player.hometown}</td>
    <td>${player.points}</td>
    <td class="nothing" id="player_${player.id}"><button type="button" class="del_x" id="player_${player.id}_del">x</button></td>
  </tr>`
}

function renderTopPlayers(teamId) {
  let players = store.players.filter((player) => {
    return player.team.id === teamId
  })
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

function render(html, where) {
  $(html).appendTo(where)
}

function deletePlayer(id) {
  $(`#player_${id}.player-row-js`).remove()
  let playerToDelete = store.players.find(function(player) {
    return player.id == id
  })
  playerToDelete.destroy()
}



// renderTeam(tm1, ".player-list-js")
