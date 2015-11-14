//sprite.js

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
var Image = Image || _dummy2['default'].Image;
var __context = _engine2['default'].canvas.getContext('2d');
var __polar = ['dispMag', 'dispAngle', 'velMag', 'velAngle', 'accMag', 'accAngle']; //end __polar
var __defaults = {
    k: 25,
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
    bndAction: 'WRAP'
}; //end __defaults
Object.seal(__defaults);

/*
TODO:
    x add `k` property to Sprite instances (spring constant)
    x deal with magnitudes and angles in config
    x figure out boundary actions (deep copy? look up /\)
    - need a context from a <canvas> tag
    x need to deal with `on-*` and `once-*` keys in config object (is this too complicated? yes)
    x when do I seal the config object? (at the very end of constructor)
    - Sprite class level methods (should i copy all from Greenhorn?)
    x should __defaults be sealed? (yes, for now)
    x do I need __config? (no)
    x how to draw Sprites in zLevel order? (hash of Sets)
    x what fields should be removed from the config object (none)
    x is scale set logic correct? (very likely yes)
    x is there a difference between imgWidth and width or imgHeight and height? (yes)
    x should width and height be settable or even exist? (maybe calculated using lft, rght, etc?)
    x need to add some more in-depth logic to set zLevel
    - are Sprite groups a thing?
    x what is the utility of __all? (Sprite class methods)
    x should __zLevels and __groups be a Map of WeakSets? (yes)
    - should the boundary action keys be Symbols?
    - should setting numeric values fail silently if parseFloat() fails?
    - Sprite prototype methods need to be aware of Mouse object
    - should there be draw events?
    x bndActions should be organized by side then action
    - Emitter should have an events() method that returns an Array or @@iterator
    x should Sprite#ctx be visible? (no)
    - drawing a non-image Sprite should have more options
    - should sprites update independantly?
*/

