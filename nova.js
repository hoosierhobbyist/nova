(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nova = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libTimer = require('./lib/timer');

var _libTimer2 = _interopRequireDefault(_libTimer);

var _libEngine = require('./lib/engine');

var _libEngine2 = _interopRequireDefault(_libEngine);

var _libSprite = require('./lib/sprite');

var _libSprite2 = _interopRequireDefault(_libSprite);

var _libEmitter = require('./lib/emitter');

var _libEmitter2 = _interopRequireDefault(_libEmitter);

var _libAniSprite = require('./lib/aniSprite');

var _libAniSprite2 = _interopRequireDefault(_libAniSprite);

var _libTextSprite = require('./lib/textSprite');

var _libTextSprite2 = _interopRequireDefault(_libTextSprite);

var _libGeometry = require('./lib/geometry');

exports.Timer = _libTimer2['default'];
exports.Sprite = _libSprite2['default'];
exports.Emitter = _libEmitter2['default'];
exports.AniSprite = _libAniSprite2['default'];
exports.TextSprite = _libTextSprite2['default'];
exports.Point = _libGeometry.Point;
exports.Circle = _libGeometry.Circle;
exports.Line = _libGeometry.Line;
exports.Polygon = _libGeometry.Polygon;
exports.Engine = _libEngine2['default'];
//end exports


},{"./lib/aniSprite":2,"./lib/emitter":5,"./lib/engine":6,"./lib/geometry":7,"./lib/sprite":9,"./lib/textSprite":10,"./lib/timer":11}],2:[function(require,module,exports){
//aniSprite.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var __unique = 0;
var __defaults = {
    frameRate: 20,
    cellWidth: 32,
    cellHeight: 32,
    orientation: 'horizontal'
}; //end __defaults
Object.seal(__defaults);
var __cycleDefaults = {
    index: 0,
    start: 0,
    length: 8
}; //end __cycleDefaults
Object.seal(__cycleDefaults);

var AniCycle = function AniCycle() {
    var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, AniCycle);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(__cycleDefaults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (config[key] == null) {
                config[key] = __cycleDefaults[key];
            } //end if
        } //end for
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    Object.defineProperties(this, {
        index: {
            value: config['index']
        }, //end index
        start: {
            value: config['start']
        }, //end start
        name: {
            value: config['name'] || 'CYCLE-' + __unique++
        }, //end name
        end: {
            value: config['end'] || config['start'] + config['length'] - 1
        }, //end end
        frame: {
            writable: true,
            value: config['frame'] || config['start']
        } //end active
    }); //end defineProperties
} //end class AniCycle

//end constructor

;

var AniSprite = (function (_Sprite) {
    _inherits(AniSprite, _Sprite);

    function AniSprite() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, AniSprite);

        __unique = 0;
        var __active = undefined;
        var __cycles = new Set();

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Object.keys(__defaults)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var key = _step2.value;

                if (config[key] == null) {
                    config[key] = __defaults[key];
                } //end if
            } //end for
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        if (config['cycles'] != null) {
            var __ref = undefined;

            if (config['cycles'] instanceof Array) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = config['cycles'][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var cycle = _step3.value;

                        __cycles.add(__ref = new AniCycle(cycle));

                        if (config['active'] === ref.name) {
                            __active = ref;
                        } //end if
                    } //end for
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } //end if

            else {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = Object.keys(config['cycles'])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var cycle = _step4.value;

                            if (config['cycles'][cycle]['name'] == null) {
                                config['cycles'][cycle]['name'] = cycle;
                            } //end if

                            __cycles.add(__ref = new AniCycle(config['cycles'][cycle]));

                            if (config['active'] === __ref.name) {
                                __active = __ref;
                            } //end if
                        } //end for
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                _iterator4['return']();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                } //end else
        } //end if

        else {
                config['cellWidth'] = config['imgWidth'];
                config['cellHeight'] = config['imgHeight'];
                __cycles.add(new AniCycle({
                    index: 0,
                    start: 0,
                    length: 1
                })); //end new AniCycle
            } //end else

        if (__active == null) {
            __active = __cycles.values().next().value;
        } //end if

        _get(Object.getPrototypeOf(AniSprite.prototype), 'constructor', this).call(this, config);

        Object.defineProperties(this, {
            timer: {
                enumerable: true,
                value: new _timer2['default'](true)
            }, //end timer
            cellWidth: {
                enumerable: true,
                value: config['cellWidth']
            }, //end cellWidth
            cellHeight: {
                enumerable: true,
                value: config['cellHeight']
            }, //end cellHeight
            orientation: {
                enumerable: true,
                value: config['orientation']
            }, //end orientation
            cycles: {
                enumerable: true,
                value: Array.from(__cycles.values()).map(function (cycle) {
                    return cycle.name;
                })
            }, //end cycles
            frameRate: {
                enumerable: true,
                get: function get() {
                    return config['frameRate'];
                }, //end get
                set: function set(value) {
                    if (!Number.isNaN(value = parseFloat(value))) {
                        if (value > 0) {
                            config['frameRate'] = value;
                        } //end if
                    } //end if
                } //end set
            }, //end frameRate
            active: {
                enumerable: true,
                get: function get() {
                    return __active;
                }, //end get
                set: function set(value) {
                    __cycles.forEach(function (cycle) {
                        if (value === cycle.name) {
                            __active = cycle;
                        } //end if
                    }); //end forEach
                } //end set
            } //end active
        }); //end defineProperties
    }

    //end class AniSprite

    //end constructor

    _createClass(AniSprite, [{
        key: 'play',
        value: function play() {
            this.emit('play');
            this.timer.start();
            return this;
        }
        //end ::play

    }, {
        key: 'pause',
        value: function pause() {
            this.emit('pause');
            this.timer.pause();
            return this;
        }
        //end ::pause

    }, {
        key: 'stop',
        value: function stop() {
            this.emit('stop');
            this.timer.stop();
            this.active.frame = this.active.start;
            return this;
        }
        //end ::stop

    }, {
        key: 'draw',
        value: function draw() {
            if (this.visible && !this.offScreen) {
                _engine2['default'].ctx.save();

                if (this.drawFunction) {
                    this.drawFunction.call(this, _engine2['default'].ctx);
                } //end if

                if (this.imgSrc) {
                    this.emit('draw-below', _engine2['default'].ctx);

                    var sx = 0;
                    var sy = 0;

                    _engine2['default'].ctx.translate(this.x, -this.y);
                    _engine2['default'].ctx.rotate(-this.tilt);
                    _engine2['default'].ctx.scale(this.scale, this.scale);

                    if (this.orientation === 'horizontal') {
                        sx = this.active.frame;
                        sy = this.active.index;
                    } //end if
                    else if (this.orientation === 'vertical') {
                            sx = this.active.index;
                            sy = this.active.frame;
                        } //end else if

                    _engine2['default'].ctx.drawImage(this.img, this.cellWidth * sx, this.cellHeight * sy, this.cellWidth, this.cellHeight, -this.cellWidth / 2, -this.cellHeight / 2, this.cellWidth, this.cellHeight); //end drawImage

                    this.emit('draw-above', _engine2['default'].ctx);
                } //end if

                else {
                        console.error('Unable to draw AniSprite');
                    } //end else

                _engine2['default'].ctx.restore();
            } //end if
        }
        //end ::draw

    }, {
        key: 'update',
        value: function update() {
            _get(Object.getPrototypeOf(AniSprite.prototype), 'update', this).call(this);

            if (this.timer.elapsedTime >= 1000 / this.frameRate) {
                if (this.active.frame < this.active.end) {
                    this.active.frame += 1;
                } //end if

                else {
                        this.active.frame = this.active.start;
                    } //end else

                this.timer.restart();
            } //end if
        }
        //end ::update

    }]);

    return AniSprite;
})(_sprite2['default']);

exports['default'] = AniSprite;
Object.defineProperties(AniSprite, {
    defaults: {
        enumerable: true,
        value: __defaults
    }, //end defaults
    cycleDefaults: {
        enumerable: true,
        value: __cycleDefaults
    } //end cycleDefaults
}); //end defineProperties
module.exports = exports['default'];
},{"./engine":6,"./sprite":9,"./timer":11}],3:[function(require,module,exports){
//boundaryActions.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var bndActions = {
    left: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.left = _engine2['default'].right;
        }, //end WRAP
        STOP: function STOP() {
            this.left = _engine2['default'].left + 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dx += this.k * (_engine2['default'].left - this.left);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.left = _engine2['default'].left + 1;
            this.dx *= -1;
        } //end BOUNCE
    }, //end left
    right: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.right = _engine2['default'].left;
        }, //end WRAP
        STOP: function STOP() {
            this.right = _engine2['default'].right - 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dx += this.k * (_engine2['default'].right - this.right);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.right = _engine2['default'].right - 1;
            this.dx *= -1;
        } //end BOUNCE
    }, //end right
    top: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.top = _engine2['default'].bottom;
        }, //end WRAP
        STOP: function STOP() {
            this.top = _engine2['default'].top - 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dy += this.k * (_engine2['default'].top - this.top);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.top = _engine2['default'].top - 1;
            this.dy *= -1;
        } //end BOUNCE
    }, //end top
    bottom: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.bottom = _engine2['default'].top;
        }, //end WRAP
        STOP: function STOP() {
            this.bottom = _engine2['default'].bottom + 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dy += this.k * (_engine2['default'].bottom - this.bottom);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.bottom = _engine2['default'].bottom + 1;
            this.dy *= -1;
        } //end BOUNCE
    } //end bottom
}; //end bndActions

