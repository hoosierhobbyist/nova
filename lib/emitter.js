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