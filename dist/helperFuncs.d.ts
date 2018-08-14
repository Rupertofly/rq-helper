export declare function hash(s: any): string;
/**
 * Checks to See if Object contains
 *
 * @param {...any} obj object to see
 * @returns {Boolean} isNested
 */
export declare function checkNested(obj: any): boolean;
export declare let recorder: any;
export declare let canvasObject: Element;
export declare let lastFrame: number;
/**
 * Adds A frame to the recording and saves if at end
 *
 */
export declare function recordFrame(): void;
/**
 * Set's up Recording
 *
 */
export declare type pt = [number, number];
export declare function distToSegment(p: pt, v: pt, w: pt): number;
/**
 *
 *
 * @param {[Number, Number][]} poly
 * @returns Number
 */
export declare function getMinDist(poly: Array<[number, number]>): any;
/**
 *
 *
 * @param {Number} min
 * @param {Number} max
 * @returns number
 */
export declare function getRandomInt(min: number, max: number): number;
export declare const interp: (value: number, inLow: number, inHigh: number, outLow: number, outHigh: number) => number;
/**
 * @returns {number} random number yall
 */
export declare function randomGaussian(): number;
export declare function polygonExtent(polygon: Array<[number, number]>): [[number, number], [number, number]];
