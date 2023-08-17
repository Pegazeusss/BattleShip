const gamesBoardContainer = document.querySelector("#gamesboard-container");
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");

let angle = 0;
function flip() {
  const optionShips = Array.from(optionContainer.children);
  // if(angle === 0){
  //   angle = 90;
  // }else if(angle === 90){
  //   angle = 0;
  // }
  angle = angle === 0 ? 90 : 0;
  optionShips.forEach(
    (optionShips) => (optionShips.style.transform = `rotate(${angle}deg)`)
  );
}
flipButton.addEventListener("click", flip);

const width = 10;
function createBoard(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = i;
    gameBoardContainer.append(block);
  }

  gamesBoardContainer.append(gameBoardContainer);
}
createBoard("yellow", "player");
createBoard("pink", "computer");
//
//
//
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}
const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];

function addShipPiece(ship) {
  const allBoardBlocks = document.querySelectorAll("#computer div");
  let randomBoolean = Math.random() < 0.5;
  let isHorizontal = randomBoolean;
  let randomStartIndex = Math.floor(Math.random() * width * width);
  console.log(randomStartIndex);

  let validStart = isHorizontal
    ? randomStartIndex <= width * width - ship.length
      ? randomStartIndex
      : width * width - ship.length
    : //vertical
    randomStartIndex <= width * width - width * ship.length
    ? randomStartIndex
    : randomStartIndex - ship.length * width + width;

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * width]);
    }
  }
  let valid;

  if (isHorizontal) {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid =
          shipBlocks[0].id % width !==
          width - (shipBlocks.length - (index + 1)))
    );
  } else {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid = shipBlocks[0].id < 90 + (width * index + 1))
    );
  }

const notTaken = shipBlocks.every(shipBlocks => !shipBlocks.classList.contains('taken'));

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  }else{
    addShipPiece(ship);
  }

  console.log(shipBlocks);
}
ships.forEach((ship) => addShipPiece(ship));

//drag player ships
let draggedShip;
const optionShips = Array.from(optionContainer.children);

optionShips.forEach(optionShip => optionShip.addEventListener('dragstart',dragStart));

function dragStart(e){
  draggedShip = e.target;
}
