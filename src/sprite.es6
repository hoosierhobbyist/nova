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
//let Image = Image || dummy.Image;
let DIE = Symbol('DIE');
let WRAP = Symbol('WRAP');
let STOP = Symbol('STOP');
let NONE = Symbol('NONE');
let SPRING = Symbol('SPRING');
let BOUNCE = Symbol('BOUNCE');
let __polar = [
    'dispMag', 'dispAngle',
    'velMag', 'velAngle',
    'accMag', 'accAngle'
];//end __polar
let __defaults = {
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
};//end __defaults
Object.seal(__defaults);

export default class Sprite extends Emitter{

    constructor(config = {}){
        super();
        let __edge;
        let __image = new Image();

        for(let key of Object.keys(__defaults)){
            if(config[key] == null){
                config[key] = __defaults[key];
            }//end if
        }//end for
        __image.src = config['imgSrc'];
        __image.width = config['imgWidth'];
        __image.height = config['imgHeight'];

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
        else if(config['pts'] != null){
            let pts = config['pts'].map(function(pt){
                return new Point(pt.x, pt.y, this);
            }, this);

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

        if(config['group'] != null){
            if(!__groups.has(config['group'])){
                __groups.set(config['group'], new Set());
            }//end if
            __groups.get(config['group']).add(this);
        }//end if
        if(config['groups'] != null){
            for(let group of config['groups']){
                if(!__groups.has(group)){
                    __groups.set(group, new Set());
                }//end if
                __groups.get(group).add(this);
            }//end for
        }//end if

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
                set: function(value){
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
                            __zLevels.set(value, new Set());
                        }//end if

                        __zLevels.get(value).add(this);
                        config['zLevel'] = value;
                    }//end if
                }//end set
            },//end zLevel
            groups: {
                enumerable: true,
                get: function(){
                    let grps = [];

                    __groups.forEach(function(set, key){
                        if(set.has(this)){
                            grps.push(key);
                        }//end if
                    });//end forEach

                    return grps;
                }//end get
            },//end groups
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
                value: __image
            },//end img
            imgSrc: {
                enumerable: true,
                get: function(){
                    return __image.src
                },//end get
                set: function(value){
                    __image.src = value.toString();
                }//end set
            },//end imgFile
            imgWidth: {
                enumerable: true,
                get: function(){
                    return __image.width;
                },//end get
                set: function(value){
                    __image.width = parseFloat(value);
                }//end set
            },//end imgWidth
            imgHeight: {
                enumerable: true,
                get: function(){
                    return __image.height;
                },//end get
                set: function(value){
                    __image.height = parseFloat(value);
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
            drawFunction: {
                enumerable: true,
                get: function(){
                    return config['drawFunction'];
                },//end get
                set: function(value){
                    if(value === null || typeof(value) === 'function'){
                        config['drawFunction'] = value;
                    }//end if
                }//end set
            },//end drawFunction
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
            offScreen: {
                enumerable: true,
                get: function(){
                    return this.bottom > Engine.top ||
                           this.top < Engine.bottom ||
                           this.left > Engine.right ||
                           this.right < Engine.left;
                },//end get
            },//end offScreen
            bndAction: {
                enumerable: true,
                get: function(){
                    return config['bndAction'];
                },//end get
                set: function(value){
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
            }//end bndActions
        });//end defineProperties

        __all.add(this);
        if(!__zLevels.has(config['zLevel'])){
            __zLevels.set(config['zLevel'], new Set());
        }//end if
        __zLevels.get(config['zLevel']).add(this);

        Object.seal(config);
    }//end constructor

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

            else{
                return this.edge.collidesWith(other);
            }//end else
        }//end if

        return false;
    }//end ::collidesWith

    draw(){
        if(this.visible && !this.offScreen){
            Engine.ctx.save();
            Engine.ctx.translate(this.x, -this.y);
            Engine.ctx.rotate(-this.tilt);
            Engine.ctx.scale(this.scale, this.scale);

            if(this.drawFunction){
                this.drawFunction.call(this, Engine.ctx);
            }//end if

            else if(!(this.imgSrc === document.head.baseURI)){
                this.emit('draw-below', Engine.ctx);

                Engine.ctx.drawImage(
                    this.img,
                    -this.imgWidth / 2,
                    -this.imgHeight / 2,
                    this.imgWidth,
                    this.imgHeight
                );//end drawImage

                this.emit('draw-above', Engine.ctx);
            }//end if

            else{
                Engine.ctx.lineWidth = 3;
                Engine.ctx.strokeStyle = 'white';

                if(this.shape === 'Circle'){
                    Engine.ctx.beginPath();
                    Engine.ctx.arc(
                        0,
                        0,
                        this.radius,
                        0,
                        2 * PI
                    );//end arc
                    Engine.ctx.stroke();
                }//end if

                else if(this.shape === 'Polygon'){
                    let pts = this.edge.pts;

                    Engine.ctx.beginPath();
                    Engine.ctx.moveTo(pts[0].rel_x, -pts[0].rel_y);
                    for(let i = 1; i < pts.length; ++i){
                        Engine.ctx.lineTo(pts[i].rel_x, -pts[i].rel_y);
                    }//end for
                    Engine.ctx.closePath();
                    Engine.ctx.stroke();
                }//end else if

                else{
                    console.error('Unable to draw Sprite');
                }//end else
            }//end else

            Engine.ctx.restore();
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
            if(this.bndActions['left'] === DIE){
                bndActions.left.DIE.call(this);
            }//end if
            else if(this.bndActions['left'] === WRAP){
                bndActions.left.WRAP.call(this);
            }//end else if
        }//end if
        if(this.left > Engine.right){
            this.emit('off-right');
            if(this.bndActions['right'] === DIE){
                bndActions.right.DIE.call(this);
            }//end if
            else if(this.bndActions['right'] === WRAP){
                bndActions.right.WRAP.call(this);
            }//end else if
        }//end if
        if(this.bottom > Engine.top){
            this.emit('off-top');
            if(this.bndActions['top'] === DIE){
                bndActions.top.DIE.call(this);
            }//end if
            else if(this.bndActions['top'] === WRAP){
                bndActions.top.WRAP.call(this);
            }//end else if
        }//end if
        if(this.top < Engine.bottom){
            this.emit('off-bottom');
            if(this.bndActions['bottom'] === DIE){
                bndActions.bottom.DIE.call(this);
            }//end if
            else if(this.bndActions['bottom'] === WRAP){
                bndActions.bottom.WRAP.call(this);
            }//end else if
        }//end if

        if(this.left <= Engine.left){
            this.emit('hit-left');
            if(this.bndActions['left'] === STOP){
                bndActions.left.STOP.call(this);
            }//end if
            else if(this.bndActions['left'] === SPRING){
                bndActions.left.SPRING.call(this);
            }//end else if
            else if(this.bndActions['left'] === BOUNCE){
                bndActions.left.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.right >= Engine.right){
            this.emit('hit-right');
            if(this.bndActions['right'] === STOP){
                bndActions.right.STOP.call(this);
            }//end if
            else if(this.bndActions['right'] === SPRING){
                bndActions.right.SPRING.call(this);
            }//end else if
            else if(this.bndActions['right'] === BOUNCE){
                bndActions.right.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.top >= Engine.top){
            this.emit('hit-top');
            if(this.bndActions['top'] === STOP){
                bndActions.top.STOP.call(this);
            }//end if
            else if(this.bndActions['top'] === SPRING){
                bndActions.top.SPRING.call(this);
            }//end else if
            else if(this.bndActions['top'] === BOUNCE){
                bndActions.top.BOUNCE.call(this);
            }//end else if
        }//end if
        if(this.bottom <= Engine.bottom){
            this.emit('hit-bottom');
            if(this.bndActions['bottom'] === STOP){
                bndActions.bottom.STOP.call(this);
            }//end if
            else if(this.bndActions['bottom'] === SPRING){
                bndActions.bottom.SPRING.call(this);
            }//end else if
            else if(this.bndActions['bottom'] === BOUNCE){
                bndActions.bottom.BOUNCE.call(this);
            }//end else if
        }//end if
    }//end ::update

}//end class Sprite

Object.defineProperties(Sprite, {
    DIE: {
        value: DIE,
        enumerable: true
    },//end DIE
    WRAP: {
        value: WRAP,
        enumerable: true
    },//end WRAP
    STOP: {
        value: STOP,
        enumerable: true
    },//end STOP
    NONE: {
        value: NONE,
        enumerable: true
    },//end NONE
    SPRING: {
        value: SPRING,
        enumerable: true
    },//end SPRING
    BOUNCE: {
        value: BOUNCE,
        enumerable: true
    },//end BOUNCE
    number: {
        enumerable: true,
        get: function(){
            return __all.size;
        }//end get
    },//end number
    zLevels: {
        enumerable: true,
        get: function(){
            return __zLevels;
        }//end get
    },//end zLevels
    groups: {
        enumerable: true,
        get: function(){
            return __groups;
        }//end get
    },//end groups
    defaults: {
        enumerable: true,
        value: __defaults
    },//end defaults
    delete: {
        enumerable: true,
        value: function(sprite){
            __all.delete(sprite);
            __zLevels.get(sprite.zLevel).delete(sprite);
            __groups.forEach(function(group){
                if(group.has(sprite)){
                    group.delete(sprite);
                }//end if
            });//end forEach
        }//end value
    },//end delete
    deleteAll: {
        enumerable: true,
        value: function(){
            __all.clear();
            __groups.clear();
            __zLevels.clear();
        }//end value
    },//end deleteAll
    draw: {
        value: function(){
            for(let key of Array.from(__zLevels.keys()).sort()){
                __zLevels.get(key).forEach(function(sprite){sprite.draw();});
            }//end for
        }//end value
    },//end draw
    update: {
        value: function(){
            __all.forEach(function(sprite){sprite.update();})
        }//end value
    },//end update
    addToGroup: {
        enumerable: true,
        value: function(sprite, group){
            if(sprite instanceof Sprite){
                if(!__groups.has(group)){
                    __groups.set(group, new Set());
                }//end if
                __groups.get(group).add(sprite);
            }//end if
        }//end value
    },//end addToGroup
    removeFromGroup: {
        enumerable: true,
        value: function(sprite, group){
            if(__groups.has(group)){
                __groups.get(group).delete(sprite);
            }//end if
        }//end value
    },//end removeFromGroup
    forEach: {
        enumerable: true,
        value: function(group, fn){
            if(typeof(group) === 'function'){
                fn = group;
                __all.forEach(fn);
            }//end if

            else{
                if(__groups.has(group)){
                    __groups.get(group).forEach(fn);
                }//end if
            }//end else
        }//end value
    }//end forEach
});//end defineProperties

Engine.on('update', Sprite.draw);
Engine.on('update', Sprite.update);
