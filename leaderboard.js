var gameInfo = function(){
  return [
    {
      home_team: "Patriots",
      away_team: "Broncos",
      home_score: 7,
      away_score: 3
    },
    {
      home_team: "Broncos",
      away_team: "Colts",
      home_score: 3,
      away_score: 0
    },
    {
      home_team: "Patriots",
      away_team: "Colts",
      home_score: 11,
      away_score: 7
    },
    {
      home_team: "Steelers",
      away_team: "Patriots",
      home_score: 7,
      away_score: 21
    }
  ]
}

var teams;

function gameStats(gameInfo) {
  this.name = null;
  this.wins = 0;
  this.losses = 0;
  this.rank = 0;


  var findTeam = function(teams, name) {
    var team;
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].name == name) {
        team = teams[i]
      };
    };
    return team;
  };

  var loadScores = function() {
    var winner;
    var loser;
    for ( var i = 0; i < gameInfo.length; i++ ) {
      if (gameInfo[i].home_score > gameInfo[i].away_score) {
        winner = gameInfo[i].home_team;
        loser = gameInfo[i].away_team;
      }
      else {
        winner = gameInfo[i].away_team;
        loser = gameInfo[i].home_team;
      }
    };
    // var team = findTeam(setName, )
  };

  var setName = function() {
    var teamNames = [];
    for (var i = 0; i < gameInfo.length; i++) {
      if (!teamNames.includes(gameInfo[i].home_team)) {
        teamNames.push(gameInfo[i].home_team);
      }
      else if (!teamNames.includes(gameInfo[i].away_team)) {
        teamNames.push(gameInfo[i].away_team);
      };
    };
    return teamNames;
  };

  var createTeams = function() {
    var teams = [];
    var teamNames = this.setName();
    for (var i = 0; i < teamNames.length; i++) {
      var team = new gameStats();
      team.name = teamNames[i];
      teams.push(team);
    };
    return teams;
  };
};

// teams = createTeams(gameInfo(), setName);

var setRank = function() {
};