exports['default'] = bndActions;
module.exports = exports['default'];
},{"./engine":6}],4:[function(require,module,exports){
//dummy.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var doNothing = function doNothing() {};
var __2Dcontext = {
    save: doNothing,
    translate: doNothing,
    rotate: doNothing,
    scale: doNothing,
    drawImage: doNothing,
    beginPath: doNothing,
    arc: doNothing,
    stroke: doNothing,
    moveTo: doNothing,
    lineTo: doNothing,
    closePath: doNothing,
    restore: doNothing,
    clearRect: doNothing
}; //end __2Dcontext
var __canvasElement = {
    width: 300,
    height: 150,
    clientWidth: 300,
    clientHeight: 150,
    offsetLeft: 0,
    offsetTop: 0,
    getContext: function getContext(arg) {
        if (arg === '2d') {
            return __2Dcontext;
        } //end if
    } //end getContext
}; //end __canvasElement
var dummy = {
    Image: function Image() {},
    querySelector: function querySelector() {
        return null;
    }, //end querySelector
    createElement: function createElement(arg) {
        if (arg === 'canvas') {
            return __canvasElement;
        } //end if
    }, //end createElement
    body: {
        appendChild: doNothing
    } //end body
}; //end dummy

exports['default'] = dummy;
module.exports = exports['default'];
},{}],5:[function(require,module,exports){
//emitter.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prvt_once = new WeakMap();
var prvt_opts = new WeakMap();
var prvt_evnts = new WeakMap();

var Emitter = (function () {
    function Emitter() {
        var maxListeners = arguments.length <= 0 || arguments[0] === undefined ? Emitter.defaultMaxListeners : arguments[0];

        _classCallCheck(this, Emitter);

        prvt_once.set(this, Object.create(null));
        prvt_opts.set(this, Object.create(null));
        prvt_evnts.set(this, Object.create(null));

        Object.defineProperty(this, 'maxListeners', {
            enumerable: true,
            get: function get() {
                return maxListeners;
            }, //end get maxListeners
            set: function set(value) {
                var evnts = prvt_evnts.get(this);

                if (value < 0) {
                    throw new RangeError("Cannot set maxListeners less than zero");
                } //end if
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Object.keys(evnts)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var evnt = _step.value;

                        if (evnts[evnt].length > value) {
                            throw new RangeError("Cannot truncate existing listeners");
                        } //end if
                    } //end for
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                maxListeners = value;
            } //end set maxListeners
        }); //end defineProperty
    }

    //end class Emitter

    //end constructor

    _createClass(Emitter, [{
        key: "events",
        value: function events() {
            return Object.keys(prvt_evnts.get(this));
        }
        //end events

    }, {
        key: "options",
        value: function options(event, listener) {
            var opts = prvt_opts.get(this);

            if (listener != null) {
                var evnts = prvt_evnts.get(this);

                if (evnts[event] != null) {
                    var index = evnts[event].indexOf(listener);

                    if (index !== -1) {
                        return opts[event][index];
                    } //end if
                } //end if

                return {};
            } //end if

            if (opts[event] != null) {
                return opts[event].slice(0);
            } //end if

            return [];
        }
        //end ::options

    }, {
        key: "listeners",
        value: function listeners(event, options) {
            var evnts = prvt_evnts.get(this);

            if (options != null) {
                var opts = prvt_opts.get(this);

                if (opts[event] != null) {
                    var index = opts[event].indexOf(options);

                    if (index !== -1) {
                        return evnts[event][index];
                    } //end if
                } //end if

                return function () {};
            } //end if

            if (evnts[event] != null) {
                return evnts[event].slice(0);
            } //end if

            return [];
        }
        //end ::listeners

    }, {
        key: "listenerCount",
        value: function listenerCount(event) {
            var evnts = prvt_evnts.get(this);

            if (evnts[event] != null) {
                return evnts[event].length;
            } //end if
            else {
                    return 0;
                } //end else
        }
        //end ::listenerCount

    }, {
        key: "on",
        value: function on(event, listener, options) {
            var once = prvt_once.get(this);
            var opts = prvt_opts.get(this);
            var evnts = prvt_evnts.get(this);

            if (typeof listener !== 'function') {
                if (once[event].length > evnts[event].length) {
                    once[event].pop();
                } //end if

                throw new TypeError("listener must be a function");
            } //end if

            if (once[event] == null) {
                once[event] = [];
            } //end if
            if (opts[event] == null) {
                opts[event] = [];
            } //end if
            if (evnts[event] == null) {
                evnts[event] = [];
            } //end if

            if (once[event].length === evnts[event].length) {
                once[event].push(false);
            } //end if

            if (evnts[event].length < this.maxListeners) {
                this.emit('listener-added', event, listener, options);
                opts[event].push(options);
                evnts[event].push(listener);
            } //end if

            else {
                    if (once[event].length > evnts[event].length) {
                        once[event].pop();
                    } //end if

                    throw new RangeError("Event listener max reached: unable to add new listener");
                } //end else

            return this;
        }
        //end ::on

    }, {
        key: "once",
        value: function once(event, listener, options) {
            var once = prvt_once.get(this);

            if (once[event] == null) {
                once[event] = [];
            } //end if

            once[event].push(true);
            return this.on(event, listener, options);
        }
        //end ::once

    }, {
        key: "emit",
        value: function emit(event) {
            var once = prvt_once.get(this);
            var opts = prvt_opts.get(this);
            var evnts = prvt_evnts.get(this);

            if (evnts[event] != null) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                for (var i = 0; i < evnts[event].length; ++i) {
                    var options = opts[event][i];
                    var listener = evnts[event][i];

                    if (options != null) {
                        if (args[args.length - 1] !== options) {
                            args.push(options);
                            listener.apply(this, args);
                            args.pop();
                        } //end if
                        else {
                                listener.apply(this, args);
                            } //end else
                    } //end if
                    else {
                            listener.apply(this, args);
                        } //end else
                } //end for

                for (var i = this.listenerCount(event) - 1; i > -1; --i) {
                    if (once[event][i] === true) {
                        this.remove(event, evnts[event][i]);
                    } //end if
                } //end for

                return true;
            } //end if

            return false;
        }
        //end ::emit

    }, {
        key: "remove",
        value: function remove(event, listener) {
            var once = prvt_once.get(this);
            var opts = prvt_opts.get(this);
            var evnts = prvt_evnts.get(this);

            if (evnts[event] != null) {
                var index = evnts[event].indexOf(listener);

                if (index !== -1) {
                    var options = opts[event][index];

                    once[event].splice(index, 1);
                    opts[event].splice(index, 1);
                    evnts[event].splice(index, 1);
                    this.emit('listener-removed', event, listener, options);

                    if (once[event].length === 0) {
                        delete once[event];
                    } //end if
                    if (opts[event].length === 0) {
                        delete opts[event];
                    } //end if
                    if (evnts[event].length === 0) {
                        delete evnts[event];
                    } //end if

                    return true;
                } //end if

                return false;
            } //end if

            return false;
        }
        //end ::remove

    }, {
        key: "removeAll",
        value: function removeAll(event) {
            var once = prvt_once.get(this);
            var opts = prvt_opts.get(this);
            var evnts = prvt_evnts.get(this);

            if (event != null) {
                if (evnts[event] != null) {
                    var options = opts[event].slice(0);
                    var listeners = evnts[event].slice(0);

                    delete once[event];
                    delete opts[event];
                    delete evnts[event];

                    for (var i = 0; i < listeners.length; ++i) {
                        this.emit('listener-removed', event, listeners[i], options[i]);
                    } //end for

                    return true;
                } //end if

                else {
                        return false;
                    } //end else
            } //end if

            else {
                    if (Object.keys(evnts).length) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = Object.keys(evnts)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var evnt = _step2.value;

                                this.removeAll(evnt);
                            } //end for
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                    _iterator2["return"]();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        return true;
                    } //end if

                    return false;
                } //end else
        }
        //end ::removeAll

    }]);

    return Emitter;
})();

