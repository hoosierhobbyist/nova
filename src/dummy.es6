//dummy.js

let doNothing = function(){};
let __2Dcontext = {
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
    restore: doNothing
};//end __2Dcontext
let __canvasElement = {
    width: 300,
    height: 150,
    clientWidth: 300,
    clientHeight: 150,
    offsetLeft: 0,
    offsetTop: 0,
    getContext: function(arg){
        if(arg === '2d'){
            return __2Dcontext;
        }//end if
    }//end getContext
};//end __canvasElement
let dummy = {
    Image: function(){},
    querySelector: function(){
        return null;
    },//end querySelector
    createElement: function(arg){
        if(arg === 'canvas'){
            return __canvasElement;
        }//end if
    },//end createElement
    body: {
        appendChild: doNothing
    }//end body
};//end dummy

export default dummy;
