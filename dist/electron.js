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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main/electron.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/main/electron.ts":
/*!******************************!*\
  !*** ./app/main/electron.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

function _path() {
  var data = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

  _path = function _path() {
    return data;
  };

  return data;
}

function _electron() {
  var data = __webpack_require__(/*! electron */ "electron");

  _electron = function _electron() {
    return data;
  };

  return data;
}

/**
 * @description Electron主入口
 */
function isDev() {
  return "development" === 'development';
}

var ROOT_PATH = _path()["default"].join(_electron().app.getAppPath(), '../');

function createWindow() {
  var mainWindow = new (_electron().BrowserWindow)({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  });
  var settingWindow = new (_electron().BrowserWindow)({
    width: 720,
    height: 240,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true
    }
  });

  if (isDev()) {
    mainWindow.loadURL("http://127.0.0.1:7001");
    settingWindow.loadURL("http://127.0.0.1:7001/setting.html");
  } else {
    mainWindow.loadURL("file://".concat(_path()["default"].join(__dirname, '../dist/index.html')));
    settingWindow.loadURL("file//".concat(_path()["default"].join(__dirname, '../dist/setting.html')));
  }

  mainWindow.webContents.openDevTools();
}

_electron().app.whenReady().then(function () {
  createWindow();

  _electron().app.on('activate', function () {
    if (_electron().BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

_electron().ipcMain.on('get-root-path', function (event, arg) {
  event.reply('reply-root-path', ROOT_PATH);
});

_electron().ipcMain.on('open-save-resume-path', function (event, arg) {
  _electron().dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(function (result) {
    event.reply('reply-save-resume-path', result.filePaths);
  })["catch"](function (err) {
    event.reply('reply-save-resume-path', err);
  });
});
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwL21haW4vZWxlY3Ryb24udHMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaW50ZXJvcFJlcXVpcmVEZWZhdWx0LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImVsZWN0cm9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbImlzRGV2IiwicHJvY2VzcyIsIlJPT1RfUEFUSCIsInBhdGgiLCJqb2luIiwiYXBwIiwiZ2V0QXBwUGF0aCIsImNyZWF0ZVdpbmRvdyIsIm1haW5XaW5kb3ciLCJCcm93c2VyV2luZG93Iiwid2lkdGgiLCJoZWlnaHQiLCJ3ZWJQcmVmZXJlbmNlcyIsIm5vZGVJbnRlZ3JhdGlvbiIsImRldlRvb2xzIiwic2V0dGluZ1dpbmRvdyIsInJlc2l6YWJsZSIsImxvYWRVUkwiLCJfX2Rpcm5hbWUiLCJ3ZWJDb250ZW50cyIsIm9wZW5EZXZUb29scyIsIndoZW5SZWFkeSIsInRoZW4iLCJvbiIsImdldEFsbFdpbmRvd3MiLCJsZW5ndGgiLCJpcGNNYWluIiwiZXZlbnQiLCJhcmciLCJyZXBseSIsImRpYWxvZyIsInNob3dPcGVuRGlhbG9nIiwicHJvcGVydGllcyIsInJlc3VsdCIsImZpbGVQYXRocyIsImVyciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFF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O0FDUEEscUM7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiZWxlY3Ryb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2FwcC9tYWluL2VsZWN0cm9uLnRzXCIpO1xuIiwiLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBFbGVjdHJvbuS4u+WFpeWPo1xyXG4gKi9cclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyBhcHAsIEJyb3dzZXJXaW5kb3csIGlwY01haW4sIGRpYWxvZyB9IGZyb20gJ2VsZWN0cm9uJztcclxuXHJcbmZ1bmN0aW9uIGlzRGV2KCkge1xyXG4gIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JztcclxufVxyXG5jb25zdCBST09UX1BBVEggPSBwYXRoLmpvaW4oYXBwLmdldEFwcFBhdGgoKSwgJy4uLycpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlV2luZG93KCkge1xyXG4gIGNvbnN0IG1haW5XaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICB3aWR0aDogMTIwMCxcclxuICAgIGhlaWdodDogODAwLFxyXG4gICAgd2ViUHJlZmVyZW5jZXM6IHtcclxuICAgICAgbm9kZUludGVncmF0aW9uOiB0cnVlLFxyXG4gICAgICBkZXZUb29sczogdHJ1ZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNldHRpbmdXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7XHJcbiAgICB3aWR0aDogNzIwLFxyXG4gICAgaGVpZ2h0OiAyNDAsXHJcbiAgICByZXNpemFibGU6IHRydWUsXHJcbiAgICB3ZWJQcmVmZXJlbmNlczoge1xyXG4gICAgICBub2RlSW50ZWdyYXRpb246IHRydWUsXHJcbiAgICAgIGRldlRvb2xzOiB0cnVlLFxyXG4gICAgfSxcclxuICB9KTtcclxuICBpZiAoaXNEZXYoKSkge1xyXG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKGBodHRwOi8vMTI3LjAuMC4xOjcwMDFgKTtcclxuICAgIHNldHRpbmdXaW5kb3cubG9hZFVSTChgaHR0cDovLzEyNy4wLjAuMTo3MDAxL3NldHRpbmcuaHRtbGApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtYWluV2luZG93LmxvYWRVUkwoYGZpbGU6Ly8ke3BhdGguam9pbihfX2Rpcm5hbWUsICcuLi9kaXN0L2luZGV4Lmh0bWwnKX1gKTtcclxuICAgIHNldHRpbmdXaW5kb3cubG9hZFVSTChgZmlsZS8vJHtwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZGlzdC9zZXR0aW5nLmh0bWwnKX1gKTtcclxuICB9XHJcbiAgbWFpbldpbmRvdy53ZWJDb250ZW50cy5vcGVuRGV2VG9vbHMoKTtcclxufVxyXG5hcHAud2hlblJlYWR5KCkudGhlbigoKSA9PiB7XHJcbiAgY3JlYXRlV2luZG93KCk7XHJcbiAgYXBwLm9uKCdhY3RpdmF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChCcm93c2VyV2luZG93LmdldEFsbFdpbmRvd3MoKS5sZW5ndGggPT09IDApIGNyZWF0ZVdpbmRvdygpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbmlwY01haW4ub24oJ2dldC1yb290LXBhdGgnLCAoZXZlbnQsIGFyZykgPT4ge1xyXG4gIGV2ZW50LnJlcGx5KCdyZXBseS1yb290LXBhdGgnLCBST09UX1BBVEgpO1xyXG59KTtcclxuXHJcbmlwY01haW4ub24oJ29wZW4tc2F2ZS1yZXN1bWUtcGF0aCcsIChldmVudCwgYXJnKSA9PiB7XHJcbiAgZGlhbG9nXHJcbiAgICAuc2hvd09wZW5EaWFsb2coe1xyXG4gICAgICBwcm9wZXJ0aWVzOiBbJ29wZW5EaXJlY3RvcnknXSxcclxuICAgIH0pXHJcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGV2ZW50LnJlcGx5KCdyZXBseS1zYXZlLXJlc3VtZS1wYXRoJywgcmVzdWx0LmZpbGVQYXRocyk7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgZXZlbnQucmVwbHkoJ3JlcGx5LXNhdmUtcmVzdW1lLXBhdGgnLCBlcnIpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0O1xubW9kdWxlLmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gbW9kdWxlLmV4cG9ydHMsIG1vZHVsZS5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==