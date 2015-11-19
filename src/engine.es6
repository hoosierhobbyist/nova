//engine.js

import dummy from './dummy';
import Emitter from './emitter';
import {Point} from './geometry';

let __canvas;
let __frameRate = 25;
let __masterID = null;
let Engine = new Emitter();
let __masterUpdate = function(){
    Engine.clear();
    Engine.emit('update');
}//end __masterUpdate
let __isDown = new Int8Array(new ArrayBuffer(128));
let KEYS = {
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
};//end KEYS

let document = document ? document : dummy;
document.onkeyup = function(e){
    e.preventDefault();
    __isDown[e.keyCode] = 0;
}//end onkeyup
document.onkeydown = function(e){
    e.preventDefault();
    __isDown[e.keyCode] = 1;
}//end onkeydown
document.onreadystatechange = function(){
    if(this.readyState === 'interactive'){
        Engine.emit('init');
    }//end if
}//end onreadystatechange

Engine.once('init', function(){
    __canvas = document.querySelector('#nova canvas');
    if(__canvas == null){
        __canvas = document.createElement('canvas');
        document.body.appendChild(__canvas);
    }//end if
    __canvas.onmousemove = function(e){
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
    }//end onmousemove

    __canvas.width = __canvas.clientWidth;
    __canvas.height = __canvas.clientHeight;
    let context = __canvas.getContext('2d');
    context.translate(__canvas.width / 2, __canvas.height / 2);

    __canvas.onclick = function(){
        Engine.start();
        __canvas.onclick = void 0;
    };//end onclick

    this.emit('draw-title-screen', context);
});//end once('init')

if(document === dummy){
    Engine.emit('init');
}//end if

Object.defineProperties(Engine, {
    left: {
        enumerable: true,
        get: function(){
            return -__canvas.width / 2;
        }//end get
    },//end left
    right: {
        enumerable: true,
        get: function(){
            return __canvas.width / 2;
        }//end get
    },//end right
    top: {
        enumerable: true,
        get: function(){
            return __canvas.height / 2;
        }//end get
    },//end top
    bottom: {
        enumerable: true,
        get: function(){
            return -__canvas.height / 2;
        }//end get
    },//end bottom
    mouseX: {
        enumerable: true,
        get: function(){
            return __canvas.mouseX - __canvas.offsetLeft - __canvas.width / 2;
        }//end get
    },//end mouseX
    mouseY: {
        enumerable: true,
        get: function(){
            return -__canvas.mouseY + __canvas.offsetTop + __canvas.height / 2;
        }//end get
    },//end mouseY
    mouse: {
        enumerable: true,
        get: function(){
            return new Point(this.mouseX, this.mouseY);
        }//end get
    },//end mouse
    isDown: {
        enumerable: true,
        value: function(key){
            return !!__isDown[KEYS[key]];
        }//end value
    },//end isDown
    canvas: {
        enumerable: true,
        get: function(){
            return __canvas;
        }//end get
    },//end canvas
    frameRate: {
        enumerable: true,
        get: function(){
            return __frameRate;
        },//end get
        set: function(value){
            if(value = parseFloat(value)){
                if(value > 0){
                    __frameRate = value;
                }//end if
            }//end if
        }//end set
    },//end frameRate
    isRunning: {
        enumerable: true,
        get: function(){
            return __masterID != null;
        }//end value
    },//end isRunning
    start: {
        enumerable: true,
        value: function(){
            if(!this.isRunning){
                this.emit('start');
                __masterID = setInterval(__masterUpdate, 1000 / __frameRate);
            }//end if
        }//end value
    },//end start
    stop: {
        enumerable: true,
        value: function(){
            if(this.isRunning){
                this.emit('stop');
                clearInterval(__masterID);
                __masterID = null;
            }//end if
        }//end value
    },//end stop
    clear: {
        enumerable: true,
        value: function(){
            let context = __canvas.getContext('2d');
            context.clearRect(this.left, this.bottom, __canvas.width, __canvas.height);
        }//end value
    }//end clear
});//end defineProperties

export default Engine;
