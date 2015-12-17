//emitter.js

let prvt_once = new WeakMap();
let prvt_opts = new WeakMap();
let prvt_evnts = new WeakMap();

export default class Emitter{

    constructor(maxListeners = Emitter.defaultMaxListeners){
        prvt_once.set(this, Object.create(null));
        prvt_opts.set(this, Object.create(null));
        prvt_evnts.set(this, Object.create(null));

        Object.defineProperty(this, 'maxListeners', {
            enumerable: true,
            get: function(){
                return maxListeners;
            },//end get maxListeners
            set: function(value){
                let evnts = prvt_evnts.get(this);

                if(value < 0){
                    throw new RangeError("Cannot set maxListeners less than zero");
                }//end if
                for(let evnt of Object.keys(evnts)){
                    if(evnts[evnt].length > value){
                        throw new RangeError("Cannot truncate existing listeners");
                    }//end if
                }//end for

                maxListeners = value;
            }//end set maxListeners
        });//end defineProperty
    }//end constructor

    events(){
        return Object.keys(prvt_evnts.get(this));
    }//end events

    options(event, listener){
        let opts = prvt_opts.get(this);

        if(listener != null){
            let evnts = prvt_evnts.get(this);

            if(evnts[event] != null){
                let index = evnts[event].indexOf(listener);

                if(index !== -1){
                    return opts[event][index];
                }//end if
            }//end if

            return {};
        }//end if

        if(opts[event] != null){
            return opts[event].slice(0);
        }//end if

        return [];
    }//end ::options

    listeners(event, options){
        let evnts = prvt_evnts.get(this);

        if(options != null){
            let opts = prvt_opts.get(this);

            if(opts[event] != null){
                let index = opts[event].indexOf(options);

                if(index !== -1){
                    return evnts[event][index];
                }//end if
            }//end if

            return function(){};
        }//end if

        if(evnts[event] != null){
            return evnts[event].slice(0);
        }//end if

        return [];
    }//end ::listeners

    listenerCount(event){
        let evnts = prvt_evnts.get(this);

        if(evnts[event] != null){
            return evnts[event].length;
        }//end if
        else{
            return 0;
        }//end else
    }//end ::listenerCount

    on(event, listener, options){
        let once = prvt_once.get(this);
        let opts = prvt_opts.get(this);
        let evnts = prvt_evnts.get(this);

        if(typeof(listener) !== 'function'){
            if(once[event].length > evnts[event].length){
                once[event].pop();
            }//end if

            throw new TypeError("listener must be a function");
        }//end if

        if(once[event] == null){
            once[event] = [];
        }//end if
        if(opts[event] == null){
            opts[event] = [];
        }//end if
        if(evnts[event] == null){
            evnts[event] = [];
        }//end if

        if(once[event].length === evnts[event].length){
            once[event].push(false);
        }//end if

        if(evnts[event].length < this.maxListeners){
            this.emit('listener-added', event, listener, options);
            opts[event].push(options);
            evnts[event].push(listener);
        }//end if

        else{
            if(once[event].length > evnts[event].length){
                once[event].pop();
            }//end if

            throw new RangeError("Event listener max reached: unable to add new listener");
        }//end else

        return this;
    }//end ::on

    once(event, listener, options){
        let once = prvt_once.get(this);

        if(once[event] == null){
            once[event] = [];
        }//end if

        once[event].push(true);
        return this.on(event, listener, options);
    }//end ::once

    emit(event, ...args){
        let once = prvt_once.get(this);
        let opts = prvt_opts.get(this);
        let evnts = prvt_evnts.get(this);

        if(evnts[event] != null){
            for(let i = 0; i < evnts[event].length; ++i){
                let options = opts[event][i];
                let listener = evnts[event][i];

                if(options != null){
                    if(args[args.length-1] !== options){
                        args.push(options);
                        listener.apply(this, args);
                        args.pop();
                    }//end if
                    else{
                        listener.apply(this, args);
                    }//end else
                }//end if
                else{
                    listener.apply(this, args);
                }//end else
            }//end for

            for(let i = this.listenerCount(event) - 1; i > -1; --i){
                if(once[event][i] === true){
                    this.remove(event, evnts[event][i]);
                }//end if
            }//end for

            return true;
        }//end if

        return false;
    }//end ::emit

    remove(event, listener){
        let once = prvt_once.get(this);
        let opts = prvt_opts.get(this);
        let evnts = prvt_evnts.get(this);

        if(evnts[event] != null){
            let index = evnts[event].indexOf(listener);

            if(index !== -1){
                let options = opts[event][index];

                once[event].splice(index, 1);
                opts[event].splice(index, 1);
                evnts[event].splice(index, 1);
                this.emit('listener-removed', event, listener, options);

                if(once[event].length === 0){
                    delete once[event];
                }//end if
                if(opts[event].length === 0){
                    delete opts[event];
                }//end if
                if(evnts[event].length === 0){
                    delete evnts[event];
                }//end if

                return true;
            }//end if

            return false;
        }//end if

        return false;
    }//end ::remove

    removeAll(event){
        let once = prvt_once.get(this);
        let opts = prvt_opts.get(this);
        let evnts = prvt_evnts.get(this);

        if(event != null){
            if(evnts[event] != null){
                let options = opts[event].slice(0);
                let listeners = evnts[event].slice(0);

                delete once[event];
                delete opts[event];
                delete evnts[event];

                for(let i = 0; i < listeners.length; ++i){
                    this.emit('listener-removed', event, listeners[i], options[i]);
                }//end for

                return true;
            }//end if

            else{
                return false;
            }//end else
        }//end if

        else{
            if(Object.keys(evnts).length){
                for(let evnt of Object.keys(evnts)){
                    this.removeAll(evnt);
                }//end for

                return true;
            }//end if

            return false;
        }//end else
    }//end ::removeAll

}//end class Emitter

Object.defineProperty(Emitter, 'defaultMaxListeners', {
    value: 10,
    writable: true,
    enumerable: true
});//end defineProperty
