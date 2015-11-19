//sprite.js

import dummy from './dummy';
import Engine from './engine';
import Emitter from './emitter';
import bndActions from './boundaryActions';
import {Point, Circle, Polygon} from './geometry';
import {sq, sqrt, sin, cos, atan2, dist, PI} from './helpers';

let __all = new Set();
let __groups = new Map();
let __zLevels = new Map();
let __origin = new Point(0, 0);
let Image = Image || dummy.Image;
let __context = Engine.canvas.getContext('2d');
let __polar = [
    'dispMag', 'dispAngle',
    'velMag', 'velAngle',
    'accMag', 'accAngle'
];//end __polar
let __defaults = {
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
};//end __defaults
Object.seal(__defaults);

/*
TODO:
    ! CRITICAL: a whole lot of NaNs showing up in repl session
    x add `k` property to Sprite instances (spring constant)
    x deal with magnitudes and angles in config
    x figure out boundary actions (deep copy? look up /\)
    x need a context from a <canvas> tag
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
        - this would mean the config object needs to be vetted before use
    - Sprite prototype methods need to be aware of Mouse object
    - should there be draw events?
    x bndActions should be organized by side then action
    x Emitter should have an events() method that returns an Array
    x should Sprite#ctx be visible? (no)
    - drawing a non-image Sprite should have more options
    x should sprites update independantly? (yes, for now)
    - should scale be split between x and y?
    - collision routines should support bare Points and Shapes
        - how should this work for distanceTo and angleTo? (maybe use center point?)
*/
export default class Sprite extends Emitter{

