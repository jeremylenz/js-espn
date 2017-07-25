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








// renderTeam(tm1, ".player-list-js")
