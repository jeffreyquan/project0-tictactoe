
const tictactoe = {

  startsGame: function() {
    this.turn = Math.floor((Math.random() * 2));
  },

  turn: 0,

  moves: 0,

  board: [
    ['','',''],
    ['','',''],
    ['','','']
  ],

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
    if (this.icons['playerA'].length === 2) {
      this.icons['playerA'].pop();
    }

    if (this.icons['playerB'].length === 2) {
      this.icons['playerB'].pop();
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
    this.randomAssignIcon();
  },

  resetBoard: function() {
    this.board = [
    ['','',''],
    ['','',''],
    ['','','']
    ];
    this.randomAssignIcon();
  },

  checkWinner: function() {
    const cB = this.board;

    for (let i = 0; i < 3; i++) {
      // checks each row
      if (cB[i][0] !== '' && cB[i][0] === cB[i][1] && cB[i][1] === cB[i][2]) {
        return [cB[i][0],'row', i];
      }
    }

    // checks each column
    for (let i = 0; i < 3; i++) {
      if (cB[0][i] !== '' && cB[0][i] === cB[1][i] && cB[1][i] === cB[2][i]) {
        return [cB[0][i], 'col', i];
      }
    }

    // checks the diagonals
    if ((cB[0][0] !== '' && cB[0][0] === cB[1][1] && cB[1][1] === cB[2][2])) {
      return [cB[0][0], 'diagonal', 1];
    } else if ((cB[0][2] !== '' && cB[0][2] === cB[1][1] && cB[1][1] === cB[2][0])) {
      return [cB[0][2], 'diagonal', 2];
    }

    return '';
  }
};
