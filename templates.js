function teamHTML(team) {
  return `<tr id=team_${team.id} class="team-row-js">
    <td>${team.name}</td>
    <td>${team.city}</td>
    <td class="display-players" id="team_${team.id}"><button type="button" class="display-players" id="team_${team.id}_display">Display Team</button></td>
  </tr>`
}

function playerHTML(player) {
  return `<tr id=player_${player.id} class="player-row-js">
  <td>${player.name}</td>
  <td>${player.hometown}</td>
  <td>${player.points}</td>
  <td class="nothing" id="player_${player.id}"><button type="button" class="del_x" id="player_${player.id}_del">x</button></td>
  </tr>`
}