var Sprite = (function (_Emitter) {
    _inherits(Sprite, _Emitter);

    function Sprite() {
        var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Sprite);

        _get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).call(this);
        var __edge = undefined;

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
        else if (config['points'] != null) {
                var pts = [];
                for (var i = 0; i < config['points'].length; ++i) {
                    pts.push(new _geometry.Point(config['points'][i]['x'], config['points'][i]['y'], this));
                } //end for

                __edge = new (_bind.apply(_geometry.Polygon, [null].concat(pts)))();
            } //end else if
            else {
                    var a = (0, _helpers.atan2)(config['height'] / 2, config['width'] / 2);
                    var m = (0, _helpers.sqrt)((0, _helpers.sq)(config['height'] / 2) + (0, _helpers.sq)(config['width'] / 2));
                    var pts = [new _geometry.Point(m * (0, _helpers.cos)(config.tilt + a), m * (0, _helpers.sin)(config.tilt + a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt - a), m * (0, _helpers.sin)(config.tilt - a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt + _helpers.PI + a), m * (0, _helpers.sin)(config.tilt + _helpers.PI + a), this), new _geometry.Point(m * (0, _helpers.cos)(config.tilt + _helpers.PI - a), m * (0, _helpers.sin)(config.tilt + _helpers.PI - a), this)]; //end pts

                    __edge = new (_bind.apply(_geometry.Polygon, [null].concat(pts)))();
                } //end else

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
                set: function set() {
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
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = __edge.pts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var pt = _step2.value;

                                pt.angle += value - config['tilt'];
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
                            __zLevels.set(value, new WeakSet());
                        } //end if
                        __zLevels.get(value).add(this);
                        config['zLevel'] = value;
                    } //end if
                } //end set
            }, //end zLevel
            scale: {
                enumerable: true,
                get: function get() {
                    return config['scale'];
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

                                pt.dist *= value / config['scale'];
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
                value: new Image(config['imgWidth'], config['imgHeight'])
            }, //end img
            imgSrc: {
                enumerable: true,
                get: function get() {
                    return this.image.src;
                }, //end get
                set: function set(value) {
                    this.image.src = value.toString();
                } //end set
            }, //end imgFile
            imgWidth: {
                enumerable: true,
                get: function get() {
                    return config['imgWidth'];
                }, //end get
                set: function set(value) {
                    config['imgWidth'] = parseFloat(value);
                } //end set
            }, //end imgWidth
            imgHeight: {
                enumerable: true,
                get: function get() {
                    return config['imgHeight'];
                }, //end get
                set: function set(value) {
                    config['imgHeight'] = parseFloat(value);
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
            bndAction: {
                enumerable: true,
                get: function get() {
                    return config['bndAction'];
                }, //end get
                set: function set(value) {
                    value = value.toString();
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

        this.imgSrc = config['imgSrc'];
        __all.add(this);
        if (!__zLevels.has(config['zLevel'])) {
            __zLevels.set(config['zLevel'], new WeakSet());
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
            return NaN;
        }
        //end ::distanceTo

    }, {
        key: 'angleTo',
        value: function angleTo(other) {
            if (other instanceof Sprite) {
                return (0, _helpers.atan2)(other.y - this.y, other.x - this.x);
            } //end if
            return NaN;
        }
        //end ::angleTo

    }, {
        key: 'collidesWith',
        value: function collidesWith(other) {
            if (other instanceof Sprite) {
                if (this.visible) {
                    if (other.visible) {
                        return this.edge.collidesWith(other.edge);
                    } //end if
                } //end if
            } //end if
            return false;
        }
        //end ::collidesWith

    }, {
        key: 'draw',
        value: function draw() {
            if (this.visible) {
                __context.save();

                if (this.imgSrc) {
                    __context.translate(this.x, -this.y);
                    __context.rotate(-this.tilt);
                    __context.scale(this.scale, this.scale);
                    __context.drawImage(this.img, -this.imgWidth / 2, -this.imgHeight / 2, this.imgWidth, this.imgHeight); //end drawImage
                } //end if

                else {
                        __context.lineWidth = 3;
                        __context.strokeStyle = 'white';

                        if (this.shape === 'Circle') {
                            __context.beginPath();
                            __context.arc(this.x, -this.y, this.radius, 0, 2 * _helpers.PI); //end arc
                            __context.stroke();
                        } //end if

                        else if (this.shape === 'Polygon') {
                                var pts = this.edge.pts;

                                __context.beginPath();
                                __context.moveTo(pts[0].x, -pts[0].y);
                                for (var i = 1; i < pts.length; ++i) {
                                    __context.lineTo(pts[i].x, -pts[i].y);
                                } //end for
                                __context.closePath();
                                __context.stroke();
                            } //end else if

                            else {
                                    console.error('Unable to draw Sprite');
                                } //end else
                    } //end else

                __context.restore();
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
                if (this.bndActions['left'] === 'DIE') {
                    _boundaryActions2['default'].left.DIE.call(this);
                } //end if
                else if (this.bndActions['left'] === 'WRAP') {
                        _boundaryActions2['default'].left.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.left > _engine2['default'].right) {
                this.emit('off-right');
                if (this.bndActions['right'] === 'DIE') {
                    _boundaryActions2['default'].right.DIE.call(this);
                } //end if
                else if (this.bndActions['right'] === 'WRAP') {
                        _boundaryActions2['default'].right.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.bottom > _engine2['default'].top) {
                this.emit('off-top');
                if (this.bndActions['top'] === 'DIE') {
                    _boundaryActions2['default'].top.DIE.call(this);
                } //end if
                else if (this.bndActions['top'] === 'WRAP') {
                        _boundaryActions2['default'].top.WRAP.call(this);
                    } //end else if
            } //end if
            if (this.top < _engine2['default'].bottom) {
                this.emit('off-bottom');
                if (this.bndActions['bottom'] === 'DIE') {
                    _boundaryActions2['default'].bottom.DIE.call(this);
                } //end if
                else if (this.bndActions['bottom'] === 'WRAP') {
                        _boundaryActions2['default'].bottom.WRAP.call(this);
                    } //end else if
            } //end if

            if (this.left <= _engine2['default'].left) {
                this.emit('hit-left');
                if (this.bndActions['left'] === 'STOP') {
                    _boundaryActions2['default'].left.STOP.call(this);
                } //end if
                else if (this.bndActions['left'] === 'SPRING') {
                        _boundaryActions2['default'].left.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['left'] === 'BOUNCE') {
                            _boundaryActions2['default'].left.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.right >= _engine2['default'].right) {
                this.emit('hit-right');
                if (this.bndActions['right'] === 'STOP') {
                    _boundaryActions2['default'].right.STOP.call(this);
                } //end if
                else if (this.bndActions['right'] === 'SPRING') {
                        _boundaryActions2['default'].right.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['right'] === 'BOUNCE') {
                            _boundaryActions2['default'].right.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.top >= _engine2['default'].top) {
                this.emit('hit-top');
                if (this.bndActions['top'] === 'STOP') {
                    _boundaryActions2['default'].top.STOP.call(this);
                } //end if
                else if (this.bndActions['top'] === 'SPRING') {
                        _boundaryActions2['default'].top.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['top'] === 'BOUNCE') {
                            _boundaryActions2['default'].top.BOUNCE.call(this);
                        } //end else if
            } //end if
            if (this.bottom <= _engine2['default'].bottom) {
                this.emit('hit-bottom');
                if (this.bndActions['bottom'] === 'STOP') {
                    _boundaryActions2['default'].bottom.STOP.call(this);
                } //end if
                else if (this.bndActions['bottom'] === 'SPRING') {
                        _boundaryActions2['default'].bottom.SPRING.call(this);
                    } //end else if
                    else if (this.bndActions['bottom'] === 'BOUNCE') {
                            _boundaryActions2['default'].bottom.BOUNCE.call(this);
                        } //end else if
            } //end if

            return this;
        }
        //end ::update

    }]);

    return Sprite;
})(_emitter2['default']);

exports['default'] = Sprite;
Object.defineProperties(Sprite, {
    number: {
        enumerable: true,
        get: function get() {
            return __all.size;
        } //end get
    }, //end number
    'delete': {
        enumerable: true,
        value: function value(sprite) {
            __all['delete'](sprite);
        } //end value
    }, //end delete
    deleteAll: {
        enumerable: true,
        value: function value() {
            __all.clear();
        } //end value
    }, //end deleteAll
    draw: {
        value: function value() {
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = Array.from(__zLevels.keys()).sort()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var key = _step4.value;

                    __zLevels.get(key).forEach(function (sprite) {
                        sprite.draw();
                    });
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
        } //end value
    } //end draw
}); //end defineProperties

_engine2['default'].on('update', Sprite.draw);
module.exports = exports['default'];