//aniSprite.js

import Timer from './timer';
import Sprite from './sprite';
import Engine from './engine';

let __unique = 0;
let __defaults = {
    frameRate: 20,
    cellWidth: 32,
    cellHeight: 32,
    orientation: 'horizontal'
};//end __defaults
Object.seal(__defaults);
let __cycleDefaults = {
    index: 0,
    start: 0,
    length: 8,
};//end __cycleDefaults
Object.seal(__cycleDefaults);
let __context = Engine.canvas.getContext('2d');

class AniCycle{

    constructor(config = {}){
        for(let key of Object.keys(__cycleDefaults)){
            if(config[key] == null){
                config[key] = __cycleDefaults[key];
            }//end if
        }//end for

        Object.defineProperties(this, {
            index: {
                value: config['index']
            },//end index
            start: {
                value: config['start']
            },//end start
            name: {
                value: config['name'] || `CYCLE-${__unique++}`
            },//end name
            end: {
                value: config['end'] || config['start'] + config['length'] - 1
            },//end end
            frame: {
                writable: true,
                value: config['frame'] || config['start']
            }//end active
        });//end defineProperties
    }//end constructor

}//end class AniCycle

export default class AniSprite extends Sprite{

    constructor(config = {}){
        __unique = 0;
        let __active;
        let __cycles = new Set();

        for(let key of Object.keys(__defaults)){
            if(config[key] == null){
                config[key] = __defaults[key];
            }//end if
        }//end for

        if(config['cycles'] != null){
            let __ref;

            if(config['cycles'] instanceof Array){
                for(let cycle of config['cycles']){
                    __cycles.add(__ref = new AniCycle(cycle));

                    if(config['active'] === ref.name){
                        __active = ref;
                    }//end if
                }//end for
            }//end if

            else{
                for(let cycle of Object.keys(config['cycles'])){
                    if(config['cycles'][cycle]['name'] == null){
                        config['cycles'][cycle]['name'] = cycle;
                    }//end if

                    __cycles.add(__ref = new AniCycle(config['cycles'][cycle]));

                    if(config['active'] === __ref.name){
                        __active = __ref;
                    }//end if
                }//end for
            }//end else
        }//end if

        else{
            config['cellWidth'] = config['imgWidth'];
            config['cellHeight'] = config['imgHeight'];
            __cycles.add(new AniCycle({
                index: 0,
                start: 0,
                length: 1
            }));//end new AniCycle
        }//end else

        if(__active == null){
            __active = __cycles.values().next().value;
        }//end if

        super(config);

        Object.defineProperties(this, {
            timer: {
                enumerable: true,
                value: new Timer(true)
            },//end timer
            cellWidth: {
                enumerable: true,
                value: config['cellWidth']
            },//end cellWidth
            cellHeight: {
                enumerable: true,
                value: config['cellHeight']
            },//end cellHeight
            orientation: {
                enumerable: true,
                value: config['orientation']
            },//end orientation
            cycles: {
                enumerable: true,
                value: Array.from(__cycles.values()).map(function(cycle){return cycle.name;})
            },//end cycles
            frameRate: {
                enumerable: true,
                get: function(){
                    return config['frameRate'];
                },//end get
                set: function(value){
                    if(!Number.isNaN(value = parseFloat(value))){
                        if(value > 0){
                            config['frameRate'] = value;
                        }//end if
                    }//end if
                }//end set
            },//end frameRate
            active: {
                enumerable: true,
                get: function(){
                    return __active;
                },//end get
                set: function(value){
                    __cycles.forEach(function(cycle){
                        if(value === cycle.name){
                            __active = cycle;
                        }//end if
                    });//end forEach
                }//end set
            }//end active
        });//end defineProperties
    }//end constructor

    play(){
        this.emit('play');
        this.timer.start();
        return this;
    }//end ::play

    pause(){
        this.emit('pause');
        this.timer.pause();
        return this;
    }//end ::pause

    stop(){
        this.emit('stop');
        this.timer.stop();
        this.active.frame = this.active.start;
        return this;
    }//end ::stop

    draw(){
        if(this.visible && !this.offScreen){
            __context.save();

            if(this.drawFunction){
                this.drawFunction.call(this, __context);
            }//end if

            if(this.imgSrc){
                this.emit('draw-below', __context);

                let sx = 0;
                let sy = 0;

                __context.translate(this.x, -this.y);
                __context.rotate(-this.tilt);
                __context.scale(this.scale, this.scale);

                if(this.orientation === 'horizontal'){
                    sx = this.active.frame;
                    sy = this.active.index;
                }//end if
                else if(this.orientation === 'vertical'){
                    sx = this.active.index;
                    sy = this.active.frame;
                }//end else if

                __context.drawImage(
                    this.img,
                    this.cellWidth * sx,
                    this.cellHeight * sy,
                    this.cellWidth,
                    this.cellHeight,
                    -this.cellWidth / 2,
                    -this.cellHeight / 2,
                    this.cellWidth,
                    this.cellHeight
                );//end drawImage

                this.emit('draw-above', __context);
            }//end if

            else{
                console.error('Unable to draw AniSprite');
            }//end else

            __context.restore();
        }//end if
    }//end ::draw

    update(){
        super.update();

        if(this.timer.elapsedTime >= 1000 / this.frameRate){
            if(this.active.frame < this.active.end){
                this.active.frame += 1;
            }//end if

            else{
                this.active.frame = this.active.start;
            }//end else

            this.timer.restart();
        }//end if
    }//end ::update

}//end class AniSprite

Object.defineProperties(AniSprite, {
    defaults: {
        enumerable: true,
        value: __defaults
    },//end defaults
    cycleDefaults: {
        enumerable: true,
        value: __cycleDefaults
    }//end cycleDefaults
});//end defineProperties
