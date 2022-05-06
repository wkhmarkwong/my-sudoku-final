const b = null;

function initiate() {
  var startingBoard = [[]];
  var j = 0;
  for (var i = 1; i <= 81; i++) {
    const val = document.getElementById(String(i)).value;
    if (val == "") {
      startingBoard[j].push(null);
    } else {
      startingBoard[j].push(Number(val));
    }
    if (i % 9 == 0 && i < 81) {
      startingBoard.push([]);
      j++;
    }
  }

  const inputValid = validBoard(startingBoard);
  if (!inputValid) {
    inputIsInvalid();
  } else {
    const answer = solve(startingBoard);
    updateBoard(answer, inputValid);
  }
}

function solve(board) {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);
    return searchForSolution(validBoards);
  }
}

function searchForSolution(boards) {
  if (boards.length < 1) {
    return false;
  } else {
    var first = boards.shift();
    const tryPath = solve(first);
    if (tryPath != false) {
      return tryPath;
    } else {
      return searchForSolution(boards);
    }
  }
}

function solved(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return false;
      }
    }
  }
  return true;
}

function nextBoards(board) {
  var res = [];
  const firstEmpty = findEmptySquare(board);
  if (firstEmpty != undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (var i = 1; i <= 9; i++) {
      var newBoard = [...board];
      var row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
}

function findEmptySquare(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j];
      }
    }
  }
}

function keepOnlyValid(boards) {
  return boards.filter((b) => validBoard(b));
}

function validBoard(board) {
  return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      // for cell value >9 or <1, we just need to check once -> to save validation time
      if (
        cur.includes(board[i][j]) ||
        parseInt(board[i][j]) < 1 ||
        parseInt(board[i][j]) > 9
      ) {
        return false;
      } else if (board[i][j] != null) {
        cur.push(board[i][j]);
      }
    }
  }

  return true;
}

function columnsGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = [];
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false;
      } else if (board[j][i] != null) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
}

function boxesGood(board) {
  const boxCoordinates = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];

  for (var y = 0; y < 9; y += 3) {
    for (var x = 0; x < 9; x += 3) {
      var cur = [];
      for (i = 0; i < 9; i++) {
        var coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;
        var compareVal = board[coordinates[0]][coordinates[1]];
        if (cur.includes(compareVal)) {
          return false;
        } else if (compareVal != null) {
          cur.push(compareVal);
        }
      }
    }
  }
  return true;
}

function updateBoard(board) {
  if (board == false) {
    inputIsInvalid()
  } else {
    var current = 1;
    for (var i = 1; i <= 9; i++) {
      for (var j = 0; j < 9; j++) {
        document.getElementById("ans" + current).innerHTML = board[i-1][j];
        current++;
    }

  }
}
}

function inputIsInvalid() {
  
  document.getElementById("invalid-notice").innerHTML = "Solution not found. Please refresh and try again."
  document.getElementById('output-grid').remove()
  document.getElementById('submit-button').remove()
  document.getElementById('answer-notice').remove()

}
