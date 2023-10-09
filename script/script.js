const newGame = document.getElementById("new-game");
const loadingPage = document.querySelector(".load-page");
const table = document.querySelector(".table");
const modal = document.getElementById("modal-one");
const form = document.getElementsByTagName("form")[0];
let homePage = document.querySelector(".homepage");
let numberOfMoves = document.querySelector("#number-of-moves");
const end = document.querySelector("#end");
const mainGame = document.querySelector(".main-game");
const time = document.getElementById("time");
let seconds = document.getElementById("seconds");
let minute = document.getElementById("minute");
let hours = document.getElementById("hour");
const noSolution = document.getElementById("start-again")
let count = 0;
let actual = 1;
let moves = 0;
let isGameOn = false;
let timer;

function createTable(table, rowLenth, columLength, shuffle = false) {
  for (let i = 0; i < rowLenth; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < columLength; j++) {
      let column = document.createElement("td");
      count++;
      if (count === rowLenth * columLength - 1) {
        column.innerHTML = null;
      } else {
        column.innerHTML = `${actual++}`;
      }
      row.appendChild(column);
    }
    table.appendChild(row);
  }
  if (shuffle) {
    const rows = Array.from(table.getElementsByTagName("tr"));
    rows.forEach((__, i) => {
      let randomRow = Math.floor(Math.random() * rowLenth);
      let randomColumn = Math.floor(Math.random() * columLength);
      let temp = rows[i].children[i % columLength].innerText;
      rows[i].children[i % columLength].innerText =
        rows[randomRow].children[randomColumn].innerText;
      rows[randomRow].children[randomColumn].innerText = temp;
    });
  }
  return [columLength, rowLenth];
}
function timeCounter() {
  seconds.innerText = Number(seconds.innerText) + 1;
  if (seconds.innerText < 10) {
    seconds.innerText = `${0}${seconds.innerText}`;
  }
  if (seconds.innerText % 60 === 0) {
    minute.innerText = Number(minute.innerText) + 1;
    if (minute.innerText < 10) {
      minute.innerText = `${0}${minute.innerText}`;
    }
    seconds.innerText = `${0}${0}`;
  }
  if (minute.innerText === 60) {
    hours.innerText = Number(hours.innerText) + 1;
    if (hours.innerText < 10) {
      hours.innerText = `${0}${hours.innerText}`;
    }
    minute.innerText = `${0}${0}`;
  }
}

function reset(table) {
  const form = document.getElementsByTagName("form")[0];
  form.row.value = 2;
  form.column.value = 2;
  form.difficulty[0].checked = true;
  let rows = Array.from(table.getElementsByTagName("tr"));
  for (let i = rows.length - 1; i >= 0; i--) {
    table.removeChild(rows[i]);
  }
  actual = 1;
  count = 0;
  homePage.style.display = "flex";
  mainGame.style.display = "none";
  moves = 0;
  numberOfMoves.innerText = moves;
  isGameOn = false;
  clearInterval(timer);
  seconds.innerText = `${0}${0}`;
  minute.innerText = `${0}${0}`;
  hours.innerText = `${0}${0}`;
}

function moveEmpty(parent, i, columLength, rowLenth) {
  let top = null,
    bottom = null;
  try {
    if (parent.target.parentNode.previousElementSibling === null) {
      bottom = parent.target.parentNode.nextElementSibling?.children[i];
      if (bottom.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        bottom.innerText = temp;
      } else if (parent.target.previousSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.previousSibling.innerText = temp;
      } else if (parent.target.nextSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.nextSibling.innerText = temp;
      } else {
        throw new Error("illegal move");
      }
    } else if (parent.target.parentNode.nextElementSibling === null) {
      top =
        parent.target.parentNode.previousElementSibling?.children[
          i % columLength
        ];
      if (top.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        top.innerText = temp;
      } else if (parent.target.previousSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.previousSibling.innerText = temp;
      } else if (parent.target.nextSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.nextSibling.innerText = temp;
      } else {
        throw new Error("Illegal move");
      }
    } else if (
      parent.target.parentNode.nextElementSibling !== null &&
      parent.target.parentNode.previousElementSibling !== null
    ) {
      top =
        parent.target.parentNode.previousElementSibling?.children[
          i % columLength
        ];
      bottom =
        parent.target.parentNode.nextElementSibling?.children[i % columLength];
      if (top.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        top.innerText = temp;
      } else if (bottom.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        bottom.innerText = temp;
      } else if (parent.target.previousSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.previousSibling.innerText = temp;
      } else if (parent.target.nextSibling?.innerText === "") {
        let temp = parent.target.innerText;
        parent.target.innerText = null;
        parent.target.nextSibling.innerText = temp;
      } else {
        throw new Error("illegal move");
      }
    }
  } catch (err) {
    alert(err.message);
  } finally {
    moves = moves + 1;
    let game = endGame(table, rowLenth, columLength);
    if (game) {
      alert("congratulations! you solved the puzzle");
      const info = {
        moves: moves,
        timeSpent: `${hours.innerText}:${minute.innerText}:${seconds.innerText}`,
        gameMode: form.difficulty[0].checked
          ? form.difficulty[0].value
          : form.difficulty[1].value,
          puzzleDetail: `${rowLenth} X ${columLength}`
      };
      localStorage.setItem(moves, JSON.stringify(info));
      reset(table);
    }
  }
}

function endGame(table, ROW, COLMUN) {
  let columns = Array.from(table.getElementsByTagName("td"));
  let arr = [];
  for (let i = 0; i < columns.length; i++) {
    if((columns[i].innerText == i+1) && i != columns.length - 1){
      arr.push(true)
    }
    else if(i == columns.length - 1 && columns[i].innerText == ""){
      arr.push(true)
    }else{
      arr.push(false)
    }
  }
  for (const element of arr) {
    if (element === false) {
      return false;
    }
  }
  return true;
}

// new Game
newGame.addEventListener("click", () => {
  modal.style.display = "block";
});
form.onsubmit = (e) => {
  let column, row;
  e.preventDefault();
  setTimeout(() => {
    loadingPage.style.display = "none";
    timer = setInterval(timeCounter, 1000);
  }, 3000);
  isGameOn = true;

  loadingPage.style.display = "flex";
  modal.style.display = "none";
  homePage.style.display = "none";
  mainGame.style.display = "block";
  if (e.target.difficulty.value == "easy") {
    [column, row] = createTable(
      table,
      e.target.row.value,
      e.target.column.value
    );
  } else {
    [column, row] = createTable(
      table,
      e.target.row.value,
      e.target.column.value,
      true
    );
  }
  const elements = Array.from(table.getElementsByTagName("td"));
  elements.forEach((element, i) => {
    element.addEventListener("click", (e) => {
      moveEmpty(e, i, column, row);
      numberOfMoves.innerText = moves;
    });
  });
};

end.onclick = () => {
  reset(table);
};
noSolution.onclick = ()=>{
  alert("Whoops! looks like there is no solution, play a new game");
  reset(table)
}