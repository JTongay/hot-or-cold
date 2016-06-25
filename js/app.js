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

/* The app starts with the newGame() function, it makes the game play when the website is first loaded.
It then begins an if statement where it states that if the variable found is "not false", then use the 
checkNum function, to check if the number selected is valid. In that function, it states if the value
is NaN (not a number) then use the getFeedback() function to say "You have to choose a number!". If the
value is less than 1 or greater than 100, it will say "It has to be a number between 1 and 100!". With the
$.trim(userGuess) === '', it's stating that if the textbox is empty, getFeedback() will spit out "You have
to enter something!". During this whole process, the clearBox() function clears the text box after each
selection. The boxFocus() function creates a focus on the textbox in the form selector. 

After the checkNum() function is finished checking for the correct value, it will trigger the 
guessCounter and guessCount() function. We set the guessCounter value to 0 intially, and we get it to
increment itself by 1 using guessCounter++. In the guessCount function, it takes a counter as an argument,
and changes the count in the '#count' id by 1. In the main function, the argument for guessCount() is 
guessCounter (which if you remember starts at 0, and increments itself by 1.).

When a valid number is selected, it will append itself to the 'ul#guessList' list. 

We then use the guessFlag variable, which initially is used in the checkNum() function. If it returned
false, we use !false, which means "not false" basically saying to continue running the code. We then 
changed this variable to set it equal to the checkTemp() function with (Math.abs(randomNum-userGuess))
as its argument. Math.abs() means it gets the absolute value of a number, which means it won't be a 
negative number. The random number is stored in the newGame() function and its set to the generateNum()
function. Obviously then, we take the random number and subtract the userGuess from it to get the absolute
value of a number. 

That number goes through all the if statements in the checkTemp() function to see if whatever number was 
guessed is hot or cold using all of the different compare statements. When you finally get the number
correctly, the condition is satisfied and will then trigger the else portion of the main function. It 
will then use the getFeedback() function to say "You already won! You have to start a new game!". This
will make it to where you can't put anymore guesses into the textbox, because, you already won.

The new game button is triggered with the newGame() function. This sets all of the necessary values back
to their original values needed to make this game work. */
