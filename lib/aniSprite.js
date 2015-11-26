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
var __context = _engine2['default'].canvas.getContext('2d');

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
                __context.save();

                if (this.imgSrc) {
                    var sx = 0;
                    var sy = 0;

                    __context.translate(this.x, -this.y);
                    __context.rotate(-this.tilt);
                    __context.scale(this.scale, this.scale);

                    if (this.orientation === 'horizontal') {
                        sx = this.active.frame;
                        sy = this.active.index;
                    } //end if
                    else if (this.orientation === 'vertical') {
                            sx = this.active.index;
                            sy = this.active.frame;
                        } //end else if

                    __context.drawImage(this.img, this.cellWidth * sx, this.cellHeight * sy, this.cellWidth, this.cellHeight, -this.cellWidth / 2, -this.cellHeight / 2, this.cellWidth, this.cellHeight); //end drawImage
                } //end if

                else {
                        console.error('Unable to draw AniSprite');
                    } //end else

                __context.restore();
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