    constructor(config = {}){
        super();
        let __edge;

        for(let key of Object.keys(__defaults)){
            if(config[key] == null){
                config[key] = __defaults[key];
            }//end if
        }//end for
        if(config['bndActions'] == null){
            config['bndActions'] = {
                left: config['bndAction'],
                right: config['bndAction'],
                top: config['bndAction'],
                bottom: config['bndAction']
            };//end config['bndActions']
        }//end if
        if(config['bndActions']['left'] == null){
            config['bndActions']['left'] = config['bndAction'];
        }//end if
        if(config['bndActions']['right'] == null){
            config['bndActions']['right'] = config['bndAction'];
        }//end if
        if(config['bndActions']['top'] == null){
            config['bndActions']['top'] = config['bndAction'];
        }//end if
        if(config['bndActions']['bottom'] == null){
            config['bndActions']['bottom'] = config['bndAction'];
        }//end if
        Object.seal(config['bndActions']);

        if(config['dispMag'] != null && config['dispAngle'] != null){
            config['x'] = config['dispMag'] * cos(config['dispAngle']);
            config['y'] = config['dispMag'] * sin(config['dispAngle']);
        }//end if
        if(config['velMag'] != null && config['velAngle'] != null){
            config['dx'] = config['velMag'] * cos(config['velAngle']);
            config['dy'] = config['velMag'] * sin(config['velAngle']);
        }//end if
        if(config['accMag'] != null && config['accAngle'] != null){
            config['ddx'] = config['accMag'] * cos(config['accAngle']);
            config['ddy'] = config['accMag'] * sin(config['accAngle']);
        }//end if

        if(config['radius'] != null){
            __edge = new Circle(config['radius'], this);
        }//end if
        else if(config['points'] != null){
            let pts = [];
            for(let i = 0; i < config['points'].length; ++i){
                pts.push(new Point(config['points'][i]['x'], config['points'][i]['y'], this));
            }//end for

            __edge = new Polygon(...pts);
        }//end else if
        else{
            let a = atan2(config['imgHeight'] / 2, config['imgWidth'] / 2);
            let m = sqrt(sq(config['imgHeight'] / 2) + sq(config['imgWidth'] / 2));
            let pts = [
                new Point(m * cos(config.tilt + a), m * sin(config.tilt + a), this),
                new Point(m * cos(config.tilt - a), m * sin(config.tilt - a), this),
                new Point(m * cos(config.tilt + PI + a), m * sin(config.tilt + PI + a), this),
                new Point(m * cos(config.tilt + PI - a), m * sin(config.tilt + PI - a), this)
            ];//end pts

            __edge = new Polygon(...pts);
        }//end else

        Object.defineProperties(this, {
            k: {
                enumerable: true,
                get: function(){
                    return config['k'];
                },//end get
                set: function(value){
                    value = parseFloat(value);
                    if(value > 0){
                        config['k'] = value;
                    }//end if
                }//end set
            },//end k
            x: {
                enumerable: true,
                get: function(){
                    return config['x'];
                },//end get
                set: function(value){
                    config['x'] = parseFloat(value);
                }//end set
            },//end x
            dx: {
                enumerable: true,
                get: function(){
                    return config['dx'];
                },//end get
                set: function(value){
                    config['dx'] = parseFloat(value);
                }//end set
            },//end dx
            ddx: {
                enumerable: true,
                get: function(){
                    return config['ddx'];
                },//end get
                set: function(value){
                    config['ddx'] = parseFloat(value);
                }//end set
            },//end ddx
            y: {
                enumerable: true,
                get: function(){
                    return config['y'];
                },//end get
                set: function(value){
                    config['y'] = parseFloat(value);
                }//end set
            },//end y
            dy: {
                enumerable: true,
                get: function(){
                    return config['dy'];
                },//end get
                set: function(){
                    config['dy'] = parseFloat(value);
                }//end set
            },//end dy
            ddy: {
                enumerable: true,
                get: function(){
                    return config['ddy'];
                },//end get
                set: function(value){
                    config['ddy'] = parseFloat(value);
                }//end set
            },//end ddy
            tilt: {
                enumerable: true,
                get: function(){
                    return config['tilt'];
                },//end get
                set: function(value){
                    value = parseFloat(value);
                    if(this.shape === 'Polygon'){
                        for(let pt of __edge.pts){
                            pt.angle += value - config['tilt'];
                        }//end for
                    }//end if
                    config['tilt'] = value;
                }//end set
            },//end tilt
            dtilt: {
                enumerable: true,
                get: function(){
                    return config['dtilt'];
                },//end get
                set: function(value){
                    config['dtilt'] = parseFloat(value);
                }//end set
            },//end dtilt
            ddtilt: {
                enumerable: true,
                get: function(){
                    return config['ddtilt'];
                },//end get
                set: function(value){
                    config['ddtilt'] = parseFloat(value);
                }//end set
            },//end ddtilt
            dispMag: {
                enumerable: true,
                get: function(){
                    return dist(__origin, config);
                },//end get
                set: function(value){
                    let dispAngle = this.dispAngle;
                    config['x'] = value * cos(dispAngle);
                    config['y'] = value * sin(dispAngle);
                }//end set
            },//end dispMag
            dispAngle: {
                enumerable: true,
                get: function(){
                    return atan2(config['y'], config['x']);
                },//end get
                set: function(value){
                    let dispMag = this.dispMag;
                    config['x'] = dispMag * cos(value);
                    config['y'] = dispMag * sin(value);
                }//end set
            },//end dispAngle
            velMag: {
                enumerable: true,
                get: function(){
                    return sqrt(sq(config['dx']) + sq(config['dy']));
                },//end get
                set: function(value){
                    let velAngle = this.velAngle;
                    config['dx'] = value * cos(velAngle);
                    config['dy'] = value * sin(velAngle);
                }//end set
            },//end velMag
            velAngle: {
                enumerable: true,
                get: function(){
                    return atan2(config['dy'], config['dx']);
                },//end get
                set: function(value){
                    let velMag = this.velMag;
                    config['dx'] = velMag * cos(value);
                    config['dy'] = velMag * sin(value);
                }//end set
            },//end velAngle
            accMag: {
                enumerable: true,
                get: function(){
                    return sqrt(sq(config['ddx']) + sq(config['ddy']));
                },//end get
                set: function(value){
                    let accAngle = this.accAngle;
                    config['ddx'] = value * cos(accAngle);
                    config['ddy'] = value * sin(accAngle);
                }//end set
            },//end accMag
            accAngle: {
                enumerable: true,
                get: function(){
                    return atan2(config['ddy'], config['ddx']);
                },//end get
                set: function(value){
                    let accMag = this.accMag;
                    config['ddx'] = accMag * cos(value);
                    config['ddy'] = accMag * sin(value);
                }//end set
            },//end accAngle
            zLevel: {
                enumerable: true,
                get: function(){
                    return config['zLevel'];
                },//end get
                set: function(value){
                    if(config['zLevel'] !== value){
                        __zLevels.get(config['zLevel']).delete(this);

                        if(!__zLevels.has(value)){
                            __zLevels.set(value, new WeakSet());
                        }//end if

                        __zLevels.get(value).add(this);
                        config['zLevel'] = value;
                    }//end if
                }//end set
            },//end zLevel
            scale: {
                enumerable: true,
                get: function(){
                    return config['scale'];
                },//end get
                set: function(value){
                    value = parseFloat(value);
                    if(this.shape === 'Polygon'){
                        for(let pt of __edge.pts){
                            pt.dist *= value / config['scale'];
                        }//end for
                    }//end if
                    else{
                        __edge.r *= value / config['scale'];
                    }//end else
                    config['scale'] = value;
                }//end set
            },//end scale
            width: {
                enumerable: true,
                get: function(){
                    return __edge.domain[1] - __edge.domain[0];
                }//end get
            },//end width
            height: {
                enumerable: true,
                get: function(){
                    return __edge.range[1] - __edge.range[0];
                }//end get
            },//end height
            visible: {
                enumerable: true,
                get: function(){
                    return config['visible'];
                },//end get
                set: function(value){
                    config['visible'] = !!value;
                }//end set
            },//end visible
            img: {
                enumerable: true,
                value: new Image(config['imgWidth'], config['imgHeight'])
            },//end img
            imgSrc: {
                enumerable: true,
                get: function(){
                    return this.image.src;
                },//end get
                set: function(value){
                    this.img.src = value.toString();
                }//end set
            },//end imgFile
            imgWidth: {
                enumerable: true,
                get: function(){
                    return config['imgWidth'];
                },//end get
                set: function(value){
                    config['imgWidth'] = parseFloat(value);
                }//end set
            },//end imgWidth
            imgHeight: {
                enumerable: true,
                get: function(){
                    return config['imgHeight'];
                },//end get
                set: function(value){
                    config['imgHeight'] = parseFloat(value);
                }//end set
            },//end imgHeight
            edge: {
                enumerable: true,
                value: __edge
            },//end boundary
            shape: {
                enumerable: true,
                value: (__edge.constructor.name)
            },//end shape
            radius: {
                enumerable: true,
                get: function(){
                    return __edge.r;
                }//end get
            },//end radius
            left: {
                enumerable: true,
                get: function(){
                    return __edge.domain[0];
                },//end get
                set: function(value){
                    this.x += value - this.left;
                }//end set
            },//end left
            right: {
                enumerable: true,
                get: function(){
                    return __edge.domain[1];
                },//end get
                set: function(value){
                    this.x += value - this.right;
                }//end set
            },//end right
            top: {
                enumerable: true,
                get: function(){
                    return __edge.range[1];
                },//end get
                set: function(value){
                    this.y += value - this.top;
                }//end set
            },//end top
            bottom: {
                enumerable: true,
                get: function(){
                    return __edge.range[0];
                },//end get
                set: function(value){
                    this.y += value - this.bottom;
                }//end set
            },//end bottom
            bndAction: {
                enumerable: true,
                get: function(){
                    return config['bndAction'];
                },//end get
                set: function(value){
                    value = value.toString();
                    config['bndAction'] = value;
                    config['bndActions']['left'] = value;
                    config['bndActions']['right'] = value;
                    config['bndActions']['top'] = value;
                    config['bndActions']['bottom'] = value;
                }//end set
            },//end bndAction
            bndActions: {
                enumerable: true,
                get: function(){
                    return config['bndActions'];
                }//end get
            },//end bndActions
            updateID: {
                value: null
            },//end updateID
            isRunning: {
                enumerable: true,
                get: function(){
                    return this.updateID != null;
                }//end get
            }//end isRunning
        });//end defineProperties

        __all.add(this);
        this.imgSrc = config['imgSrc'];

        if(!__zLevels.has(config['zLevel'])){
            __zLevels.set(config['zLevel'], new WeakSet());
        }//end if
        __zLevels.get(config['zLevel']).add(this);

        Object.seal(config);
        if(Engine.isRunning){
            this.start();
        }//end if
    }//end constructor

