


$(document).ready(function() {

  // construct game board (grid)

  // stores the current size from the tictactoe object
  const n = tictactoe.gridSize;

  let gameBoard = '';
  for (let i = 0; i < n; i++) {
    gameBoard += "<tr>";
    for (let j = 0; j < n; j++) {
      gameBoard += "<td id='c" + i.toString() + j.toString() + "' class='cell row" + i.toString() + " col" + j.toString();

      if (i === j) {
        gameBoard += " diagonal1";
      }
      if (j === n - 1 - i) {
        gameBoard +=" diagonal2";
      }
      gameBoard += "' row=" + i.toString() + " col=" + j.toString() + "></td>";
    }
    gameBoard += "</tr>"
  }

  $('#game-board table').append(gameBoard);

  // construct the Marvel character board

  tictactoe.createCharacterBoard();

  const marvelCharacterList = Object.keys(tictactoe.marvelBoard);
  let marvelCharacterBoard = "<tr>";

  for (let j = 0; j < marvelCharacterList.length; j++) {
    const key = marvelCharacterList[j];
    marvelCharacterBoard += "<td id=" + key + " class='character-icons'><img src=" + tictactoe.marvelBoard[key] + "></td>";
    if ((j + 1) % 3 === 0) {
      marvelCharacterBoard += "</tr><tr>"
      }
    }

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

  let dcCharacterBoardToAppend = '';
  if (dcCharacterList.length % 3 === 0) {
    dcCharacterBoardToAppend = dcCharacterBoard.substring(0, dcCharacterBoard.length - 4);
  } else if (dcCharacterList.length % 3 !== 0) {
    dcCharacterBoardToAppend = dcCharacterBoard + "</tr>";
  }

  $('.dc-board table').append(dcCharacterBoardToAppend);

  // refers to the cells in the game board

  let $boardCell = $('#game-board table tr td');

  const resetGame = function() {
    tictactoe.resetBoard();
    tictactoe.moves = 0;
    $boardCell.each(function() {
      $(this).text('');
    });
    $boardCell.removeClass('clicked');
    $boardCell.removeClass('no-hover');
    $boardCell.removeAttr('style');
    $('#message').text("");
    $('#message').css('display', 'none');
    $('.char-img img').css('opacity','1');
    $('.char-img img').css('opacity','1');
    $('.winner-message').remove();
    // $('.score p').remove();
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

  resetGame();
  $('#reset-game').addClass('no-hover');
  $('#reset-score').addClass('no-hover');
  tictactoe.startsGame();
  tictactoe.randomAssignMarvelCharacter();
  tictactoe.randomAssignDcCharacter();

  // set characters on characters onto the screen
  let setCharactersOnScreen = function() {
    characterA = tictactoe.onScreenCharacters['playerA'][3];
    characterB = tictactoe.onScreenCharacters['playerB'][3];
    $('#player-a-score .char-img').prepend("<img src='" + characterA + "' class='cover'>");
    $('#player-b-score .char-img').prepend("<img src='" + characterB + "' class='cover'>");
    const marvelCharacterName = tictactoe.onScreenCharacters['playerA'][1];
    $('#marvel-name').text(marvelCharacterName);
    const dcCharacterName = tictactoe.onScreenCharacters['playerB'][1];
    $('#dc-name').text(dcCharacterName);
    // if (tictactoe.turn === 0) {
    //   $('#player-a-score .char-img img').css('border', '2px solid red');
    //   $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
    // } else if (tictactoe.turn === 1) {
    //   $('#player-b-score .char-img img').css('border', '2px solid blue');
    //   $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
    // }
  };

  setCharactersOnScreen();

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

  let stopClick = function() {
    $boardCell.addClass('no-hover');
  };

  let stopHover = function() {
    $boardCell.addClass('no-hover');
  };


    // let bgColor = '';
    // if (array[0] === 'x') {
    //   bgColor = "'background-color':'red'";
    // } else if (array[0] === 'o') {
    //   bgColor = "'background-color':'blue'";
    // }
    //
    // if (array[1] === 'row') {
    //   const rowNo = array[2].toString();
    //   $boardCell.each(function() {
    //     if ($(this).hasClass('row' + rowNo)) {
    //       $(this).css({bgColor, 'border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'});
    //     } else if (array[1] === 'col') {
    //       const colNo = array[2].toString();
    //       if ($(this).hasClass('col' + colNo)) {
    //         $(this).css({bgColor, 'border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'});
    //       }
    //     } else if (array[1] === 'diagonal') {
    //       if (array[2] === 1) {
    //         if ($(this).hasClass('diagonal1')) {
    //           $(this).css({bgColor, 'border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'});
    //         } else if (array[2] === 2) {
    //           if ($(this).hasClass('diagonal2')) {
    //           $(this).css({bgColor, 'border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'});
    //           }
    //         }
    //       }
    //     }
    //   });
    // }


  // selection of characters

  const showMessage = function() {
    $('#message').css('display','block');
  }

  const hideMessage = function() {
    $('#message').css('display','none');
  }

  $('#message').text("Marvel, choose your hero.");
  showMessage();

  let $marvelIcon = $('.marvel-board table tr td');

  $marvelIcon.on('click', function() {
    const $this = $(this);
    $this.addClass('selected');
    let characterKey = $(this).attr('id');
    tictactoe.selectMarvelCharacter(characterKey);

    const marvelCharacterName = tictactoe.onScreenCharacters['playerA'][1];
    $('#marvel-name').text(marvelCharacterName)
    $('#player-a-score .char-img img').remove();
    characterA = tictactoe.onScreenCharacters['playerA'][3];
    $('#player-a-score .char-img').prepend("<img src='" + characterA + "' class='cover'>");
      // if (tictactoe.turn === 0) {
      //   $('#player-a-score .char-img img').css('border', '2px solid red');
      // } else if (tictactoe.turn === 1) {
      //   $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
      // }
    }

  );

  let $dcIcon = $('.dc-board table tr td');

  $dcIcon.on('click', function() {
    const $this = $(this);
    $this.addClass('selected');
    let characterKey = $(this).attr('id');
    tictactoe.selectDcCharacter(characterKey);
    const dcCharacterName = tictactoe.onScreenCharacters['playerB'][1];
    $('#dc-name').text(dcCharacterName);
    $('#player-b-score .char-img img').remove();
    characterB = tictactoe.onScreenCharacters['playerB'][3];
    $('#player-b-score .char-img').prepend("<img src='" + characterB + "' class='cover'>");
      // if (tictactoe.turn === 0) {
      //   $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
      // } else if (tictactoe.turn === 1) {
      //   $('#player-b-score .char-img img').css('border', '2px solid blue');
      // }
    });

  $dcIcon.addClass('no-hover');
  $dcIcon.css('opacity', '0.5');
  $boardCell.addClass('no-hover');

  let $cmc = $('#confirmation-marvel-character');

  $cmc.on('click', function() {
    // if (!$marvelIcon.hasClass("selected")) {
    //   $('#message').addClass('infinite animated pulse');
    //   $('#message').text('You must select a hero.');
    //   setTimeout(showMessage(), 5000);
    //   return;
    // }
    $('#message').css('display', 'none');
    $marvelIcon.addClass('no-hover');
    $marvelIcon.css('opacity', '0.5');
    $dcIcon.removeClass('no-hover');
    $dcIcon.css('opacity', '');
    $('#message').text("DC, choose your hero.");
    showMessage();
    $cmc.addClass('no-hover');
    $('#random-marvel-character').addClass('no-hover');
  });

  let $cdc = $('#confirmation-dc-character');

  $cdc.on('click', function() {
    // if (!$dcIcon.hasClass("selected")) {
    //   $('#message').addClass('infinite animated pulse');
    //   $('#message').text('You must select a hero.');
    //   setTimeout(showMessage(), 5000);
    //   return;
    // }
    hideMessage();
    $('#message').text("Let's play!");
    showMessage();
    setTimeout(function() {
      hideMessage();
    }, 2000);
    $dcIcon.css('opacity', '0.5');
    $dcIcon.addClass('no-hover');
    $boardCell.removeClass('no-hover');
    if (tictactoe.turn === 0) {
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
    } else if (tictactoe.turn === 1) {
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
    }

    $('#player-a-score p').text(0);
    $('#player-b-score p').text(0);
    $cdc.addClass('no-hover');
    $('#reset-game').removeClass('no-hover');
    $('#reset-score').removeClass('no-hover');
  });

  $('#random-marvel-character').on('click', function() {

    tictactoe.randomAssignMarvelCharacter();
    $('#player-a-score .char-img img').remove();
    $('#player-b-score .char-img img').remove();
    $marvelIcon.css('opacity','0.5');
    $dcIcon.css('opacity','1');
    $('#random-marvel-character').add('no-hover');
    $marvelIcon.addClass('no-hover');
    $dcIcon.removeClass('no-hover');
    $cdc.removeClass('no-hover');
    setCharactersOnScreen();
    $('#message').text("DC, choose your hero.");
    $('#random-marvel-character').addClass('no-hover');
    $('#random-dc-character').removeClass('no-hover');
  });

  $('#random-dc-character').on('click', function() {

    tictactoe.randomAssignDcCharacter();
    $('#player-a-score .char-img img').remove();
    $('#player-b-score .char-img img').remove();
    setCharactersOnScreen();
    $('#message').text("Let's play!");
    showMessage();
    setTimeout(function() {
      hideMessage();
    }, 2000);
    $dcIcon.css('opacity','0.5');
    $dcIcon.addClass('no-hover');
    $('#random-dc-character').addClass('no-hover');
    $('#player-a-score p').text(0);
    $('#player-b-score p').text(0);
    $boardCell.removeClass('no-hover');
    if (tictactoe.turn === 0) {
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
    } else if (tictactoe.turn === 1) {
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
    }
    $('#reset-game').removeClass('no-hover');
    $('#reset-score').removeClass('no-hover');

  });

  $boardCell.on('click', function() {

    const $this = $(this);
    if ($this.hasClass('clicked')) {
      return false;
    }

    let iconToInput = "";
    let iconToScreen = "";
    if (tictactoe.turn === 0) {
      iconInBackend = tictactoe.onScreenCharacters['playerA'][0];
      iconOnScreen = tictactoe.onScreenCharacters['playerA'][2];
    } else if (tictactoe.turn === 1) {
      iconInBackend = tictactoe.onScreenCharacters['playerB'][0];
      iconOnScreen = tictactoe.onScreenCharacters['playerB'][2];
    }
    const i = $this.attr('row');
    const j = $this.attr('col');
    if (tictactoe.board[i][j] === "") {
      tictactoe.board[i][j] = iconInBackend;
      $this.append('<img src=' + iconOnScreen + '>');
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
      $('#message div').append("<button id='reset-game-pop-up'>Play Again</button>");
      $('#message div').append("<button id='reset-score-pop-up'>Reset Score</button>");
      showMessage();
      // $('#message').html('<p>Marvel wins!</p>');
      stopClick();
      $('#player-a-score .char-img img').css('border', '2px solid red');
      $('#player-b-score .char-img img').css('opacity', '0.5');
      stopHover();
      highlightWinningCells(result);
      return;
    } else if (result[0] === "o") {
      tictactoe.score['playerB'] += 1;
      const score = tictactoe.score['playerB'];
      $('#player-b-score p').text(score);
      $('#character-box-b').append('<p class="winner-message-dc infinite animated pulse">DC WINS</p>');
      $('#message').text("");
      $('#message').append("<div class='pop-up-buttons'></div>");
      $('#message div').append("<button id='reset-game-pop-up'>Play Again</button>");
      $('#message div').append("<button id='reset-score-pop-up'>Reset Score</button>");
      showMessage();
      // $('#message').html('<p>DC wins!</p>');
      stopClick();
      $('#player-a-score .char-img img').css('opacity', '0.5');
      $('#player-b-score .char-img img').css('border', '2px solid blue');
      stopHover();
      highlightWinningCells(result);
      return;
    } else if ((tictactoe.moves === 9 && result[0] !== "o" && result[0] !== "x") ) {
      $('#message').text('It\'s a draw!');
      $('#message').append("<div class='pop-up-buttons'></div>");
      $('#message div').append("<button id='reset-game-pop-up'>Play Again</button>");
      $('#message div').append("<button id='reset-score-pop-up'>Reset Score</button>");
      $('#message').css('display','block');
      $('#player-a-score .char-img img').css('border', '2px solid rgba(255,0,0,0.1)');
      $('#player-b-score .char-img img').css('border', '2px solid rgba(0,0,255,0.1)');
      $('#player-a-score .char-img img').css('opacity', '0.5');
      $('#player-b-score .char-img img').css('opacity', '0.5');
      $this.off('hover');
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

  $('#reset-game').on('click', function() {
    resetGame();
  });

  $(document).on('click', '#reset-game-pop-up', function(event) {
    resetGame();
    hideMessage();
  });
  // $('#reset-game-pop-up').on('click', function() {
  //   resetGame();
  //   hideMessage();
  // });

  const resetScore = function() {
    tictactoe.resetScore(); // resets the score in the tic tac toe object so that both players have 0
    $('#player-a-score p.current-score').text('0');
    $('#player-b-score p.current-score').text('0');
    resetGame();
    $('#player-a-score .char-img img').remove();
    $('#player-b-score .char-img img').remove();
    // $boardCell.removeClass('no-hover');
    // $boardCell.removeClass('clicked');
    $boardCell.addClass('no-hover');
    $cmc.removeClass('no-hover');
    $('#random-marvel-character').removeClass('no-hover');
    $marvelIcon.css('opacity', '1');
    $marvelIcon.removeClass('no-hover');
    $dcIcon.addClass('no-hover');
    $cdc.addClass('no-hover');
    $('#random-dc-character').addClass('no-hover');
    // $cdc.removeClass('no-hover');
    $('#random-marvel-character').removeClass('no-hover');
    // $('#random-dc-character').removeClass('no-hover');
    $("#message").text("Marvel, select your hero");
    $('#reset-game').addClass('no-hover');
    showMessage();
  };

  $('#reset-score').on('click', function() {
    resetScore();
  });

  $(document).on('click', '#reset-score-pop-up', function(event) {
    resetScore();
    hideMessage();
  });
  // $('#reset-score-pop-up').on('click', function() {
  //   resetScore();
  //   hideMessage();
  // });
});



// const createBoard = function() {
//   let table = '';
//   for (let i = 0; i < 4; i++) {
//     $('<tr>').append('.table');
//     for (let j = 0; j < 4; j++) {
//       $('<td>').attr('id',`cell-${ i }${ j }`).append('tr');
//     }
//   };
//
// };
