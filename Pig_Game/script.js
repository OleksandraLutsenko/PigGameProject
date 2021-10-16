'use strict';
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore1 = document.querySelector('#current--0');
const currentScore2 = document.querySelector('#current--1');
//starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;

  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
};

init();
//switch payer function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};
//rolling the dice

btnRoll.addEventListener('click', function () {
  // 1. generate randowm number
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. check if 1 dice, if true - switch to next player

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to total active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score >= 100
    // active player wins
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      // switch the player
    } else {
      switchPlayer();
    }
  }
});

// reset the game
btnNew.addEventListener('click', init);