exports["default"] = Emitter;
Object.defineProperty(Emitter, 'defaultMaxListeners', {
    value: 10,
    writable: true,
    enumerable: true
}); //end defineProperty
module.exports = exports["default"];
},{}],6:[function(require,module,exports){
//engine.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dummy = require('./dummy');

var _dummy2 = _interopRequireDefault(_dummy);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _geometry = require('./geometry');

/*
TODO:
    - not getting correct canvas in browser!
*/

var __canvas = undefined;
var __timestamp = 0;
var __frameRate = 25;
var __isRunning = false;
var Engine = new _emitter2['default']();
var __masterUpdate = function __masterUpdate(timestamp) {
    if (__isRunning) {
        if (timestamp - __timestamp > 1000 / __frameRate) {
            Engine.clear();
            Engine.emit('draw-background');
            Engine.emit('update');
            __timestamp = timestamp;
        } //end if
        requestAnimationFrame(__masterUpdate);
    } //end if
}; //end __masterUpdate
var __isDown = new Int8Array(new ArrayBuffer(128));
var KEYS = {
    SHIFT: 16, CTRL: 17, ALT: 18,
    ESC: 27, SPACE: 32, PGUP: 33,
    PGDOWN: 34, END: 35, HOME: 36,
    LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40,
    '0': 48, '1': 49, '2': 50, '3': 51, '4': 52,
    '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
    A: 65, B: 66, C: 67, D: 68, E: 69, F: 70,
    G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77,
    N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83,
    T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90
}; //end KEYS

//TODO: Broken! how to define dummy in server context?
//let document = document ? document : dummy;
document.onkeyup = function (e) {
    e.preventDefault();
    __isDown[e.keyCode] = 0;
}; //end onkeyup
document.onkeydown = function (e) {
    e.preventDefault();
    __isDown[e.keyCode] = 1;
}; //end onkeydown
document.onreadystatechange = function () {
    if (this.readyState === 'interactive') {
        Engine.emit('init');
    } //end if
}; //end onreadystatechange

Engine.once('init', function () {
    __canvas = document.querySelector('#nova canvas');

    if (__canvas == null) {
        __canvas = document.createElement('canvas');
        document.body.appendChild(__canvas);
    } //end if
    __canvas.onmousemove = function (e) {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }; //end onmousemove

    __canvas.style.cursor = 'pointer';
    __canvas.width = __canvas.clientWidth;
    __canvas.height = __canvas.clientHeight;

    var context = __canvas.getContext('2d');
    context.translate(__canvas.width / 2, __canvas.height / 2);

    __canvas.onclick = function () {
        Engine.start();
        this.onclick = void 0;
        this.style.cursor = 'default';
    }; //end onclick

    this.emit('draw-title-screen', context);
}); //end once('init')

if (document === _dummy2['default']) {
    Engine.emit('init');
} //end if

Object.defineProperties(Engine, {
    left: {
        enumerable: true,
        get: function get() {
            return -__canvas.width / 2;
        } //end get
    }, //end left
    right: {
        enumerable: true,
        get: function get() {
            return __canvas.width / 2;
        } //end get
    }, //end right
    top: {
        enumerable: true,
        get: function get() {
            return __canvas.height / 2;
        } //end get
    }, //end top
    bottom: {
        enumerable: true,
        get: function get() {
            return -__canvas.height / 2;
        } //end get
    }, //end bottom
    mouseX: {
        enumerable: true,
        get: function get() {
            return __canvas.mouseX - __canvas.offsetLeft - __canvas.width / 2;
        } //end get
    }, //end mouseX
    mouseY: {
        enumerable: true,
        get: function get() {
            return -__canvas.mouseY + __canvas.offsetTop + __canvas.height / 2;
        } //end get
    }, //end mouseY
    mouse: {
        enumerable: true,
        get: function get() {
            return new _geometry.Point(this.mouseX, this.mouseY);
        } //end get
    }, //end mouse
    isDown: {
        enumerable: true,
        value: function value(key) {
            return !!__isDown[KEYS[key.toUpperCase()]];
        } //end value
    }, //end isDown
    canvas: {
        enumerable: true,
        get: function get() {
            return __canvas;
        } }, //end get
    //end canvas
    ctx: {
        enumerable: true,
        get: function get() {
            return __canvas.getContext('2d');
        } //end get
    }, //end ctx
    frameRate: {
        enumerable: true,
        get: function get() {
            return __frameRate;
        }, //end get
        set: function set(value) {
            if (value = parseFloat(value)) {
                if (value > 0) {
                    __frameRate = value;
                } //end if
            } //end if
        } //end set
    }, //end frameRate
    isRunning: {
        enumerable: true,
        get: function get() {
            return __isRunning;
        } //end value
    }, //end isRunning
    start: {
        enumerable: true,
        value: function value() {
            if (!__isRunning) {
                this.emit('start');
                __isRunning = true;
                requestAnimationFrame(__masterUpdate);
            } //end if
        } //end value
    }, //end start
    stop: {
        enumerable: true,
        value: function value() {
            if (__isRunning) {
                this.emit('stop');
                __isRunning = false;
            } //end if
        } //end value
    }, //end stop
    clear: {
        enumerable: true,
        value: function value() {
            var context = __canvas.getContext('2d');
            context.clearRect(this.left, this.bottom, __canvas.width, __canvas.height);
        } //end value
    } //end clear
}); //end defineProperties

exports['default'] = Engine;
module.exports = exports['default'];
},{"./dummy":4,"./emitter":5,"./geometry":7}],7:[function(require,module,exports){
//geometry.es6

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _helpers = require('./helpers');

//helper functions (used to find intersection points)
function __line2line(ln_1, ln_2) {
    var x = NaN;
    var y = NaN;

    if (!Number.isNaN(ln_1.m)) {
        if (!Number.isNaN(ln_2.m)) {
            if ((0, _helpers.ne)(ln_1.m, ln_2.m)) {
                x = (ln_2.b - ln_1.b) / (ln_1.m - ln_2.m);
                y = ln_1.m * x + ln_1.b;
            } //end if
        } //end if

        else {
                x = ln_2.center.x;
                y = ln_1.m * x + ln_1.b;
            } //end else
    } //end if

    else if (!Number.isNaN(ln_2.m)) {
            x = ln_1.center.x;
            y = ln_2.m * x + ln_2.b;
        } //end else if

    return new Point(x, y);
} //end __line2line

function __line2circle(ln, cr) {
    var x_1 = NaN;
    var y_1 = NaN;
    var x_2 = NaN;
    var y_2 = NaN;

    if (Number.isNaN(ln.m)) {
        if ((0, _helpers.le)(cr.domain[0], ln.center.x)) {
            if ((0, _helpers.le)(ln.center.x, cr.domain[1])) {
                x_1 = ln.center.x;
                y_1 = cr.b + (0, _helpers.sqrt)((0, _helpers.sq)(cr.r) - (0, _helpers.sq)(x_1 - cr.a));

                x_2 = ln.center.x;
                y_2 = cr.b - (0, _helpers.sqrt)((0, _helpers.sq)(cr.r) - (0, _helpers.sq)(x_2 - cr.a));
            } //end if
        } //end if
    } //end if

    else {
            var a = 1 + (0, _helpers.sq)(ln.m);
            var b = 2 * (ln.m * ln.b - ln.m * cr.b - cr.a);
            var c = (0, _helpers.sq)(cr.a) + (0, _helpers.sq)(cr.b) + (0, _helpers.sq)(ln.b) - (0, _helpers.sq)(cr.r) - 2 * ln.b * cr.b;
            var det = (0, _helpers.sq)(b) - 4 * a * c;

            if (det >= 0) {
                x_1 = (-b + (0, _helpers.sqrt)(det)) / (2 * a);
                y_1 = ln.m * x_1 + ln.b;

                x_2 = (-b - (0, _helpers.sqrt)(det)) / (2 * a);
                y_2 = ln.m * x_2 + ln.b;
            } //end if
        } //end else

    return [new Point(x_1, y_1), new Point(x_2, y_2)];
} //end __line2circle

var Point = function Point(rel_x, rel_y) {
    var origin = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Point);

    if (origin.x == null) {
        origin.x = 0;
    } //end if
    if (origin.y == null) {
        origin.y = 0;
    } //end if

    Object.defineProperties(this, {
        x: {
            enumerable: true,
            get: function get() {
                return origin.x + rel_x;
            } //end get
        }, //end x
        y: {
            enumerable: true,
            get: function get() {
                return origin.y + rel_y;
            } //end get
        }, //end y
        org_x: {
            enumerable: true,
            get: function get() {
                return origin.x;
            } //end get
        }, //end org_x
        org_y: {
            enumerable: true,
            get: function get() {
                return origin.y;
            } //end get
        }, //end org_y
        rel_x: {
            enumerable: true,
            get: function get() {
                return rel_x;
            }, //end get
            set: function set(value) {
                rel_x = value;
            } //end set
        }, //end rel_x
        rel_y: {
            enumerable: true,
            get: function get() {
                return rel_y;
            }, //end get
            set: function set(value) {
                rel_y = value;
            } //end set
        }, //end rel_y
        angle: {
            enumerable: true,
            get: function get() {
                return Math.atan2(rel_y, rel_x);
            }, //end get
            set: function set(value) {
                var dist = this.dist;
                rel_x = dist * Math.cos(value);
                rel_y = dist * Math.sin(value);
            } //end set
        }, //end angle
        dist: {
            enumerable: true,
            get: function get() {
                return (0, _helpers.sqrt)((0, _helpers.sq)(rel_x) + (0, _helpers.sq)(rel_y));
            }, //end get
            set: function set(value) {
                if (value >= 0) {
                    var angle = this.angle;
                    rel_x = value * Math.cos(angle);
                    rel_y = value * Math.sin(angle);
                } //end if
            } //end set
        } //end dist
    }); //end defineProperties
} //end class Point

//end constructor

;

exports.Point = Point;

var Circle = (function () {
    function Circle() {
        var radius = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
        var origin = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Circle);

        if (origin.x == null) {
            origin.x = 0;
        } //end if
        if (origin.y == null) {
            origin.y = 0;
        } //end if

        var range = new Float64Array(new ArrayBuffer(16));
        var domain = new Float64Array(new ArrayBuffer(16));

        Object.defineProperties(this, {
            a: {
                enumerable: true,
                get: function get() {
                    return origin.x;
                } //end get
            }, //end a
            b: {
                enumerable: true,
                get: function get() {
                    return origin.y;
                } //end get
            }, //end b
            r: {
                enumerable: true,
                get: function get() {
                    return radius;
                }, //end get
                set: function set(value) {
                    if (value >= 0) {
                        radius = value;
                    } //end if
                } //end set
            }, //end r
            center: {
                enumerable: true,
                get: function get() {
                    return new Point(origin.x, origin.y);
                } //end get
            }, //end centerPoint
            domain: {
                enumerable: true,
                get: function get() {
                    domain[0] = origin.x - radius;
                    domain[1] = origin.x + radius;

                    return domain;
                } //end get
            }, //end domain
            range: {
                enumerable: true,
                get: function get() {
                    range[0] = origin.y - radius;
                    range[1] = origin.y + radius;

                    return range;
                } //end get
            } //end range
        }); //end defineProperties
    }

    //end class Circle

    //end constructor

    _createClass(Circle, [{
        key: "has",
        value: function has(pt) {
            return (0, _helpers.le)((0, _helpers.dist)(pt, this.center), this.r);
        }
        //end has

    }, {
        key: "collidesWith",
        value: function collidesWith(other) {
            if (other instanceof Point) {
                return this.has(other);
            } //end if

            if (other instanceof Circle) {
                return (0, _helpers.le)((0, _helpers.dist)(this.center, other.center), this.r + other.r);
            } //end if

            else if (other instanceof Line) {
                    return other.collidesWith(this);
                } //end else if

                else if (other instanceof Polygon) {
                        return other.collidesWith(this);
                    } //end else if

            return false;
        }
        //end collidesWith

    }]);

    return Circle;
})();

