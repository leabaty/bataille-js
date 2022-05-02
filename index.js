import chalk from "chalk";
console.log(chalk.blue("Hello world!"));

// Initialization of values
const color = ["♣️", "❤️", "♦️", "♠️"];
const number = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const name = [
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
const playingDeck = [];

// ---------- Creation of playing Deck Object --------------
// for each family, draw the 13 cards and shuffle them
const initializePlayingDeck = (cardcolor, cardnumber) => {
  for (let i = 0; i < cardcolor.length; i++) {
    for (let j = 0; j < cardnumber.length; j++) {
      playingDeck.push({
        color: cardcolor[i],
        number: cardnumber[j],
      });
    }
  }

  // push the literal version of the numbers every 13 items
  for (let k = 0; k < playingDeck.length; k++) {
    playingDeck[k].name = name[k % 13];
  }
  shuffleArray(playingDeck);
};

// Shuffle formula, found on https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,10%5D%3B%20const%20shuffledArray%20%3D%20array.
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

initializePlayingDeck(color, number);

// ---------- Distributing the cards --------------
let player1Deck = null;
let player2Deck = null;

// distribute the cards evenly between the two players
const distributePlayingDeck = (deck) => {
  player1Deck = deck.slice(0, 26);
  player2Deck = deck.slice(26);
};

distributePlayingDeck(playingDeck);

// ---------- Scoring Board --------------

// update the score with the total length of the cards' Deck array
let player1Score = player1Deck.length;
let player2Score = player2Deck.length;

//  ---------- Comparing the cards --------------

// update the value of playing cards with the last card in the playing deck
let cardPlayer1 = player1Deck[0];
let cardPlayer2 = player2Deck[0];

// initialize the war decks
let player1WarDeck = [];
let player2WarDeck = [];

const comparePlayingCards = () => {
  if (player1Score === 0 || player2Score === 0) return;

  // for each round, update the value of the 'top' card
  cardPlayer1 = player1Deck[0];
  cardPlayer2 = player2Deck[0];

  console.log(
    chalk.bold("Le joueur 1 joue : " + cardPlayer1.name + cardPlayer1.color)
  );
  console.log(
    chalk.bold("Le joueur 2 joue : " + cardPlayer2.name + cardPlayer2.color)
  );

  // --------- In case of a winner --------
  // the winning player gets the playing card of his adversary
  // the played card gets to the back of his pile
  // the scores are updated

  if (cardPlayer1.number > cardPlayer2.number) {
    player1Deck.push(player2Deck.shift());
    player1Deck.push(player1Deck.shift());

    player1Score = player1Deck.length;
    player2Score = player2Deck.length;

    console.log(chalk.bgBlue("Le joueur 1 remporte cette manche ! "));
    console.log(
      "Son score est de " +
        player1Score +
        " et le score du Joueur 2 est de " +
        player2Score
    );
  } else if (cardPlayer2.number > cardPlayer1.number) {
    player2Deck.push(player1Deck.shift());
    player2Deck.push(player2Deck.shift());

    player1Score = player1Deck.length;
    player2Score = player2Deck.length;

    console.log(chalk.bgGreen("Le joueur 2 remporte cette manche ! "));
    console.log(
      "Son score est de " +
        player2Score +
        " et le score du Joueur 1 est de " +
        player1Score
    );

    // --------- In case of ex-aequo --------
    // the war loop is launched
  } else {
    console.log(chalk.bgRed("Ex-Aequo ! Bataille !"));
    playWar(player1Deck, player2Deck);
  }

  // --------- In case a player has no cards anymore --------
  // the game is ended, the winner is announced
  if (player1Deck.length === 0) {
    console.log(
      chalk.bgGreen("Le jeu est terminé, le joueur 2 gagne la partie !")
    );
  } else if (player2Deck.length === 0) {
    console.log(chalk.bgBlue("Le jeu est terminé, le joueur 1 a gagné !"));
  }
};

//  ---------- The war loop --------------

const playWar = (player1Hand, player2Hand) => {
  if (player1Score === 0 || player2Score === 0) return;

  // push the two ex-aequo cards into each of the warDecks + add a new (blind) card
  for (let i = 0; i < 2; i++) {
    player1WarDeck.push(player1Hand.shift());
    player2WarDeck.push(player2Hand.shift());
  }

  // update the value of playing cards with the last card in the playing deck
  cardPlayer1 = player1Hand[0];
  cardPlayer2 = player2Hand[0];

  console.log(
    chalk.bold("Le joueur 1 joue : " + cardPlayer1.name + cardPlayer1.color)
  );
  console.log(
    chalk.bold("Le joueur 2 joue : " + cardPlayer2.name + cardPlayer2.color)
  );

  // --------- In case of a winner --------
  // the winning player gets the cards in the wardeck + the playing card of his adversary
  // the played card gets to the back of his pile
  // the scores are updated
  // the wardeck is emptied

  if (cardPlayer1.number > cardPlayer2.number) {
    player1Hand.push(...player1WarDeck, ...player2WarDeck);
    player1Hand.push(player2Hand.shift());
    player1Hand.push(player1Hand.shift());

    player1Score = player1Hand.length;
    player2Score = player2Hand.length;

    console.log(chalk.bgBlue("Le joueur 1 remporte la bataille !"));
    console.log(
      "Son score est de " +
        player1Score +
        " et le score du Joueur 2 est de " +
        player2Score
    );

    player1WarDeck = [];
    player2WarDeck = [];
  } else if (cardPlayer2.number > cardPlayer1.number) {
    player2Hand.push(...player1WarDeck, ...player2WarDeck);
    player2Hand.push(player1Hand.shift());
    player2Hand.push(player2Hand.shift());

    player1Score = player1Hand.length;
    player2Score = player2Hand.length;

    console.log(chalk.bgGreen("Le joueur 2 remporte la bataille !"));
    console.log(
      "Son score est de " +
        player2Score +
        " et le score du Joueur 1 est de " +
        player1Score
    );

    player1WarDeck = [];
    player2WarDeck = [];

    // --------- In case of ex-aequo --------
    // the war loop is relaunched
  } else {
    console.log(chalk.bgRed("Encore Ex-Aequo ! Bataille ! "));
    playWar(player1Hand, player2Hand);
  }

  // --------- In case a player has no cards anymore --------
  // the game is ended, the winner is announced
  if (player1Hand.length === 0) {
    console.log(chalk.bgGreen("Le jeu est terminé, le joueur 2 a gagné !"));
  } else if (player2Hand.length === 0) {
    console.log(chalk.bgBlue("Le jeu est terminé, le joueur 1 a gagné !"));
  }
};

if (player1Score === 0 || player2Score === 0) {
  console.log("Le jeu est terminé");
} else {
  setInterval(comparePlayingCards, 5);
}
