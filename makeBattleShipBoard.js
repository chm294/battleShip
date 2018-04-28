const ships = {
	T : 2,
	D: 3,
	S: 3,
	B: 4,
	C: 5,
}

const MAX_COLLISIONS = 5; 

function generateBoard(boardSize, ships) {
	// create board matrix
	const board = [];
	for(let i = 0; i < boardSize; i++) {
		const line = [];
		for(let j = 0; j < boardSize; j++) {
			line.push('.')
		}
		board.push(line);
	}

	let collisionCount = 0;

	let placeShip = function(ship) {
		let coordinates = getRandomCoordiantes(boardSize, board);
		let direction = determineDirection(coordinates, ships[ship], board);

		if(!!direction) {
			toggleShip(coordinates, direction, ships[ship], ship, board);
		} else {
			if(collisionCount > MAX_COLLISIONS) {
				console.error('board too small and too many conflicts. Consider passing in larger board size or using smaller ships for your game');
				return;
			}
			collisionCount += 1
			placeShip(ship);
		}
	}

	// generate ships
	for( var ship in ships) {
		if(ships[ship] > boardSize) {
			console.error('ships too large for current board. Adjustment required.')
			return;
		} else {
			placeShip(ship);
		}
	}
	return board;
}



// decide placement
function getRandomCoordiantes(boardSize, board) {
	let m = Math.floor(Math.random() * (boardSize));
	let n = Math.floor(Math.random() * (boardSize));
	while(board[m][n] !== '.') {
		m = Math.floor(Math.random() * (boardSize));
		n = Math.floor(Math.random() * (boardSize)); 
	}
	return [m, n];
}

// decide orientation (up, right, down, left)
function determineDirection(coordinates, shipSize, board) {
	let m = coordinates[0];
	let n = coordinates[1];
	let options = ['up', 'right', 'down', 'left'];

	while(m >= coordinates[0] - shipSize) { //up
		if(board[m] !== undefined && board[m][n] === '.') {
			m -= 1;
		} else {
			options.splice(options.indexOf('up'), 1);
			break;
		}
	}
	m = coordinates[0];
	
	while(n <= coordinates[1] + shipSize) { // right
		if( board[m][n] !== undefined && board[m][n] === '.') {
			n += 1;
		} else {
			options.splice(options.indexOf('right'), 1);
			break;
		}
	}
	n = coordinates[1];

	while(m <= coordinates[0] + shipSize) { //down
		if( board[m] !== undefined && board[m][n] === '.') {
			m += 1;
		} else {
			options.splice(options.indexOf('down'), 1);
			break;
		}
	}
	m = coordinates[0];

	while(n >= coordinates[1] - shipSize) { // left
		if(board[m][n] !== undefined && board[m][n] === '.') {
			n -= 1;
		} else {
			options.splice(options.indexOf('left'), 1);
			break;
		}
	}
	n = coordinates[1];

	if(options.length === 0) {
		return false;
	} else {
		// return an orientation, up, right, down or left
		return options[Math.floor(Math.random() * (options.length))];
	}
}


function toggleShip(coordinates, direction, shipSize, ship, board) {
	let m = coordinates[0];
	let n = coordinates[1];
	board[m][n] = ship;

	if(direction === 'up'){
		while( m > coordinates[0] - shipSize + 1) {
			board[m -= 1][n] = ship;
		}
	} else if (direction === 'right') {
		while(n < coordinates[1] + shipSize - 1) {
			board[m][n += 1] = ship;
		}
	} else if (direction === 'down') {
		while(m < coordinates[0] + shipSize -1) {
			board[m += 1][n] = ship;
		}
	} else if (direction === 'left') {
		while(n > coordinates[1] - shipSize + 1) {
			board[m][n -= 1] = ship;
		}
	}
}

const board = generateBoard(2, ships);
console.log(board);
// RUN TIME
// MODULARITY WITH HELPER FUNCTIONS
// FLEXIBILITY / EASY MANIPULATION
// what if board is 100 x 100
// what if board is 3 x 3
// randomness