exports.Circle = Circle;

var Line = (function () {
    function Line(pt_1, pt_2) {
        _classCallCheck(this, Line);

        var range = new Float64Array(new ArrayBuffer(16));
        var domain = new Float64Array(new ArrayBuffer(16));

        Object.defineProperties(this, {
            m: {
                enumerable: true,
                get: function get() {
                    if ((0, _helpers.eq)(pt_1.x, pt_2.x)) {
                        return NaN;
                    } //end if
                    else {
                            return (pt_2.y - pt_1.y) / (pt_2.x - pt_1.x);
                        } //end else
                } //end get
            }, //end m
            b: {
                enumerable: true,
                get: function get() {
                    if ((0, _helpers.eq)(pt_1.x, pt_2.x)) {
                        return NaN;
                    } //end if
                    else {
                            return this.m * -pt_1.x + pt_1.y;
                        } //end else
                } //end get
            }, //end b
            length: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.dist)(pt_1, pt_2);
                } //end get
            }, //end length
            center: {
                enumerable: true,
                get: function get() {
                    var _x = (pt_1.x + pt_2.x) / 2;
                    var _y = (pt_1.y + pt_2.y) / 2;

                    return new Point(_x, _y);
                } //end get
            }, //end center
            endPoints: {
                enumerable: true,
                get: function get() {
                    if ((0, _helpers.le)(pt_1.x, pt_2.x)) {
                        return [pt_1, pt_2];
                    } //end if

                    else {
                            return [pt_2, pt_1];
                        } //end else
                } //end get
            }, //end endPoints
            domain: {
                enumerable: true,
                get: function get() {
                    if ((0, _helpers.le)(pt_1.x, pt_2.x)) {
                        domain[0] = pt_1.x;
                        domain[1] = pt_2.x;
                    } //end if

                    else {
                            domain[0] = pt_2.x;
                            domain[1] = pt_1.x;
                        } //end else

                    return domain;
                } //end get
            }, //end domain
            range: {
                enumerable: true,
                get: function get() {
                    if ((0, _helpers.le)(pt_1.y, pt_2.y)) {
                        range[0] = pt_1.y;
                        range[1] = pt_2.y;
                    } //end if

                    else {
                            range[0] = pt_2.y;
                            range[1] = pt_1.y;
                        } //end else

                    return range;
                } //end get
            } //end range
        }); //end defineProperties
    }

    //end class Line

    //NOTE: undefined behavior when lines cross over one another
    //end constructor

    _createClass(Line, [{
        key: "has",
        value: function has(pt) {
            if ((0, _helpers.le)(this.domain[0], pt.x) && (0, _helpers.le)(pt.x, this.domain[1])) {
                if ((0, _helpers.le)(this.range[0], pt.y) && (0, _helpers.le)(pt.y, this.range[1])) {
                    if (!Number.isNaN(this.m)) {
                        return (0, _helpers.eq)(pt.y, this.m * pt.x + this.b);
                    } //end if

                    return true;
                } //end if
            } //end if

            return false;
        }
        //end contains

    }, {
        key: "collidesWith",
        value: function collidesWith(other) {
            if (other instanceof Point) {
                return this.has(other);
            } //end if

            if (other instanceof Line) {
                if (Number.isNaN(this.m) && Number.isNaN(other.m)) {
                    if ((0, _helpers.eq)(this.center.x, other.center.x)) {
                        if ((0, _helpers.le)(this.range[0], other.range[0])) {
                            if ((0, _helpers.le)(other.range[0], this.range[1])) {
                                return true;
                            } //end if
                        } //end if

                        if ((0, _helpers.le)(this.range[0], other.range[1])) {
                            if ((0, _helpers.le)(other.range[1], this.range[1])) {
                                return true;
                            } //end if
                        } //end if

                        if ((0, _helpers.ge)(this.range[0], other.range[0])) {
                            if ((0, _helpers.le)(this.range[1], other.range[1])) {
                                return true;
                            } //end if
                        } //end if
                    } //end if
                } //end if

                else if ((0, _helpers.eq)(this.m, other.m) && (0, _helpers.eq)(this.b, other.b)) {
                        if ((0, _helpers.le)(this.domain[0], other.domain[0])) {
                            if ((0, _helpers.le)(other.domain[0], this.domain[1])) {
                                return true;
                            } //end if
                        } //end if

                        if ((0, _helpers.le)(this.domain[0], other.domain[1])) {
                            if ((0, _helpers.le)(other.domain[1], this.domain[1])) {
                                return true;
                            } //end if
                        } //end if

                        if ((0, _helpers.ge)(this.domain[0], other.domain[0])) {
                            if ((0, _helpers.le)(this.domain[1], other.domain[1])) {
                                return true;
                            } //end if
                        } //end if
                    } //end else if

                    else {
                            var pt = __line2line(this, other);
                            return this.has(pt) && other.has(pt);
                        } //end else
            } //end if

            else if (other instanceof Circle) {
                    if (other.has(this.center)) {
                        return true;
                    } //end if

                    else {
                            var pts = __line2circle(this, other);
                            if (this.has(pts[0]) || this.has(pts[1])) {
                                return true;
                            } //end if
                        } //end else
                } //end else if

                else if (other instanceof Polygon) {
                        return other.collidesWith(this);
                    } //end else if

            return false;
        }
        //end collidesWith

    }]);

    return Line;
})();

exports.Line = Line;

