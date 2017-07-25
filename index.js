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

$('.team-submit').on('click', function(event) {
  event.preventDefault()
  let teamName = $('#team_name').val()
  let teamCity = $('#team_city').val()
  $('#team_name').val("")
  $('#team_city').val("")
  new Team(teamName, teamCity)
  renderTeams(".team-list-js")
})

$('.player-submit').on('click', function(event) {
  event.preventDefault()
  let playerName = $('#player_name').val()
  let playerHometown = $('#player_hometown').val()
  let playerTeam = $('.player-table').data("current_team")
  $('#player_name').val("")
  $('#player_hometown').val("")
  new Player(playerName, playerTeam, playerHometown)
  renderTopPlayers(playerTeam.id)
})

})


const store = {players: [], teams: []}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

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

    static find(id) {
      return store.teams.find((team) => {
        return team.id === id
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
      this.points = getRandomInt(0,700)
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

function render(html, where) {
  $(html).appendTo(where)
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



// renderTeam(tm1, ".player-list-js")
