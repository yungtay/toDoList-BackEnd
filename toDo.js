import readlineSync from 'readline-sync';
import fs from 'fs'

let listToDo = []
let options = ['add', 'list', 'check', 'remove', 'pomodoro' ]

function toDo() {
    if(fs.existsSync("./toDo.txt")) {
        listToDo = JSON.parse(fs.readFileSync("./toDo.txt"))
    }
    const optionIndex = readlineSync.keyInSelect(options, "Type your commands");

  if (options[optionIndex] === "add") {
    add();
  } else if (options[optionIndex] === "list") {
    list();
  } else if (options[optionIndex] === "check") {
    check();
  } else if (options[optionIndex] === "remove") {
    remove();
  } else if (options[optionIndex] === "pomodoro") {
    pomodoro();
  }

  function add() {
    const addToDo = readlineSync.question("What do you want to do? ");
    listToDo.push({ done: false, text: addToDo, symbol: "🔴", pomodoro: 0 });
    fs.writeFileSync( "./toDo.txt", JSON.stringify(listToDo))
    toDo();
  }

  function list() {
    if (listToDo.length < 1) {
      console.log("Não há nada a listar");
      toDo();
    }
    console.log("===========================================\n");
    listToDo.map((i) => {
      console.log(`${i.symbol} ${i.text} ${"🍅".repeat(i.pomodoro)}` );
      console.log("");
    });
    console.log("===========================================");
    toDo();
  }

  function check() {
    if (listToDo.length < 1) {
      console.log("Não há nada a checar");
      toDo();
    }
    const checkIndex = readlineSync.keyInSelect(
      listToDo.map((t) => `${t.symbol} ${t.text} ${"🍅".repeat(t.pomodoro)}`),
      "Type your commands"
    );
    if (checkIndex >= 0) {
      if (listToDo[checkIndex].done === true) {
        listToDo[checkIndex].done = !listToDo[checkIndex].done;
        listToDo[checkIndex].symbol = "🔴";
      } else {
        listToDo[checkIndex].done = !listToDo[checkIndex].done;
        listToDo[checkIndex].symbol = "🟢";
      }
      check();
    } else {
      toDo();
    }
  }

  function remove() {
    if (listToDo.length < 1) {
      console.log("Não há nada a deletar");
      toDo();
    }
    const removeIndex = readlineSync.keyInSelect(
      listToDo.map((t) => `${t.symbol} ${t.text} ${"🍅".repeat(t.pomodoro)}`),
      "Type your commands"
    );
    if (removeIndex > -1) {
      listToDo.splice(removeIndex, 1);
      fs.writeFileSync( "./toDo.txt", JSON.stringify(listToDo))
      remove();
    } else {
      toDo();
    }
  }
}

function pomodoro() {
  if (listToDo.length < 1) {
    console.log("Não há nada para usar o método de pomodoro");
    toDo();
  }
  const pomodoroIndex = readlineSync.keyInSelect(
    listToDo.map((t) => `${t.symbol} ${t.text} ${"🍅".repeat(t.pomodoro)}`),
    "Type your commands"
  );
  setInterval(() => {
      console.log(pomodoroIndex)
    console.log(listToDo[pomodoroIndex].pomodoro);
    listToDo[pomodoroIndex].pomodoro += 1;
    toDo()
  }, 1000);
  console.log(`Pomodoro de "${listToDo[pomodoroIndex].text}" setado!`);

}

toDo()