var Polygon = (function () {
    function Polygon() {
        for (var _len = arguments.length, pts = Array(_len), _key = 0; _key < _len; _key++) {
            pts[_key] = arguments[_key];
        }

        _classCallCheck(this, Polygon);

        if (pts.length < 3) {
            throw new RangeError("Polygon must have at least three points");
        } //end if

        var range = new Float64Array(new ArrayBuffer(16));
        var domain = new Float64Array(new ArrayBuffer(16));

        var lns = [];
        for (var i = 0; i < pts.length; ++i) {
            if (i === pts.length - 1) {
                lns.push(new Line(pts[i], pts[0]));
            } //end if
            else {
                    lns.push(new Line(pts[i], pts[i + 1]));
                } //end else
        } //end for

        Object.defineProperties(this, {
            n: {
                enumerable: true,
                get: function get() {
                    return pts.length;
                } //end get
            }, //end n
            r: {
                enumerable: true,
                get: function get() {
                    var value = (0, _helpers.dist)(pts[0], this.center);

                    for (var i = 1; i < this.n; ++i) {
                        if ((0, _helpers.gt)((0, _helpers.dist)(pts[i], this.center), value)) {
                            value = (0, _helpers.dist)(pts[i], this.center);
                        } //end if
                    } //end for

                    return value;
                } //end get
            }, //end r
            pts: {
                enumerable: true,
                get: function get() {
                    return pts.slice(0);
                } //end get
            }, //end pts
            lns: {
                enumerable: true,
                get: function get() {
                    return lns.slice(0);
                } //end get
            }, //end lns
            center: {
                enumerable: true,
                get: function get() {
                    var x = 0;
                    var y = 0;

                    for (var i = 0; i < this.n; ++i) {
                        x += pts[i].x;
                        y += pts[i].y;
                    } //end for

                    return new Point(x /= this.n, y /= this.n);
                } //end get
            }, //end center
            domain: {
                enumerable: true,
                get: function get() {
                    var low = pts[0];
                    var high = pts[0];

                    for (var i = 1; i < this.n; ++i) {
                        if ((0, _helpers.lt)(pts[i].x, low.x)) {
                            low = pts[i];
                        } //end if
                        if ((0, _helpers.gt)(pts[i].x, high.x)) {
                            high = pts[i];
                        } //end if
                    } //end for

                    domain[0] = low.x;
                    domain[1] = high.x;

                    return domain;
                } //end get
            }, //end domain
            range: {
                enumerable: true,
                get: function get() {
                    var low = pts[0];
                    var high = pts[0];

                    for (var i = 1; i < this.n; ++i) {
                        if ((0, _helpers.lt)(pts[i].y, low.y)) {
                            low = pts[i];
                        } //end if
                        if ((0, _helpers.gt)(pts[i].y, high.y)) {
                            high = pts[i];
                        } //end if
                    } //end for

                    range[0] = low.y;
                    range[1] = high.y;

                    return range;
                } //end get
            } //end range
        }); //end defineProperties
    }

    //end class Polygon
    //end constructor

    _createClass(Polygon, [{
        key: "has",
        value: function has(pt) {
            if ((0, _helpers.gt)((0, _helpers.dist)(pt, this.center), this.r)) {
                return false;
            } //end if

            if ((0, _helpers.lt)(pt.x, this.domain[0])) {
                return false;
            } //end if

            if ((0, _helpers.gt)(pt.x, this.domain[1])) {
                return false;
            } //end if

            if ((0, _helpers.lt)(pt.y, this.range[0])) {
                return false;
            } //end if

            if ((0, _helpers.gt)(pt.y, this.range[1])) {
                return false;
            } //end if

            var rays = this.pts.map(function (point) {
                return new Line(pt, point);
            });

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.lns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var ln = _step.value;

                    if (ln.has(pt)) {
                        return true;
                    } //end if

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = rays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var ray = _step2.value;

                            if (!(ln.has(ray.endPoints[0]) || ln.has(ray.endPoints[1]))) {
                                if (ln.collidesWith(ray)) {
                                    return false;
                                } //end if
                            } //end if
                        } //end for ray
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                } //end for line
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return true;
        }
        //end has

    }, {
        key: "collidesWith",
        value: function collidesWith(other) {
            if (other instanceof Point) {
                return this.has(other);
            } //end if

            if (other instanceof Polygon) {
                if ((0, _helpers.gt)((0, _helpers.dist)(this.center, other.center), this.r + other.r)) {
                    return false;
                } //end if

                if ((0, _helpers.lt)(other.domain[1], this.domain[0])) {
                    return false;
                } //end if

                if ((0, _helpers.gt)(other.domain[0], this.domain[1])) {
                    return false;
                } //end if

                if ((0, _helpers.lt)(other.range[1], this.range[0])) {
                    return false;
                } //end if

                if ((0, _helpers.gt)(other.range[0], this.range[1])) {
                    return false;
                } //end if

                if (this.has(other.center)) {
                    return true;
                } //end if

                if (other.has(this.center)) {
                    return true;
                } //end if

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.lns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var ln = _step3.value;

                        if (other.collidesWith(ln)) {
                            return true;
                        } //end if
                    } //end for ln
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                            _iterator3["return"]();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } //end if

            else if (other instanceof Line) {
                    if ((0, _helpers.lt)(other.domain[1], this.domain[0])) {
                        return false;
                    } //end if

                    if ((0, _helpers.gt)(other.domain[0], this.domain[1])) {
                        return false;
                    } //end if

                    if ((0, _helpers.lt)(other.range[1], this.range[0])) {
                        return false;
                    } //end if

                    if ((0, _helpers.gt)(other.range[0], this.range[1])) {
                        return false;
                    } //end if

                    if (this.has(other.center)) {
                        return true;
                    } //end if

                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;

                    try {
                        for (var _iterator4 = this.lns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var ln = _step4.value;

                            if (ln.collidesWith(other)) {
                                return true;
                            } //end if
                        } //end for
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                                _iterator4["return"]();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    }
                } //end if

                else if (other instanceof Circle) {
                        if ((0, _helpers.gt)((0, _helpers.dist)(this.center, other.center), this.r + other.r)) {
                            return false;
                        } //end if

                        if ((0, _helpers.lt)(other.domain[1], this.domain[0])) {
                            return false;
                        } //end if

                        if ((0, _helpers.gt)(other.domain[0], this.domain[1])) {
                            return false;
                        } //end if

                        if ((0, _helpers.lt)(other.range[1], this.range[0])) {
                            return false;
                        } //end if

                        if ((0, _helpers.gt)(other.range[0], this.range[1])) {
                            return false;
                        } //end if

                        if (this.has(other.center)) {
                            return true;
                        } //end if

                        if (other.has(this.center)) {
                            return true;
                        } //end if

                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = this.lns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var ln = _step5.value;

                                if (ln.collidesWith(other)) {
                                    return true;
                                } //end if
                            } //end for
                        } catch (err) {
                            _didIteratorError5 = true;
                            _iteratorError5 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion5 && _iterator5["return"]) {
                                    _iterator5["return"]();
                                }
                            } finally {
                                if (_didIteratorError5) {
                                    throw _iteratorError5;
                                }
                            }
                        }
                    } //end if

            return false;
        }
        //end collidesWith

    }]);

    return Polygon;
})();

