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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Game */ \"./src/modules/Game.js\");\n\n\n// 1. make a \"new Game()\" / initialize\n\n// 2. process inputs / evebt listeners?\n\n// 3. update the Game()™\n\n// 4. display changes on the screen and maybe make a seperate moduile for it\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player */ \"./src/modules/Player.js\");\n\n\nclass Game {\n  constructor(name1, name2) {\n    this.playerOne = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name1);\n    this.playerTwo = (0,_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(name2);\n    // Hard coded locations for now\n    for (let i = 0; i < 4; i += 1) {\n      this.playerOne.gameboard.placeShip(i, 0, i);\n      this.playerTwo.gameboard.placeShip(i, 0, i);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Game.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/modules/Ship.js\");\n\n\nclass Gameboard {\n  constructor() {\n    this.board = [];\n    this.missedShots = [];\n    for (let i = 0; i < 7; i += 1) {\n      const row = [];\n      for (let j = 0; j < 7; j += 1) row.push(null);\n      this.board.push(row);\n    }\n  }\n\n  at(x, y) {\n    return this.board[y][x];\n  }\n\n  placeShip(length, x, y) {\n    if (this.board[y].slice(x).length < length) return;\n    const ship = (0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(length);\n    for (let i = 0; i < length; i += 1) this.board[y][x + i] = ship;\n  }\n\n  receiveAttack(x, y) {\n    const square = this.at(x, y);\n    if (square) square.hit();\n    else this.missedShots.push([x, y]);\n  }\n\n  isGameOver() {\n    for (let y = 0; y < 7; y += 1) {\n      for (let x = 0; x < 7; x += 1) {\n        const ship = this.at(x, y);\n        if (ship && !ship.isSunk()) return false;\n      }\n    }\n    return true;\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/modules/Gameboard.js\");\n\n\nfunction Player(name, type = \"player\") {\n  const gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n\n  const attack = (enemy, x, y) => enemy.gameboard.receiveAttack(x, y);\n\n  function makeRandomMove(enemy) {\n    const x = Math.floor(Math.random() * 7);\n    const y = Math.floor(Math.random() * 7);\n    // Implement legal moves later\n    enemy.gameboard.receiveAttack(x, y);\n  }\n  if (type === \"computer\") return { name, gameboard, makeRandomMove };\n  return { name, gameboard, attack };\n}\n\n\n//# sourceURL=webpack://battleship/./src/modules/Player.js?");

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