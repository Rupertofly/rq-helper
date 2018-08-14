"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3_polygon_1 = require("d3-polygon");
var _ = require("lodash");
function hash(s) {
    /* Simple hash function. */
    var a = 1;
    var c = 0;
    var h;
    var o;
    if (s) {
        a = 0;
        /* tslint:disable no-bitwise */
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = ((a << 6) & 268435455) + o + (o << 14);
            c = a & 266338304;
            a = c !== 0 ? a ^ (c >> 21) : a;
        }
    }
    return a.toString(16).toUpperCase();
}
exports.hash = hash;
/**
 * Checks to See if Object contains
 *
 * @param {...any} obj object to see
 * @returns {Boolean} isNested
 */
function checkNested(obj /*, level1, level2, ... levelN */) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
        var i = args_1[_i];
        if (!obj || !obj.hasOwnProperty(i)) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}
exports.checkNested = checkNested;
exports.lastFrame = 180;
// For Recording
/**
 * Adds A frame to the recording and saves if at end
 *
 */
function recordFrame() {
    if (frameCount <= exports.lastFrame) {
        exports.recorder.capture(exports.canvasObject);
        if (frameCount === exports.lastFrame) {
            exports.recorder.stop();
            exports.recorder.save();
        }
    }
}
exports.recordFrame = recordFrame;
function sqr(x) {
    return x * x;
}
function dist2(v, w) {
    return sqr(v[0] - w[0]) + sqr(v[1] - w[1]);
}
function distToSegmentSquared(p, v, w) {
    var l2 = dist2(v, w);
    if (l2 === 0)
        return dist2(p, v);
    var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
}
function distToSegment(p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w));
}
exports.distToSegment = distToSegment;
/**
 *
 *
 * @param {[Number, Number][]} poly
 * @returns Number
 */
function getMinDist(poly) {
    var c = d3_polygon_1.polygonCentroid(poly);
    var r = _.range(poly.length).map(function (i) {
        var thisP = poly[i];
        var nextP = poly[(i + 1) % poly.length];
        return distToSegment(c, thisP, nextP);
    });
    return Math.min.apply({}, r);
}
exports.getMinDist = getMinDist;
/**
 *
 *
 * @param {Number} min
 * @param {Number} max
 * @returns number
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
exports.getRandomInt = getRandomInt;
exports.interp = function (value, inLow, inHigh, outLow, outHigh) {
    return ((value - inLow) / (inHigh - inLow)) * (outHigh - outLow) + outLow;
};
/**
 * @returns {number} random number yall
 */
function randomGaussian() {
    var x1 = Math.random() * 2 - 1;
    var x2 = Math.random() * 2 - 1;
    var w = x1 * x1 + x2 * x2;
    while (w >= 1) { }
    w = Math.sqrt((-2 * Math.log(w)) / w);
    return x1 * w;
}
exports.randomGaussian = randomGaussian;
function polygonExtent(polygon) {
    var xVals = polygon.map(function (vx) { return vx[0]; });
    var yVals = polygon.map(function (vx) { return vx[1]; });
    return [
        [Math.min.apply({}, xVals), Math.min.apply({}, yVals)],
        [Math.max.apply({}, xVals), Math.max.apply({}, yVals)]
    ];
}
exports.polygonExtent = polygonExtent;
