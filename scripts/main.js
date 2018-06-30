
function init() {
	let container = document.querySelector('.container');
	
	let currentNum = 7;
	for (let i = 1; i <= 16 ; i++)
	{
		//  Iterating over all the grid buttons and adding initial functionality
		let current = document.createElement('div');
		current.classList.add('gridButtons');
		current.classList.add('noSelect');
		

		
		if (i == 15) {
			// Section for the evaluation of the current expression
			current.textContent = '=';
			current.addEventListener('click', equate);
		}
		else if (i%4 != 0) {
			// Section for the numbers
			
			if (i == 14)
				currentNum++;
			current.textContent = currentNum;
			currentNum++;

			if (i == 13) {
				// TODO : Add floating point functionality
				current.textContent = '.';
			}
			current.addEventListener('click', addToScreen);

		}
		else if (i%4 == 0) {
			currentNum -= 6;
			current.style.borderLeftColor = 'rgba(46, 46, 46, 0.5)';

			// Section to add functionality for the arithematic operators
		
			if (i / 4 == 1) {
				current.textContent = '/';
			}
			else if (i / 4 == 2) {
				current.textContent = '*';
			}
			else if (i / 4 == 3) {
				current.textContent = '-';
			}
			else if (i / 4 == 4) {
				current.textContent = '+';
			}
			current.addEventListener('click', addToScreen);
		}

		
		// Border Aesthetic Corrections
		if (i%4==0)
			current.style.borderRightWidth='0px';
		else if (i % 4 == 1)
			current.style.borderLeftWidth = '0px';
    
		current.addEventListener('transitionend', removeTransition);
		container.appendChild(current);
	}
	let aclear = document.getElementById('clear');
	aclear.addEventListener('click',clear);
	window.addEventListener('keypress',keyPress);
//	console.log(container);
}
function removeTransition(e) {
	if (e.propertyName !== 'transform')
		return;
	e.target.classList.remove('mouseDown');
}
function keyPress(e) {
	let key = e.which || e.keyCode;
	console.log(key);
	let text = '';
	let screen = document.getElementById('screen');
	if (key >= 49 && key <= 57)
		text = key-48;
		// Keycodes for numpad numbers
	else if (key == 42) 
		text = '*';
	else if (key == 43)
		text = '+';
	else if (key == 45)
		text = '-';
	else if (key == 46)
		text = '.';
	else if (key == 47)
		text = '/';
	else if (key == 99)
		clear();
	// Placing the text on screen
	if (screen.textContent === '0')
		screen.textContent = text;
	else
		screen.textContent += text;
	// If Enter key is pressed
	if (key == 13)
		equate();

}
function addToScreen (e) {
	let screen = document.getElementById('screen');
	e.target.classList.toggle('mouseDown');
	if (screen.textContent === '0')
		screen.textContent = e.target.textContent;
	else
		screen.textContent += e.target.textContent;
}
function equate() {
	let screen = document.getElementById('screen');
	let splitStrings = screen.textContent.match(/[^\d()]+|[\d.]+/g);
	console.log(splitStrings);
	if (splitStrings.length % 2 != 0)
	{
		let operator = '';
		let result = 0;
		for(let i = 0; i < splitStrings.length; i++) {
			if (i == 0)
				result = parseFloat(splitStrings[i]);
			else if (i % 2 != 0)
				operator = splitStrings[i];
			else if (i % 2 == 0)
				result = operate(operator, result, parseFloat(splitStrings[i]));
		}
		screen.textContent = result;
	}
	else
		screen.textContent = 'Error!';
}
function operate(operator, num1, num2) {
	let result = 0;
	if (operator == '/')
		result =  parseFloat(num1 / num2).toFixed(5);
	else if (operator == '*')
		result = num1 * num2;
	else if (operator == '-')
		result =  num1 - num2;
	else if (operator == '+')
		result = num1 + num2;
	return parseFloat(parseFloat(result).toFixed(5));//.toString();
}
function clear() {
	let screen = document.getElementById('screen');
	screen.textContent = 0;
}


init();
