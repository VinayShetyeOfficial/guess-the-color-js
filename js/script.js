window.onload = function() {

	/*--- BUTTONS ---*/
	var resetNewCol = document.getElementById('reset');
	var modeButtons = document.querySelectorAll('.mode');
	//    var easyButton = document.querySelector('.mode');

	/*--- Header ---*/
	var header = document.querySelector('h1');

	/*--- For displaying message ---*/
	var displayMessage = document.getElementById('message');

	/*--- SQUARES ---*/
	var squares = document.querySelectorAll('.square');
	var numSquares = 6;

	/*--- Array of Colors ---*/
	var colors = [];

	/*--- Secret Color to be guessed ---*/
	var autoPickedColor;

	/*--- Display color in RGB format ---*/
	colorDisplay = document.getElementById('color-display');

	/*--- Resetting block colors on button click (`New Colors`) ---*/
	resetNewCol.addEventListener('click', setColors);

	/*--- Switching between Modes ---*/
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', changeMode);
	}

	/*--- Clicking Blocks and checking if secret Color found ---*/
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener('click', checkUserGuess);
	}


	/*--- START ---*/
	init();

	function init() {
		reset();
		setColors();
	}

	/*--- RESET ---*/
	function reset() {
		colors = [];
		autoPickedColor = "";
		header.style.backgroundColor = "#2C8E99";
		displayMessage.textContent = "";
	}


	/*--- Secret Color auto picked ---*/
	function guessColor() {
		var random = Math.floor(Math.random() * colors.length);
		autoPickedColor = colors[random];
		colorDisplay.textContent = autoPickedColor;
	}

	/*--- Checking if secret color found by the user ---*/
	function checkUserGuess() {

		if (this.style.backgroundColor === autoPickedColor) {
			displayMessage.textContent = 'Correct!';
			secretColorBg();
		} 
        else {
			this.style.backgroundColor = "transparent";
			displayMessage.textContent = 'Try again!';
		}
	}

	/*--- On successfully finding the secret color, changing (header + blocks)bg to secret color ---*/
	function secretColorBg() {

		header.style.backgroundColor = autoPickedColor;

		squares.forEach(function(square) {
			square.style.backgroundColor = autoPickedColor;
		});
	}

	/*--- Switching between modes (Easy/Hard) ---*/
	function changeMode() {

		for (var i = 0; i < modeButtons.length; i++) {
			modeButtons[i].classList.remove('selected');
		}

		if (this.textContent == 'Hard') {
			this.classList.add('selected');
			numSquares = 6;
		} 
        else {
			this.classList.add('selected');
			numSquares = 3;
		}

		init();
	}

	/*--- Setting a unique color to each block ---*/
	function setColors() {

		reset();
		var uniqueColor;

		for (var i = 0; i < numSquares + (6 - numSquares); i++) {
			
            if (i < numSquares) {

				uniqueColor = genColor()

				if (!(colors.includes(uniqueColor))) {
					colors[i] = uniqueColor;
					squares[i].style.display = "block";
					squares[i].style.backgroundColor = colors[i];
				} 
                else {
					i--;
				}
			} 
            else {
				squares[i].style.display = "none";
			}
		}
		guessColor();
	}


	/*--- Generating Colors ---*/
	function genColor() {
		var r = Math.floor(Math.random() * 256);
		var g = Math.floor(Math.random() * 256);
		var b = Math.floor(Math.random() * 256);
		return "rgb(" + r + ", " + g + ", " + b + ")";
	}
}