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