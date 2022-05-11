import chalk from "chalk";

const warGame = {
  init: () => {
    warGame.createDeck(warGame.colors, warGame.numbers, warGame.names);
    warGame.distributeCards(warGame.deck);
    console.log(chalk.yellow("Jeu de la bataille"));
  },

  // --- Initialization ---

  colors: ["♣️", "❤️", "♦️", "♠️"],
  numbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  names: [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "VALET",
    "DAME",
    "ROI",
    "AS",
  ],

  deck: [],
  player1Deck: [],
  player2Deck: [],
  warDeck: [],

  player1Score: 26,
  player2Score: 26,

  topCardPlayer1: null,
  topCardPlayer2: null,

  // --- Logic ---

  // Shuffle formula, found on https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,10%5D%3B%20const%20shuffledArray%20%3D%20array.
  shuffleCards: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  },

  createDeck: (cardcolor, cardnumber, cardnames) => {
    for (const color of cardcolor) {
      for (const number of cardnumber) {
        warGame.deck.push({
          color,
          number,
          // name : cardnames[card % 13]
        });
      }
    }

    // push the literal version of the numbers every 13 items
    warGame.deck.forEach((card, i) => (card.name = warGame.names[i % 13]));
    warGame.shuffleCards(warGame.deck);
  },

  distributeCards: (cards) => {
    warGame.player1Deck = cards.slice(0, 26);
    warGame.player2Deck = cards.slice(26);
  },

  // ---

  gameOver: () => {
    if (warGame.player1Deck.length === 0 || warGame.player2Deck.length === 0) {
      return true;
    } else {
      return false;
    }
  },

  compareCards: (
    winnerDeck,
    loserDeck,
    backgroundColor,
    winner,
    winnerScore,
    loserScore
  ) => {
    // Move the cards from one deck to another
    winnerDeck.push(loserDeck.shift());
    winnerDeck.push(winnerDeck.shift());

    if (warGame.warDeck.length > 0) {
      winnerDeck.push(...warGame.warDeck);
      warGame.warDeck.length = 0;
    }

    // Update the scores
    warGame.player1Score = warGame.player1Deck.length;
    warGame.player2Score = warGame.player2Deck.length;

    // Announce the scores
    console.log(
      chalk[backgroundColor]("Le joueur " + winner + " remporte cette manche !")
    );

    console.log(
      "Son score est maintenant de " + winnerScore + " contre " + loserScore
    );
  },

  playGame: () => {
    warGame.topCardPlayer1 = warGame.player1Deck[0];
    warGame.topCardPlayer2 = warGame.player2Deck[0];

    console.log(
      chalk.bold(
        "Le joueur 1 joue : " + warGame.topCardPlayer1.name + warGame.topCardPlayer1.color
      )
    );
    console.log(
      chalk.bold(
        "Le joueur 2 joue : " + warGame.topCardPlayer2.name + warGame.topCardPlayer2.color
      )
    );

    if (warGame.topCardPlayer1.number > warGame.topCardPlayer2.number) {
      warGame.compareCards(
        player1Deck,
        player2Deck,
        "bgBlue",
        "1",
        player1Score,
        player2Score
      );
    }

    if (warGame.topCardPlayer2.number > warGame.topCardPlayer1.number) {
      warGame.compareCards(
        player2Deck,
        player1Deck,
        "bgGreen",
        "2",
        player2Score,
        player1Score
      );
    }
    if (warGame.topCardPlayer2.number === warGame.topCardPlayer1.number) {
      console.log(chalk.bgRed("Ex-Aequo ! Bataille !"));

      if (!warGame.gameOver()) {
        // push the two ex-aequo cards into the warDeck + add a new (blind) card
        for (let i = 0; i < 2; i++) {
          warGame.warDeck.push(warGame.player1Deck.shift(), warGame.player2Deck.shift());
        }
      } else {
        console.log("La partie se termine en pleine bataille...");
      }

      if (!warGame.gameOver()) {
        warGame.playGame();
      } else {
        console.log("La partie se termine en pleine bataille...");
      }
    }

    warGame.gameOver();
  },
};

// --- Let's Play ---

warGame.init();

while (!warGame.gameOver()) {
  warGame.playGame();
}

if (warGame.player1Deck.length === 0) {
  warGame.player1Deck.push(...warGame.warDeck);
  console.log(
    chalk.bgGreen("Le joueur 2 remporte la partie, le jeu est terminé !")
  );
} else {
  warGame.player2Deck.push(...warGame.warDeck);
  console.log(
    chalk.bgBlue("Le joueur 1 remporte la partie, le jeu est terminé !")
  );
}
