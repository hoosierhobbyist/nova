//boundaryActions.js

import Engine from './engine'

let bndActions = {
    left: {
        DIE: function(){
            this.visible = false;
        },//end DIE
        WRAP: function(){
            this.left = Engine.right;
        },//end WRAP
        STOP: function(){
            this.left = Engine.left + 1;
        },//end STOP
        SPRING: function(){
            this.dx += this.k * (Engine.left - this.left);
        },//end SPRING
        BOUNCE: function(){
            this.left = Engine.left + 1;
            this.dx *= -1;
        }//end BOUNCE
    },//end left
    right: {
        DIE: function(){
            this.visible = false;
        },//end DIE
        WRAP: function(){
            this.right = Engine.left;
        },//end WRAP
        STOP: function(){
            this.right = Engine.right - 1;
        },//end STOP
        SPRING: function(){
            this.dx += this.k * (Engine.right - this.right);
        },//end SPRING
        BOUNCE: function(){
            this.right = Engine.right - 1;
            this.dx *= -1;
        }//end BOUNCE
    },//end right
    top: {
        DIE: function(){
            this.visible = false;
        },//end DIE
        WRAP: function(){
            this.top = Engine.bottom;
        },//end WRAP
        STOP: function(){
            this.top = Engine.top - 1;
        },//end STOP
        SPRING: function(){
            this.dy += this.k * (Engine.top - this.top);
        },//end SPRING
        BOUNCE: function(){
            this.top = Engine.top - 1;
            this.dy *= -1;
        }//end BOUNCE
    },//end top
    bottom: {
        DIE: function(){
            this.visible = false;
        },//end DIE
        WRAP: function(){
            this.bottom = Engine.top;
        },//end WRAP
        STOP: function(){
            this.bottom = Engine.bottom + 1;
        },//end STOP
        SPRING: function(){
            this.dy += this.k * (Engine.bottom - this.bottom);
        },//end SPRING
        BOUNCE: function(){
            this.bottom = Engine.bottom + 1;
            this.dy *= -1;
        }//end BOUNCE
    }//end bottom
};//end bndActions

export default bndActions;
