// This js file deals with all the DOM manipulation

$(document).ready(function() {

  // construct game board (grid)

  // stores the game board size
  // note: in this case, the game board will be 3 x 3
  const n = tictactoe.gridSize;

  // classes row, col, diagonal1 and diagonal2 are added to each 'cell' to enable the highlighting the winning combination once there is 3 of same item in a row
  let gameBoard = '';
  for (let i = 0; i < n; i++) {
    gameBoard += "<tr>";
    for (let j = 0; j < n; j++) {
      gameBoard += "<td id='c" + i.toString() + j.toString() + "' class='cell row" + i.toString() + " col" + j.toString();

      if (i === j) {
        gameBoard += " diagonal1" + "diagonal='1'";
      }
      if (j === n - 1 - i) {
        gameBoard +=" diagonal2" + "diagonal='2'";
      }
      gameBoard += "' row=" + i.toString() + " col=" + j.toString() + "></td>";
    }
    gameBoard += "</tr>"
  }

  $('#game-board table').append(gameBoard);

  // construct Marvel and DC character boards for players to select

  tictactoe.createCharacterBoard();

  // construct the Marvel character board in rows of 3

  const marvelCharacterList = Object.keys(tictactoe.marvelBoard);
  let marvelCharacterBoard = "<tr>";

  for (let j = 0; j < marvelCharacterList.length; j++) {
    const key = marvelCharacterList[j];
    marvelCharacterBoard += "<td id=" + key + " class='character-icons'><img src=" + tictactoe.marvelBoard[key] + "></td>";
    if ((j + 1) % 3 === 0) {
      marvelCharacterBoard += "</tr><tr>"
      }
    }

  // construct the Marvel character board in rows of 3
  let marvelCharacterBoardToAppend = '';
  if (marvelCharacterList.length % 3 === 0) {
    marvelCharacterBoardToAppend = marvelCharacterBoard.substring(0, marvelCharacterBoard.length - 4);
  } else if (marvelCharacterList.length % 3 !== 0) {
    marvelCharacterBoardToAppend = marvelCharacterBoard + "</tr>";
  }

  $('.marvel-board table').append(marvelCharacterBoardToAppend);

  // construct the DC character board

  const dcCharacterList = Object.keys(tictactoe.dcBoard);
  let dcCharacterBoard = "<tr>";

  for (let j = 0; j < dcCharacterList.length; j++) {

    const key = dcCharacterList[j];
    dcCharacterBoard += "<td id=" + key + " class='character-icons'><img src=" + tictactoe.dcBoard[key] + "></td>";
    if ((j + 1) % 3 === 0) {
      dcCharacterBoard += "</tr><tr>"
      }
    }

  // construct the DC character board in rows of 3

  let dcCharacterBoardToAppend = '';
  if (dcCharacterList.length % 3 === 0) {
    dcCharacterBoardToAppend = dcCharacterBoard.substring(0, dcCharacterBoard.length - 4);
  } else if (dcCharacterList.length % 3 !== 0) {
    dcCharacterBoardToAppend = dcCharacterBoard + "</tr>";
  }

  $('.dc-board table').append(dcCharacterBoardToAppend);

  // refers to the cells on the game board
  let $boardCell = $('#game-board table tr td');

  const resetGame = function() {
    tictactoe.constructBoard();
    tictactoe.moves = 0; // resets the number of moves made on the board to zero
    $boardCell.each(function() { //TODO: check if setting text to empty actually removes the icons
      $(this).text('');
    });

    // resets the board cells to their default settings
    $boardCell.removeClass('clicked');
    $boardCell.removeClass('no-events');
    $boardCell.removeAttr('style');

    // reset the message pop-up box to contain nothing
    $('#message').text("");
    $('#message').css('display', 'none');

    // display character images
    $('#player-a-score .char-img img').css('opacity','1');
    $('#player-b-score .char-img img').css('opacity','1');

    // removes any messages that shows the winner from previous game
    $('.winner-message-dc').remove();
    $('.winner-message-marvel').remove();

    // randomly select Player A or B to start the game
    tictactoe.startsGame();
    // $('.score p').remove();

    if (tictactoe.turn === 0) {

      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');

    } else if (tictactoe.turn === 1) {

      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');

    }

    // disable rematch and new game buttons
    $('#rematch').addClass('no-events');
    $('#rematch').css('opacity', '0.5');
    $('#new-game').addClass('no-events');
    $('#new-game').css('opacity', '0.5');

    // adds CSS style for Player A and Player B on hover
    $boardCell.hover(function() {
      if (tictactoe.turn === 0) {
        $(this).removeClass('playerB');
        $(this).addClass('playerA');
      } else if (tictactoe.turn === 1) {
        $(this).removeClass('playerA');
        $(this).addClass('playerB');
      }}, function() {
        $(this).removeClass('playerA');
        $(this).removeClass('playerB');
      }
    );
  };

  // resets the game upon loading of document
  resetGame();

  // rematch buttons and new game button disabled upon document load
  $('#rematch').addClass('no-events');
  $('#new-game').addClass('no-events');

  // randomly selects who starts game
  tictactoe.startsGame();

  // randomly selects characters for Player A and B to be placed on screen
  tictactoe.randomAssignMarvelCharacter();
  tictactoe.randomAssignDcCharacter();

  // set characters onto the screen

  let setCharactersOnScreen = function(player) {

    if (player === "playerA") {

      // store the links to the profile picture of the character
      const characterA = tictactoe.selectedCharacters['playerA'][3];

      // place character profile pictures onto screen
      $('#player-a-score .char-img').prepend("<img src='" + characterA + "' class='cover'>");

      // store the name of Marvel character and place it on screen
      const marvelCharacterName = tictactoe.selectedCharacters['playerA'][1];
      $('#marvel-name').text(marvelCharacterName);
    } else if (player === "playerB") {

      const characterB = tictactoe.selectedCharacters['playerB'][3];
      $('#player-b-score .char-img').prepend("<img src='" + characterB + "' class='cover'>");

      // store the name of the DC character and place it on screen
      const dcCharacterName = tictactoe.selectedCharacters['playerB'][1];
      $('#dc-name').text(dcCharacterName);
    }
  };

  // set random characters on screen upon document load
  setCharactersOnScreen("playerA");
  setCharactersOnScreen("playerB");

  // this function highlights the 3 cells that contain the winning combination
  // this function works in conjunction with the tictactoe method to check for a winner
  const highlightWinningCells = function(array) {

    let winningCellCss = {};
    if (array[0] === 'x') {
      winningCellCss = {'background-color':'red','border': '1px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'};
    } else if (array[0] === 'o') {
      winningCellCss = {'background-color':'blue','border': '1px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'};
    }

    if (array[1] === 'row') {
      const rowNo = array[2];
      if (rowNo === 0) {
        $('.row0').css(winningCellCss);
      } else if (rowNo === 1) {
        $('.row1').css(winningCellCss);
      } else if (rowNo === 2) {
        $('.row2').css(winningCellCss);
      }
    }

    if (array[1] === 'col') {
      const colNo = array[2];
      if (colNo === 0) {
        $('.col0').css(winningCellCss);
      } else if (colNo === 1) {
        $('.col1').css(winningCellCss);
      } else if (colNo === 2) {
        $('.col2').css(winningCellCss);
      }
    }

    if (array[1] === 'diagonal') {
      const diagonalNo = array[2];
      if (diagonalNo === 1) {
        $('.diagonal1').css(winningCellCss);
      } else if (diagonalNo === 2) {
        $('.diagonal2').css(winningCellCss);
      }
    }
  };

  // function to stop hovering and clicking on cells on game board
  const stopEventsOnBoardCell = function() {
    $boardCell.addClass('no-events');
  };

  // function to display message
  // could also use show()
  const showMessage = function() {
    $('#message').css('display','block');
  }

  // function to hide message
  // could also use hide()
  const hideMessage = function() {
    $('#message').css('display','none');
  }

  // TODO: if incorporating AI, need to change first display message
  $('#message').text("Marvel, choose your hero.");
  showMessage();

  // cell on Marvel character board

  let $marvelIcon = $('.marvel-board table tr td');

  $marvelIcon.on('click', function() {

    const $this = $(this);
    // $this.addClass('selected'); // TODO: check this. don't think this is needed.
    let characterKey = $(this).attr('id'); // retrieves the id of the clicked character i.e. the character's name

    // clicked Marvel character is stored as Player A
    tictactoe.selectMarvelCharacter(characterKey);

    // displays Marvel character's name on screen
    const marvelCharacterName = tictactoe.selectedCharacters['playerA'][1];
    $('#marvel-name').text(marvelCharacterName)

    // removes image of current character on screen
    $('#player-a-score .char-img img').remove();

    // displays clicked character on screen
    characterA = tictactoe.selectedCharacters['playerA'][3];
    $('#player-a-score .char-img').prepend("<img src='" + characterA + "' class='cover'>");

  });

  // cell on DC character board

  let $dcIcon = $('.dc-board table tr td');

  $dcIcon.on('click', function() {

    const $this = $(this);
    // $this.addClass('selected'); // TODO: check this. don't think this is needed.
    let characterKey = $(this).attr('id');// retrieves the id of the clicked character i.e. the character's name

    // selected DC character's name on screen
    tictactoe.selectDcCharacter(characterKey);

    // displays DC character's name on screen
    const dcCharacterName = tictactoe.selectedCharacters['playerB'][1];
    $('#dc-name').text(dcCharacterName);

    // removes image of current character on screen
    $('#player-b-score .char-img img').remove();

    // displays selected character on screen
    characterB = tictactoe.selectedCharacters['playerB'][3];
    $('#player-b-score .char-img').prepend("<img src='" + characterB + "' class='cover'>");
  });

  // cannot select DC characters until Player A has chosen a Marvel character
  $dcIcon.addClass('no-events');

  // dims DC character board and prevent from clicking until Marvel character has been selected
  $boardCell.addClass('no-events');
  $dcIcon.css('opacity', '0.5');

  // Character Selection Buttons

  let $cmc = $('#confirmation-marvel-character'); // confirmation button for Marvel character selection
  let $cdc = $('#confirmation-dc-character'); // confirmation button for DC character selection
  let $rmc = $('#random-marvel-character'); //random selection button for Marvel character
  let $rdc = $('#random-dc-character'); // random selection button for DC character

  $cmc.on('click', function() {

    // $('#message').css('display', 'none'); // TODO: check if this is redundant

    // once character is confirmed, Marvel character board is disabled
    $marvelIcon.addClass('no-events');
    $marvelIcon.css('opacity', '0.5');

    // once Player A has confirmed Marvel character, confirmation button and random selection button disabled
    $cmc.addClass('no-events');
    $cmc.css('opacity', '0.5');
    $rmc.addClass('no-events');
    $rmc.css('opacity', '0.5');

    // turn on DC character board and selection buttons
    $dcIcon.removeClass('no-events');
    $dcIcon.css('opacity', '1');
    $cdc.removeClass('no-events');
    $cdc.css('opacity', '1');
    $rdc.removeClass('no-events');
    $rdc.css('opacity', '1');

    // prompt Player B to select DC character
    $('#message').text("DC, choose your hero.");
    showMessage();
  });

  $cdc.on('click', function() {

    // hideMessage(); // TODO: check if this is redundant

    // show message after DC character is chosen
    $('#message').text("Let's play!");
    showMessage();

    // hide message after 2 seconds
    setTimeout(function() {
      hideMessage();
    }, 1000);

    // once character is confirmed, DC character board is disabled
    $dcIcon.addClass('no-events');
    $dcIcon.css('opacity', '0.5');

    // disable DC character selection buttons after DC character is confirmed
    $cdc.addClass('no-events');
    $cdc.css('opacity', '0.5');
    $rdc.addClass('no-events');
    $rdc.css('opacity', '0.5');

    // set both players' scores to 0
    $('#player-a-score p').text(0);
    $('#player-b-score p').text(0);

    // once both characters have been selected, the game board cells become active
    $boardCell.removeClass('no-events');

    // border to show which player's turn it is
    if (tictactoe.turn === 0) {
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
    } else if (tictactoe.turn === 1) {
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
    }

    // enable rematch
    $('#rematch').removeClass('no-events');
    $('#rematch').css('opacity', '1');
    $('#new-game').removeClass('no-events');
    $('#new-game').css('opacity', '1');

  });

  // randomly select Marvel character for Player A

  $rmc.on('click', function() {

    tictactoe.randomAssignMarvelCharacter();

    // removes previous images of character on screen and sets the randomly selected new one
    $('#player-a-score .char-img img').remove();
    setCharactersOnScreen("playerA");

    // disable Marvel character selection board
    $marvelIcon.addClass('no-events');
    $marvelIcon.css('opacity','0.5');

    // disable Marvel selection buttons
    $cmc.addClass('no-events');
    $cmc.css('opacity', '0.5');
    $rmc.addClass('no-events');
    $rmc.css('opacity', '0.5');

    // turn on DC character board and selection buttons
    $dcIcon.css('opacity','1');
    $dcIcon.removeClass('no-events');
    $cdc.removeClass('no-events');
    $cdc.css('opacity','1');
    $rdc.removeClass('no-events');
    $rdc.css('opacity','1');

    // prompt Player B to select DC character
    $('#message').text("DC, choose your hero.");

  });

  $rdc.on('click', function() {

    tictactoe.randomAssignDcCharacter();

    // removes previous images of character on screen and sets the randomly selected new one
    $('#player-b-score .char-img img').remove();
    setCharactersOnScreen("playerB");

    // show message after DC character is chosen
    $('#message').text("Let's play!");
    showMessage();

    // hides message after 2 seconds
    setTimeout(function() {
      hideMessage();
    }, 1000);

    // disable DC character selection board and buttons
    $dcIcon.css('opacity','0.5');
    $dcIcon.addClass('no-events');
    $cdc.addClass('no-events');
    $cdc.css('opacity', '0.5');
    $rdc.addClass('no-events');
    $rdc.css('opacity', '0.5');

    // set scores to 0
    $('#player-a-score p').text(0);
    $('#player-b-score p').text(0);

    // once both characters have been selected, the game board cells become active
    $boardCell.removeClass('no-events');

    // border to show which player's turn it is
    if (tictactoe.turn === 0) {
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
    } else if (tictactoe.turn === 1) {
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
    }

    // enable rematch and new game
    $('#rematch').removeClass('no-events');
    $('#rematch').css('opacity', '1');
    $('#new-game').removeClass('no-events');
    $('#new-game').css('opacity', '1');

  });

  $boardCell.on('click', function() {

    const $this = $(this);

    // cannot click on any game board cell that already has a token
    if ($this.hasClass('clicked')) {
      return false;
    }

    let tokenInArray = "";
    let tokenToScreen = "";

    if (tictactoe.turn === 0) {
      tokenInArray = tictactoe.selectedCharacters['playerA'][0];
      tokenOnScreen = tictactoe.selectedCharacters['playerA'][2];
    } else if (tictactoe.turn === 1) {
      tokenInArray = tictactoe.selectedCharacters['playerB'][0];
      tokenOnScreen = tictactoe.selectedCharacters['playerB'][2];
    }

    const i = $this.attr('row');
    const j = $this.attr('col');

    if (tictactoe.board[i][j] === "") {
      tictactoe.board[i][j] = tokenInArray;
      $this.append('<img src=' + tokenOnScreen + '>');
      $this.addClass('clicked');
      $this.css('box-shadow', '1px 1px 1px 1px black');
      tictactoe.moves += 1;
    }

    tictactoe.checkWinner();
    let result = tictactoe.checkWinner();

    if (result[0] === "x") {

      tictactoe.score['playerA'] += 1;
      const score = tictactoe.score['playerA'];
      $('#player-a-score p').text(score);

      $('#character-box-a').append('<p class="winner-message-marvel infinite animated pulse">MARVEL WINS</p>');
      $('#message').text("");
      $('#message').append("<div class='pop-up-buttons'></div>");
      $('#message div').append("<button id='rematch-pop-up'>Play Again</button>");
      showMessage();

      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('opacity', '0.5');

      stopEventsOnBoardCell();
      highlightWinningCells(result);
      return;

    } else if (result[0] === "o") {

      tictactoe.score['playerB'] += 1;
      const score = tictactoe.score['playerB'];
      $('#player-b-score p').text(score);

      $('#character-box-b').append('<p class="winner-message-dc infinite animated pulse">DC WINS</p>');
      $('#message').text("");
      $('#message').append("<div class='pop-up-buttons'></div>");
      $('#message div').append("<button id='rematch-pop-up'>Play Again</button>");
      showMessage();

      $('#player-a-score .char-img img').css('opacity', '0.5');
      $('#player-b-score .char-img img').css('border', '2px solid blue');

      stopEventsOnBoardCell();
      highlightWinningCells(result);
      return;

    } else if ((tictactoe.moves === 9 && result[0] !== "o" && result[0] !== "x") ) {

      $('#message').text('It\'s a draw!');
      $('#message').append("<div class='pop-up-buttons'></div>");
      $('#message div').append("<button id='rematch-pop-up'>Play Again</button>");
      showMessage();

      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
      $('#player-a-score .char-img img').css('opacity', '0.5');
      $('#player-b-score .char-img img').css('opacity', '0.5');

      stopEventsOnBoardCell();
      highlightWinningCells(result);
      return;
    };

    if (tictactoe.turn === 0) {

      tictactoe.turn = 1;
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');

    } else if (tictactoe.turn === 1) {

      tictactoe.turn = 0;
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');

    }
  });

  $('#rematch').on('click', function() {
    resetGame();
  });

  $(document).on('click', '#rematch-pop-up', function(event) {
    resetGame();
    hideMessage();
  });

  const newGame = function() {
    tictactoe.resetScore(); // resets the score in the tic tac toe object so that both players have 0
    $('#player-a-score p.current-score').text('0');
    $('#player-b-score p.current-score').text('0');

    resetGame();
    $('#player-a-score .char-img img').remove();
    $('#player-b-score .char-img img').remove();

    // disable game board
    $boardCell.addClass('no-events');

    // enable Marvel character selection board and buttons
    $cmc.removeClass('no-events');
    $cmc.css('opacity', '1');
    $rmc.removeClass('no-events');
    $rmc.css('opacity', '1');
    $marvelIcon.css('opacity', '1');
    $marvelIcon.removeClass('no-events');

    // disable DC character selection board and buttons
    $dcIcon.addClass('no-events');
    $cdc.addClass('no-events');
    $cdc.css('opacity', '0.5');
    $rdc.addClass('no-events');
    $rdc.css('opacity', '0.5');

    // disables rematch and new game button
    $('#rematch').addClass('no-events');
    $('#rematch').css('opacity', '0.5');
    $('#new-game').addClass('no-events');
    $('#new-game').css('opacity', '0.5');

    // determines who starts the game
    tictactoe.startsGame();

    // randomly place characters on screen
    tictactoe.randomAssignMarvelCharacter();
    tictactoe.randomAssignDcCharacter();
    setCharactersOnScreen("playerA");
    setCharactersOnScreen("playerB");

    $('#player-b-score .char-img img').css('opacity', '0.5');

    // prompt Player A to select character
    $("#message").text("Marvel, select your hero.");
    showMessage();
  };

  $('#new-game').on('click', function() {
    newGame();
  });

  $(document).on('click', '#new-game-pop-up', function(event) {
    newGame();
  });
  // $('#new-game-pop-up').on('click', function() {
  //   newGame();
  //   hideMessage();
  // });
});
