import readlineSync from 'readline-sync';

const listToDo = [{done: false, text: "codar", symbol:"🔴"}, {done: true, text: "comer", symbol:"🟢"}, {done: true, text: "dormir", symbol:"🟢"}]
let options = ['add', 'list', 'check', 'remove' ]

function toDo() {
  const optionIndex = readlineSync.keyInSelect(options, "Type your commands");

  if (options[optionIndex] === "add") {
    add();
    toDo();

  } else if (options[optionIndex] === "list") {
    if (listToDo.length === 0) {
      console.log("Não há nada a listar");
      toDo();
    }
    list();
    toDo();

  } else if (options[optionIndex] === "check") {
    if (listToDo.length === 0) {
      console.log("Não há nada a checar");
      toDo();
    }
    check();
    toDo();

  } else if (options[optionIndex] === "remove") {
    if (listToDo.length === 0) {
      console.log("Não há nada a deletar");
      toDo();
    }
    remove();
    toDo();
  }

  function add() {
    const addToDo = readlineSync.question("What do you want to do? ");
    listToDo.push({ done: false, text: addToDo });
  }

  function list() {
    console.log("===========================================\n");
    listToDo.map((i) => console.log(`${i.symbol} ${i.text}`));
    console.log("\n===========================================");
  }

  function check() {
    const checkIndex = readlineSync.keyInSelect(
      listToDo.map((t) => `${t.symbol} ${t.text}`),
      "Type your commands"
    );
    if (checkIndex >= 0) {
        if(listToDo[checkIndex].done === true){
            listToDo[checkIndex].done = !listToDo[checkIndex].done;
            listToDo[checkIndex].symbol = "🔴"
        } else {
            listToDo[checkIndex].done = !listToDo[checkIndex].done;
            listToDo[checkIndex].symbol = "🟢"
        }

    }
  }

  function remove() {
    const removeIndex = readlineSync.keyInSelect(
      listToDo.map((t) => t.text),
      "Type your commands"
    );
    if (removeIndex >= 0) {
      listToDo.splice(removeIndex, 1);
    }
  }
}

toDo()






