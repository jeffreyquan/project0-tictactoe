// This js file deals with all the game logic

const tictactoe = {

  // size of the game board
  // note: the game board can be scaled bigger by changing this number but kept at 3 due to simplicity
  gridSize: 3,

  mode: "two-player",

  // gives a number between 0 and 1 to determine who starts first
  // player A is 0 and player B is 1
  startsGame: function() {
    this.turn = Math.floor((Math.random() * 2));
  },

  // alternates between 0 and 1 to show who's turn it is
  // player A is 0 and player B is 1
  turn: 0,

  // a count of the number of moves in a game
  moves: 0,

  // constructs an array representing the game board
  // note: this function can build a bigger game board
  board: [],

  constructBoard: function() {

    let gridBoard = [];
    let size = this.gridSize;
    for (let i = 0; i < size; i++) {
      let arrayRow = [];
      for (let j = 0; j < size; j++) {
        arrayRow.push('');
      }
      gridBoard.push(arrayRow);
    }

    this.board = gridBoard;
  },

  // arrays of players A and B that still also store their chosen characters' names and their respective images to display on screen
  selectedCharacters: {
    playerA: ["x"],
    playerB: ["o"]
  },

  // records the current score
  score: {
    playerA: 0,
    playerB: 0
  },

  // resets the scores to 0 for any "new" game
  resetScore: function() {
    this.score['playerA'] = 0;
    this.score['playerB'] = 0;
  },

  // checks each row, column and diagonal to determine if there is a winning combination
  // note: this function can get the winner for any n x n board
  checkWinner: function() {

    // Horizontal: check to see if items in each row are the same

    let n = this.gridSize;
    let currentBoard = this.board;

    for (let i = 0; i < n; i++) {
      let counter = 1;
      for (let j = 0; j < n - 1; j++) {
        if (currentBoard[i][j] === currentBoard[i][j+1] && currentBoard[i][j] !== ""){
          counter += 1;
        }

        // if n items (in this case, 3) in a row are the same, then we have a winner
        if (counter === n) {
          return [currentBoard[i][0],'row', i]; // index 0 returns an "x" or "o" and index 1 and 2 returns which row the winning combination occurred
        }
      }
      counter = 1;
    }

    // Vertical: check to see if the items in each column are the same

    for (let i = 0; i < n; i++) {
      let counter = 1;
      for (let j = 0; j < n - 1; j++) {
        if (currentBoard[j][i] === currentBoard[j+1][i] && currentBoard[j][i] !== "") {
          counter += 1;
        }

        // if n items (in this case, 3) in a column are the same, then we have a winner
        if (counter === n) {
          return [currentBoard[0][i],'col', i]; // index 0 returns an "x" or "o" and index 1 and 2 returns which column the winning combination occurred
        }
      }
      counter = 1;
    }

    // Diagonals: check the two diagonals to see if the items are the same

    // 'Diagonal 1' denotes the diagonal starting from top left to the bottom right of the board
    let counter = 1;

    for (let i = 0; i < n - 1; i++) {
      if (currentBoard[i][i] === currentBoard[i+1][i+1] && currentBoard[i][i] !== "") {
        counter += 1;
      }

      // if n items (in this case, 3) in a column are the same, then we have a winner in 'Diagonal 1'
      if (counter === n) {
        return [currentBoard[0][0],'diagonal', 1]
      }
    }

    // 'Diagonal 2' denotes the diagonal starting from the bottom left to the top right of the board
    counter =  1;

    for (let i = 0; i < n - 1; i++) {
      if ((currentBoard[i][n - 1 - i] === currentBoard[i+1][n - 2 - i]) && currentBoard[i][n - 1 - i] !== "") {
        counter += 1;
      }

      // if n items (in this case, 3) in a column are the same, then we have a winner in 'Diagonal 2'
      if (counter === n) {
        return [currentBoard[0][n-1], 'diagonal', 2]
      }
    }

      return '';
  },

  // stores the Marvel characters to select from, where the key-value pairs are character's name and small picture icon respectively
  marvelBoard: {},

  // stores the DC characters to select from, where the key-value pairs are character's name and small picture icon respectively
  dcBoard: {},

  // iterates through the Marvel characters' object and DC characters' object (in the characters object) to create the two character boards above
  createCharacterBoard: function() {

    // Marvel Characters

    const marvelCharacters = Object.keys(this.characters.marvel);

    for (let i = 0; i < marvelCharacters.length; i++) {
      const character = marvelCharacters[i];
      this.marvelBoard[character] = this.characters.marvel[character].icon;
    }

    // DC characters

    const dcCharacters = Object.keys(this.characters.dc);
    for (let i = 0; i < dcCharacters.length; i++) {
      const character = dcCharacters[i];
      this.dcBoard[character] = this.characters.dc[character].icon;
    }
  },

  // character object that stores Marvel and DC characters
  // name is the name of the character, symbol is what is being placed on the game board, profile is the picture of the character and icon is small picture shown in the respective character boards for selection
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

  // stores Marvel character that player A selects from Marvel character board
  selectMarvelCharacter: function(character) {

    const lengthOfArrayA = this.selectedCharacters['playerA'].length;
    if (lengthOfArrayA > 1) {
      for (let i = 0; i < lengthOfArrayA - 1; i++) {
        this.selectedCharacters['playerA'].pop();
      }
    }

    this.selectedCharacters['playerA'].push(this.characters.marvel[character].name);
    this.selectedCharacters['playerA'].push(this.characters.marvel[character].symbol);
    this.selectedCharacters['playerA'].push(this.characters.marvel[character].profile);

  },

  // stores DC character that player B selects from Marvel character board
  selectDcCharacter: function(character) {

    const lengthOfArrayB = this.selectedCharacters['playerB'].length;
    if (lengthOfArrayB > 1) {
      for (let i = 0; i < lengthOfArrayB - 1; i++) {
        this.selectedCharacters['playerB'].pop();
      }
    }

    this.selectedCharacters['playerB'].push(this.characters.dc[character].name);
    this.selectedCharacters['playerB'].push(this.characters.dc[character].symbol);
    this.selectedCharacters['playerB'].push(this.characters.dc[character].profile);

  },

  // randomly assigns a Marvel character to player A
  randomAssignMarvelCharacter: function() {

    const lengthOfArrayA = this.selectedCharacters['playerA'].length;
    if (lengthOfArrayA > 1) {
      for (let i = 0; i < lengthOfArrayA - 1; i++) {
        this.selectedCharacters['playerA'].pop();
      }
    }

    // stores an array of the Marvel characters' names from the characters object
    const marvelCharacters = Object.keys(this.characters.marvel);

    // randomly select character from list
    const randomIndexForA = Math.floor(marvelCharacters.length * Math.random());
    const randomCharacterA = marvelCharacters[randomIndexForA];

    // stores randomly selected character in selected character array
    this.selectedCharacters['playerA'].push(this.characters.marvel[randomCharacterA].name);
    this.selectedCharacters['playerA'].push(this.characters.marvel[randomCharacterA].symbol);
    this.selectedCharacters['playerA'].push(this.characters.marvel[randomCharacterA].profile);
  },

  // randomly assigns a DC character to player B
  randomAssignDcCharacter: function() {

    const lengthOfArrayB = this.selectedCharacters['playerB'].length;
    if (lengthOfArrayB > 1) {
      for (let i = 0; i < lengthOfArrayB - 1; i++) {
        this.selectedCharacters['playerB'].pop();
      }
    }

    // stores an array of the DC characters' names from the characters object
    const dcCharacters = Object.keys(this.characters.dc);

    // randomly select character from list
    const randomIndexForB = Math.floor(dcCharacters.length * Math.random());
    const randomCharacterB = dcCharacters[randomIndexForB];

    // stores randomly selected character in selected character array
    this.selectedCharacters['playerB'].push(this.characters.dc[randomCharacterB].name);
    this.selectedCharacters['playerB'].push(this.characters.dc[randomCharacterB].symbol);
    this.selectedCharacters['playerB'].push(this.characters.dc[randomCharacterB].profile);
  },

  winCombinations: [],

  generateWinCombinations: function() {

    this.winCombinations = [];

    let comboDiagonal1 = [];
    let comboDiagonal2 = [];
    const n = this.gridSize;

    for (let i = 0; i < n; i++) {
      let comboRow = [];
      let comboColumn = [];

      comboDiagonal1.push([i,i]);
      comboDiagonal2.push([n - 1 - i, i]);

      for (let j = 0; j < n; j++) {
        comboRow.push([i, j]);
        comboColumn.push([j, i]);
      }

      this.winCombinations.push(comboRow);
      this.winCombinations.push(comboColumn);
    }
    this.winCombinations.push(comboDiagonal1);
    this.winCombinations.push(comboDiagonal2);
  },

  aiPlayer: "playerA",

  // selectedAiCharacter: this.selectedCharacters[this.aiPlayer],

  ai: function() {

    let winningMove;

    // Check for winning move for AI player
    for (let combination of this.winCombinations) {
      let counter = 0;

      for (let position of combination) {
        if (this.board[position[0]][position[1]] === ai[0]) {
          counter += 1;
        } else if (this.board[position[0]][position[1]] === "" ) {
          winningMove = [position[0], position[1]];
        } else {
          break
        }
      }
      if (counter === this.gridSize - 1) {
        if (winningMove) {
          return winningMove;
        }
      }
    }

    // Check for move to block human player winning
    let blockingMove;

    for (let combination of this.winCombinations) {
      let counter = 0;

      for (let position of combination) {
        if (this.board[position[0]][position[1]] !== ai[0] && this.board[position[0]][position[1]] !== "") {
          counter += 1;
        } else if (this.board[position[0]][position[1]] === "" ) {
          blockingMove = [position[0], position[1]];
        } else {
          break
        }
      }
      if (counter === this.gridSize - 1) {
        if (blockingMove) {
          return blockingMove;
        }
      }
    }

    // create a fork for the AI player (2 possible ways to win)

    let forkingMove;
    let forkCombinations = [];

    for (let combination of this.winCombinations) {
      let countAi= 0;
      let countEmpty = 0;

      for (let position of combination) {
        if (this.board[position[0]][position[1]] === ai[0]) {
          countAi += 1;
        } else if (this.board[position[0]][position[1]] === "") {
          countEmpty += 1;
        }
        if (countAi === 1 && countEmpty === 2) {
          forkCombinations.push(position);
        }
      }
      if (forkCombinations.length > 1) {
        const result = forkCombinations.filter(cell => cell === ai[0])
        return result[0];
      }
    }

    // let forkingMove;
    // let forkCombinations = [];
    //
    // for (let combination of this.winCombinations) {
    //   let countAi= 0;
    //   let countEmpty = 0;
    //
    //   for (let position of combination) {
    //     if (this.board[position[0]][position[1]] === ai[0]) {
    //       countAi += 1;
    //     } else if (this.board[position[0]][position[1]] === "") {
    //       countEmpty += 1;
    //     }
    //     if (countAi === 1 && countEmpty === 2) {
    //       forkCombinations.push(position);
    //     }
    //   }
    //   if (forkCombinations.length > 1) {
    //     const result = forkCombinations.filter(cell => cell === ai[0])
    //     return result[0];
    //   }
    // }

  }
};
