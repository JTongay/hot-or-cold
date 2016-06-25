(function () {
  $(function () {

    /* Starts game on load */
    newGame();

    /*--- Display information modal box ---*/
    $(".what").click(function () {
      $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
      $(".overlay").fadeOut(1000);
    });
    /*--- New Game Button ---*/
    $(document).on('click', '.new', newGame);


    /*--- Playing the game --- */
    $('form').submit(function (event) {
      event.preventDefault();
      if (!found) {
        userGuess = $('#userGuess').val();
        //console.log("The users guess is " + userGuess);
        clearBox();
        boxFocus();
        guessFlag = checkNum(userGuess);
        if (!guessFlag) {
          guessCounter++;
          guessCount(guessCounter);
          //addNum();
          $('ul#guessList').append('<li>' + userGuess + '</li>');
          guessFlag = checkTemp(Math.abs(randomNum - userGuess));
        };

      } else {
        getFeedback("You already won! You have to start over!");
      };
    })






  });

  /* New Game Button, it resests all values */
  function newGame() {
    guessFlag = true;
    guessCounter = 0;
    found = false;
    $("ul#guessList li").remove();
    getFeedback("Make a guess!");
    randomNum = generateNum();
    guessCount(guessCounter);
    boxFocus();
    clearBox();

  }

  /* Generates the random number */
  function generateNum() {
    var num = Math.floor((Math.random() * 100) + 1);
    console.log("The number is " + num);
    return num;
  }

  function addNum() {
    var text = $('#userGuess').val();
    $('ul#guessList').append('<li>' + text + '</li>');
    event.preventDefault();
    clearBox();
  }

  function clearBox() {
    $('#userGuess').val('');
  }

  /* Checks to see if guess is the right value */
  function checkNum(userGuess) {
    if (isNaN(userGuess)) {
      getFeedback("You have to choose a number!");
      return true;

    } else if (userGuess < 1 || userGuess > 100) {
      getFeedback("Your guess has to be between 1 and 100!");
      return true;

    } else if ($.trim(userGuess) === '') {
      getFeedback("You have to enter something!");
      return true;

    } else {
      return false;
    }
  }

  function checkTemp(guessDifference) {
    if (guessDifference === 0) {
      getFeedback("Hooray! You're a winner! Play again?");
      found = true;
      return false;
    } else if (guessDifference <= 5) {
      getFeedback("You're on fire!");
      return true;
    } else if (guessDifference <= 10) {
      getFeedback("You're hot!");
      return true;
    } else if (guessDifference >= 10 && guessDifference <= 20) {
      getFeedback("You're warm.");
      return true;
    } else if (guessDifference >= 20 && guessDifference <= 30) {
      getFeedback("You're cold.");
      return true;
    } else if (guessDifference >= 30 && guessDifference <= 40) {
      getFeedback("You're very cold.");
      return true;
    } else {
      getFeedback("You're frozen solid");
      return true;
    };
  }

  function getFeedback(feedback) {
    $('#feedback').text(feedback);
  }

  function guessCount(count) {
    $('#count').text(count);
  }

  function boxFocus() {
    document.getElementById("userGuess").focus();
  }

  /* variable declarations */
  var found = false;
  var userGuess;
  var randomNum;
  var guessFlag;
  var guessCounter = 0;

})();
/* I need to get the computer to get a number and
not show.

I need to put in a number inside the textbox, hit enter,
or click on the submit button.

The computer takes that number, and displays a cold, warmer,
warm, hot message depending on what number is guessed.

After each guess, a counter is displayed, showing how many
guesses you've had, as well as all the numbers you already
guessed.
*/
