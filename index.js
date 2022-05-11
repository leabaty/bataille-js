import chalk from "chalk";

console.log(chalk.yellow("Jeu de la bataille"));

// -- INITIALIZATION OF VALUES

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

let player1Deck = [];
let player2Deck = [];

let player1Score = player1Deck.length;
let player2Score = player2Deck.length;

let topCardPlayer1 = player1Deck[0];
let topCardPlayer2 = player2Deck[0];

let warDeck = [];

// -- LOGIC --

// Shuffle formula, found on https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,10%5D%3B%20const%20shuffledArray%20%3D%20array.
const shuffleCards = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const createDeck = (cardcolor, cardnumber, cardnames) => {
  for (const color of cardcolor) {
    for (const number of cardnumber) {
      deck.push({
        color,
        number,
        // name : cardnames[card % 13]
      });
    }
  }

  // push the literal version of the numbers every 13 items
  deck.forEach((card, i) => (card.name = names[i % 13]));

  shuffleCards(deck);
};

const distributeCards = (cards) => {
  player1Deck = cards.slice(0, 26);
  player2Deck = cards.slice(26);
};

const gameOver = () => {
  if (player1Deck.length === 0 || player2Deck.length === 0) {
    return true;
  } else {
    return false;
  }
};

const compareCards = (
  winnerDeck,
  loserDeck,
  backgroundColor,
  winner,
  winnerScore,
  loserScore
) => {
  // Move the cards from one Deck to another
  winnerDeck.push(loserDeck.shift());
  winnerDeck.push(winnerDeck.shift());

  if (warDeck.length > 0) {
    winnerDeck.push(...warDeck);
    warDeck.length = 0;
  }

  // Update the scores
  player1Score = player1Deck.length;
  player2Score = player2Deck.length;

  // Announce the scores
  console.log(
    chalk[backgroundColor]("Le joueur " + winner + " remporte cette manche !")
  );

  console.log(
    "Son score est maintenant de " + winnerScore + " contre " + loserScore
  );
};

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
    compareCards(
      player1Deck,
      player2Deck,
      "bgBlue",
      "1",
      player1Score,
      player2Score
    );
  }

  if (topCardPlayer2.number > topCardPlayer1.number) {
    compareCards(
      player2Deck,
      player1Deck,
      "bgGreen",
      "2",
      player2Score,
      player1Score
    );
  }
  if (topCardPlayer2.number === topCardPlayer1.number) {
    console.log(chalk.bgRed("Ex-Aequo ! Bataille !"));

    if (!gameOver()) {
      // push the two ex-aequo cards into the warDeck + add a new (blind) card
      for (let i = 0; i < 2; i++) {
        warDeck.push(player1Deck.shift(), player2Deck.shift());
      }
    } else {
      console.log("La partie se termine en pleine bataille...");
    }

    if (!gameOver()) {
      playGame();
    } else {
      console.log("La partie se termine en pleine bataille...");
    }
  }

  gameOver();
};

// -- PLAY THE GAME

createDeck(colors, numbers, names);
distributeCards(deck);

while (!gameOver()) {
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