    start(){
        if(!this.isRunning){
            this.updateID = setInterval(()=>{this.update();}, 1000 / Engine.frameRate);
        }//end if
    }//end ::start

    stop(){
        if(this.isRunning){
            clearInterval(this.updateID);
            this.updateID = null;
        }//end if
    }//end ::stop

    distanceTo(other){
        if(other instanceof Sprite){
            return dist(this.edge.center, other.edge.center);
        }//end if

        else if(other === 'mouse'){
            return dist(this.edge.center, Engine.mouse);
        }//end else if

        return NaN;
    }//end ::distanceTo

    angleTo(other){
        if(other instanceof Sprite){
            return atan2(other.y - this.y, other.x - this.x);
        }//end if

        else if(other === 'mouse'){
            return atan2(Engine.mouseY - this.y, Engine.mouseX - this.x);
        }//end else if

        return NaN;
    }//end ::angleTo

    collidesWith(other){
        if(this.visible){
            if(other instanceof Sprite){
                if(other.visible){
                    return this.edge.collidesWith(other.edge);
                }//end if
            }//end if

            else if(other === 'mouse'){
                return this.edge.collidesWith(Engine.mouse);
            }//end else if
        }//end if

        return this.edge.collidesWith(other);
    }//end ::collidesWith

    draw(){
        if(this.visible){
            __context.save();

            if(this.imgSrc){
                __context.translate(this.x, -this.y);
                __context.rotate(-this.tilt);
                __context.scale(this.scale, this.scale);
                __context.drawImage(
                    this.img,
                    -this.imgWidth / 2,
                    -this.imgHeight / 2,
                    this.imgWidth,
                    this.imgHeight
                );//end drawImage
            }//end if

            else{
                __context.lineWidth = 3;
                __context.strokeStyle = 'white';

                if(this.shape === 'Circle'){
                    __context.beginPath();
                    __context.arc(
                        this.x,
                        -this.y,
                        this.radius,
                        0,
                        2 * PI
                    );//end arc
                    __context.stroke();
                }//end if

                else if(this.shape === 'Polygon'){
                    let pts = this.edge.pts;

                    __context.beginPath();
                    __context.moveTo(pts[0].x, -pts[0].y);
                    for(let i = 1; i < pts.length; ++i){
                        __context.lineTo(pts[i].x, -pts[i].y);
                    }//end for
                    __context.closePath();
                    __context.stroke();
                }//end else if

                else{
                    console.error('Unable to draw Sprite');
                }//end else
            }//end else

            __context.restore();
        }//end if
    }//end ::draw

