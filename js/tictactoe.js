
const tictactoe = {

  gridSize: 3,

  startsGame: function() {
    this.turn = Math.floor((Math.random() * 2));
  },

  turn: 0,

  moves: 0,

  board: function() {

    let gridBoard = [];
    let size = this.gridSize;
    for (let i = 0; i < size; i++) {
      let arrayRow = [];
      for (let j = 0; j < size; j++) {
        arrayRow.push('');
      }
      gridBoard.push(arrayRow);
    }

    return gridBoard;
  },

  icons: {
    playerA: ["x"],
    playerB: ["o"]
  },

  iconImages: {
    marvel:
    ['images/marvel-captain-america.png',
    'images/marvel-thor.png'],
    dc:
    ['images/dc-batman.jpg',
    'images/dc-superman.png']
  },

  characterImages: {
    marvel:
    ['images/character-ca.jpg',
    'images/character-thor.webp'],
    dc:
    ['images/character-bm.jpg',
    'images/character-sm.jpg']
  },

  randomAssignIcon: function() {

    const lengthOfIconsPlayerA = this.icons['playerA'].length;
    if (lengthOfIconsPlayerA > 1) {
      for (let i = 0; i < lengthOfIconsPlayerA - 1; i++) {
        this.icons['playerA'].pop();
      }
    }

    const lengthOfIconsPlayerB = this.icons['playerB'].length;
    if (lengthOfIconsPlayerB > 1) {
      for (let i = 0; i < lengthOfIconsPlayerB - 1; i++) {
        this.icons['playerB'].pop();
        console.log()
      }
    }

    const randomIndexForA = Math.floor(this.iconImages['marvel'].length * Math.random());
    const randomIndexForB = Math.floor(this.iconImages['dc'].length * Math.random());
    this.icons['playerA'].push(this.iconImages['marvel'][randomIndexForA]);
    this.icons['playerB'].push(this.iconImages['dc'][randomIndexForB]);
    this.icons['playerA'].push(this.characterImages['marvel'][randomIndexForA]);
    this.icons['playerB'].push(this.characterImages['dc'][randomIndexForB]);
  },

  score: {
    playerA: 0,
    playerB: 0
  },

  resetScore: function() {
    this.score['playerA'] = 0;
    this.score['playerB'] = 0;
  },

  resetBoard: function() {
    this.board = [
    ['','',''],
    ['','',''],
    ['','','']
    ];
  },

  checkWinner: function() {

    // Horizontal

    let n = this.gridSize;
    let currentBoard = this.board;

    for (let i = 0; i < n; i++) {
      let counter = 1;
      for (let j = 0; j < n - 1; j++) {
        if (currentBoard[i][j] === currentBoard[i][j+1] && currentBoard[i][j] !== ""){
          counter += 1;
        }
        if (counter === n) {
          return [currentBoard[i][0],'row', i];
        }
      }
      counter = 1;
    }

    // Vertical

    for (let i = 0; i < n; i++) {
      let counter = 1;
      for (let j = 0; j < n - 1; j++) {
        if (currentBoard[j][i] === currentBoard[j+1][i] && currentBoard[j][i] !== "") {
          counter += 1;
        }
        if (counter === n) {
          return [currentBoard[0][i],'col', i];
        }
      }
      counter = 1;
    }

    // Diagonals
    let counter = 1;

    for (let i = 0; i < n - 1; i++) {
      if (currentBoard[i][i] === currentBoard[i+1][i+1] && currentBoard[i][i] !== "") {
        counter += 1;
      }
      if (counter === n) {
        return [currentBoard[0][0],'diagonal', 1]
      }
    }

    counter =  1;

    for (let i = 0; i < n - 1; i++) {
      if ((currentBoard[i][n - 1 - i] === currentBoard[i+1][n - 2 - i]) && currentBoard[i][n - 1 - i] !== "") {
        counter += 1;
        console.log(counter);
      }
      if (counter === n) {
        return [currentBoard[0][n-1], 'diagonal', 2]
      }
    }

      return '';
  }

  //   const cB = this.board;
  //
  //   for (let i = 0; i < 3; i++) {
  //     // checks each row
  //     if (cB[i][0] !== '' && cB[i][0] === cB[i][1] && cB[i][1] === cB[i][2]) {
  //       return [cB[i][0],'row', i];
  //     }
  //   }
  //
  //   // checks each column
  //   for (let i = 0; i < 3; i++) {
  //     if (cB[0][i] !== '' && cB[0][i] === cB[1][i] && cB[1][i] === cB[2][i]) {
  //       return [cB[0][i], 'col', i];
  //     }
  //   }
  //
  //   // checks the diagonals
  //   if ((cB[0][0] !== '' && cB[0][0] === cB[1][1] && cB[1][1] === cB[2][2])) {
  //     return [cB[0][0], 'diagonal', 1];
  //   } else if ((cB[0][2] !== '' && cB[0][2] === cB[1][1] && cB[1][1] === cB[2][0])) {
  //     return [cB[0][2], 'diagonal', 2];
  //   }
  //
  //   return '';
  // }
};
