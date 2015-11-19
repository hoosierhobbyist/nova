//timer.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = (function () {
    function Timer() {
        var startNow = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

        _classCallCheck(this, Timer);

        Object.defineProperties(this, {
            cachedTime: {
                value: 0,
                writable: true
            }, //end cachedTime
            startTime: {
                writable: true,
                value: startNow ? Date.now() : null
            }, //end startTime
            isRunning: {
                enumerable: true,
                get: function get() {
                    return this.startTime != null;
                } //end get
            }, //end isRunning
            elapsedTime: {
                enumerable: true,
                get: function get() {
                    if (!this.isRunning) {
                        return this.cachedTime;
                    } //end if

                    return this.cachedTime + Date.now() - this.startTime;
                } //end get
            } }); //end defineProperties
    }

    //end class Timer
    //end constructor

    _createClass(Timer, [{
        key: "start",
        //end time
        value: function start() {
            if (!this.isRunning) {
                this.startTime = Date.now();
            } //end if
        }
        //end ::start

    }, {
        key: "stop",
        value: function stop() {
            this.cachedTime = 0;
            this.startTime = null;
        }
        //end ::stop

    }, {
        key: "pause",
        value: function pause() {
            if (this.isRunning) {
                this.cachedTime += Date.now() - this.startTime;
                this.startTime = null;
            } //end if
        }
        //end ::pause

    }, {
        key: "restart",
        value: function restart() {
            this.cachedTime = 0;
            this.startTime = Date.now();
        }
        //end ::restart

    }]);

    return Timer;
})();

exports["default"] = Timer;
module.exports = exports["default"];