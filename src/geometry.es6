//geometry.es6

import {eq, ne, lt, gt, le, ge, sq, sqrt, dist} from './helpers';

//helper functions (used to find intersection points)
function __line2line (ln_1, ln_2){
    let x = NaN;
    let y = NaN;

    if(!Number.isNaN(ln_1.m)){
        if(!Number.isNaN(ln_2.m)){
            if(ne(ln_1.m, ln_2.m)){
                x = (ln_2.b - ln_1.b) / (ln_1.m - ln_2.m);
                y = ln_1.m * x + ln_1.b;
            }//end if
        }//end if

        else{
            x = ln_2.center.x;
            y = ln_1.m * x + ln_1.b;
        }//end else
    }//end if

    else if(!Number.isNaN(ln_2.m)){
        x = ln_1.center.x;
        y = ln_2.m * x + ln_2.b;
    }//end else if

    return new Point(x, y);
}//end __line2line

function __line2circle (ln, cr){
    let x_1 = NaN;
    let y_1 = NaN;
    let x_2 = NaN;
    let y_2 = NaN;

    if(Number.isNaN(ln.m)){
        if(le(cr.domain[0], ln.center.x)){
            if(le(ln.center.x, cr.domain[1])){
                x_1 = ln.center.x;
                y_1 = cr.b + sqrt(sq(cr.r) - sq(x_1 - cr.a));

                x_2 = ln.center.x;
                y_2 = cr.b - sqrt(sq(cr.r) - sq(x_2 - cr.a));
            }//end if
        }//end if
    }//end if

    else{
        let a = 1 + sq(ln.m);
        let b = 2 * (ln.m * ln.b - ln.m * cr.b - cr.a);
        let c = sq(cr.a) + sq(cr.b) + sq(ln.b) - sq(cr.r) - 2 * ln.b * cr.b;
        let det = sq(b) - 4 * a * c;

        if(det >= 0){
            x_1 = (-b + sqrt(det)) / (2 * a);
            y_1 = ln.m * x_1 + ln.b;

            x_2 = (-b - sqrt(det)) / (2 * a);
            y_2 = ln.m * x_2 + ln.b;
        }//end if
    }//end else

    return [new Point(x_1, y_1), new Point(x_2, y_2)];
}//end __line2circle

export class Point{

    constructor(rel_x, rel_y, origin = {}){
        if(origin.x == null){
            origin.x = 0;
        }//end if
        if(origin.y == null){
            origin.y = 0;
        }//end if

        Object.defineProperties(this, {
            x: {
                enumerable: true,
                get: function(){
                    return origin.x + rel_x;
                }//end get
            },//end x
            y: {
                enumerable: true,
                get: function(){
                    return origin.y + rel_y;
                }//end get
            },//end y
            org_x: {
                get: function(){
                    return origin.x;
                }//end get
            },//end org_x
            org_y: {
                get: function(){
                    return origin.y;
                }//end get
            },//end org_y
            rel_x: {
                get: function(){
                    return rel_x;
                },//end get
                set: function(value){
                    rel_x = value;
                }//end set
            },//end rel_x
            rel_y: {
                get: function(){
                    return rel_y;
                },//end get
                set: function(value){
                    rel_y = value;
                }//end set
            },//end rel_y
            angle: {
                get: function(){
                    return Math.atan2(rel_y, rel_x);
                },//end get
                set: function(value){
                    let x = this.dist * Math.cos(value);
                    let y = this.dist * Math.sin(value);

                    rel_x = x;
                    rel_y = y;
                }//end set
            },//end angle
            dist: {
                get: function(){
                    return sqrt(sq(rel_x) + sq(rel_y));
                },//end get
                set: function(value){
                    if(value >= 0){
                        let x = value * Math.cos(this.angle);
                        let y = value * Math.sin(this.angle);

                        rel_x = x;
                        rel_y = y;
                    }//end if
                }//end set
            }//end dist
        });//end defineProperties
    }//end constructor

}//end class Point

export class Circle{

    constructor (radius = 1, origin = {}){
        if(origin.x == null){
            origin.x = 0;
        }//end if
        if(origin.y == null){
            origin.y = 0;
        }//end if

        let range = new Float64Array(new ArrayBuffer(16));
        let domain = new Float64Array(new ArrayBuffer(16));

        Object.defineProperties(this, {
            a: {
                enumerable: true,
                get: function(){
                    return origin.x;
                }//end get
            },//end a
            b: {
                enumerable: true,
                get: function(){
                    return origin.y;
                }//end get
            },//end b
            r: {
                enumerable: true,
                get: function(){
                    return radius;
                },//end get
                set: function(value){
                    if(value >= 0){
                        radius = value;
                    }//end if
                }//end set
            },//end r
            center: {
                get: function(){
                    return new Point(origin.x, origin.y);
                }//end get
            },//end centerPoint
            domain: {
                get: function(){
                    domain[0] = origin.x - radius;
                    domain[1] = origin.x + radius;

                    return domain;
                }//end get
            },//end domain
            range: {
                get: function(){
                    range[0] = origin.y - radius;
                    range[1] = origin.y + radius;

                    return range;
                }//end get
            }//end range
        });//end defineProperties
    }//end constructor

