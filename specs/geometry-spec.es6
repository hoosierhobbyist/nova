//geometry-spec.js
import {Point, Line, Circle, Polygon} from '../lib/geometry';

describe('Point(rel_x, rel_y[, origin])', function(){
    it('should create its own origin point at (0, 0) if none is provided', function(){
        let pt = new Point(4, 2);
        pt.org_x.should.equal(0);
        pt.org_y.should.equal(0);
    });

    it('should keep a reference to a provided origin point', function(){
        let pt = new Point(4, 2, {x: 1, y: 2});
        pt.org_x.should.equal(1);
        pt.org_y.should.equal(2);
    });

    it('should return x and y values adjusted for its origin point', function(){
        let pt = new Point(4, 2, {x: -3, y: 5});
        pt.x.should.equal(1);
        pt.y.should.equal(7);
    });

    it('should move with its origin point', function(){
        let origin = {x: 0, y: 0};
        let pt = new Point(1, 2, origin);

        pt.x.should.equal(1);
        pt.y.should.equal(2);

        origin.x = 5;
        origin.y = 3;
        pt.x.should.equal(6);
        pt.y.should.equal(5);

        origin.x = -4;
        origin.y = 1;
        pt.x.should.equal(-3);
        pt.y.should.equal(3);

        origin.x = -2;
        origin.y = -7;
        pt.x.should.equal(-1);
        pt.y.should.equal(-5);

        origin.x = 2;
        origin.y = -1;
        pt.x.should.equal(3);
        pt.y.should.equal(1);
    });
});

describe('Circle([radius][, origin])', function(){
    it('should create its own origin point at (0, 0) if none is provided', function(){
        let cir = new Circle(3);
        cir.a.should.equal(0);
        cir.b.should.equal(0);
    });

    it('should default to a radius of 1 if none is provided', function(){
        let cir = new Circle();
        cir.r.should.equal(1);
    });

    it('should keep a reference to a provided origin point', function(){
        let cir = new Circle(2, {x: 1, y: 2});
        cir.a.should.equal(1);
        cir.b.should.equal(2);
    });

    it('should move with its origin point', function(){
        let origin = {x: 0, y: 0};
        let cir = new Circle(1, origin);

        cir.a.should.equal(0);
        cir.b.should.equal(0);

        origin.x = 5;
        origin.y = 3;
        cir.a.should.equal(5);
        cir.b.should.equal(3);

        origin.x = -4;
        origin.y = 1;
        cir.a.should.equal(-4);
        cir.b.should.equal(1);

        origin.x = -2;
        origin.y = -7;
        cir.a.should.equal(-2);
        cir.b.should.equal(-7);

        origin.x = 2;
        origin.y = -1;
        cir.a.should.equal(2);
        cir.b.should.equal(-1);
    });

    it('should have an ordered domain', function(){
        let cir = new Circle();
        cir.domain[0].should.be.lessThan(cir.domain[1]);
    });

    it('should have an ordered range', function(){
        let cir = new Circle();
        cir.range[0].should.be.lessThan(cir.range[1]);
    });

    describe('::has(pt)', function(){
        let cir = new Circle();

        it('should return false if a Point is outside of the circle', function(){
            cir.has({x: 3, y: 8}).should.be.false();
            cir.has({x: -2, y: 3}).should.be.false();
            cir.has({x: -5, y: -4}).should.be.false();
            cir.has({x: 4, y: -2}).should.be.false();
        });

        it('should return true if a Point is on the circle', function(){
            cir.has({x: 1, y: 0}).should.be.true();
            cir.has({x: 0, y: 1}).should.be.true();
            cir.has({x: -1, y: 0}).should.be.true();
            cir.has({x: 0, y: -1}).should.be.true();
        });

        it('should return true if a Point is inside of the circle', function(){
            cir.has({x: .5, y: .2}).should.be.true();
            cir.has({x: -.1, y: .7}).should.be.true();
            cir.has({x: -.2, y: -.5}).should.be.true();
            cir.has({x: .3, y: -.3}).should.be.true();
        });
    });

    describe('::collidesWith(other)', function(){
        it('should return false if two Circles aren\'t touching', function(){
            let cir1 = new Circle(1, {x: -1, y: 0});
            let cir2 = new Circle(2, {x: 4, y: 2});

            cir1.collidesWith(cir2).should.be.false();
            cir2.collidesWith(cir1).should.be.false();
        });

        it('should return true if two Circles are barely touching', function(){
            let cir1 = new Circle(1, {x: -1, y: 0});
            let cir2 = new Circle(1, {x: 1, y: 0});

            cir1.collidesWith(cir2).should.be.true();
            cir2.collidesWith(cir1).should.be.true();
        });

        it('should return true if two Circles are overlapping', function(){
            let cir1 = new Circle(2, {x: -1, y: -1});
            let cir2 = new Circle(2, {x: 1, y: 1});

            cir1.collidesWith(cir2).should.be.true();
            cir2.collidesWith(cir1).should.be.true();
        });

        it('should return true if one Circle is completly contained within another', function(){
            let cir1 = new Circle(5, {x: 1, y: 1});
            let cir2 = new Circle(2, {x: 2, y: 2});

            cir1.collidesWith(cir2).should.be.true();
            cir2.collidesWith(cir1).should.be.true();
        });
    });
});

