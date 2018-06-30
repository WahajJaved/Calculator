
function init() {
	const container = document.querySelector('.container');
	
	// A magic number for the setting of calculator digits :(
	let currentNum = 7;
	
	for (let i = 1; i <= 16 ; i++)
	{
		//  Iterating over all the grid buttons and adding initial functionality
		const current = document.createElement('div');
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
			// Magic Number correction
				currentNum++;

			current.textContent = currentNum;
			current.setAttribute('data-key', currentNum+48);
			currentNum++;

			if (i == 13)
				// Add floating point functionality
				current.textContent = '.';

			current.addEventListener('click', addToScreen);

		}
		else if (i%4 == 0) {
			// Section to add functionality (text content and border-specific styling) for the arithematic operators

			currentNum -= 6;
			current.style.borderLeftColor = 'rgba(46, 46, 46, 0.5)';
			
			if (i / 4 == 1)
				current.textContent = '/';
			else if (i / 4 == 2) 
				current.textContent = '*';
			else if (i / 4 == 3) 
				current.textContent = '-';
			else if (i / 4 == 4)
				current.textContent = '+';
			current.addEventListener('click', addToScreen);
		}

		// Border Aesthetic Corrections
		if (i%4==0)
			current.style.borderRightWidth='0px';
		else if (i % 4 == 1)
			current.style.borderLeftWidth = '0px';
		
		// Adding clickable-button-only listeners
		current.addEventListener('transitionend', removeTransition);
		container.appendChild(current);
	}

	// Adding global event listener
	let clean = document.getElementById('clear');
	clean.addEventListener('click',clear);
	window.addEventListener('keypress',keyPress);

}
function removeTransition(e) {
	if (e.propertyName !== 'transform')
		return;
	e.target.classList.remove('mouseDown');
}
function keyPress(e) {
	const key = e.which || e.keyCode;
	let text = '';

	const screen = document.getElementById('screen');
	const button = document.querySelector(`div[data-key="${key}"]`);
	
	
	if (key == 8) {
		backspace();
		return;
	}
	else if (key >= 48 && key <= 57) {
		// Keycodes for numpad numbers
		button.classList.toggle('mouseDown');
		text = key - 48;
	}
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
	{
		clear();
		return;
	}
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
	const screen = document.getElementById('screen');
	e.target.classList.toggle('mouseDown');
	if (screen.textContent === '0')
		screen.textContent = e.target.textContent;
	else
		screen.textContent += e.target.textContent;
}
function backspace() {
	const screen = document.getElementById('screen');
	screen.textContent = screen.textContent.slice(0, screen.textContent.length-1);
}
function equate() {
	const screen = document.getElementById('screen');
	let splitStrings = screen.textContent.match(/[^\d()]+|[\d.]+/g);

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
		screen.textContent = 'Syntax Error';
}
function operate(operator, num1, num2) {
	let result = 0;
	if (operator == '/')
	{
		if (num2 != '0')
			result =  parseFloat(num1 / num2);
		else
			return 'Math Error';
	}
	else if (operator == '*')
		result = num1 * num2;
	else if (operator == '-')
		result =  num1 - num2;
	else if (operator == '+')
		result = num1 + num2;
	return parseFloat(parseFloat(result).toFixed(5));//.toString();
}
function clear() {
	const screen = document.getElementById('screen');
	screen.textContent = '0';
}
init();
