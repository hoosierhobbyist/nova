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
            get: function get() {
                return origin.x;
            } //end get
        }, //end org_x
        org_y: {
            get: function get() {
                return origin.y;
            } //end get
        }, //end org_y
        rel_x: {
            get: function get() {
                return rel_x;
            }, //end get
            set: function set(value) {
                rel_x = value;
            } //end set
        }, //end rel_x
        rel_y: {
            get: function get() {
                return rel_y;
            }, //end get
            set: function set(value) {
                rel_y = value;
            } //end set
        }, //end rel_y
        angle: {
            get: function get() {
                return Math.atan2(rel_y, rel_x);
            }, //end get
            set: function set(value) {
                var x = this.dist * Math.cos(value);
                var y = this.dist * Math.sin(value);

                rel_x = x;
                rel_y = y;
            } //end set
        }, //end angle
        dist: {
            get: function get() {
                return (0, _helpers.sqrt)((0, _helpers.sq)(rel_x) + (0, _helpers.sq)(rel_y));
            }, //end get
            set: function set(value) {
                if (value >= 0) {
                    var x = value * Math.cos(this.angle);
                    var y = value * Math.sin(this.angle);

                    rel_x = x;
                    rel_y = y;
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
                get: function get() {
                    return new Point(origin.x, origin.y);
                } //end get
            }, //end centerPoint
            domain: {
                get: function get() {
                    domain[0] = origin.x - radius;
                    domain[1] = origin.x + radius;

                    return domain;
                } //end get
            }, //end domain
            range: {
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
                get: function get() {
                    var _x = (pt_1.x + pt_2.x) / 2;
                    var _y = (pt_1.y + pt_2.y) / 2;

                    return new Point(_x, _y);
                } //end get
            }, //end center
            endPoints: {
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
                            var _pts = __line2circle(this, other);
                            if (this.has(_pts[0]) || this.has(_pts[1])) {
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
                get: function get() {
                    return pts.slice(0);
                } //end get
            }, //end pts
            lns: {
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

            else {
                    var rays = [];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = pts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var vrtx = _step.value;

                            rays.push(new Line(pt, vrtx));
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

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = lns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var ln = _step2.value;

                            if (ln.has(pt)) {
                                return true;
                            } //end if

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = rays[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var ray = _step3.value;

                                    if (!(ln.has(ray.endPoints[0]) || ln.has(ray.endPoints[1]))) {
                                        if (ln.collidesWith(ray)) {
                                            return false;
                                        } //end if
                                    } //end if
                                } //end for ray
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
                        } //end for line
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
                } //end else
        }
        //end has

    }, {
        key: "collidesWith",
        value: function collidesWith(other) {
            if (other instanceof Polygon) {
                if ((0, _helpers.gt)((0, _helpers.dist)(this.center, other.center), this.r + other.r)) {
                    return false;
                } //end if

                if (this.has(other.center)) {
                    return true;
                } //end if

                if (other.has(this.center)) {
                    return true;
                } //end if

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = lns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var ln = _step4.value;

                        if (other.collidesWith(ln)) {
                            return true;
                        } //end if
                    } //end for ln
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

            else if (other instanceof Line) {
                    if (this.has(other.center)) {
                        return true;
                    } //end if

                    var _iteratorNormalCompletion5 = true;
                    var _didIteratorError5 = false;
                    var _iteratorError5 = undefined;

                    try {
                        for (var _iterator5 = lns[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
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

                else if (other instanceof Circle) {
                        if ((0, _helpers.gt)((0, _helpers.dist)(this.center, other.center), this.r + other.r)) {
                            return false;
                        } //end if

                        if (this.has(other.center)) {
                            return true;
                        } //end if

                        if (other.has(this.center)) {
                            return true;
                        } //end if

                        var _iteratorNormalCompletion6 = true;
                        var _didIteratorError6 = false;
                        var _iteratorError6 = undefined;

                        try {
                            for (var _iterator6 = lns[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                var ln = _step6.value;

                                if (ln.collidesWith(other)) {
                                    return true;
                                } //end if
                            } //end for
                        } catch (err) {
                            _didIteratorError6 = true;
                            _iteratorError6 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion6 && _iterator6["return"]) {
                                    _iterator6["return"]();
                                }
                            } finally {
                                if (_didIteratorError6) {
                                    throw _iteratorError6;
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