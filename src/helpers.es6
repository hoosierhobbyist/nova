//helpers.js

let epsilon = .1;

export function eq (a, b){
    return Math.abs(a - b) <= epsilon;
}//end eq

export function ne (a, b){
    return !eq(a, b);
}//end ne

export function lt (a, b){
    return !eq(a, b) && a < b;
}//end lt

export function gt (a, b){
    return !eq(a, b) && a > b;
}//end gt

export function le (a, b){
    return eq(a, b) || a < b;
}//end le

export function ge (a, b){
    return eq(a, b) || a > b;
}//end ge

export function sq (n){
    return n * n;
}//end sq

export function sqrt (n){
    return Math.sqrt(n);
}//end sqrt

export function dist (pt1, pt2){
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}//end dist
