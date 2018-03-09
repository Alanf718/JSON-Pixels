/**
 * Generate a random integer between specified upper
 * and lower bounds.
 * @param {number} min Minimum bound for generation.
 * @param {number} max Maximum bound for generation.
 * @returns {number} Random number.
 */
export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Factory function to generate a colour object
 * with random values.
 * @returns {Object} Generated colour object.
 */
export const getRandomColour = function() {
    const min = 0;
    const max = 256;
    return {
        r: getRandomInt(min, max),
        g: getRandomInt(min, max),
        b: getRandomInt(min, max),
        a: 0.5
    };
};

/* eslint-disable */
/**
 * Calculates and returns the distance between 
 * 2 points.
 * @param {number} mx X value of first point.
 * @param {number} my Y value of first point.
 * @param {number} nx X value of second point.
 * @param {number} ny Y value of second point.
 * @returns {number} Distance.
 */
export const getDistanceBetweenPoints = function(mx,my,nx,ny) {
    return (Math.sqrt(Math.pow((mx - nx), 2) + Math.pow((my - ny), 2)));
}

/**
 * Calculates and returns whether a specified 
 * point is within the radius of another point.
 * @param {number} mx X value of first point.
 * @param {number} my Y value of first point.
 * @param {number} nx X value of second point.
 * @param {number} ny Y value of second point.
 * @param {number} radius Radius of second point.
 * @returns {boolean} Whether point is within radius.
 */
export const getPointWithinRadiusOfPoint = function(mx,my,nx,ny,radius) {
    if (getDistanceBetweenPoints(mx,my,nx,ny) <= radius) {
        return true;
    } 
    return false;
}  
