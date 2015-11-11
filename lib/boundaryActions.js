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
            this.left = _engine2['default'].bounds.right;
        }, //end WRAP
        STOP: function STOP() {
            this.left = _engine2['default'].bounds.left + 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dx += this.k * (_engine2['default'].bounds.left - this.left);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.left = _engine2['default'].bounds.left + 1;
            this.dx *= -1;
        } //end BOUNCE
    }, //end left
    right: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.right = _engine2['default'].bounds.left;
        }, //end WRAP
        STOP: function STOP() {
            this.right = _engine2['default'].bounds.right - 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dx += this.k * (_engine2['default'].bounds.right - this.right);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.right = _engine2['default'].bounds.right - 1;
            this.dx *= -1;
        } //end BOUNCE
    }, //end right
    top: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.top = _engine2['default'].bounds.bottom;
        }, //end WRAP
        STOP: function STOP() {
            this.top = _engine2['default'].bounds.top - 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dy += this.k * (_engine2['default'].bounds.top - this.top);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.top = _engine2['default'].bounds.top - 1;
            this.dy *= -1;
        } //end BOUNCE
    }, //end top
    bottom: {
        DIE: function DIE() {
            this.visible = false;
        }, //end DIE
        WRAP: function WRAP() {
            this.bottom = _engine2['default'].bounds.top;
        }, //end WRAP
        STOP: function STOP() {
            this.bottom = _engine2['default'].bounds.bottom + 1;
        }, //end STOP
        SPRING: function SPRING() {
            this.dy += this.k * (_engine2['default'].bounds.bottom - this.bottom);
        }, //end SPRING
        BOUNCE: function BOUNCE() {
            this.bottom = _engine2['default'].bounds.bottom + 1;
            this.dy *= -1;
        } //end BOUNCE
    } //end bottom
}; //end bndActions

exports['default'] = bndActions;
module.exports = exports['default'];