exports.Polygon = Polygon;
},{"./helpers":8}],8:[function(require,module,exports){
//helpers.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.eq = eq;
exports.ne = ne;
exports.lt = lt;
exports.gt = gt;
exports.le = le;
exports.ge = ge;
exports.sq = sq;
exports.dist = dist;
var epsilon = .1;

function eq(a, b) {
    return Math.abs(a - b) <= epsilon;
}

//end eq

function ne(a, b) {
    return !eq(a, b);
}

//end ne

function lt(a, b) {
    return !eq(a, b) && a < b;
}

//end lt

function gt(a, b) {
    return !eq(a, b) && a > b;
}

//end gt

function le(a, b) {
    return eq(a, b) || a < b;
}

//end le

function ge(a, b) {
    return eq(a, b) || a > b;
}

//end ge

function sq(n) {
    return n * n;
}

//end sq

function dist(pt1, pt2) {
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}

//end dist

var PI = Math.PI;
var cos = Math.cos;
var sin = Math.sin;
var sqrt = Math.sqrt;
var atan2 = Math.atan2;

exports.PI = PI;
exports.cos = cos;
exports.sin = sin;
exports.sqrt = sqrt;
exports.atan2 = atan2;
},{}],9:[function(require,module,exports){
//sprite.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _dummy = require('./dummy');

var _dummy2 = _interopRequireDefault(_dummy);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var _emitter = require('./emitter');

var _emitter2 = _interopRequireDefault(_emitter);

var _boundaryActions = require('./boundaryActions');

var _boundaryActions2 = _interopRequireDefault(_boundaryActions);

var _geometry = require('./geometry');

var _helpers = require('./helpers');

var __all = new Set();
var __groups = new Map();
var __zLevels = new Map();
var __origin = new _geometry.Point(0, 0);
//let Image = Image || dummy.Image;
var DIE = Symbol('DIE');
var WRAP = Symbol('WRAP');
var STOP = Symbol('STOP');
var NONE = Symbol('NONE');
var SPRING = Symbol('SPRING');
var BOUNCE = Symbol('BOUNCE');
var __polar = ['dispMag', 'dispAngle', 'velMag', 'velAngle', 'accMag', 'accAngle']; //end __polar
var __defaults = {
    k: 5,
    x: 0,
    dx: 0,
    ddx: 0,
    y: 0,
    dy: 0,
    ddy: 0,
    tilt: 0,
    dtilt: 0,
    ddtilt: 0,
    zLevel: 0,
    scale: 1,
    imgSrc: '',
    imgWidth: 64,
    imgHeight: 64,
    visible: true,
    bndAction: WRAP,
    drawFunction: null
}; //end __defaults
Object.seal(__defaults);

var Sprite = (function (_Emitter) {
    _inherits(Sprite, _Emitter);

    function Sprite() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Sprite);

        _get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).call(this);
        var __edge = undefined;
        var __image = new Image();

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(__defaults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (config[key] == null) {
                    config[key] = __defaults[key];
                } //end if
            } //end for
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        __image.src = config['imgSrc'];
        __image.width = config['imgWidth'];
        __image.height = config['imgHeight'];

        if (config['bndActions'] == null) {
            config['bndActions'] = {
                left: config['bndAction'],
                right: config['bndAction'],
                top: config['bndAction'],
                bottom: config['bndAction']
            }; //end config['bndActions']
        } //end if
        if (config['bndActions']['left'] == null) {
            config['bndActions']['left'] = config['bndAction'];
        } //end if
        if (config['bndActions']['right'] == null) {
            config['bndActions']['right'] = config['bndAction'];
        } //end if
        if (config['bndActions']['top'] == null) {
            config['bndActions']['top'] = config['bndAction'];
        } //end if
        if (config['bndActions']['bottom'] == null) {
            config['bndActions']['bottom'] = config['bndAction'];
        } //end if
        Object.seal(config['bndActions']);

        if (config['dispMag'] != null && config['dispAngle'] != null) {
            config['x'] = config['dispMag'] * (0, _helpers.cos)(config['dispAngle']);
            config['y'] = config['dispMag'] * (0, _helpers.sin)(config['dispAngle']);
        } //end if
        if (config['velMag'] != null && config['velAngle'] != null) {
            config['dx'] = config['velMag'] * (0, _helpers.cos)(config['velAngle']);
            config['dy'] = config['velMag'] * (0, _helpers.sin)(config['velAngle']);
        } //end if
        if (config['accMag'] != null && config['accAngle'] != null) {
            config['ddx'] = config['accMag'] * (0, _helpers.cos)(config['accAngle']);
            config['ddy'] = config['accMag'] * (0, _helpers.sin)(config['accAngle']);
        } //end if

        if (config['radius'] != null) {
            __edge = new _geometry.Circle(config['radius'], this);
        } //end if
        else if (config['pts'] != null) {
                var pts = config['pts'].map(function (pt) {
                    return new _geometry.Point(pt.x, pt.y, this);
                }, this);

                __edge = new (_bind.apply(_geometry.Polygon, [null].concat(_toConsumableArray(pts))))();
            } //end else if
            else {
                    var a = (0, _helpers.atan2)(config['imgHeight'] / 2, config['imgWidth'] / 2);
                    var m = (0, _helpers.sqrt)((0, _helpers.sq)(config['imgHeight'] / 2) + (0, _helpers.sq)(config['imgWidth'] / 2));
                    var pts = [new _geometry.Point(m * (0, _helpers.cos)(config.tilt + a), m * (0, _helpers.sin)(config.tilt + a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt - a), m * (0, _helpers.sin)(config.tilt - a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt + _helpers.PI + a), m * (0, _helpers.sin)(config.tilt + _helpers.PI + a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt + _helpers.PI - a), m * (0, _helpers.sin)(config.tilt + _helpers.PI - a), this)]; //end pts

                    __edge = new (_bind.apply(_geometry.Polygon, [null].concat(pts)))();
                } //end else

        if (config['group'] != null) {
            if (!__groups.has(config['group'])) {
                __groups.set(config['group'], new Set());
            } //end if
            __groups.get(config['group']).add(this);
        } //end if
        if (config['groups'] != null) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = config['groups'][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var group = _step2.value;

                    if (!__groups.has(group)) {
                        __groups.set(group, new Set());
                    } //end if
                    __groups.get(group).add(this);
                } //end for
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        } //end if

        Object.defineProperties(this, {
            k: {
                enumerable: true,
                get: function get() {
                    return config['k'];
                }, //end get
                set: function set(value) {
                    value = parseFloat(value);
                    if (value > 0) {
                        config['k'] = value;
                    } //end if
                } //end set
            }, //end k
            x: {
                enumerable: true,
                get: function get() {
                    return config['x'];
                }, //end get
                set: function set(value) {
                    config['x'] = parseFloat(value);
                } //end set
            }, //end x
            dx: {
                enumerable: true,
                get: function get() {
                    return config['dx'];
                }, //end get
                set: function set(value) {
                    config['dx'] = parseFloat(value);
                } //end set
            }, //end dx
            ddx: {
                enumerable: true,
                get: function get() {
                    return config['ddx'];
                }, //end get
                set: function set(value) {
                    config['ddx'] = parseFloat(value);
                } //end set
            }, //end ddx
            y: {
                enumerable: true,
                get: function get() {
                    return config['y'];
                }, //end get
                set: function set(value) {
                    config['y'] = parseFloat(value);
                } //end set
            }, //end y
            dy: {
                enumerable: true,
                get: function get() {
                    return config['dy'];
                }, //end get
                set: function set(value) {
                    config['dy'] = parseFloat(value);
                } //end set
            }, //end dy
            ddy: {
                enumerable: true,
                get: function get() {
                    return config['ddy'];
                }, //end get
                set: function set(value) {
                    config['ddy'] = parseFloat(value);
                } //end set
            }, //end ddy
            tilt: {
                enumerable: true,
                get: function get() {
                    return config['tilt'];
                }, //end get
                set: function set(value) {
                    value = parseFloat(value);
                    if (this.shape === 'Polygon') {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                            for (var _iterator3 = __edge.pts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var pt = _step3.value;

                                pt.angle += value - config['tilt'];
                            } //end for
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                    _iterator3['return']();
                                }
                            } finally {
                                if (_didIteratorError3) {
                                    throw _iteratorError3;
                                }
                            }
                        }
                    } //end if
                    config['tilt'] = value;
                } //end set
            }, //end tilt
            dtilt: {
                enumerable: true,
                get: function get() {
                    return config['dtilt'];
                }, //end get
                set: function set(value) {
                    config['dtilt'] = parseFloat(value);
                } //end set
            }, //end dtilt
            ddtilt: {
                enumerable: true,
                get: function get() {
                    return config['ddtilt'];
                }, //end get
                set: function set(value) {
                    config['ddtilt'] = parseFloat(value);
                } //end set
            }, //end ddtilt
            dispMag: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.dist)(__origin, config);
                }, //end get
                set: function set(value) {
                    var dispAngle = this.dispAngle;
                    config['x'] = value * (0, _helpers.cos)(dispAngle);
                    config['y'] = value * (0, _helpers.sin)(dispAngle);
                } //end set
            }, //end dispMag
            dispAngle: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.atan2)(config['y'], config['x']);
                }, //end get
                set: function set(value) {
                    var dispMag = this.dispMag;
                    config['x'] = dispMag * (0, _helpers.cos)(value);
                    config['y'] = dispMag * (0, _helpers.sin)(value);
                } //end set
            }, //end dispAngle
            velMag: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.sqrt)((0, _helpers.sq)(config['dx']) + (0, _helpers.sq)(config['dy']));
                }, //end get
                set: function set(value) {
                    var velAngle = this.velAngle;
                    config['dx'] = value * (0, _helpers.cos)(velAngle);
                    config['dy'] = value * (0, _helpers.sin)(velAngle);
                } //end set
            }, //end velMag
            velAngle: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.atan2)(config['dy'], config['dx']);
                }, //end get
                set: function set(value) {
                    var velMag = this.velMag;
                    config['dx'] = velMag * (0, _helpers.cos)(value);
                    config['dy'] = velMag * (0, _helpers.sin)(value);
                } //end set
            }, //end velAngle
            accMag: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.sqrt)((0, _helpers.sq)(config['ddx']) + (0, _helpers.sq)(config['ddy']));
                }, //end get
                set: function set(value) {
                    var accAngle = this.accAngle;
                    config['ddx'] = value * (0, _helpers.cos)(accAngle);
                    config['ddy'] = value * (0, _helpers.sin)(accAngle);
                } //end set
            }, //end accMag
            accAngle: {
                enumerable: true,
                get: function get() {
                    return (0, _helpers.atan2)(config['ddy'], config['ddx']);
                }, //end get
                set: function set(value) {
                    var accMag = this.accMag;
                    config['ddx'] = accMag * (0, _helpers.cos)(value);
                    config['ddy'] = accMag * (0, _helpers.sin)(value);
                } //end set
            }, //end accAngle
            zLevel: {
                enumerable: true,
                get: function get() {
                    return config['zLevel'];
                }, //end get
                set: function set(value) {
                    if (config['zLevel'] !== value) {
                        __zLevels.get(config['zLevel'])['delete'](this);

                        if (!__zLevels.has(value)) {
                            __zLevels.set(value, new Set());
                        } //end if

                        __zLevels.get(value).add(this);
                        config['zLevel'] = value;
                    } //end if
                } //end set
            }, //end zLevel
            groups: {
                enumerable: true,
                get: function get() {
                    var grps = [];

                    __groups.forEach(function (set, key) {
                        if (set.has(this)) {
                            grps.push(key);
                        } //end if
                    }); //end forEach

                    return grps;
                } //end get
            }, //end groups
            scale: {
                enumerable: true,
                get: function get() {
                    return config['scale'];
                }, //end get
                set: function set(value) {
                    value = parseFloat(value);
                    if (this.shape === 'Polygon') {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = __edge.pts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var pt = _step4.value;

                                pt.dist *= value / config['scale'];
                            } //end for
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                    _iterator4['return']();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    } //end if
                    else {
                            __edge.r *= value / config['scale'];
                        } //end else
                    config['scale'] = value;
                } //end set
            }, //end scale
            width: {
                enumerable: true,
                get: function get() {
                    return __edge.domain[1] - __edge.domain[0];
                } //end get
            }, //end width
            height: {
                enumerable: true,
                get: function get() {
                    return __edge.range[1] - __edge.range[0];
                } //end get
            }, //end height
            visible: {
                enumerable: true,
                get: function get() {
                    return config['visible'];
                }, //end get
                set: function set(value) {
                    config['visible'] = !!value;
                } //end set
            }, //end visible
            img: {
                enumerable: true,
                value: __image
            }, //end img
            imgSrc: {
                enumerable: true,
                get: function get() {
                    return __image.src;
                }, //end get
                set: function set(value) {
                    __image.src = value.toString();
                } //end set
            }, //end imgFile
            imgWidth: {
                enumerable: true,
                get: function get() {
                    return __image.width;
                }, //end get
                set: function set(value) {
                    __image.width = parseFloat(value);
                } //end set
            }, //end imgWidth
            imgHeight: {
                enumerable: true,
                get: function get() {
                    return __image.height;
                }, //end get
                set: function set(value) {
                    __image.height = parseFloat(value);
                } //end set
            }, //end imgHeight
            edge: {
                enumerable: true,
                value: __edge
            }, //end boundary
            shape: {
                enumerable: true,
                value: __edge.constructor.name
            }, //end shape
            radius: {
                enumerable: true,
                get: function get() {
                    return __edge.r;
                } //end get
            }, //end radius
            drawFunction: {
                enumerable: true,
                get: function get() {
                    return config['drawFunction'];
                }, //end get
                set: function set(value) {
                    if (value === null || typeof value === 'function') {
                        config['drawFunction'] = value;
                    } //end if
                } //end set
            }, //end drawFunction
            left: {
                enumerable: true,
                get: function get() {
                    return __edge.domain[0];
                }, //end get
                set: function set(value) {
                    this.x += value - this.left;
                } //end set
            }, //end left
            right: {
                enumerable: true,
                get: function get() {
                    return __edge.domain[1];
                }, //end get
                set: function set(value) {
                    this.x += value - this.right;
                } //end set
            }, //end right
            top: {
                enumerable: true,
                get: function get() {
                    return __edge.range[1];
                }, //end get
                set: function set(value) {
                    this.y += value - this.top;
                } //end set
            }, //end top
            bottom: {
                enumerable: true,
                get: function get() {
                    return __edge.range[0];
                }, //end get
                set: function set(value) {
                    this.y += value - this.bottom;
                } //end set
            }, //end bottom
            offScreen: {
                enumerable: true,
                get: function get() {
                    return this.bottom > _engine2['default'].top || this.top < _engine2['default'].bottom || this.left > _engine2['default'].right || this.right < _engine2['default'].left;
                } }, //end get
            //end offScreen
            bndAction: {
                enumerable: true,
                get: function get() {
                    return config['bndAction'];
                }, //end get
                set: function set(value) {
                    config['bndAction'] = value;
                    config['bndActions']['left'] = value;
                    config['bndActions']['right'] = value;
                    config['bndActions']['top'] = value;
                    config['bndActions']['bottom'] = value;
                } //end set
            }, //end bndAction
            bndActions: {
                enumerable: true,
                get: function get() {
                    return config['bndActions'];
                } //end get
            } //end bndActions
        }); //end defineProperties

        __all.add(this);
        if (!__zLevels.has(config['zLevel'])) {
            __zLevels.set(config['zLevel'], new Set());
        } //end if
        __zLevels.get(config['zLevel']).add(this);

        Object.seal(config);
    }

    //end class Sprite

    //end constructor

    _createClass(Sprite, [{
        key: 'distanceTo',
        value: function distanceTo(other) {
            if (other instanceof Sprite) {
                return (0, _helpers.dist)(this.edge.center, other.edge.center);
            } //end if

            else if (other === 'mouse') {
                    return (0, _helpers.dist)(this.edge.center, _engine2['default'].mouse);
                } //end else if

            return NaN;
        }
        //end ::distanceTo

    }, {
        key: 'angleTo',
        value: function angleTo(other) {
            if (other instanceof Sprite) {
                return (0, _helpers.atan2)(other.y - this.y, other.x - this.x);
            } //end if

            else if (other === 'mouse') {
                    return (0, _helpers.atan2)(_engine2['default'].mouseY - this.y, _engine2['default'].mouseX - this.x);
                } //end else if

            return NaN;
        }
        //end ::angleTo

    }, {
        key: 'collidesWith',
        value: function collidesWith(other) {
            if (this.visible) {
                if (other instanceof Sprite) {
                    if (other.visible) {
                        return this.edge.collidesWith(other.edge);
                    } //end if
                } //end if

                else if (other === 'mouse') {
                        return this.edge.collidesWith(_engine2['default'].mouse);
                    } //end else if

                    else {
                            return this.edge.collidesWith(other);
                        } //end else
            } //end if

            return false;
        }
        //end ::collidesWith

    }, {
        key: 'draw',
        value: function draw() {
            if (this.visible && !this.offScreen) {
                _engine2['default'].ctx.save();
                _engine2['default'].ctx.translate(this.x, -this.y);
                _engine2['default'].ctx.rotate(-this.tilt);
                _engine2['default'].ctx.scale(this.scale, this.scale);

                if (this.drawFunction) {
                    this.drawFunction.call(this, _engine2['default'].ctx);
                } //end if

                else if (!(this.imgSrc === document.head.baseURI)) {
                        this.emit('draw-below', _engine2['default'].ctx);

                        _engine2['default'].ctx.drawImage(this.img, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight); //end drawImage

                        this.emit('draw-above', _engine2['default'].ctx);
                    } //end if

                    else {
                            _engine2['default'].ctx.lineWidth = 3;
                            _engine2['default'].ctx.strokeStyle = 'white';

                            if (this.shape === 'Circle') {
                                _engine2['default'].ctx.beginPath();
                                _engine2['default'].ctx.arc(0, 0, this.radius, 0, 2 * _helpers.PI); //end arc
                                _engine2['default'].ctx.stroke();
                            } //end if

                            else if (this.shape === 'Polygon') {
                                    var pts = this.edge.pts;

                                    _engine2['default'].ctx.beginPath();
                                    _engine2['default'].ctx.moveTo(pts[0].rel_x, -pts[0].rel_y);
                                    for (var i = 1; i < pts.length; ++i) {
                                        _engine2['default'].ctx.lineTo(pts[i].rel_x, -pts[i].rel_y);
                                    } //end for
                                    _engine2['default'].ctx.closePath();
                                    _engine2['default'].ctx.stroke();
                                } //end else if

                                else {
                                        console.error('Unable to draw Sprite');
                                    } //end else
                        } //end else

                _engine2['default'].ctx.restore();
            } //end if
        }
        //end ::draw

    }, {
        key: 'update',
        value: function update() {
            this.emit('update');
            this.dx += this.ddx / _engine2['default'].frameRate;
            this.x += this.dx / _engine2['default'].frameRate;
            this.dy += this.ddy / _engine2['default'].frameRate;
            this.y += this.dy / _engine2['default'].frameRate;
            this.dtilt += this.ddtilt / _engine2['default'].frameRate;
            this.tilt += this.dtilt / _engine2['default'].frameRate;

            if (this.right < _engine2['default'].left) {
                this.emit('off-left');
                if (this.bndActions['left'] === DIE) {
                    _boundaryActions2['default'].left.DIE.call(this);
                } //end if
                else if (this.bndActions['left'] === WRAP) {
                        _boundaryActions2['default'].left.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.left > _engine2['default'].right) {
                this.emit('off-right');
                if (this.bndActions['right'] === DIE) {
                    _boundaryActions2['default'].right.DIE.call(this);
                } //end if
                else if (this.bndActions['right'] === WRAP) {
                        _boundaryActions2['default'].right.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.bottom > _engine2['default'].top) {
                this.emit('off-top');
                if (this.bndActions['top'] === DIE) {
                    _boundaryActions2['default'].top.DIE.call(this);
                } //end if
                else if (this.bndActions['top'] === WRAP) {
                        _boundaryActions2['default'].top.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.top < _engine2['default'].bottom) {
                this.emit('off-bottom');
                if (this.bndActions['bottom'] === DIE) {
                    _boundaryActions2['default'].bottom.DIE.call(this);
                } //end if
                else if (this.bndActions['bottom'] === WRAP) {
                        _boundaryActions2['default'].bottom.WRAP.call(this);
                    } //end else if
            } //end if

            if (this.left <= _engine2['default'].left) {
                this.emit('hit-left');
                if (this.bndActions['left'] === STOP) {
                    _boundaryActions2['default'].left.STOP.call(this);
                } //end if
                else if (this.bndActions['left'] === SPRING) {
                        _boundaryActions2['default'].left.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['left'] === BOUNCE) {
                            _boundaryActions2['default'].left.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.right >= _engine2['default'].right) {
                this.emit('hit-right');
                if (this.bndActions['right'] === STOP) {
                    _boundaryActions2['default'].right.STOP.call(this);
                } //end if
                else if (this.bndActions['right'] === SPRING) {
                        _boundaryActions2['default'].right.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['right'] === BOUNCE) {
                            _boundaryActions2['default'].right.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.top >= _engine2['default'].top) {
                this.emit('hit-top');
                if (this.bndActions['top'] === STOP) {
                    _boundaryActions2['default'].top.STOP.call(this);
                } //end if
                else if (this.bndActions['top'] === SPRING) {
                        _boundaryActions2['default'].top.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['top'] === BOUNCE) {
                            _boundaryActions2['default'].top.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.bottom <= _engine2['default'].bottom) {
                this.emit('hit-bottom');
                if (this.bndActions['bottom'] === STOP) {
                    _boundaryActions2['default'].bottom.STOP.call(this);
                } //end if
                else if (this.bndActions['bottom'] === SPRING) {
                        _boundaryActions2['default'].bottom.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['bottom'] === BOUNCE) {
                            _boundaryActions2['default'].bottom.BOUNCE.call(this);
                        } //end else if
            } //end if
        }
        //end ::update

    }]);

    return Sprite;
})(_emitter2['default']);

exports['default'] = Sprite;
Object.defineProperties(Sprite, {
    DIE: {
        value: DIE,
        enumerable: true
    }, //end DIE
    WRAP: {
        value: WRAP,
        enumerable: true
    }, //end WRAP
    STOP: {
        value: STOP,
        enumerable: true
    }, //end STOP
    NONE: {
        value: NONE,
        enumerable: true
    }, //end NONE
    SPRING: {
        value: SPRING,
        enumerable: true
    }, //end SPRING
    BOUNCE: {
        value: BOUNCE,
        enumerable: true
    }, //end BOUNCE
    number: {
        enumerable: true,
        get: function get() {
            return __all.size;
        } //end get
    }, //end number
    zLevels: {
        enumerable: true,
        get: function get() {
            return __zLevels;
        } //end get
    }, //end zLevels
    groups: {
        enumerable: true,
        get: function get() {
            return __groups;
        } //end get
    }, //end groups
    defaults: {
        enumerable: true,
        value: __defaults
    }, //end defaults
    'delete': {
        enumerable: true,
        value: function value(sprite) {
            __all['delete'](sprite);
            __zLevels.get(sprite.zLevel)['delete'](sprite);
            __groups.forEach(function (group) {
                if (group.has(sprite)) {
                    group['delete'](sprite);
                } //end if
            }); //end forEach
        } //end value
    }, //end delete
    deleteAll: {
        enumerable: true,
        value: function value() {
            __all.clear();
            __groups.clear();
            __zLevels.clear();
        } //end value
    }, //end deleteAll
    draw: {
        value: function value() {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Array.from(__zLevels.keys()).sort()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var key = _step5.value;

                    __zLevels.get(key).forEach(function (sprite) {
                        sprite.draw();
                    });
                } //end for
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                        _iterator5['return']();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        } //end value
    }, //end draw
    update: {
        value: function value() {
            __all.forEach(function (sprite) {
                sprite.update();
            });
        } //end value
    }, //end update
    addToGroup: {
        enumerable: true,
        value: function value(sprite, group) {
            if (sprite instanceof Sprite) {
                if (!__groups.has(group)) {
                    __groups.set(group, new Set());
                } //end if
                __groups.get(group).add(sprite);
            } //end if
        } //end value
    }, //end addToGroup
    removeFromGroup: {
        enumerable: true,
        value: function value(sprite, group) {
            if (__groups.has(group)) {
                __groups.get(group)['delete'](sprite);
            } //end if
        } //end value
    }, //end removeFromGroup
    forEach: {
        enumerable: true,
        value: function value(group, fn) {
            if (typeof group === 'function') {
                fn = group;
                __all.forEach(fn);
            } //end if

            else {
                    if (__groups.has(group)) {
                        __groups.get(group).forEach(fn);
                    } //end if
                } //end else
        } //end value
    } //end forEach
}); //end defineProperties

_engine2['default'].on('update', Sprite.draw);
_engine2['default'].on('update', Sprite.update);
module.exports = exports['default'];
},{"./boundaryActions":3,"./dummy":4,"./emitter":5,"./engine":6,"./geometry":7,"./helpers":8}],10:[function(require,module,exports){
//textSprite.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _sprite = require('./sprite');

var _sprite2 = _interopRequireDefault(_sprite);

var _engine = require('./engine');

var _engine2 = _interopRequireDefault(_engine);

var __defaults = {
    font: {
        size: 12,
        alpha: 1,
        color: 'white',
        align: 'left',
        name: 'sans-serif'
    }, //end font
    border: {
        size: 5,
        alpha: 1,
        visible: true,
        color: 'white'
    }, //end border
    margins: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5
    }, //end margins
    background: {
        alpha: 1,
        visible: true,
        color: 'black'
    } //end background
}; //end defaults
Object.seal(__defaults);
Object.seal(__defaults.font);
Object.seal(__defaults.border);
Object.seal(__defaults.margins);
Object.seal(__defaults.background);

var TextSprite = (function (_Sprite) {
    _inherits(TextSprite, _Sprite);

    function TextSprite() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, TextSprite);

        if (config['text'] == null) {
            config['text'] = 'NOVA!';
        } //end if

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(__defaults)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (config[key] == null) {
                    config[key] = {};
                } //end if

                for (var k in __defaults[key]) {
                    if (config[key][k] == null) {
                        config[key][k] = __defaults[key][k];
                    } //end if
                } //end for
            } //end for
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        Object.seal(config['font']);
        Object.seal(config['border']);
        Object.seal(config['margins']);
        Object.seal(config['background']);

        delete config['radius'];
        delete config['pts'];
        var __text = config['text'].split('\n');

        config['imgWidth'] = 0;
        config['imgHeight'] = 1.5 * __text.length * config['font']['size'];

        _engine2['default'].ctx.save();
        _engine2['default'].ctx.font = config['font']['size'] + 'px ' + config['font']['name'];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = __text[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var line = _step2.value;

                var width = _engine2['default'].ctx.measureText(line);
                if (config['imgWidth'] < width) {
                    config['imgWidth'] = width;
                } //end if
            } //end for
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        _engine2['default'].ctx.restore();

        config['imgWidth'] += config['margins']['left'] + config['margins']['right'];
        config['imgHeight'] += config['margins']['top'] + config['margins']['bottom'];
        if (config['border']['visible']) {
            config['imgWidth'] += 2 * config['border']['size'];
            config['imgHeight'] += 2 * config['border']['size'];
        } //end if

        _get(Object.getPrototypeOf(TextSprite.prototype), 'constructor', this).call(this, config);

        Object.defineProperties(this, {
            boxWidth: {
                value: 0,
                writable: true
            }, //end boxWidth
            boxHeight: {
                value: 0,
                writable: true
            }, //end boxHeight
            text: {
                enumerable: true,
                get: function get() {
                    return config['text'];
                }, //end get
                set: function set(value) {
                    config['text'] = value.toString();
                } //end set
            }, //end text
            font: {
                enumerable: true,
                get: function get() {
                    return config['font'];
                } //end get
            }, //end font
            border: {
                enumerable: true,
                get: function get() {
                    return config['border'];
                } //end get
            }, //end border
            margins: {
                enumerable: true,
                get: function get() {
                    return config['margins'];
                } //end get
            }, //end margins
            background: {
                enumerable: true,
                get: function get() {
                    return config['background'];
                } //end get
            } //end background
        }); //end defineProperties
    }

    //end class TextSprite

    //end constructor

    _createClass(TextSprite, [{
        key: 'draw',
        value: function draw() {
            if (this.visible && !this.offScreen) {
                _engine2['default'].ctx.save();

                if (this.drawFunction) {
                    this.drawFunction.call(this, _engine2['default'].ctx);
                } //end if

                else {
                        this.emit('draw-below', _engine2['default'].ctx);

                        var xOffset = 0;
                        var yOffset = 0;
                        var text = this.text.split('\n');

                        _engine2['default'].ctx.translate(this.x, -this.y);
                        _engine2['default'].ctx.rotate(-this.tilt);
                        _engine2['default'].ctx.scale(this.scale, this.scale);

                        yOffset = (text.length - 1) * this.font.size * .75;
                        if (this.font.align.toLowerCase() === 'left') {
                            xOffset = -this.boxWidth / 2 + this.margins.left;
                            if (this.border.visible) {
                                xOffset += this.border.size;
                            } //end if
                        } //end if
                        if (this.font.align.toLowerCase() === 'right') {
                            xOffset = this.boxWidth / 2 - this.margins.right;
                            if (this.border.visible) {
                                xOffset -= this.border.size;
                            } //end if
                        } //end if

                        if (this.background.visible) {
                            _engine2['default'].ctx.fillStyle = this.background.color;
                            _engine2['default'].ctx.globalAlpha = this.background.alpha;
                            _engine2['default'].ctx.fillRect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
                        } //end if

                        if (this.border.visible) {
                            _engine2['default'].ctx.lineWidth = this.border.size;
                            _engine2['default'].ctx.strokeStyle = this.border.color;
                            _engine2['default'].ctx.globalAlpha = this.border.alpha;
                            _engine2['default'].ctx.strokeRect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
                        } //end if

                        _engine2['default'].ctx.textBaseLine = 'middle';
                        _engine2['default'].ctx.textAlign = this.font.align;
                        _engine2['default'].ctx.fillStyle = this.font.color;
                        _engine2['default'].ctx.globalAlpha = this.font.alpha;
                        for (var i = 0; i < text.length; ++i) {
                            _engine2['default'].ctx.fillText(text[i], xOffset, this.font.size * 1.5 * i - yOffset);
                        } //end for

                        this.emit('draw-above', context);
                    } //end else

                _engine2['default'].ctx.restore();
            } //end if
        }
        //end ::draw

    }, {
        key: 'update',
        value: function update() {
            _get(Object.getPrototypeOf(TextSprite.prototype), 'update', this).call(this);
            var oldWidth = this.boxWidth;
            var oldHeight = this.boxHeight;
            var text = this.text.split('\n');

            this.boxWidth = 0;
            this.boxHeight = 1.5 * this.font.size * text.length;

            _engine2['default'].ctx.save();
            _engine2['default'].ctx.font = this.font.size + 'px ' + this.font.name;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = text[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var line = _step3.value;

                    var width = _engine2['default'].ctx.measureText(line);
                    if (this.boxWidth < width) {
                        this.boxWidth = width;
                    } //end if
                } //end for
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            _engine2['default'].ctx.restore();

            this.boxWidth += this.margins.left + this.margins.right;
            this.boxHeight += this.margins.top + this.margins.bottom;
            if (this.border.visible) {
                this.boxWidth += 2 * this.border.size;
                this.boxHeight += 2 * this.border.size;
            } //end if

            if (oldWidth !== this.boxWidth || oldHeight !== this.boxHeight) {
                var tilt = this.tilt;
                this.tilt = 0;

                this.edge.pts[0].rel_x = this.boxWidth / 2;
                this.edge.pts[0].rel_y = this.boxHeight / 2;
                this.edge.pts[1].rel_x = this.boxWidth / 2;
                this.edge.pts[1].rel_y = -this.boxHeight / 2;
                this.edge.pts[2].rel_x = -this.boxWidth / 2;
                this.edge.pts[2].rel_y = -this.boxHeight / 2;
                this.edge.pts[3].rel_x = -this.boxWidth / 2;
                this.edge.pts[3].rel_y = this.boxHeight / 2;

                this.tilt = tilt;
            } //end if
        }
        //end ::update

    }]);

    return TextSprite;
})(_sprite2['default']);

exports['default'] = TextSprite;
Object.defineProperties(TextSprite, {
    defaults: {
        enumerable: true,
        value: __defaults
    } //end defaults
}); //end defineProperties
module.exports = exports['default'];
},{"./engine":6,"./sprite":9}],11:[function(require,module,exports){
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
},{}]},{},[1])(1)
});