    has(pt){
        return le(dist(pt, this.center), this.r);
    }//end has

    collidesWith(other){
        if(other instanceof Circle){
            return le(dist(this.center, other.center), this.r + other.r);
        }//end if

        else if(other instanceof Line){
            return other.collidesWith(this);
        }//end else if

        else if(other instanceof Polygon){
            return other.collidesWith(this);
        }//end else if

        return false;
    }//end collidesWith

}//end class Circle

export class Line{

    constructor(pt_1, pt_2){
        let range = new Float64Array(new ArrayBuffer(16));
        let domain = new Float64Array(new ArrayBuffer(16));

        Object.defineProperties(this, {
            m: {
                enumerable: true,
                get: function(){
                    if(eq(pt_1.x, pt_2.x)){
                        return NaN;
                    }//end if
                    else{
                        return (pt_2.y - pt_1.y) / (pt_2.x - pt_1.x);
                    }//end else
                }//end get
            },//end m
            b: {
                enumerable: true,
                get: function(){
                    if(eq(pt_1.x, pt_2.x)){
                        return NaN;
                    }//end if
                    else{
                        return this.m * -pt_1.x + pt_1.y;
                    }//end else
                }//end get
            },//end b
            length: {
                enumerable: true,
                get: function(){
                    return dist(pt_1, pt_2);
                }//end get
            },//end length
            center: {
                get: function(){
                    let _x = (pt_1.x + pt_2.x) / 2;
                    let _y = (pt_1.y + pt_2.y) / 2;

                    return new Point(_x, _y);
                }//end get
            },//end center
            endPoints: {
                get: function(){
                    if(le(pt_1.x, pt_2.x)){
                        return [pt_1, pt_2];
                    }//end if

                    else{
                        return [pt_2, pt_1];
                    }//end else
                }//end get
            },//end endPoints
            domain: {
                enumerable: true,
                get: function(){
                    if(le(pt_1.x, pt_2.x)){
                        domain[0] = pt_1.x;
                        domain[1] = pt_2.x;
                    }//end if

                    else{
                        domain[0] = pt_2.x;
                        domain[1] = pt_1.x;
                    }//end else

                    return domain;
                }//end get
            },//end domain
            range: {
                enumerable: true,
                get: function(){
                    if(le(pt_1.y, pt_2.y)){
                        range[0] = pt_1.y;
                        range[1] = pt_2.y;
                    }//end if

                    else{
                        range[0] = pt_2.y;
                        range[1] = pt_1.y;
                    }//end else

                    return range;
                }//end get
            }//end range
        });//end defineProperties
    }//end constructor

    has(pt){
        if(le(this.domain[0], pt.x) && le(pt.x, this.domain[1])){
            if(le(this.range[0], pt.y) && le(pt.y, this.range[1])){
                if(!Number.isNaN(this.m)){
                    return eq(pt.y, this.m * pt.x + this.b);
                }//end if

                return true;
            }//end if
        }//end if

        return false;
    }//end contains

    collidesWith(other){
        if(other instanceof Line){
            if(Number.isNaN(this.m) && Number.isNaN(other.m)){
                if(eq(this.center.x, other.center.x)){
                    if(le(this.range[0], other.range[0])){
                        if(le(other.range[0], this.range[1])){
                            return true;
                        }//end if
                    }//end if

                    if(le(this.range[0], other.range[1])){
                        if(le(other.range[1], this.range[1])){
                            return true;
                        }//end if
                    }//end if

                    if(ge(this.range[0], other.range[0])){
                        if(le(this.range[1], other.range[1])){
                            return true;
                        }//end if
                    }//end if
                }//end if
            }//end if

            else if(eq(this.m, other.m) && eq(this.b, other.b)){
                if(le(this.domain[0], other.domain[0])){
                    if(le(other.domain[0], this.domain[1])){
                        return true;
                    }//end if
                }//end if

                if(le(this.domain[0], other.domain[1])){
                    if(le(other.domain[1], this.domain[1])){
                        return true;
                    }//end if
                }//end if

                if(ge(this.domain[0], other.domain[0])){
                    if(le(this.domain[1], other.domain[1])){
                        return true;
                    }//end if
                }//end if
            }//end else if

            else{
                let pt = __line2line(this, other);
                return this.has(pt) && other.has(pt);
            }//end else
        }//end if

        else if(other instanceof Circle){
            if(other.has(this.center)){
                return true;
            }//end if

            else{
                let pts = __line2circle(this, other);
                if(this.has(pts[0]) || this.has(pts[1])){
                    return true;
                }//end if
            }//end else
        }//end else if

        else if(other instanceof Polygon){
            return other.collidesWith(this);
        }//end else if

        return false;
    }//end collidesWith

}//end class Line

//NOTE: undefined behavior when lines cross over one another
export class Polygon{

