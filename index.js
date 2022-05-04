import chalk from "chalk";

console.log(chalk.blue("Hello world!"));

// Initialization of values
const colors = ["♣️", "❤️", "♦️", "♠️"];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const names = [
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
];

const deck = [];

let player1Deck = null;
let player2Deck = null;

const createDeck = (cardcolor, cardnumber) => {
  for (const color of cardcolor) {
    for (const number of cardnumber) {
      deck.push({
        color,
        number,
      });
    }
  }

  // push the literal version of the numbers every 13 items
  deck.forEach((card, i) => (card.name = names[i % 13]));

  shuffleCards(deck);
};

// Shuffle formula, found on https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,10%5D%3B%20const%20shuffledArray%20%3D%20array.
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

createDeck(colors, numbers);

const distributeCards = (cards) => {
  player1Deck = cards.slice(0, 26);
  player2Deck = cards.slice(26);
};

distributeCards(deck);

// -----------

let player1Score = player1Deck.length;
let player2Score = player2Deck.length;

let topCardPlayer1 = player1Deck[0];
let topCardPlayer2 = player2Deck[0];

let warDeck = [];

let gameIsOver = false;

// -------------

const updateScores = (player1Cards, player2Cards) => {
  player1Score = player1Cards.length;
  player2Score = player2Cards.length;
};

const cardMoves = (winner, loser, warCards) => {
  winner.push(loser.shift());
  winner.push(winner.shift());

  if (warCards.length > 0) {
    winner.push(...warCards);
    warCards.length = 0;
  }
};

const checkGameOver = () => {
  if (player1Deck.length === 0 || player2Deck.length === 0) {
    gameIsOver = true;
  } else {
    gameIsOver = false;
  }
};

// -----------

const playGame = () => {
  topCardPlayer1 = player1Deck[0];
  topCardPlayer2 = player2Deck[0];

  console.log(
    chalk.bold(
      "Le joueur 1 joue : " + topCardPlayer1.name + topCardPlayer1.color
    )
  );
  console.log(
    chalk.bold(
      "Le joueur 2 joue : " + topCardPlayer2.name + topCardPlayer2.color
    )
  );

  if (topCardPlayer1.number > topCardPlayer2.number) {
    cardMoves(player1Deck, player2Deck, warDeck);
    updateScores(player1Deck, player2Deck);

    console.log(chalk.bgBlue("Le joueur 1 remporte cette manche ! "));
    console.log(
      "Son score est de " +
        player1Score +
        " et le score du Joueur 2 est de " +
        player2Score
    );
  }
  if (topCardPlayer2.number > topCardPlayer1.number) {
    cardMoves(player1Deck, player2Deck, warDeck);
    updateScores(player1Deck, player2Deck);

    console.log(chalk.bgGreen("Le joueur 2 remporte cette manche ! "));
    console.log(
      "Son score est de " +
        player2Score +
        " et le score du Joueur 1 est de " +
        player1Score
    );
  }
  if (topCardPlayer2.number === topCardPlayer1.number) {
    console.log(chalk.bgRed("Ex-Aequo ! Bataille !"));

    checkGameOver();
    if (!gameIsOver) {
      // push the two ex-aequo cards into the warDeck + add a new (blind) card
      for (let i = 0; i < 2; i++) {
        warDeck.push(player1Deck.shift(), player2Deck.shift());
      }
    } else {
      console.log("La partie se termine en pleine bataille...");
    }

    checkGameOver();
    if (!gameIsOver) {
      playGame();
    } else {
      console.log("La partie se termine en pleine bataille...");
    }
  }

  checkGameOver();
};

while (!gameIsOver) {
  playGame();
}

if (player1Deck.length === 0) {
  player1Deck.push(...warDeck);
  console.log(
    chalk.bgGreen("Le joueur 2 remporte la partie, le jeu est terminé !")
  );
} else {
  player2Deck.push(...warDeck);
  console.log(
    chalk.bgBlue("Le joueur 1 remporte la partie, le jeu est terminé !")
  );
}
