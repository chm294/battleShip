(function(){
	const ships = {
		T: 2,
		D: 3,
		S: 3,
		B: 4,
		C: 5,
	}

	const board = [];	
	const boardSize = 10; 

	function main() {
		generateBoard();
		placeShips();
		console.log(board);
		return board;
	}


	function generateBoard() {
		// create board matrix with array of arrays
		for(let row = 0; row < boardSize; row++) {
			let line = [];
			for(let column = 0; column < boardSize; column++) {
				line.push('.');
			}
			board.push(line);
		}
	}

	function placeShips() {
		for(let ship in ships) {
			if(ships[ship] > boardSize) {
				throw new Error('ships cannot be larger than board');
			} else {
				let allPossibleShipPlacements = findAllOptions(ship);
				if (allPossibleShipPlacements.length <= 0) {
					throw new Error("No possible placement");
				} else {
					let randomNum = getRandomNum(0, allPossibleShipPlacements.length);
					let placement = allPossibleShipPlacements[randomNum];
					toggleShip(ship, ships[ship], placement);
				}
			}
		}
		return board;
	}

	function toggleShip(ship, shipSize, placement) {
		if(placement.direction === "up") {
			let topBound = placement.row - shipSize + 1;
			while(topBound <= placement.row) {
				board[topBound][placement.column] = ship;
				topBound += 1;
			}
		} else if (placement.direction === "right") {
			let rightBound = placement.column + shipSize -1;
			while(rightBound >= placement.column) {
				board[placement.row][rightBound] = ship;
				rightBound -= 1;
			}
		} else if (placement.direction === "down") {
			let bottomBound = placement.row + shipSize -1;
			while(bottomBound >= placement.row) {
				board[bottomBound][placement.column] = ship;
				bottomBound -= 1;
			}
		} else if (placement.direction === "left") {
			let leftBound = placement.column - shipSize + 1;
			while(leftBound <= placement.column) {
				board[placement.row][leftBound] = ship;
				leftBound += 1;
			}
		}
	}


	function findAllOptions(ship) { //returns an array of all options for ship placement on board
		let allPossibleShipPlacements = [];
		for(let row = 0; row < boardSize; row++) {
			for(let column = 0; column < boardSize; column++) {
				const spot = {};
				spot.column = column;
				spot.row = row;
				if(checkUp(row, column, row - ships[ship] + 1)) {
					spot.direction = 'up';
					allPossibleShipPlacements.push(spot);
				}
				if(checkRight(row, column, column + ships[ship] - 1)) {
					spot.direction = 'right';
					allPossibleShipPlacements.push(spot);
				}
				if(checkDown(row, column, row + ships[ship] -1)) {
					spot.direction = 'down';
					allPossibleShipPlacements.push(spot);
				}
				if(checkLeft(row, column, column - ships[ship] + 1)) {
					spot.direction = 'left';
					allPossibleShipPlacements.push(spot);
				}
			}
		}
		return allPossibleShipPlacements;
	};

	function checkUp(row, column, upperBound) {
		if(board[upperBound] === undefined) { return false; } // upperBound is out of bound
		while(upperBound <= row) {
			if(board[upperBound][column] === '.') {
				upperBound += 1;
			} else {
				return false; // there is overlap
			}
		}
		return true;
	}

	function checkRight(row, column, rightBound) {
		if(board[row][rightBound] === undefined) { return false; } //rightBound is out of bound 
		while(rightBound >= column) {
			if(board[row][rightBound] === '.') {
				rightBound -= 1;
			} else {
				return false;
			}
		}
		return true;
	}

	function checkDown(row, column, bottomBound) {
		if(!board[bottomBound]) { return false; }
		while(bottomBound >= row) {
			if(board[bottomBound][column] === '.') {
				bottomBound -= 1;
			} else {
				return false;
			}
		}
		return true;
	}

	function checkLeft(row, column, leftBound) {
		if(!board[row][leftBound]) { return false; }
		while(leftBound <= column) {
			if(board[row][leftBound] === '.') {
				leftBound += 1;
			} else {
				return false;
			}
		}
		return true;
	}

	// calculate random number within Range
	function getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	main();
})();
