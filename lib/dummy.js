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