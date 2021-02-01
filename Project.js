var player1 = prompt("Please enter player1's name.")
var player2 = prompt("Please enter player2's name.")


var table = $('table tr')

// change the background button of the button.
function dropcolor(col, row, color) {
  var loc = table.eq(row).find('td').eq(col).find('button').css('background-color', color);
}

// check which row should put.
function checkcolor(col) {
  for (var i = 5; i >= 0; i--) {
    var color = table.eq(i).find('td').eq(col).find('button').css('background-color');
    if (color === "rgb(128, 128, 128)") {
      return i;
    }
  }
}

// shifting turn between two player
function change_player(name) {
  if (name === player1) {
    return player2;
  } else {
    return player1;
  }
}

function check4(current) {
  count = 0;
  for (var k = 0; k < current.length; k++) {
    if (current[k] !== "rgb(128, 128, 128)") {
      if (current[k] === current[k + 1]) {
        count++;
      } else {
        count = 0;
      }
    } else {
      count = 0;
    }
    if (count === 3) {
      return true;
    }
  }
}


// check if conect 4 in Horizontal.
function checkwin_h() {
  current = [];
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 7; j++) {
      var color = table.eq(i).find('td').eq(j).find('button').css('background-color');
      current.push(color)
    }
    if (check4(current)) {
      return true;
    }
    current = [];
  }
}

// check if conect 4 in Vertical.
function checkwin_v() {
  current = [];
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 6; j++) {
      var color = table.eq(j).find('td').eq(i).find('button').css('background-color');
      current.push(color)
    }
    if (check4(current)) {
      return true;
    }
    current = [];
  }
}

// check if cinnect 4 in Diagonal negative.
function checkwin_d_p() {
  var first = [0, 0, 0, 1, 2, 3];
  var second = [0, 1, 2, 0, 0, 0]
  for (var i = 0; i < first.length; i++) {
    var current = [];
    var col = first[i];
    var row = second[i];
    while (col < 7 && row < 6) {
      var color = table.eq(row).find('td').eq(col).find('button').css('background-color');
      current.push(color);
      col++;
      row++
    }
    if (check4(current)) {
      return true;
    }
    current = [];
  }
}

// check if cinnect 4 in Diagonal positive.
function checkwin_d_n() {
  var first = [0, 0, 0, 1, 2, 3];
  var second = [3, 4, 5, 5, 5, 5]
  for (var i = 0; i < first.length; i++) {
    var current = [];
    var col = first[i];
    var row = second[i];
    while (col < 7 && row >= 0) {
      var color = table.eq(row).find('td').eq(col).find('button').css('background-color');
      current.push(color);
      col++;
      row--;
    }
    if (check4(current)) {
      return true;
    }
    current = [];
  }
}



var current_player = player1
var game_on = true;

$("h3").text(current_player + " it is your turn, please pick a colume to drop your blue chip.")

$('.board button').on('click', function() {
  var col = $(this).closest('td').index();
  if (game_on === true) {
    if (current_player === player1) {
      dropcolor(col, checkcolor(col), "blue");
    } else if (current_player === player2) {
      dropcolor(col, checkcolor(col), "red");
    }
  }


  if (checkwin_h() === true || checkwin_v() === true || checkwin_d_p() === true || checkwin_d_n() === true) {
    game_on = false;
    $("h3").text(current_player + " won!!!")
  }
  if (game_on === true) {
    current_player = change_player(current_player);


    if (current_player === player1) {
      $("h3").text(current_player + " it is your turn, please pick a colume to drop your blue chip.")
    } else {
      $("h3").text(current_player + " it is your turn, please pick a colume to drop your red chip.")
    }
  }
});
