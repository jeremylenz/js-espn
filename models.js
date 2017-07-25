
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

    static find(id) {
      return store.teams.find((team) => {
        return team.id === id
      })
    }


  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
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