    update(){
        this.emit('update');
        this.dx += this.ddx / Engine.frameRate;
        this.x += this.dx / Engine.frameRate;
        this.dy += this.ddy / Engine.frameRate;
        this.y += this.dy / Engine.frameRate;
        this.dtilt += this.ddtilt / Engine.frameRate;
        this.tilt += this.dtilt / Engine.frameRate;

        if(this.right < Engine.left){
            this.emit('off-left');
            if(this.bndActions['left'] === 'DIE'){
                bndActions.left.DIE.call(this);
            }//end if
            else if(this.bndActions['left'] === 'WRAP'){
                bndActions.left.WRAP.call(this);
            }//end else if
        }//end if
        if(this.left > Engine.right){
            this.emit('off-right');
            if(this.bndActions['right'] === 'DIE'){
                bndActions.right.DIE.call(this);
            }//end if
            else if(this.bndActions['right'] === 'WRAP'){
                bndActions.right.WRAP.call(this);
            }//end else if
        }//end if
        if(this.bottom > Engine.top){
            this.emit('off-top');
            if(this.bndActions['top'] === 'DIE'){
                bndActions.top.DIE.call(this);
            }//end if
            else if(this.bndActions['top'] === 'WRAP'){
                bndActions.top.WRAP.call(this);
            }//end else if
        }//end if
        if(this.top < Engine.bottom){
            this.emit('off-bottom');
            if(this.bndActions['bottom'] === 'DIE'){
                bndActions.bottom.DIE.call(this);
            }//end if
            else if(this.bndActions['bottom'] === 'WRAP'){
                bndActions.bottom.WRAP.call(this);
            }//end else if
        }//end if

        if(this.left <= Engine.left){
            this.emit('hit-left');
            if(this.bndActions['left'] === 'STOP'){
                bndActions.left.STOP.call(this);
            }//end if
            else if(this.bndActions['left'] === 'SPRING'){
                bndActions.left.SPRING.call(this);
            }//end else if
            else if(this.bndActions['left'] === 'BOUNCE'){
                bndActions.left.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.right >= Engine.right){
            this.emit('hit-right');
            if(this.bndActions['right'] === 'STOP'){
                bndActions.right.STOP.call(this);
            }//end if
            else if(this.bndActions['right'] === 'SPRING'){
                bndActions.right.SPRING.call(this);
            }//end else if
            else if(this.bndActions['right'] === 'BOUNCE'){
                bndActions.right.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.top >= Engine.top){
            this.emit('hit-top');
            if(this.bndActions['top'] === 'STOP'){
                bndActions.top.STOP.call(this);
            }//end if
            else if(this.bndActions['top'] === 'SPRING'){
                bndActions.top.SPRING.call(this);
            }//end else if
            else if(this.bndActions['top'] === 'BOUNCE'){
                bndActions.top.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.bottom <= Engine.bottom){
            this.emit('hit-bottom');
            if(this.bndActions['bottom'] === 'STOP'){
                bndActions.bottom.STOP.call(this);
            }//end if
            else if(this.bndActions['bottom'] === 'SPRING'){
                bndActions.bottom.SPRING.call(this);
            }//end else if
            else if(this.bndActions['bottom'] === 'BOUNCE'){
                bndActions.bottom.BOUNCE.call(this);
            }//end else if
        }//end if

        return this;
    }//end ::update

}//end class Sprite

Object.defineProperties(Sprite, {
    number: {
        enumerable: true,
        get: function(){
            return __all.size;
        }//end get
    },//end number
    defaults: {
        enumerable: true,
        value: __defaults
    },//end defaults
    delete: {
        enumerable: true,
        value: function(sprite){
            __all.delete(sprite);
        }//end value
    },//end delete
    deleteAll: {
        enumerable: true,
        value: function(){
            __all.clear();
        }//end value
    },//end deleteAll
    start: {
        value: function(){
            __all.forEach(function(sprite){sprite.start();});
        }//end value
    },//end start
    stop: {
        value: function(){
            __all.forEach(function(sprite){sprite.stop();});
        }//end value
    },//end stop
    draw: {
        value: function(){
            for(let key of Array.from(__zLevels.keys()).sort()){
                __zLevels.get(key).forEach(function(sprite){sprite.draw();});
            }//end for
        }//end value
    }//end draw
});//end defineProperties

Engine.on('start', Sprite.start);
Engine.on('stop', Sprite.stop);
Engine.on('update', Sprite.draw);
