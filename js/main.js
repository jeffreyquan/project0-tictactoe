


$(document).ready(function() {
  let $boardCell = $('.cell');

  let resetGame = function() {
      tictactoe.resetBoard();
      tictactoe.moves = 0;
      $boardCell.each(function() {
        $(this).text('');
      });
      $('.row div').removeClass('clicked');
      $('.row div').removeAttr('style');
      $('#message').html("");
      $('#player-a-score img').css('opacity','');
      $('#player-b-score img').css('opacity','');
      $('.score p').remove();
      $boardCell.hover(function() {
        if (tictactoe.turn === 0) {
          $(this).css({'background-color':'red', 'border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'});
        } else if (tictactoe.turn === 1) {
          $(this).css({'background-color':'blue', 'border': '3px solid', 'border-image':'conic-gradient(red, magenta, blue, aqua, lime, yellow, red) 1'})
        }}, function() {
          $(this).css({'background-color':'', 'border':''})
      });
  };

  resetGame();
  tictactoe.startsGame();
  tictactoe.randomAssignIcon();

  // set characters on characters onto the screen
  characterA = tictactoe.icons['playerA'][2];
  characterB = tictactoe.icons['playerB'][2];
  $('#player-a-score').prepend('<img src=' + characterA + '>');
  $('#player-b-score').prepend('<img src=' + characterB + '>');

  if (tictactoe.turn === 0) {
    $('#player-a-score img').css('border', '2px solid red');
    $('#player-b-score img').css('border', '2px solid rgba(0,0,255,0.1)');
  } else if (tictactoe.turn === 1) {
    $('#player-b-score img').css('border', '2px solid blue');
    $('#player-a-score img').css('border', '2px solid rgba(255,0,0,0.1)');
  }

  const highlightWinningCells = function(array) {
    let winningCellCss = {};
    if (array[0] === 'x') {
      winningCellCss = {'background-color':'red','border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'};
    } else if (array[0] === 'o') {
      winningCellCss = {'background-color':'blue','border': '3px solid', 'border-image':'conic-gradient(red, yellow, lime, aqua, blue, magenta, red) 1'};
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

  $boardCell.on('click', function() {

    $this = $(this);
    if ($this.hasClass('clicked')) {
      return false;
    }

    let iconToInput = "";
    let iconToScreen = "";
    if (tictactoe.turn === 0) {
      iconInBackend = tictactoe.icons['playerA'][0];
      iconOnScreen = tictactoe.icons['playerA'][1];
    } else if (tictactoe.turn === 1) {
      iconInBackend = tictactoe.icons['playerB'][0];
      iconOnScreen = tictactoe.icons['playerB'][1];
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
    console.log('moves:', `${ tictactoe.moves }`);

    tictactoe.checkWinner();
    let result = tictactoe.checkWinner();
    console.log(result);

    if (result[0] === "x") {
      tictactoe.score['playerA'] += 1;
      score = tictactoe.score['playerA'];
      $('#player-a-score h2').text(score);
      $('#player-a-score').append('<p class="message pulse">MARVEL WINS</p>');
      // $('#message').html('<p>Marvel wins!</p>');
      $('.row div').addClass('clicked');
      $('#player-a-score img').css('border', '2px solid red');
      $('#player-b-score img').css('opacity', '0.5');
      $boardCell.off('mouseenter mouseleave');
      highlightWinningCells(result);
      return;
    } else if (result[0] === "o") {
      tictactoe.score['playerB'] += 1;
      score = tictactoe.score['playerB'];
      $('#player-b-score h2').text(score);
      $('#player-b-score').append('<p class="message pulse">DC WINS</p>');
      // $('#message').html('<p>DC wins!</p>');
      $('.row div').addClass('clicked');
      $('#player-a-score img').css('opacity', '0.5');
      $('#player-b-score img').css('border', '2px solid blue');
      $boardCell.off('mouseenter mouseleave');
      highlightWinningCells(result);
      return;
    } else if ((tictactoe.moves === 9 && result[0] !== "o" && result[0] !== "x") ) {
      $('#message').html('<p>It\'s a draw!<p>');
      $('#player-a-score img').css('border', '2px solid rgba(255,0,0,0.1)');
      $('#player-b-score img').css('border', '2px solid rgba(0,0,255,0.1)');
      $('#player-a-score img').css('opacity', '0.5');
      $('#player-b-score img').css('opacity', '0.5');
      $boardCell.off('mouseenter mouseleave');
      highlightWinningCells(result);
      return;
    };

    if (tictactoe.turn === 0) {
      tictactoe.turn = 1;
      $('#player-b-score img').css('border', '2px solid blue');
      $('#player-a-score img').css('border', '2px solid rgba(255,0,0,0.1)');
    } else if (tictactoe.turn === 1) {
      tictactoe.turn = 0;
      $('#player-a-score img').css('border', '2px solid red');
      $('#player-b-score img').css('border', '2px solid rgba(0,0,255,0.1)');
    }

  });

  $('#reset-game').on('click', function() {
    resetGame();
  });

  $('#reset-score').on('click', function() {
    tictactoe.resetScore();
    $('h2').text('0');
    resetGame();
  });
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
