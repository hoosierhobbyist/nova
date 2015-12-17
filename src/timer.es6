//timer.js

export default class Timer{

    constructor(startNow = true){
        Object.defineProperties(this, {
            cachedTime: {
                value: 0,
                writable: true
            },//end cachedTime
            startTime: {
                writable: true,
                value: startNow ? Date.now() : null
            },//end startTime
            isRunning: {
                enumerable: true,
                get: function(){
                    return this.startTime != null;
                }//end get
            },//end isRunning
            elapsedTime: {
                enumerable: true,
                get: function(){
                    if(!this.isRunning){
                        return this.cachedTime;
                    }//end if

                    return this.cachedTime + Date.now() - this.startTime;
                }//end get
            },//end time
        });//end defineProperties
    }//end constructor

    start(){
        if(!this.isRunning){
            this.startTime = Date.now();
        }//end if
    }//end ::start

    stop(){
        this.cachedTime = 0;
        this.startTime = null;
    }//end ::stop

    pause(){
        if(this.isRunning){
            this.cachedTime += Date.now() - this.startTime;
            this.startTime = null;
        }//end if
    }//end ::pause

    restart(){
        this.cachedTime = 0;
        this.startTime = Date.now();
    }//end ::restart

}//end class Timer
