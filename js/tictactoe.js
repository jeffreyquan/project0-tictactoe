
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

  onScreenCharacters: {
    playerA: ["x"],
    playerB: ["o"]
  },

  marvelBoard: {},

  dcBoard: {},

  createCharacterBoard: function() {

    // marvel Characters

    const marvelCharacters = Object.keys(this.characters.marvel);

    for (let i = 0; i < marvelCharacters.length; i++) {
      const character = marvelCharacters[i];
      this.marvelBoard[character] = this.characters.marvel[character].icon;
    }

    const dcCharacters = Object.keys(this.characters.dc);
    for (let i = 0; i < dcCharacters.length; i++) {
      const character = dcCharacters[i];
      this.dcBoard[character] = this.characters.dc[character].icon;
    }
  },

  characters: {
    marvel: {
      captainamerica: {
        name: "Captain America",
        symbol: 'images/characters/marvel/captainamerica/symbol.png',
        profile: 'images/characters/marvel/captainamerica/profile.jpg',
        icon: 'images/characters/marvel/captainamerica/icon.jpg'
      },
      thor: {
        name: "Thor",
        symbol: 'images/characters/marvel/thor/symbol.png',
        profile: 'images/characters/marvel/thor/profile.jpg',
        icon: 'images/characters/marvel/thor/icon.jpg'
      },
      spiderman: {
        name: "Spiderman",
        symbol: 'images/characters/marvel/spiderman/symbol.png',
        profile: 'images/characters/marvel/spiderman/profile.jpeg',
        icon: 'images/characters/marvel/spiderman/icon.jpg'
      },
      wolverine: {
        name: "Wolverine",
        symbol: 'images/characters/marvel/wolverine/symbol.png',
        profile: 'images/characters/marvel/wolverine/profile.jpg',
        icon: 'images/characters/marvel/wolverine/icon.jpg'
      },
      deadpool: {
        name: "Deadpool",
        symbol: 'images/characters/marvel/deadpool/symbol.png',
        profile: 'images/characters/marvel/deadpool/profile.jpg',
        icon: 'images/characters/marvel/deadpool/icon.jpg'
      },
      ironman: {
        name: "Ironman",
        symbol: 'images/characters/marvel/ironman/symbol.png',
        profile: 'images/characters/marvel/ironman/profile.jpg',
        icon: 'images/characters/marvel/ironman/icon.jpg'
      },
      thanos: {
        name: "Thanos",
        symbol: 'images/characters/marvel/thanos/symbol.png',
        profile: 'images/characters/marvel/thanos/profile.jpg',
        icon: 'images/characters/marvel/thanos/icon.jpg'
      },
      hulk: {
        name: "Hulk",
        symbol: 'images/characters/marvel/hulk/symbol.jpg',
        profile: 'images/characters/marvel/hulk/profile.jpg',
        icon: 'images/characters/marvel/hulk/icon.jpg'
      },
      captainmarvel: {
        name: "Captain Marvel",
        symbol: 'images/characters/marvel/captainmarvel/symbol.png',
        profile: 'images/characters/marvel/captainmarvel/profile.jpg',
        icon: 'images/characters/marvel/captainmarvel/icon.jpg'
      },
    },

    dc: {
      batman: {
        name: "Batman",
        symbol: 'images/characters/dc/batman/symbol.jpg',
        profile: 'images/characters/dc/batman/profile.jpg',
        icon: 'images/characters/dc/batman/icon.jpeg'
      },
      superman: {
        name: "Superman",
        symbol: 'images/characters/dc/superman/symbol.png',
        profile: 'images/characters/dc/superman/profile.jpg',
        icon: 'images/characters/dc/superman/icon.jpg',
      },
      wonderwoman: {
        name: "Wonder Woman",
        symbol: 'images/characters/dc/wonderwoman/symbol.png',
        profile: 'images/characters/dc/wonderwoman/profile.jpg',
        icon: 'images/characters/dc/wonderwoman/icon.jpg',
      },
      aquaman: {
        name: "Aquaman",
        symbol: 'images/characters/dc/aquaman/symbol.png',
        profile: 'images/characters/dc/aquaman/profile.jpg',
        icon: 'images/characters/dc/aquaman/icon.jpg'
      },
      flash: {
        name: "Flash",
        symbol: 'images/characters/dc/flash/symbol.jpg',
        profile: 'images/characters/dc/flash/profile.jpg',
        icon: 'images/characters/dc/flash/icon.jpeg',
      },
      haljordan: {
        name: "Hal Jordan",
        symbol: 'images/characters/dc/haljordan/symbol.jpg',
        profile: 'images/characters/dc/haljordan/profile.jpg',
        icon: 'images/characters/dc/haljordan/icon.jpg'
      },
      catwoman: {
        name: "Cat Woman",
        symbol: 'images/characters/dc/catwoman/symbol.jpg',
        profile: 'images/characters/dc/catwoman/profile.jpg',
        icon: 'images/characters/dc/catwoman/icon.jpg'
      },
      joker: {
        name: "Joker",
        symbol: 'images/characters/dc/joker/symbol.png',
        profile: 'images/characters/dc/joker/profile.jpeg',
        icon: 'images/characters/dc/joker/icon.jpg'
      },
      harleyquinn: {
        name: "Harley Quinn",
        symbol: 'images/characters/dc/harleyquinn/symbol.png',
        profile: 'images/characters/dc/harleyquinn/profile.jpg',
        icon: 'images/characters/dc/harleyquinn/icon.jpeg'
      },
    }
  },

  selectMarvelCharacter: function(character) {

    let key = character;
    const lengthOfIconsPlayerA = this.onScreenCharacters['playerA'].length;
    if (lengthOfIconsPlayerA > 1) {
      for (let i = 0; i < lengthOfIconsPlayerA - 1; i++) {
        this.onScreenCharacters['playerA'].pop();
      }
    }

    this.onScreenCharacters['playerA'].push(this.characters.marvel[key].name);
    this.onScreenCharacters['playerA'].push(this.characters.marvel[key].symbol);
    this.onScreenCharacters['playerA'].push(this.characters.marvel[key].profile);

  },

  selectDcCharacter: function(character) {

    let key = character;
    const lengthOfIconsPlayerB = this.onScreenCharacters['playerB'].length;
    if (lengthOfIconsPlayerB > 1) {
      for (let i = 0; i < lengthOfIconsPlayerB - 1; i++) {
        this.onScreenCharacters['playerB'].pop();
      }
    }

    this.onScreenCharacters['playerB'].push(this.characters.dc[key].name);
    this.onScreenCharacters['playerB'].push(this.characters.dc[key].symbol);
    this.onScreenCharacters['playerB'].push(this.characters.dc[key].profile);

  },

  // iconImages: {
  //   marvel:
  //   ['images/marvel-captain-america.png',
  //   'images/marvel-thor.png'],
  //   dc:
  //   ['images/dc-batman.jpg',
  //   'images/dc-superman.png']
  // },
  //
  // characterImages: {
  //   marvel:
  //   ['images/character-ca.jpg',
  //   'images/character-thor.webp'],
  //   dc:
  //   ['images/character-bm.jpg',
  //   'images/character-sm.jpg']
  // },

  randomAssignMarvelCharacter: function() {

    const lengthOfIconsPlayerA = this.onScreenCharacters['playerA'].length;
    if (lengthOfIconsPlayerA > 1) {
      for (let i = 0; i < lengthOfIconsPlayerA - 1; i++) {
        this.onScreenCharacters['playerA'].pop();
      }
    }

    const marvelCharacters = Object.keys(this.characters.marvel);

    const randomIndexForA = Math.floor(marvelCharacters.length * Math.random());
    const randomCharacterA = marvelCharacters[randomIndexForA];

    this.onScreenCharacters['playerA'].push(this.characters.marvel[randomCharacterA].name);
    this.onScreenCharacters['playerA'].push(this.characters.marvel[randomCharacterA].symbol);
    this.onScreenCharacters['playerA'].push(this.characters.marvel[randomCharacterA].profile);
  },

  randomAssignDcCharacter: function() {

    const lengthOfIconsPlayerB = this.onScreenCharacters['playerB'].length;
    if (lengthOfIconsPlayerB > 1) {
      for (let i = 0; i < lengthOfIconsPlayerB - 1; i++) {
        this.onScreenCharacters['playerB'].pop();
      }
    }

    const marvelCharacters = Object.keys(this.characters.marvel);
    const dcCharacters = Object.keys(this.characters.dc);


    const randomIndexForB = Math.floor(dcCharacters.length * Math.random());
    const randomCharacterB = dcCharacters[randomIndexForB];


    this.onScreenCharacters['playerB'].push(this.characters.dc[randomCharacterB].name);
    this.onScreenCharacters['playerB'].push(this.characters.dc[randomCharacterB].symbol);
    this.onScreenCharacters['playerB'].push(this.characters.dc[randomCharacterB].profile);
  },




  //   const randomIndexForA = Math.floor(this.iconImages['marvel'].length * Math.random());
  //   const randomIndexForB = Math.floor(this.iconImages['dc'].length * Math.random());
  //   this.icons['playerA'].push(this.iconImages['marvel'][randomIndexForA]);
  //   this.icons['playerB'].push(this.iconImages['dc'][randomIndexForB]);
  //   this.icons['playerA'].push(this.characterImages['marvel'][randomIndexForA]);
  //   this.icons['playerB'].push(this.characterImages['dc'][randomIndexForB]);
  // },

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
