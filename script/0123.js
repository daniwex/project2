let scores = document.querySelector(".scores");
let table = document.getElementById("table");
let thead = table.createTHead();
let row = thead.insertRow(0);
let cell0 = row.insertCell(0);
let cell1 = row.insertCell(1);
let cell2 = row.insertCell(2);
let cell3 = row.insertCell(3);
cell0.innerHTML = " Number of Moves";
cell1.innerHTML = "Time spent";
cell2.innerHTML = "Game Mode";
cell3.innerHTML = "Puzzle";
for (let i = 0; i < localStorage.length; i++) {
  let newRow = document.createElement("tr");
  let column0 = document.createElement("td"),
    column1 = document.createElement("td"),
    column2 = document.createElement("td"),
    column3 = document.createElement("td");
  let { moves, timeSpent, gameMode, puzzleDetail } = JSON.parse(
    localStorage.getItem(localStorage.key(i))
  );
  column0.innerText = moves;
  column1.innerText = timeSpent;
  column2.innerText = gameMode;
  column3.innerText = puzzleDetail
  newRow.appendChild(column0);
  newRow.appendChild(column1);
  newRow.appendChild(column2);
  newRow.appendChild(column3);
  table.appendChild(newRow);
}
scores.appendChild(table);
if (localStorage.length > 10) {
  localStorage.clear();
}
