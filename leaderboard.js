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

// taken from article here: https://gist.github.com/biesiad/889139
String.prototype.leftJustify = function( length, char ) {
  var fill = [];
  while ( fill.length + this.length < length ) {
    fill[fill.length] = char;
  }
  return fill.join('') + this;
};

String.prototype.rightJustify = function( length, char ) {
  var fill = [];
  while ( fill.length + this.length < length ) {
    fill[fill.length] = char;
  }
  return this + fill.join('');
};

function gameStats() {
  this.name = null;
  this.wins = 0;
  this.losses = 0;
  this.rank = 0;
  this.ratio = 0;
  this.summary = function(gameData) {
    var output = "";
    output = output + "Team: " + this.name + "\n";
    output = output + "Rank: " + this.rank + "\n";
    output = output + "Wins: " + this.wins + "\n";
    output = output + "Losses: " + this.losses + "\n";
    output = output + "Games\n"
    for (var i = 0; i < gameData.length; i++) {
      if (gameData[i].home_team == this.name) {
        output = output + "The " + this.name + " played against the " + gameData[i].away_team + "." + " The score was " + gameData[i].home_score + " to " + gameData[i].away_score + ". \n";
      } else if (gameData[i].away_team == this.name){
        output = output + "The " + this.name + " played against the " + gameData[i].home_team + "." + " The score was " + gameData[i].away_score + " to " + gameData[i].home_score + ". \n";
      };
    };
    return output;
  };
};

var printSummaries = function(teams) {
  for (var i = 0; i < teams.length; i++) {
    console.log(teams[i].summary(gameInfo()));
  };
};

var findTeam = function(teams, name) {
  var team;
  for (var i = 0; i < teams.length; i++) {
    if (teams[i].name == name) {
      team = teams[i]
    };
  };
  return team;
};

var printBoard = function(teams) {
  var boarder = "--------------------------------------------------"
  var fullBoard = boarder + "\n" + "| Name      Rank      Total Wins    Total Losses |\n"
  for (var i = 0; i < teams.length; i++) {
    var rank = teams[i].rank.toString();
    var wins = teams[i].wins.toString();
    var losses = teams[i].losses.toString();
    fullBoard = fullBoard + "| " + teams[i].name.rightJustify(12, " ") + rank.rightJustify(13, " ") + wins.rightJustify(14, " ") + losses.rightJustify(6, " ") + "  |\n"
  }
  fullBoard = fullBoard + boarder;
  console.log(fullBoard);
}

var setRanks = function(teams) {
  var sortedTeams = null;
  for ( var i = 0; i < teams.length; i++ ) {
    teams[i].ratio = teams[i].wins / (teams[i].wins + teams[i].losses);
  };
  sortedTeams = teams.sort(function(a, b){
    return a.ratio-b.ratio
  });
  sortedTeams = sortedTeams.reverse();
  for (var j = 0; j < sortedTeams.length; j++) {
    sortedTeams[j].rank = (j + 1);
  }
}

var loadScores = function(teams, gameInfo) {
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

    var team = findTeam(teams, winner);
    team.wins++;
    team = findTeam(teams, loser);
    team.losses++;
  };
};

var setName = function(gameInfo) {
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

var createTeams = function(teamNames) {
  var teams = [];
  for (var i = 0; i < teamNames.length; i++) {
    var team = new gameStats();
    team.name = teamNames[i];
    teams.push(team);
  };
  return teams;
};

teams = createTeams(setName(gameInfo()));
loadScores(teams, gameInfo());
setRanks(teams);
printBoard(teams);
printSummaries(teams);
