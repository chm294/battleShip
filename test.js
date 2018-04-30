function isValidBoardWithShips(expectedShips, board) {
  const actualShips = {};

  // process the board into an object containing the shipName as key, and { count, rowIndices, colIndices } as value
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (board[row][col] !== '.') {
        const shipName = board[row][col];
        if (!actualShips[shipName]) {
          actualShips[shipName] = {
            count: 0,
            rowIndices: [],
            colIndices: []
          };
        }
        actualShips[shipName].count += 1;
        actualShips[shipName].rowIndices.push(row);
        actualShips[shipName].colIndices.push(col);
      }
    }
  }

  // check that the board contains the right number of expected pieces
  for (let shipName in expectedShips) {
    if (!actualShips[shipName] || actualShips[shipName].count !== ships[shipName]) {
      return false;
    }
  }
  
  // check that the ship pieces are all either vertically or horizontally consecutive
  for (let shipName in actualShips) {
    const rows = actualShips[shipName].rowIndieces;
    const cols = actualShips[shipName].colIndices;

    if (!isVerticallyAligned(rows, cols) && !isHorizontallyAligned(rows, cols)) {
      return false;
    }
  }
  
  return true;
}

/** Helpers */
function isVerticallyAligned(rows, cols) {
  const sortedRows = rows.slice().sort((a, b) => a - b));
  
  return areConsecutives(sortedRows) && areAllTheSame(cols);
}

function isHorizontallyAligned(rows, cols) {
  const sortedCols = cols.slice().sort((a, b) => a - b));

  return areConsecutives(sortedCols) && areAllTheSame(rows);
}

function areConsecutives(sortedArr) {
  if (!sortedArr.length) {
    return true;
  }
  
  let prev = sortedArr[0];
  
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] - prev !== 1) {
      return false;
    }
    prev = sortedArr[i];
  }

  return true;
}

function areAllTheSame(arr) {
  if (!sortedArr.length) {
    return true;
  }
  const item = arr[0];
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] !== item) {
      return false;
    }
  }
  return true;
}
