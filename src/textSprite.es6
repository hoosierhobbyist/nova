//textSprite.js

import Sprite from './sprite';
import Engine from './engine';

let __defaults = {
    font: {
        size: 12,
        alpha: 1,
        color: 'white',
        align: 'left',
        name: 'sans-serif'
    },//end font
    border: {
        size: 5,
        alpha: 1,
        visible: true,
        color: 'white'
    },//end border
    margins: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5
    },//end margins
    background: {
        alpha: 1,
        visible: true,
        color: 'black'
    }//end background
};//end defaults
Object.seal(__defaults);
Object.seal(__defaults.font);
Object.seal(__defaults.border);
Object.seal(__defaults.margins);
Object.seal(__defaults.background);
let __context = Engine.canvas.getContext('2d');

export default class TextSprite extends Sprite{

    constructor(config = {}){
        if(config['text'] == null){
            config['text'] = 'NOVA!';
        }//end if

        for(let key of Object.keys(__defaults)){
            if(config[key] == null){
                config[key] = {};
            }//end if

            for(let k in __defaults[key]){
                if(config[key][k] == null){
                    config[key][k] = __defaults[key][k];
                }//end if
            }//end for
        }//end for
        Object.seal(config['font']);
        Object.seal(config['border']);
        Object.seal(config['margins']);
        Object.seal(config['background']);

        delete config['radius'];
        delete config['points'];
        let __text = config['text'].split('\n');

        config['imgWidth'] = 0;
        config['imgHeight'] = 1.5 * __text.length * config['font']['size'];

        __context.save();
        __context.font = `${config['font']['size']}px ${config['font']['name']}`;
        for(let line of __text){
            let width = __context.measureText(line);
            if(config['imgWidth'] < width){
                config['imgWidth'] = width;
            }//end if
        }//end for
        __context.restore();

        config['imgWidth'] += config['margins']['left'] + config['margins']['right'];
        config['imgHeight'] += config['margins']['top'] + config['margins']['bottom'];
        if(config['border']['visible']){
            config['imgWidth'] += 2 * config['border']['size'];
            config['imgHeight'] += 2 * config['border']['size'];
        }//end if

        super(config);

        Object.defineProperties(this, {
            boxWidth: {
                value: 0,
                writable: true
            },//end boxWidth
            boxHeight: {
                value: 0,
                writable: true
            },//end boxHeight
            text: {
                enumerable: true,
                get: function(){
                    return config['text'];
                },//end get
                set: function(value){
                    config['text'] = value.toString();
                }//end set
            },//end text
            font: {
                enumerable: true,
                get: function(){
                    return config['font'];
                }//end get
            },//end font
            border: {
                enumerable: true,
                get: function(){
                    return config['border'];
                }//end get
            },//end border
            margins: {
                enumerable: true,
                get: function(){
                    return config['margins'];
                }//end get
            },//end margins
            background: {
                enumerable: true,
                get: function(){
                    return config['background'];
                }//end get
            }//end background
        });//end defineProperties
    }//end constructor

    draw(){
        if(this.visible && !this.offScreen){
            let xOffset = 0;
            let yOffset = 0;
            let text = this.text.split('\n');

            __context.save();
            __context.translate(this.x, -this.y);
            __context.rotate(-this.tilt);
            __context.scale(this.scale, this.scale);

            yOffset = (text.length - 1) * this.font.size * .75;
            if(this.font.align.toLowerCase() === 'left'){
                xOffset = -this.boxWidth / 2 + this.margins.left;
                if(this.border.visible){
                    xOffset += this.border.size;
                }//end if
            }//end if
            if(this.font.align.toLowerCase() === 'right'){
                xOffset = this.boxWidth / 2 - this.margins.right;
                if(this.border.visible){
                    xOffset -= this.border.size;
                }//end if
            }//end if

            if(this.background.visible){
                __context.fillStyle = this.background.color;
                __context.globalAlpha = this.background.alpha;
                __context.fillRect(-this.boxWidth/2, -this.boxHeight/2, this.boxWidth, this.boxHeight);
            }//end if

            if(this.border.visible){
                __context.lineWidth = this.border.size;
                __context.strokeStyle = this.border.color;
                __context.globalAlpha = this.border.alpha;
                __context.strokeRect(-this.boxWidth/2, -this.boxHeight/2, this.boxWidth, this.boxHeight);
            }//end if

            __context.textBaseLine = 'middle';
            __context.textAlign = this.font.align;
            __context.fillStyle = this.font.color;
            __context.globalAlpha = this.font.alpha;
            for(let i = 0; i < text.length; ++i){
                __context.fillText(text[i], xOffset, this.font.size*1.5*i - yOffset);
            }//end for

            __context.restore();
        }//end if
    }//end ::draw

    update(){
        super.update();
        let oldWidth = this.boxWidth;
        let oldHeight = this.boxHeight;
        let text = this.text.split('\n');

        this.boxWidth = 0;
        this.boxHeight = 1.5 * this.font.size * text.length;

        __context.save();
        __context.font = `${this.font.size}px ${this.font.name}`;
        for(let line of text){
            let width = __context.measureText(line);
            if(this.boxWidth < width){
                this.boxWidth = width;
            }//end if
        }//end for
        __context.restore();

        this.boxWidth += this.margins.left + this.margins.right;
        this.boxHeight += this.margins.top + this.margins.bottom;
        if(this.border.visible){
            this.boxWidth += 2 * this.border.size;
            this.boxHeight += 2 * this.border.size;
        }//end if

        if(oldWidth !== this.boxWidth || oldHeight !== this.boxHeight){
            let tilt = this.tilt;
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
        }//end if
    }//end ::update

}//end class TextSprite

Object.defineProperties(TextSprite, {
    defaults: {
        enumerable: true,
        value: __defaults
    }//end defaults
});//end defineProperties
