
function init() {
	let container = document.querySelector('.container');
	
	let currentNum = 7;
	for (let i = 1; i <= 20 ; i++)
	{
		//  Iterating over all the grid buttons and adding initial functionality
		let current = document.createElement('div');
		current.classList.add('gridButtons');
		

		if (i == 17) {
			// TODO : Add floating point functionality
			current.textContent = ".";
		}
		else if (i == 19) {
			// Section for the evaluation of the current expression
			current.textContent = "=";
		}
		else if (i%4 != 0) {
			// Section for the numbers
			if (i == 18)
				currentNum++;
			current.textContent = currentNum;
			currentNum++;
		}
		else if (i%4 == 0) {
			currentNum -= 5;
			current.style.borderLeftColor ="rgba(46, 46, 46, 0.5)";

			// Section to add functionality for the arithematic operators
			if (i / 4 == 1) {
				current.textContent = 'C';
			}
			else if (i / 4 == 2) {
				current.textContent = '/';
			}
			else if (i / 4 == 3) {
				current.textContent = '*';
			}
			else if (i / 4 == 4) {
				current.textContent = '-';
			}
			else if (i / 4 == 5) {
				current.textContent = '+';
			}
		}

		
		// Border Aesthetic Corrections
		if (i%4==0)
			current.style.borderRightWidth='0px';
		else if (i % 4 == 1)
			current.style.borderLeftWidth = '0px';

		container.appendChild(current);

	}
	console.log(container);
}
function clear() {

}


init();