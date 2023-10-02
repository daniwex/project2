const table = document.querySelector(".table");
let count = 0;
let actual = 1;
const ROW = 4;
const COLMUN = 4;
function createTable(table, rowLenth, columLength, shuffle = false) {
  for (let i = 0; i < rowLenth; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < columLength; j++) {
      let column = document.createElement("td");
      count++;
      if (count === ROW * COLMUN - 1) {
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
      let randomRow = Math.floor(Math.random() * ROW);
      let randomColumn = Math.floor(Math.random() * COLMUN);
      let temp = rows[i].children[i].innerText;
      rows[i].children[i].innerText =
        rows[randomRow].children[randomColumn].innerText;
      rows[randomRow].children[randomColumn].innerText = temp;
    });
  }
}
function moveEmpty(parent, i) {
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
        parent.target.parentNode.previousElementSibling?.children[i % COLMUN];
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
        parent.target.parentNode.previousElementSibling?.children[i % COLMUN];
      bottom =
        parent.target.parentNode.nextElementSibling?.children[i % COLMUN];
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
    let game = endGame(table);
    if (game) {
      alert("congratulations!");
      return;
    }
  }
}
createTable(table, ROW, COLMUN);

const elements = Array.from(table.getElementsByTagName("td"));
elements.forEach((element, i) => {
  element.addEventListener("click", (e) => moveEmpty(e, i));
});

function endGame(table) {
  let columns = table.getElementsByTagName("td");
  let arr = [];
  for (let i = 0; i < columns.length; i++) {
    // console.log(columns[i+1].innerText - columns[i].innerText)
    if (columns[i + 1].innerText - columns[i].innerText === 1) {
      arr.push(true);
    } else {
      arr.push(false);
    }
    if (
      columns[columns.length - 1].innerText === "" &&
      columns[columns.length - 2].innerText == ROW * COLMUN - 1
    ) {
      arr[arr.length - 1] = true;
      console.log(true);
    }
    i = i + 1;
  }
  for (const element of arr) {
    if (element == false) {
      return false;
    }
  }
  return true;
}
