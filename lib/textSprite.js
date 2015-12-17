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
var __context = _engine2['default'].canvas.getContext('2d');

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
        delete config['points'];
        var __text = config['text'].split('\n');

        config['imgWidth'] = 0;
        config['imgHeight'] = 1.5 * __text.length * config['font']['size'];

        __context.save();
        __context.font = config['font']['size'] + 'px ' + config['font']['name'];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = __text[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var line = _step2.value;

                var width = __context.measureText(line);
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

        __context.restore();

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
                var xOffset = 0;
                var yOffset = 0;
                var text = this.text.split('\n');

                __context.save();
                __context.translate(this.x, -this.y);
                __context.rotate(-this.tilt);
                __context.scale(this.scale, this.scale);

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
                    __context.fillStyle = this.background.color;
                    __context.globalAlpha = this.background.alpha;
                    __context.fillRect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
                } //end if

                if (this.border.visible) {
                    __context.lineWidth = this.border.size;
                    __context.strokeStyle = this.border.color;
                    __context.globalAlpha = this.border.alpha;
                    __context.strokeRect(-this.boxWidth / 2, -this.boxHeight / 2, this.boxWidth, this.boxHeight);
                } //end if

                __context.textBaseLine = 'middle';
                __context.textAlign = this.font.align;
                __context.fillStyle = this.font.color;
                __context.globalAlpha = this.font.alpha;
                for (var i = 0; i < text.length; ++i) {
                    __context.fillText(text[i], xOffset, this.font.size * 1.5 * i - yOffset);
                } //end for

                __context.restore();
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

            __context.save();
            __context.font = this.font.size + 'px ' + this.font.name;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = text[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var line = _step3.value;

                    var width = __context.measureText(line);
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

            __context.restore();

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