module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app-config.js":
/*!***********************!*\
  !*** ./app-config.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  twitterConfig: {\n    consumer_key: 'AgSmnJkmaf9uDDjKEcs0zCvHk',\n    consumer_secret: 'C5teIWxtHWEWD78rHgmfDJj4N4JQWjru15a8Hq4CmwqMgJ5I1k',\n    access_token_key: '2989064913-0Oxe65eFYi0iaCo3dhs7XyC6uHXd0QUorQyxfxv',\n    access_token_secret: 'gYT7KtuYnHuzMPXcUVvI2H2oDEYfVhAIDGIVRCGsHZ4sb',\n  },\n});\n\n\n//# sourceURL=webpack:///./app-config.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! compression */ \"compression\");\n/* harmony import */ var compression__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(compression__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var express_hbs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! express-hbs */ \"express-hbs\");\n/* harmony import */ var express_hbs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(express_hbs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var twitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! twitter */ \"twitter\");\n/* harmony import */ var twitter__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(twitter__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ws */ \"ws\");\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _app_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-config */ \"./app-config.js\");\n//---------//\n// Imports //\n//---------//\n\n\n\n\n\n\n\n\n\n\n\n//\n//------//\n// Init //\n//------//\n\nconst app = express__WEBPACK_IMPORTED_MODULE_2___default()(),\n  client = new twitter__WEBPACK_IMPORTED_MODULE_5___default.a(_app_config__WEBPACK_IMPORTED_MODULE_7__[\"default\"].twitterConfig),\n  environment = getEnvironment(),\n  isDevelopment = environment === 'dev',\n  maxTweetsSent = 2,\n  pushIterationMs = 8000,\n  staticDirectory = isDevelopment ? 'release/static' : 'static'\n\nlet currentTrack = '',\n  curStream = null,\n  sendTweets = [],\n  timerSend = true,\n  tweetBuffer = []\n\nif (['dev', 'test', 'prod'].indexOf(environment) === -1) {\n  throw new Error(\n    `command-line environment '${environment}' wasn't the expected dev/test/or prod`\n  )\n}\n\n//\n//------//\n// Main //\n//------//\n\nconst getRequestListener = (maybeLetsencryptDir, server) => {\n  const websocketServer = new ws__WEBPACK_IMPORTED_MODULE_6___default.a.Server({ server })\n\n  websocketServer.broadcast = data => {\n    const sendData = aClient => {\n      aClient.send(JSON.stringify(data))\n    }\n\n    passThrough(websocketServer.clients, [keepWhen(isOpen), forEach(sendData)])\n  }\n\n  const stream = createStream(websocketServer)\n\n  if (maybeLetsencryptDir) {\n    app.use(\n      express__WEBPACK_IMPORTED_MODULE_2___default.a.static(maybeLetsencryptDir, {\n        dotfiles: 'allow',\n      })\n    )\n  }\n\n  app\n    .engine('hbs', express_hbs__WEBPACK_IMPORTED_MODULE_3___default.a.express4({ partials: 'views/partials' }))\n    .set('view engine', 'hbs')\n    .set('views', path__WEBPACK_IMPORTED_MODULE_4___default.a.resolve(__dirname, 'views'))\n\n    .use(compression__WEBPACK_IMPORTED_MODULE_1___default()())\n    .use(express__WEBPACK_IMPORTED_MODULE_2___default.a.static(path__WEBPACK_IMPORTED_MODULE_4___default.a.resolve(__dirname, staticDirectory)))\n    .use(\n      body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.urlencoded({\n        extended: true,\n      })\n    )\n    .use(body_parser__WEBPACK_IMPORTED_MODULE_0___default.a.json())\n\n    .get('/', (_unused_req, res) => {\n      res.render('home', {\n        isDev: environment === 'dev',\n        curTrack: currentTrack,\n      })\n    })\n\n    .post('/track', (req, res) => {\n      stream(req.body.track)\n      res.sendStatus(200)\n    })\n\n  return app\n}\n\n//-------------//\n// Helper Fxns //\n//-------------//\n\nfunction forEach(fn) {\n  return arrayLike => Array.prototype.forEach.call([...arrayLike], fn)\n}\n\nfunction isOpen(client) {\n  return client.readyState === ws__WEBPACK_IMPORTED_MODULE_6___default.a.OPEN\n}\n\nfunction keepWhen(filterFunction) {\n  return arrayLike =>\n    Array.prototype.filter.call([...arrayLike], filterFunction)\n}\n\nfunction passThrough(arg, functionArray) {\n  return functionArray.reduce((result, aFunction) => aFunction(result), arg)\n}\n\nfunction createStream(websocketServer) {\n  return function stream(trackText) {\n    if (curStream !== null) {\n      curStream.destroy()\n      curStream = null\n      tweetBuffer = []\n    }\n    websocketServer.broadcast({ id: 'trackChange', data: trackText })\n    currentTrack = trackText\n    client.stream('statuses/filter', { track: trackText }, function(stream) {\n      curStream = stream\n      stream.on('data', aTweet => {\n        if (!aTweet.user || !aTweet.text) {\n          // not sure what this limit tweet is, but we don't care about them\n          if (aTweet.limit) return\n\n          /* eslint-disable no-console */\n          console.log('unexpected tweet')\n          console.log(aTweet)\n          /* eslint-enable no-console */\n          return\n        }\n\n        tweetBuffer.push({\n          username: aTweet.user.screen_name,\n          text: aTweet.text,\n          created: aTweet.created_at,\n        })\n\n        if (tweetBuffer.length > 500) {\n          tweetBuffer = tweetBuffer.slice(0, 100)\n        }\n\n        // timerSend is a throttle\n        if (!timerSend) return\n\n        if (tweetBuffer.length > maxTweetsSent) {\n          sendTweets = tweetBuffer.slice(0, maxTweetsSent)\n          tweetBuffer = tweetBuffer.slice(maxTweetsSent)\n        } else {\n          sendTweets = tweetBuffer\n          tweetBuffer = []\n        }\n        websocketServer.broadcast({ id: 'twitterUpdate', data: sendTweets })\n        timerSend = false\n        setTimeout(() => {\n          timerSend = true\n        }, pushIterationMs)\n      })\n    })\n  }\n}\n\nfunction getEnvironment() {\n  return {\n    development: 'dev',\n    test: 'test',\n    production: 'prod',\n  }[\"production\" || false]\n}\n\n//\n//---------//\n// Exports //\n//---------//\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({ getRequestListener });\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-hbs":
/*!******************************!*\
  !*** external "express-hbs" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-hbs\");\n\n//# sourceURL=webpack:///external_%22express-hbs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "twitter":
/*!**************************!*\
  !*** external "twitter" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"twitter\");\n\n//# sourceURL=webpack:///external_%22twitter%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ })["default"];