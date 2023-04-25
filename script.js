// Create the table element
let table = document.createElement("table");

// Add the "board" class to the table
table.classList.add("board");

// Create six row elements
for (var i = 0; i < 6; i++) {
  var row = document.createElement("tr");
  // Create seven cell elements in each row
  for (var j = 0; j < 7; j++) {
    let cell = document.createElement("td");
    let button = document.createElement("button");
    button.type = "button";
    button.id = `${j}${i}`;
    cell.appendChild(button);
    row.appendChild(cell);
  }
  // Append the row to the table
  table.appendChild(row);
}

// Add the table to the document body
document.body.appendChild(table);

let counter = 0;

function createBoard() {
  const emptySlot = "E";
  gameBoard = [];
  const gameBoard = new Array(rows)
    .fill(null)
    .map(() => new Array(columns).fill(emptySlot));
  return gameBoard;
}

function createEmptyBoard() {
  const emptySlot = "E";
  const rows = 6;
  const columns = 7;
  const gameBoard = new Array(rows);
  for (let i = 0; i < rows; i++) {
    gameBoard[i] = new Array(columns).fill(emptySlot);
  }
  console.log(gameBoard);
  return gameBoard;
}

let gameBoard = createEmptyBoard();

function fillupBoard(column, player) {
  let i = 5;
  while (i >= 0) {
    if (gameBoard[i][column] === "E") {
      const selectedCircle = document.getElementById(`${column}${i}`);
      if (player % 2 === 0) {
        selectedCircle.style.backgroundColor = "red";
        gameBoard[i][column] = "R";
        //console.log(player, "asd");
        player++;
        return [player, i];
      } else {
        selectedCircle.style.backgroundColor = "green";
        gameBoard[i][column] = "G";
        //console.log(player, "asd");
        player++;
        return [player, i];
      }
    }
    i--;
  }
  return [player, i];
}

function get_cell(i, j) {
  if (0 <= i && i < 6 && 0 <= j && j < 7) {
    return gameBoard[i][j];
  } else {
    return "E";
  }
}

function check_result(col, line, callback) {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (let [di, dj] of directions) {
    for (let idx = -3; idx < 1; idx++) {
      const start_line = line + idx * di;
      const start_col = col + idx * dj;
      const sub_array = [];
      for (let idx2 = 0; idx2 < 4; idx2++) {
        sub_array.push(callback(start_line + idx2 * di, start_col + idx2 * dj));
      }
      console.log(sub_array, start_line, start_col, "asd", new Set(sub_array));
      if (sub_array.includes("E") === false) {
        if (new Set(sub_array).size === 1) {
          return true;
        }
      }
    }
    console.log("next");
  }
  return false;
}

document.addEventListener("click", function (e) {
  //  console.log(e.target.id);
  //  console.log(window.getComputedStyle(e.target).backgroundColor);
  id = e.target.id;
  const outcome = fillupBoard(id[0], counter);
  if (outcome[0] !== NaN) {
    counter = outcome[0];
    if (check_result(+id[0], outcome[1], get_cell) === true) {
      if (counter % 2 === 0) {
        alert("Winner GREEN!");
      } else {
        alert("Winner RED!");
      }
    }
  }
  //console.log(id[0], "ddddd", counter, "aaaaa", outcome);
  //counter++;
  // if (
  //   window.getComputedStyle(e.target).backgroundColor === "rgb(128, 128, 128)"
  // ) {
  //   if (counter % 2 === 0) {
  //     e.target.style.backgroundColor = "red";
  //   } else {
  //     e.target.style.backgroundColor = "green";
  //   }
  //   counter++;
  // }
});