    constructor(...pts){
        if(pts.length < 3){
            throw new RangeError("Polygon must have at least three points");
        }//end if

        let range = new Float64Array(new ArrayBuffer(16));
        let domain = new Float64Array(new ArrayBuffer(16));

        let lns = [];
        for(let i = 0; i < pts.length; ++i){
            if(i === pts.length - 1){
                lns.push(new Line(pts[i], pts[0]));
            }//end if
            else{
                lns.push(new Line(pts[i], pts[i+1]));
            }//end else
        }//end for

        Object.defineProperties(this, {
            n: {
                enumerable: true,
                get: function(){
                    return pts.length;
                }//end get
            },//end n
            r: {
                enumerable: true,
                get: function(){
                    let value = dist(pts[0], this.center);

                    for (let i = 1; i < this.n; ++i){
                        if(gt(dist(pts[i], this.center), value)){
                            value = dist(pts[i], this.center);
                        }//end if
                    }//end for

                    return value;
                }//end get
            },//end r
            pts: {
                get: function(){
                    return pts.slice(0);
                }//end get
            },//end pts
            lns: {
                get: function(){
                    return lns.slice(0);
                }//end get
            },//end lns
            center: {
                enumerable: true,
                get: function(){
                    let x = 0;
                    let y = 0;

                    for(let i = 0; i < this.n; ++i){
                        x += pts[i].x;
                        y += pts[i].y;
                    }//end for

                    return new Point(x /= this.n, y /= this.n);
                }//end get
            },//end center
            domain: {
                get: function(){
                    let low = pts[0];
                    let high = pts[0];

                    for(let i = 1; i < this.n; ++i){
                        if(lt(pts[i].x, low.x)){
                            low = pts[i];
                        }//end if
                        if(gt(pts[i].x, high.x)){
                            high = pts[i];
                        }//end if
                    }//end for

                    domain[0] = low.x;
                    domain[1] = high.x;

                    return domain;
                }//end get
            },//end domain
            range: {
                get: function(){
                    let low = pts[0];
                    let high = pts[0];

                    for(let i = 1; i < this.n; ++i){
                        if(lt(pts[i].y, low.y)){
                            low = pts[i];
                        }//end if
                        if(gt(pts[i].y, high.y)){
                            high = pts[i];
                        }//end if
                    }//end for

                    range[0] = low.y;
                    range[1] = high.y;

                    return range;
                }//end get
            }//end range
        });//end defineProperties
    }//end constructor

    has(pt){
        if(gt(dist(pt, this.center), this.r)){
            return false;
        }//end if

        if(lt(pt.x, this.domain[0])){
            return false;
        }//end if

        if(gt(pt.x, this.domain[1])){
            return false;
        }//end if

        if(lt(pt.y, this.range[0])){
            return false;
        }//end if

        if(gt(pt.y, this.range[1])){
            return false;
        }//end if

        let rays = this.pts.map(function(point){
            return new Line(pt, point);
        });

        for(let ln of this.lns){
            if(ln.has(pt)){
                return true;
            }//end if

            for(let ray of rays){
                if(!(ln.has(ray.endPoints[0]) || ln.has(ray.endPoints[1]))){
                    if(ln.collidesWith(ray)){
                        return false;
                    }//end if
                }//end if
            }//end for ray
        }//end for line

        return true;
    }//end has

    collidesWith(other){
        if(other instanceof Polygon){
            if(gt(dist(this.center, other.center), this.r + other.r)){
                return false;
            }//end if

            if(lt(other.domain[1], this.domain[0])){
                return false;
            }//end if

            if(gt(other.domain[0], this.domain[1])){
                return false;
            }//end if

            if(lt(other.range[1], this.range[0])){
                return false;
            }//end if

            if(gt(other.range[0], this.range[1])){
                return false;
            }//end if

            if(this.has(other.center)){
                return true;
            }//end if

            if(other.has(this.center)){
                return true;
            }//end if

            for(let ln of this.lns){
                if(other.collidesWith(ln)){
                    return true;
                }//end if
            }//end for ln
        }//end if

        else if(other instanceof Line){
            if(lt(other.domain[1], this.domain[0])){
                return false;
            }//end if

            if(gt(other.domain[0], this.domain[1])){
                return false;
            }//end if

            if(lt(other.range[1], this.range[0])){
                return false;
            }//end if

            if(gt(other.range[0], this.range[1])){
                return false;
            }//end if

            if(this.has(other.center)){
                return true;
            }//end if

            for(let ln of this.lns){
                if(ln.collidesWith(other)){
                    return true;
                }//end if
            }//end for
        }//end if

        else if(other instanceof Circle){
            if(gt(dist(this.center, other.center), this.r + other.r)){
                return false;
            }//end if

            if(lt(other.domain[1], this.domain[0])){
                return false;
            }//end if

            if(gt(other.domain[0], this.domain[1])){
                return false;
            }//end if

            if(lt(other.range[1], this.range[0])){
                return false;
            }//end if

            if(gt(other.range[0], this.range[1])){
                return false;
            }//end if

            if(this.has(other.center)){
                return true;
            }//end if

            if(other.has(this.center)){
                return true;
            }//end if

            for(let ln of this.lns){
                if(ln.collidesWith(other)){
                    return true;
                }//end if
            }//end for
        }//end if

        return false;
    }//end collidesWith

}//end class Polygon
