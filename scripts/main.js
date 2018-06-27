
function init() {
	let container = document.querySelector('.container');
	
	// Adding the screen of the calculator
	// let screen = document.createElement('div');
	// screen.id= 'screen';
	// screen.classList.add('gridScreen');
	// screen.textContent='5800';
	// container.appendChild(screen);

	for (let i = 0; i <= 20 ; i++)
	{
		let current = document.createElement('div');
		current.classList.add('gridButtons')
		if (i==0)
		{
			current.addEventListener('click',clear);
			current.textContent = 'AC';
		}
		else if (i==1)
			current.addEventListener('click',clear);
		container.appendChild(current);
	}
	console.log(container);
}
fucntion clear() {

}


init();