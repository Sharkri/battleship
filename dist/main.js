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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ displayController)\n/* harmony export */ });\nfunction displayController() {\n  const boards = document.querySelectorAll(\".board\");\n  function initialize(playerBoard) {\n    boards.forEach((board) => {\n      // Clear the board\n      board.textContent = \"\";\n      for (let y = 0; y < 7; y += 1)\n        for (let x = 0; x < 7; x += 1) {\n          const square = document.createElement(\"button\");\n          square.classList.add(\"square\");\n          square.setAttribute(\"data-coord-x\", x);\n          square.setAttribute(\"data-coord-y\", y);\n          // mark square as a ship if on players board\n          if (board.classList.contains(\"player-board\") && playerBoard.at(x, y))\n            square.classList.add(\"ship\");\n\n          board.appendChild(square);\n        }\n    });\n  }\n  return { initialize };\n}\n\n\n//# sourceURL=webpack://battleship/./src/displayController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Game */ \"./src/modules/Game.js\");\n/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayController */ \"./src/displayController.js\");\n\n\n\nconst display = (0,_displayController__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nconst restart = document.querySelector(\"#restart\");\nconst enemyBoard = document.querySelector(\".enemy-board\");\nlet game = new _modules_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ndisplay.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);\n\nrestart.addEventListener(\"click\", () => {\n  game = new _modules_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  display.initialize(game.playerOne.gameboard, game.playerTwo.gameboard);\n});\n\nenemyBoard.addEventListener(\"click\", (e) => {\n  const { playerOne } = game;\n  const { playerTwo } = game;\n\n  // if already marked\n  if (e.target.classList.length > 1) return;\n\n  // dont let player click after game over\n  if (playerTwo.gameboard.isGameOver() || playerOne.gameboard.isGameOver())\n    return;\n\n  const x = e.target.getAttribute(\"data-coord-x\");\n  const y = e.target.getAttribute(\"data-coord-y\");\n\n  const attack = playerOne.attack(playerTwo, x, y);\n  e.target.classList.add(attack.isHit ? \"hit\" : \"missed\");\n\n  if (playerTwo.gameboard.isGameOver()) {\n    // handle epic win\n    return;\n  }\n\n  // make ai move after player move\n  const AIMove = playerTwo.makeRandomMove(playerOne);\n  const grid = document.querySelector(\n    `.player-board .square[data-coord-x=\"${AIMove.x}\"][data-coord-y=\"${AIMove.y}\"]`\n  );\n  grid.classList.add(AIMove.isHit ? \"hit\" : \"missed\");\n\n  if (playerOne.gameboard.isGameOver()) {\n    // handle lose\n  }\n});\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/modules/Player.js\");\n\n\nclass Game {\n  constructor(name1, name2) {\n    this.playerOne = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name1);\n    this.playerTwo = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name2, \"computer\");\n    // Hard coded locations for now\n    for (let i = 2; i < 6; i += 1) {\n      this.playerOne.gameboard.placeShip(i, 0, i);\n      this.playerTwo.gameboard.placeShip(i, 0, i);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = [];\n    this.missedShots = [];\n    this.validMoves = [];\n    for (let i = 0; i < 7; i += 1) {\n      const row = [];\n      for (let j = 0; j < 7; j += 1) {\n        this.validMoves.push([i, j]);\n        row.push(null);\n      }\n      this.board.push(row);\n    }\n  }\n\n  at(x, y) {\n    return this.board[y][x];\n  }\n\n  placeShip(length, x, y) {\n    if (this.board[y].slice(x).length < length) return;\n    const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n    for (let i = 0; i < length; i += 1) this.board[y][x + i] = ship;\n  }\n\n  receiveAttack(x, y) {\n    this.validMoves = this.validMoves.filter(\n      (move) => JSON.stringify(move) !== `[${x},${y}]`\n    );\n    const square = this.at(x, y);\n    if (square) {\n      square.hit();\n    } else this.missedShots.push([x, y]);\n    return { isHit: !!square };\n  }\n\n  isGameOver() {\n    for (let y = 0; y < 7; y += 1) {\n      for (let x = 0; x < 7; x += 1) {\n        const ship = this.at(x, y);\n        if (ship && !ship.isSunk()) return false;\n      }\n    }\n    return true;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/modules/Gameboard.js\");\n\n\nfunction Player(name, type = \"player\") {\n  const gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  const attack = (enemy, x, y) => enemy.gameboard.receiveAttack(x, y);\n\n  function makeRandomMove(enemy) {\n    const { validMoves } = enemy.gameboard;\n    const [x, y] = validMoves[Math.floor(Math.random() * validMoves.length)];\n    const { isHit } = enemy.gameboard.receiveAttack(x, y);\n    return { isHit, x, y };\n  }\n  if (type === \"computer\") return { name, gameboard, makeRandomMove };\n  return { name, gameboard, attack };\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

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