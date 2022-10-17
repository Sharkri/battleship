/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ displayController)\n/* harmony export */ });\nfunction displayController() {\n  const gameEndedModal = document.querySelector(\".modal\");\n  const gameEndedText = document.querySelector(\".game-ended-text\");\n  const placeShipModal = document.querySelector(\".place-ship-modal\");\n  const ships = document.getElementsByClassName(\"ship-container\");\n\n  function renderBoard(board, className) {\n    const domBoard = document.querySelector(`.${className}`);\n    // Clear the board\n    domBoard.textContent = \"\";\n    for (let y = 0; y < 10; y += 1)\n      for (let x = 0; x < 10; x += 1) {\n        const square = document.createElement(\"button\");\n        square.classList.add(\"square\");\n        square.setAttribute(\"data-coord-x\", x);\n        square.setAttribute(\"data-coord-y\", y);\n\n        if (board.isHit(x, y)) square.classList.add(\"hit\");\n        if (board.isMiss(x, y)) square.classList.add(\"missed\");\n\n        const ship = board.at(x, y);\n        // Only show the ship if it's not on the enemy's board\n        if (ship && className !== \"enemy-board\") square.classList.add(\"ship\");\n        if (ship?.isSunk()) square.classList.add(\"sunk\");\n\n        domBoard.appendChild(square);\n      }\n  }\n\n  function render(...players) {\n    players.forEach((player) => renderBoard(player.board, player.className));\n  }\n\n  function toggleShips(isVisible) {\n    [...ships].forEach((ship) => {\n      // Set ship to horizontal by default.\n      ship.firstElementChild.setAttribute(\"data-vertical\", \"false\");\n      // unhide ship\n      if (isVisible) ship.classList.remove(\"hidden\");\n      else ship.classList.add(\"hidden\");\n    });\n  }\n  function restart(...players) {\n    render(...players);\n    toggleShips(true);\n    gameEndedModal.classList.remove(\"open\");\n    placeShipModal.classList.add(\"open\");\n  }\n\n  function startGame(...players) {\n    render(...players);\n    placeShipModal.classList.remove(\"open\");\n  }\n\n  function endGame(text) {\n    gameEndedModal.classList.add(\"open\");\n    gameEndedText.textContent = text;\n  }\n\n  return {\n    render,\n    renderBoard,\n    restart,\n    endGame,\n    startGame,\n    toggleShips,\n  };\n}\n\n\n//# sourceURL=webpack://battleship/./src/displayController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Game */ \"./src/modules/Game.js\");\n/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController */ \"./src/displayController.js\");\n\n\n\nconst display = (0,_displayController__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nconst ships = document.querySelectorAll(\".ship\");\nconst startGame = document.querySelector(\"#start-game\");\nconst enemyBoard = document.querySelector(\".enemy-board\");\nconst previewBoard = document.querySelector(\".preview-board\");\nconst playAgain = document.querySelector(\".play-again\");\nconst randomize = document.querySelector(\"#randomize-board\");\nconst reset = document.querySelector(\"#reset-board\");\nlet draggedShip;\nlet game = new _modules_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n// Initialize the board to place the ships\ndisplay.render({\n  board: game.playerOne.getBoard(),\n  className: \"preview-board\",\n});\n\nstartGame.addEventListener(\"click\", () =>\n  display.startGame(\n    { board: game.playerOne.getBoard(), className: \"player-board\" },\n    { board: game.playerTwo.getBoard(), className: \"enemy-board\" }\n  )\n);\n\n// Listen for player attacking enemy board\nenemyBoard.addEventListener(\"click\", (e) => {\n  const { playerOne, playerTwo } = game;\n  const playerOneBoard = playerOne.getBoard();\n  const playerTwoBoard = playerTwo.getBoard();\n  // if already marked\n  if (e.target.classList.length > 1) return;\n\n  const x = +e.target.getAttribute(\"data-coord-x\");\n  const y = +e.target.getAttribute(\"data-coord-y\");\n\n  playerOne.attack(playerTwo, x, y);\n  display.renderBoard(playerTwoBoard, \"enemy-board\");\n\n  if (playerTwoBoard.isGameOver()) {\n    display.endGame(\"You won\");\n    return;\n  }\n\n  // AI Move\n  playerTwo.makeRandomMove(playerOne);\n  display.renderBoard(playerOneBoard, \"player-board\");\n\n  if (playerOneBoard.isGameOver()) display.endGame(\"You lost\");\n});\n\n// Drag and drop ships\npreviewBoard.addEventListener(\"drop\", (e) => {\n  e.preventDefault();\n  const playerOneBoard = game.playerOne.getBoard();\n  e.target.classList.remove(\"drag-over\");\n  e.target.classList.remove(\"invalid\");\n\n  const x = +e.target.getAttribute(\"data-coord-x\");\n  const y = +e.target.getAttribute(\"data-coord-y\");\n  const isVertical = draggedShip.dataset.vertical === \"true\";\n  const { length } = draggedShip.children;\n\n  if (!playerOneBoard.isValidPosition(length, x, y, isVertical)) return;\n  playerOneBoard.placeShip(length, x, y, isVertical);\n  display.renderBoard(playerOneBoard, \"preview-board\");\n\n  draggedShip.parentNode.classList.add(\"hidden\");\n  // if all ships are placed, let player start the game\n  if (!document.querySelector(\".ship-container:not(.hidden)\"))\n    startGame.disabled = false;\n});\n\npreviewBoard.addEventListener(\"dragover\", (e) => {\n  e.preventDefault();\n  const x = +e.target.getAttribute(\"data-coord-x\");\n  const y = +e.target.getAttribute(\"data-coord-y\");\n  const { length } = draggedShip.children;\n  const isVertical = draggedShip.dataset.vertical === \"true\";\n  const playerOneBoard = game.playerOne.getBoard();\n\n  if (!playerOneBoard.isValidPosition(length, x, y, isVertical)) {\n    e.target.classList.add(\"invalid\");\n    return;\n  }\n  // preview the where the ship will be placed\n  for (let i = 0; i < length; i += 1) {\n    // add a \"preview-ship\" class to preview the squares ship will be placed in\n    // if isVertical increment y axis by 1, else increment x-axis\n    if (isVertical)\n      document\n        .querySelector(`[data-coord-y=\"${[y + i]}\"][data-coord-x=\"${[x]}\"]`)\n        .classList.add(\"preview-ship\");\n    else\n      document\n        .querySelector(`[data-coord-y=\"${[y]}\"][data-coord-x=\"${[x + i]}\"]`)\n        .classList.add(\"preview-ship\");\n  }\n});\n\npreviewBoard.addEventListener(\"dragleave\", (e) => {\n  e.preventDefault();\n  e.target.classList.remove(\"invalid\");\n  const dragOver = document.getElementsByClassName(\"preview-ship\");\n  [...dragOver].forEach((square) => square.classList.remove(\"preview-ship\"));\n});\n\nships.forEach((ship) =>\n  ship.addEventListener(\"dragstart\", (e) => {\n    draggedShip = e.target;\n  })\n);\nconst rotateBtns = document.querySelectorAll(\".rotate\");\nrotateBtns.forEach((rotateBtn) =>\n  rotateBtn.addEventListener(\"click\", (e) => {\n    const ship = e.target.closest(\"svg\").previousElementSibling;\n    const isVertical = ship.getAttribute(\"data-vertical\") === \"true\";\n    ship.setAttribute(\"data-vertical\", !isVertical);\n  })\n);\n\nplayAgain.addEventListener(\"click\", () => {\n  game = new _modules_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  startGame.disabled = true;\n  display.restart(\n    { board: game.playerOne.getBoard(), className: \"preview-board\" },\n    { board: game.playerOne.getBoard(), className: \"player-board\" },\n    { board: game.playerTwo.getBoard(), className: \"enemy-board\" }\n  );\n});\n\nrandomize.addEventListener(\"click\", () => {\n  display.toggleShips(false);\n\n  game.playerOne.createNewBoard();\n  const playerOneBoard = game.playerOne.getBoard();\n  playerOneBoard.randomizeShips(\n    { length: 5 },\n    { length: 4 },\n    { length: 3 },\n    { length: 3 },\n    { length: 2 }\n  );\n  display.renderBoard(playerOneBoard, \"preview-board\");\n  startGame.disabled = false;\n});\n\nreset.addEventListener(\"click\", () => {\n  display.toggleShips(true);\n\n  game.playerOne.createNewBoard();\n\n  display.renderBoard(game.playerOne.getBoard(), \"preview-board\");\n  startGame.disabled = true;\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/modules/Player.js\");\n\n\nclass Game {\n  constructor(name1, name2) {\n    this.playerOne = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name1);\n    this.playerTwo = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name2, \"computer\");\n    // add random ship placement soon\n    const playerTwoBoard = this.playerTwo.getBoard();\n    playerTwoBoard.randomizeShips(\n      { length: 5 },\n      { length: 4 },\n      { length: 3 },\n      { length: 3 },\n      { length: 2 }\n    );\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = [];\n    this.missedShots = [];\n    this.hitShots = [];\n    this.validMoves = [];\n    for (let i = 0; i < 10; i += 1) {\n      const row = [];\n      for (let j = 0; j < 10; j += 1) {\n        this.validMoves.push([i, j]);\n        row.push(null);\n      }\n      this.board.push(row);\n    }\n  }\n\n  at(x, y) {\n    return this.board[y][x];\n  }\n\n  isValidPosition(length, x, y, isVertical = false) {\n    // dont allow ship to go off the board\n    if (isVertical && this.board.slice(y).length < length) return false;\n    if (!isVertical && this.board[y].slice(x).length < length) return false;\n    // dont allow ships to be placed where a ship already is\n    const slicedRow = this.board[y].slice(x, x + length);\n    const column = this.board.slice(y, y + length);\n\n    if (!isVertical && slicedRow.some((square) => square)) return false;\n    if (isVertical && column.some((row) => row[x])) return false;\n\n    return true;\n  }\n\n  isHit(x, y) {\n    return this.hitShots.find(\n      (shot) => JSON.stringify(shot) === JSON.stringify([x, y])\n    );\n  }\n\n  isMiss(x, y) {\n    return this.missedShots.find(\n      (shot) => JSON.stringify(shot) === JSON.stringify([x, y])\n    );\n  }\n\n  placeShip(length, x, y, isVertical = false) {\n    // verify if position is valid\n    if (!this.isValidPosition(length, x, y, isVertical)) return;\n    const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n    for (let i = 0; i < length; i += 1) {\n      if (isVertical) this.board[y + i][x] = ship;\n      else this.board[y][x + i] = ship;\n    }\n  }\n\n  randomizeShips(...ships) {\n    ships.forEach((ship) => {\n      const validPlacements = [];\n      const isVertical = Math.round(Math.random());\n      for (let y = 0; y < this.board.length; y += 1)\n        for (let x = 0; x < this.board.length; x += 1)\n          if (this.isValidPosition(ship.length, x, y, isVertical)) {\n            validPlacements.push([x, y]);\n          }\n      const [x, y] =\n        validPlacements[Math.floor(Math.random() * validPlacements.length)];\n      this.placeShip(ship.length, x, y, isVertical);\n    });\n  }\n\n  receiveAttack(x, y) {\n    this.validMoves = this.validMoves.filter(\n      (move) => JSON.stringify(move) !== `[${x},${y}]`\n    );\n    const square = this.at(x, y);\n    if (square) {\n      square.hit();\n      this.hitShots.push([x, y]);\n    } else this.missedShots.push([x, y]);\n    return { square };\n  }\n\n  isGameOver() {\n    for (let y = 0; y < 10; y += 1) {\n      for (let x = 0; x < 10; x += 1) {\n        const ship = this.at(x, y);\n        if (ship && !ship.isSunk()) return false;\n      }\n    }\n    return true;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/modules/Gameboard.js\");\n\n\nfunction Player(name, type = \"player\") {\n  let gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  function attack(enemy, x, y) {\n    const enemyBoard = enemy.getBoard();\n    enemyBoard.receiveAttack(x, y);\n  }\n  function createNewBoard() {\n    gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  function makeRandomMove(enemy) {\n    const enemyBoard = enemy.getBoard();\n    const { validMoves } = enemyBoard;\n    const [x, y] = validMoves[Math.floor(Math.random() * validMoves.length)];\n    const { square } = enemyBoard.receiveAttack(x, y);\n    return { square, x, y };\n  }\n\n  const getBoard = () => gameboard;\n\n  if (type === \"computer\") return { name, getBoard, makeRandomMove };\n  return { name, getBoard, createNewBoard, attack };\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

/***/ }),

/***/ "./src/modules/Ship.js":
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nfunction Ship(length) {\n  let timesHit = 0;\n  const isSunk = () => timesHit >= length;\n  const hit = () => {\n    timesHit += 1;\n  };\n\n  return { length, isSunk, hit };\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;