describe('Line(pt_1, pt_2)', function(){
    it('should keep references to its end points', function(){
        let pt_1 = new Point(-1, -1);
        let pt_2 = new Point(1, 1);
        let ln = new Line(pt_1, pt_2);

        ln.endPoints[0].should.equal(pt_1);
        ln.endPoints[1].should.equal(pt_2);
    });

    it('should always order its end points by increasing x value', function(){
        let pt_1 = new Point(1, 1);
        let pt_2 = new Point(-1, -1);
        let ln = new Line(pt_1, pt_2);

        ln.endPoints[0].should.equal(pt_2);
        ln.endPoints[1].should.equal(pt_1);
    });

    it('should change with its end points', function(){
        let origin = {x: 5, y: 5};
        let pt_1 = new Point(-1, -1, origin);
        let pt_2 = new Point(1, 3, origin);
        let ln = new Line(pt_1, pt_2);
        let control = {m: ln.m, b: ln.b};

        pt_1.rel_x += 1;
        pt_2.rel_y -= 1;
        ln.m.should.not.equal(control.m);
        ln.b.should.not.equal(control.b);
    });

    it('should have an ordered domain', function(){
        let ln = new Line({x: 1, y: 1}, {x: 0, y: 0});
        ln.domain[0].should.be.lessThan(ln.domain[1]);
    });

    it('should have an ordered range', function(){
        let ln = new Line({x: 1, y: 2}, {x: 4, y: 0});
        ln.range[0].should.be.lessThan(ln.range[1]);
    });

    describe('::has(pt)', function(){
        it('should return false if a point is off the line', function(){
            let ln_1 = new Line({x: -1, y: -1}, {x: 1, y: 1});
            let ln_2 = new Line({x: 0, y: -1}, {x: 0, y: 1});

            ln_1.has({x: -.5, y: .5}).should.be.false();
            ln_1.has({x: .5, y: -.5}).should.be.false();
            ln_1.has({x: 0, y: 1}).should.be.false();
            ln_1.has({x: 2, y: 2}).should.be.false();

            ln_2.has({x: .5, y: .5}).should.be.false();
            ln_2.has({x: -.5, y: -.5}).should.be.false();
            ln_2.has({x: 0, y: 3}).should.be.false();
            ln_2.has({x: 0, y: -3}).should.be.false();
        });

        it('should return true if a point is on the line', function(){
            let ln_1 = new Line({x: -1, y: -1}, {x: 1, y: 1});
            let ln_2 = new Line({x: 0, y: -1}, {x: 0, y: 1});

            ln_1.has({x: -1, y: -1}).should.be.true();
            ln_1.has({x: 0, y: 0}).should.be.true();
            ln_1.has({x: 1, y: 1}).should.be.true();

            ln_2.has({x: 0, y: -1}).should.be.true();
            ln_2.has({x: 0, y: 0}).should.be.true();
            ln_2.has({x: 0, y: 1}).should.be.true();
        });
    });

    describe('::collidesWith(other)', function(){
        it('should return false if two Lines aren\'t touching', function(){
            let ln_1 = new Line({x: -2, y: -2}, {x: -1, y: -1});
            let ln_2 = new Line({x: 1, y: 1}, {x: 2, y: 2});

            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_1 = new Line({x: 1.5, y: 1.3}, {x: 3, y: 0});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_1 = new Line({x: 5, y: 7}, {x: 8, y: 13});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_1 = new Line({x: 1, y: 0}, {x: 2, y: 1});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_1 = new Line({x: 0, y: -1}, {x: 0, y: 1});
            ln_2 = new Line({x: 1, y: -1}, {x: 1, y: 1});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_2 = new Line({x: 0, y: -3}, {x: 0, y: -2});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();

            ln_2 = new Line({x: 0, y: 2}, {x: 0, y: 3});
            ln_1.collidesWith(ln_2).should.be.false();
            ln_2.collidesWith(ln_1).should.be.false();
        });

        it('should return true if two Lines are touching', function(){
            let ln_1 = new Line({x: -2, y: -2}, {x: 1, y: 1});
            let ln_2 = new Line({x: 0, y: 0}, {x: 2, y: 2});

            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();

            ln_1 = new Line({x: .5, y: .5}, {x: 1.5, y: 1.5});
            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();

            ln_1 = new Line({x: 0, y: -2}, {x: 0, y: 2});
            ln_2 = new Line({x: 0, y: 0}, {x: 0, y: 3});
            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();

            ln_2 = new Line({x: 0, y: -1}, {x: 0, y: 1});
            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();

            ln_2 = new Line({x: -1, y: -1}, {x: 1, y: 1});
            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();

            ln_1 = new Line({x: -1, y: 1}, {x: 1, y: -1});
            ln_1.collidesWith(ln_2).should.be.true();
            ln_2.collidesWith(ln_1).should.be.true();
        });

        it('should return false if a Line and a Circle aren\'t touching', function(){
            let cir = new Circle(1);
            let ln = new Line({x: 0, y: 2}, {x: 0, y: 3});

            ln.collidesWith(cir).should.be.false();

            ln = new Line({x: 5, y: 5}, {x: 7, y: -2});
            ln.collidesWith(cir).should.be.false();

            ln = new Line({x: -3, y: -3}, {x: -2, y: -2});
            ln.collidesWith(cir).should.be.false();
        });

        it('should return true if a Line and a Circle are touching', function(){
            let cir = new Circle(1);
            let ln = new Line({x: 0, y: -2}, {x: 0, y: 2});

            ln.collidesWith(cir).should.be.true();

            ln = new Line({x: 0, y: -.5}, {x: 0, y: .5});
            ln.collidesWith(cir).should.be.true();

            ln = new Line({x: -4, y: -4}, {x: 0, y: 0});
            ln.collidesWith(cir).should.be.true();

            ln = new Line({x: -.5, y: .5}, {x: .5, y: -.3});
            ln.collidesWith(cir).should.be.true();
        });
    });
});

