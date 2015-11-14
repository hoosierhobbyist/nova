//emitter-spec.js
import Emitter from '../lib/emitter'

describe('Emitter', function(){
    let originalValue = Emitter.defaultMaxListeners;

    afterEach(function(){
        Emitter.defaultMaxListeners = originalValue;
    });

    describe('#defaultMaxListeners', function(){
        it('should be writable', function(){
            Emitter.defaultMaxListeners = 25;
            Emitter.defaultMaxListeners.should.equal(25);
            Emitter.defaultMaxListeners = 42;
            Emitter.defaultMaxListeners.should.equal(42);
        });

        it('should be enumerable', function(){
            Emitter.should.have.enumerable('defaultMaxListeners', originalValue);
        });

        it('should not be configurable', function(){
            (function(){delete Emitter.defaultMaxListeners;}).should.throw();
        });
    });

    describe('constructor([maxListeners])', function(){
        let em;

        beforeEach(function(){
            em = new Emitter();
        });

        it('should create a new Emitter instance', function(){
            em.should.be.an.instanceof(Emitter);
        });

        it('should have a maxListeners property', function(){
            em.should.have.property('maxListeners');
        });

        it('should use the default value for maxListeners with no arguments', function(){
            em.maxListeners.should.equal(Emitter.defaultMaxListeners);
        });

        it('should use the first argument as maxListeners otherwise', function(){
            em = new Emitter(5);
            em.maxListeners.should.equal(5);
        });

        it('should not allow maxListeners to be set less than zero', function(){
            (function(){em.maxListeners = -1;}).should.throw();
        });

        it('should not allow maxListeners to be set less than the length of an existing listener Array', function(){
            em.on('test', function(){});
            em.on('test', function(){});
            (function(){em.maxListeners = 1;}).should.throw();
        });
    });

    describe('::events()', function(){
        it('should return an Array of all registered events', function(){
            let em = new Emitter();

            em.on('test', function(){});
            em.once('Test', function(){});
            em.on('TEST', function(){});

            em.events().should.eql(['test', 'Test', 'TEST']);
            em.emit('Test');
            em.events().should.eql(['test', 'TEST']);
        });
    });

    describe('::options(event[, listener])', function(){
        let em;
        let op_1 = {one: 1};
        let op_2 = {two: 2};
        let op_3 = {three: 3};
        let li_1 = function(){};
        let li_2 = function(){};
        let li_3 = function(){};

        beforeEach(function(){
            em = new Emitter();
            em.on('test', li_1, op_1);
            em.on('test', li_2, op_2);
            em.on('test', li_3, op_3);
        });

        it('should return an empty Array when there are no listeners for an event', function(){
            em.options('TEST').should.be.empty();
        });

        it('should return an Array with the ordered options objects when there are listeners for an event', function(){
            em.options('test').should.eql([op_1, op_2, op_3]);
        });

        it('should return the options object for a particular listener when called with two arguments', function(){
            em.options('test', li_1).should.equal(op_1);
            em.options('test', li_2).should.equal(op_2);
            em.options('test', li_3).should.equal(op_3);
        });

        it('should return an empty object when called with two arguments and an invalid listener', function(){
            em.options('test', function(){}).should.be.an.Object().and.be.empty();
        });
    });

    describe('::listeners(event[, options])', function(){
        let em;
        let op_1 = {one: 1};
        let op_2 = {two: 2};
        let op_3 = {three: 3};
        let li_1 = function(){};
        let li_2 = function(){};
        let li_3 = function(){};

        beforeEach(function(){
            em = new Emitter();
            em.on('test', li_1, op_1);
            em.on('test', li_2, op_2);
            em.on('test', li_3, op_3);
        });

        it('should return an empty Array when there are no listeners for an event', function(){
            em.listeners('TEST').should.be.empty();
        });

        it('should return an Array with the ordered listener functions when there are listeners for an event', function(){
            em.listeners('test').should.eql([li_1, li_2, li_3]);
        });

        it('should return the listener function for a particular options object when called with two arguments', function(){
            em.listeners('test', op_1).should.equal(li_1);
            em.listeners('test', op_2).should.equal(li_2);
            em.listeners('test', op_3).should.equal(li_3);
        });

        it('should return a dummy Function when called with two arguments and an invalid options object', function(){
            let dummy = em.listeners('test', {four: 4});

            dummy.should.be.a.Function();
            dummy.should.not.equalOneOf(li_1, li_2, li_3);
        });
    });

    describe('::listenerCount(event)', function(){
        let em;

        beforeEach(function(){
            em = new Emitter();
        });

        it('should return zero when there are no listeners for an event', function(){
            em.listenerCount('test').should.equal(0);
        });

        it('should return the number of active listeners for a registered event', function(){
            let li_1 = function(){};
            let li_2 = function(){};
            let li_3 = function(){};

            em.on('test', li_1);
            em.listenerCount('test').should.equal(1);

            em.on('test', li_2);
            em.on('test', li_3);
            em.listenerCount('test').should.equal(3);

            em.remove('test', li_2);
            em.listenerCount('test').should.equal(2);

            em.once('test', li_2);
            em.listenerCount('test').should.equal(3);

            em.emit('test');
            em.listenerCount('test').should.equal(2);
        });
    });

    describe('::on(event, listener[, options])', function(){
        let em;

        beforeEach(function(){
            em = new Emitter();
        });

        it('should throw a TypeError if the second argument is not a function', function(){
            (function(){em.on('test', 0);}).should.throw();
            (function(){em.on('test', '');}).should.throw();
            (function(){em.on('test', []);}).should.throw();
            (function(){em.on('test', {});}).should.throw();
        });

        it('should throw a RangeError if the maxListeners limit is exceded', function(){
            em.maxListeners = 1;
            em.on('test', function(){});
            (function(){em.on('test', function(){});}).should.throw();
        });

        it('should emit a listener-added event before registering the listener', function(){
            let done = false;
            let li = function(){};
            let op = {test: 'test'};

            em.on('listener-added', function(event, listener, options){
                done = true;
                event.should.equal('test');
                listener.should.equal(li);
                options.should.equal(op);
                this.listenerCount(event).should.equal(0);
            });

            em.on('test', li, op);
            done.should.be.true();
        });

        it('should return a self-reference to support method chaining', function(){
            em.on('test', function(){}).should.equal(em);
        });
    });

    describe('::once(event, listener[, options])', function(){
        let em;
        let li_1 = function(){};
        let li_2 = function(){};
        let li_3 = function(){};

        beforeEach(function(){
            em = new Emitter();
        });

        it('should remove itself from the registered listeners after firing once', function(){
            em.once('test', li_1);
            em.on('test', li_2);
            em.on('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(2);
            em.listeners('test').should.eql([li_2, li_3]);

            em.removeAll('test');
            em.on('test', li_1);
            em.once('test', li_2);
            em.on('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(2);
            em.listeners('test').should.eql([li_1, li_3]);

            em.removeAll('test');
            em.on('test', li_1);
            em.on('test', li_2);
            em.once('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(2);
            em.listeners('test').should.eql([li_1, li_2]);

            em.removeAll('test');
            em.once('test', li_1);
            em.once('test', li_2);
            em.on('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(1);
            em.listeners('test').should.eql([li_3]);

            em.removeAll('test');
            em.on('test', li_1);
            em.once('test', li_2);
            em.once('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(1);
            em.listeners('test').should.eql([li_1]);

            em.removeAll('test');
            em.once('test', li_1);
            em.on('test', li_2);
            em.once('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(1);
            em.listeners('test').should.eql([li_2]);

            em.removeAll('test');
            em.once('test', li_1);
            em.once('test', li_2);
            em.once('test', li_3);
            em.listenerCount('test').should.equal(3);
            em.emit('test');
            em.listenerCount('test').should.equal(0);
            em.listeners('test').should.eql([]);
        });
    });

    describe('::emit(event[, ...args])', function(){
        let em;

        beforeEach(function(){
            em = new Emitter();
        });

        it('should return false when there are no registered listeners', function(){
            em.emit('test').should.be.false();
        });

        it('should return true when there is at least one registered listener', function(){
            em.on('test', function(){});
            em.emit('test').should.be.true();
        });

        it('should make itself available as the context within a listener', function(){
            let done = false;

            em.on('test', function(){
                done = true;
                this.should.equal(em);
            });

            em.emit('test');
            done.should.be.true();
        });

        it('should pass arguments to the registered listeners', function(){
            let done = false;

            em.on('test', function(one, two, three){
                done = true;
                one.should.equal(1);
                two.should.equal(2);
                three.should.equal(3);
            });

            em.emit('test', 1, 2, 3);
            done.should.be.true();
        });

        it('should pass the registered options object as the last argument to each corresponding listener', function(){
            let op_1 = {one: 1};
            let op_2 = {two: 2};
            let op_3 = {three: 3};
            let done = [false, false, false];

            em.on('test', function(op){
                done[0] = true;
                op.should.equal(op_1);
            }, op_1);
            em.on('test', function(op){
                done[1] = true;
                op.should.equal(op_2);
            }, op_2);
            em.on('test', function(op){
                done[2] = true;
                op.should.equal(op_3);
            }, op_3);

            em.emit('test');
            done.should.eql([true, true, true]);
        });
    });

    describe('::remove(event, listener)', function(){
        let em;
        let op = {test: 'test'};
        let li = function(){};

        beforeEach(function(){
            em = new Emitter();
        });

        it('should return false when trying to remove a listener from an invalid event', function(){
            em.remove('test', li).should.be.false();
        });

        it('should return false when trying to remove an unregistered listener', function(){
            em.on('test', function(){});
            em.remove('test', li).should.be.false();
            em.listenerCount('test').should.equal(1);
        });

        it('should return true after successfully removing a registered listener', function(){
            em.on('test', li);
            em.remove('test', li).should.be.true();
            em.listenerCount('test').should.equal(0);
        });

        it('should emit a listener-removed event after unregistering the listener', function(){
            let done = false;

            em.on('listener-removed', function(event, listener, options){
                done = true;
                event.should.equal('test');
                listener.should.equal(li);
                options.should.equal(op);
                this.listenerCount(event).should.equal(0);
            });

            em.on('test', li, op);
            em.remove('test', li);
            done.should.be.true();
        });
    });

    describe('::removeAll([event])', function(){
        let em;
        let op_1 = {one: 1};
        let op_2 = {two: 2};
        let op_3 = {three: 3};
        let li_1 = function(){};
        let li_2 = function(){};
        let li_3 = function(){};

        beforeEach(function(){
            em = new Emitter();
        });

        it('should return false when trying to remove listeners from an invalid event', function(){
            em.removeAll().should.be.false();
            em.removeAll('test').should.be.false();
        });

        it('should return true and remove all listeners for a valid event', function(){
            em.on('test', li_1);
            em.on('test', li_2);
            em.on('test', li_3);
            em.removeAll('test').should.be.true();
            em.listenerCount('test').should.equal(0);
        });

        it('should emit a listener-removed event for every registered listener', function(){
            let count = 0;

            em.on('listener-removed', function(event, listener, options){
                count += 1;
                event.should.equal('test');
                listener.should.equalOneOf(li_1, li_2, li_3);
                options.should.equalOneOf(op_1, op_2, op_3);
                this.listenerCount(event).should.equal(0);
            });

            em.on('test', li_1, op_1);
            em.on('test', li_2, op_2);
            em.on('test', li_3, op_3);

            em.removeAll('test');
            count.should.equal(3);
        });

        it('should remove all listeners for all events when called with no arguments', function(){
            em.on('test_1', li_1, op_1);
            em.on('test_2', li_2, op_2);
            em.on('test_3', li_3, op_3);

            em.removeAll().should.be.true();
            em.listenerCount('test_1').should.equal(0);
            em.listenerCount('test_2').should.equal(0);
            em.listenerCount('test_3').should.equal(0);
        });
    });
});
