"use strict";

// START
// VARAIBLE DECLARATION
const button = document.querySelector(".submit-button");
const input_field = document.querySelector(".input-field");
const random_field = document.querySelector(".random-number");
const form = document.querySelector(".form");
const message_field = document.querySelector(".response-message");
const chance_field = document.querySelector(".chance");
const score_field = document.querySelector(".score");
const high_score_field = document.querySelector(".high-score");
const high_guess_num_field = document.querySelector(".high-guess-number");

const high_guess_num = 20;
let ran_num;
let chance = high_guess_num;
let score_value = 20;
let high_score_value = 0;
const disable = "disabled";
const require = "required";
// FUNCTION DECLARAION

// - ----------------------------------------------------------------------------------
// HELPER's

// RANDOM NUMBER
const getRandom = () => Math.trunc(Math.random() * 20) + 1;

// clear input field
const clearInputField = () => {
  input_field.value = "";
};

// Set Attribute
const setAttrribut = function (element, attribute) {
  element.setAttribute(attribute, attribute);
};
// Get Attribute
const removeAttribut = function (element, attribute) {
  element.removeAttribute(attribute, attribute);
};

// Button Chance Text
const changeElementText = function (element, text) {
  element.innerHTML = text;
};

// - ----------------------------------------------------------------------------------

// Getting Value From User
const get_Call = function (event) {
  event.preventDefault();
  const guessed_number = Number(input_field.value);
  if (
    (guessed_number === "") &
    (typeof guessed_number === "number") &
    undefined &
    null
  ) {
    console.log("no number");
    return;
  }
  console.log(guessed_number);
  checker(guessed_number);
};

// Listener
// 1. ADD
const listener = function (
  target,
  type,
  func = function () {
    returns;
  }
) {
  target.addEventListener(type, func);
};

// 2. REMOVE
const removeListener = function (target, type, func) {
  target.removeEventListener(type, func, false);
};

// 000000000000000000000000000000000000000000000000000000000

const init = function (load = false, won = false, over = false) {
  ran_num = getRandom();
  console.log(ran_num);
  chance = high_guess_num;
  console.log("I am score value ", score_value);
  console.log("I am high score value ", high_score_value);
  score_value = "__";
  // score_value = high_guess_num;
  changeElementText(high_score_field, high_score_value);


  changeElementText(chance_field, chance);
  changeElementText(score_field, score_value);
  changeElementText(high_score_field, high_score_value);

  setAttrribut(input_field, disable);
  clearInputField();
  changeElementText(high_guess_num_field, high_guess_num);





  // load
  const GameLoad = function (e) {
    score_value = high_guess_num;
    changeElementText(score_field, score_value);


    removeAttribut(input_field, disable);
    removeListener(button, "click", GameLoad);
    changeElementText(button, "Confirm");
    input_field.focus();
    setTimeout(function () {
      setAttrribut(input_field, require);
    }, 2000);

    listener(form, "submit", get_Call);
    return;
  };
  // playAgain (GameWon)
  const GameWon = function (e) {
    score_value = high_guess_num;
    changeElementText(score_field, score_value);

    changeElementText(random_field, "?");
    removeAttribut(input_field, disable);
    changeElementText(button, "Confirm");
    removeListener(button, "click", GameWon);
    input_field.focus();

    listener(form, "submit", get_Call);
    removeAttribut(input_field, disable);

    return;
  };
  // playAgain (GameOver)
  const GameOver = function (e) {
    score_value = high_guess_num;
    changeElementText(score_field, score_value);

    changeElementText(random_field, "?");
    removeAttribut(input_field, disable);
    changeElementText(button, "Confirm");
    listener(form, "submit", get_Call);
    removeListener(button, "click", GameOver);
    input_field.focus();
    removeAttribut(input_field, disable);

    return;
  };
  if (load) {
    changeElementText(random_field, "?");
    changeElementText(button, "Play");
    listener(button, "click", GameLoad);
    changeElementText(message_field, "Click Play to start");
  }
  if (won) {
    changeElementText(button, "Play Again");
    listener(button, "click", GameWon);
    changeElementText(message_field, "Click Play Again to start");
    changeElementText(chance_field, "");
  }
  if (over) {
    changeElementText(button, "Play Again");
    listener(button, "click", GameOver);
    changeElementText(message_field, "Click Play Again to start");
    changeElementText(chance_field, "");
    changeElementText(random_field, ran_num);
  }

};
init(true);

// 0000000000000000000000000000000000000000000000000000000000000

const playAgain = function (won = false, over = false) {
  removeAttribut(input_field, require);
  setAttrribut(input_field, disable);

  const playAgainWon = function (e) {
    // init(true, false, false);
    init(false, true, false);
  };
  const playAgainLoose = function (e) {
    init(false, false, true);
  };

  if (won) playAgainWon();

  if (over) playAgainLoose();
};

// - ----------------------------------------------------------------------------------
const checker = function (number) {
  if (!number) {
    changeElementText(message_field, "Please guess Some number");
    console.log("not checked");
    return;
  }
  console.log("checked");




  if (number > ran_num) {
    message_field.innerHTML = "To high";
  }
  if (number < ran_num) {
    message_field.innerHTML = "To Low";

  }
  if (number === ran_num) {
    message_field.innerHTML = "Correct Guess";
    // before play 
    high_score_value += score_value;
    changeElementText(random_field, ran_num);

    playAgain(true);


    // high score

    return;
  }
  chance--;
  changeElementText(chance_field, chance);
  score_value--;
  changeElementText(score_field, score_value);
  if (chance <= 0) {
    gameOver();
    return;
  }
};

// - ----------------------------------------------------------------------------------

const gameOver = function () {
  playAgain(false, true);
  message_field.innerHTML = "Opps! Game Over";
  changeElementText(chance_field, "0");
  clearInputField();
  changeElementText(random_field, ran_num);
};