describe('Polygon(...pts)', function(){
    it('should throw an Error when less than three Points are provided', function(){
        (function(){let ply = new Polygon();}).should.throw();
        (function(){let ply = new Polygon({x: 0, y: 0});}).should.throw();
        (function(){let ply = new Polygon({x: 1, y: 1}, {x: 2, y: 2});}).should.throw();
    });

    it('should create an array of Lines as long as the its Points array', function(){
        let ply = new Polygon({x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0});
        ply.pts.length.should.equal(ply.lns.length).and.equal(ply.n);
    });

    it('should have an ordered domain', function(){
        let ply = new Polygon({x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0});
        ply.domain[0].should.be.lessThan(ply.domain[1]);
    });

    it('should have an ordered range', function(){
        let ply = new Polygon({x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0});
        ply.range[0].should.be.lessThan(ply.range[1]);
    });

    describe('::has(pt)', function(){
        let ply = new Polygon({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 0});

        it('should return false if a Point is outside of the Polygon', function(){
            ply.has({x: .5, y: .7}).should.be.false();
            ply.has({x: -3, y: 7}).should.be.false();
            ply.has({x: 1, y: 1.1}).should.be.false();
        });

        it('should return true if a Point is on the Polygon', function(){
            ply.has({x: .5, y: .5}).should.be.true();
            ply.has({x: 1, y: 1}).should.be.true();
            ply.has({x: 1.5, y: 0}).should.be.true();
        });

        it('should return true if a Point is inside of the Polygon', function(){
            ply.has({x: 1, y: .5}).should.be.true();
            ply.has({x: .5, y: .3}).should.be.true();
            ply.has({x: 1.5, y: .1}).should.be.true();
        });
    });

    describe('::collidesWith(other)', function(){
        it('should return false when two Polygons aren\'t touching', function(){
            let ply_1 = new Polygon({x: -1, y: 0}, {x: 0, y: 1}, {x: 1, y: 0});
            let ply_2 = new Polygon({x: 5, y: 3}, {x: 6, y: 8}, {x: 7, y: 2});

            ply_1.collidesWith(ply_2).should.be.false();
            ply_2.collidesWith(ply_1).should.be.false();

            ply_2 = new Polygon({x: .5, y: .7}, {x: 2, y: 4}, {x: 3, y: 1});
            ply_1.collidesWith(ply_2).should.be.false();
            ply_2.collidesWith(ply_1).should.be.false();

            ply_2 = new Polygon({x: -1, y: -1}, {x: 0, y: -.25}, {x: 1, y: -1});
            ply_1.collidesWith(ply_2).should.be.false();
            ply_2.collidesWith(ply_1).should.be.false();
        });

        it('should return true when two Polygons are touching', function(){
            let ply_1 = new Polygon({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 0});
            let ply_2 = new Polygon({x: -4, y: -4}, {x: -4, y: 4}, {x: 3, y: 4}, {x: 3, y: -4});

            ply_1.collidesWith(ply_2).should.be.true();
            ply_2.collidesWith(ply_1).should.be.true();

            ply_1 = new Polygon({x: -1, y: 4}, {x: 0, y: 5}, {x: 1, y: 4});
            ply_1.collidesWith(ply_2).should.be.true();
            ply_2.collidesWith(ply_1).should.be.true();

            ply_1 = new Polygon({x: -1, y: -5}, {x: 0, y: -2}, {x: 1, y: -5});
            ply_1.collidesWith(ply_2).should.be.true();
            ply_2.collidesWith(ply_1).should.be.true();
        });

        it('should return false when a Line and a Polygon aren\'t touching', function(){
            let ln = new Line({x: -2, y: 2}, {x: 2, y: 2});
            let ply = new Polygon({x: -8, y: 0}, {x: 0, y: 1}, {x: 8, y: 0});

            ply.collidesWith(ln).should.be.false();

            ln = new Line({x: 0, y: 2}, {x: 0, y: 5});
            ply.collidesWith(ln).should.be.false();

            ln = new Line({x: 10, y: -4}, {x: 12, y: 5});
            ply.collidesWith(ln).should.be.false();
        });

        it('should return true when a Line and a Polygon are touching', function(){
            let ln = new Line({x: -2, y: .5}, {x: 2, y: .5});
            let ply = new Polygon({x: -8, y: 0}, {x: 0, y: 1}, {x: 8, y: 0});

            ply.collidesWith(ln).should.be.true();

            ln = new Line({x: -1, y: -1}, {x: 1, y: 1});
            ply.collidesWith(ln).should.be.true();

            ln = new Line({x: 3, y: -1}, {x: 3, y: 1});
            ply.collidesWith(ln).should.be.true();
        });

        it('should return false when a Circle and a Polygon aren\'t touching', function(){
            let cir = new Circle(1, {x: 0, y: 3});
            let ply = new Polygon({x: -8, y: 0}, {x: 0, y: 1}, {x: 8, y: 0});

            ply.collidesWith(cir).should.be.false();

            cir = new Circle(1, {x: 15, y: 15});
            ply.collidesWith(cir).should.be.false();

            cir = new Circle(1, {x: -2, y: -3});
            ply.collidesWith(cir).should.be.false();
        });

        it('should return true when a Circle and a Polygon are touching', function(){
            let cir = new Circle();
            let ply = new Polygon({x: -3, y: -3}, {x: -3, y: 3}, {x: 3, y: 3}, {x: 3, y: -3});

            ply.collidesWith(cir).should.be.true();

            cir = new Circle(10);
            ply.collidesWith(cir).should.be.true();

            cir = new Circle(2, {x: 2, y: 2});
            ply.collidesWith(cir).should.be.true();
        });
    });
});
