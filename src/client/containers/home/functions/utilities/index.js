import { REGION_TYPE_GROUP } from '../../constants';

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
};

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
};

let ID_TOTAL_GENERATED = 0;
/**
 * Create and return a unique numerical ID.
 * Starts at 0 and increments with each ID
 * created, regardless of destroyed objects.
 * @returns {number} Generated ID.
 */
export const generateID = function() {
    incrementTotalGeneratedIDs(); 
    return ID_TOTAL_GENERATED - 1;
};

/**
 * Adds one to the total number of generated
 * IDs so far. Mutates the constant variable
 * representing this value.
 */
export const incrementTotalGeneratedIDs = function() {
    ID_TOTAL_GENERATED += 1;
};

export const getTotalGeneratedIDs = function () {
    return ID_TOTAL_GENERATED;
};

/**
 * Returns a new object cloned from the current
 * object only containing the passed in properties.
 * @param {Object} object The object to pull properties from.
 * @param {array} properties An array of property names.
 * @returns {Object} Newly constructed object.
 */
export const pick = function (object, properties) {
    return properties.reduce((obj, property) => {
         obj[property] = object[property];
         return obj;
    }, {})
};

export const arraySwap = function(arr, x, y) {
    arr[x] = arr.splice(y, 1, arr[x])[0];
    return arr;
};

export const arrayMove = function (arr, x, y) {
    while (x < 0) {
        x += arr.length;
    }
    while (y < 0) {
        y += arr.length;
    }
    if (y >= arr.length) {
        var k = y - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(y, 0, arr.splice(x, 1)[0]);
    return arr;
};

export const getRegionTotalChildren = function (arr, x) {
    let num = arr[x].numberOfChildren;
    for (let i = x; i <= x + num; i++) {
        if ( i != x && arr[i].type === REGION_TYPE_GROUP) {
            num += arr[i].numberOfChildren;
        }
    }
    return num;
}

export const groupShift = function (arr, x, direction) {
    if (direction < 0) {
        let end =  x + arr[x].numberOfChildren;
        for (let i = x; i <= end; i++) {
            if ( i != x && arr[i].type === REGION_TYPE_GROUP) {
                end += arr[i].numberOfChildren;
            }
            arr = arraySwap(arr, i, i-1);
        }
    } else {
        let start = getRegionTotalChildren(arr, x);
        for (let i = start; i >= x; i--) {
            arr = arraySwap(arr, i, i+1);
        }
    }

    return arr;
};

export const retrieveParentGroup = function (arr, x) {
    for (let i = x; i >= 0; i--) {
        if (arr[x].groupID === arr[i].id) {
            return arr[i];
        }
    }
};

export const retrieveNearestSiblingIndex = function (arr, x, direction) {
    if (direction < 0) {
        for (let i = x - 1; i >= 0; i--) {
            if (arr[i].groupID === arr[x].groupID) {
                return i;
            }
        }
        return arr[x].groupID >= 0 ? x : 0;
    } else {
        for (let i = x + 1; i < arr.length; i++) {
            if (arr[i].groupID === arr[x].groupID) {
                if (arr[i].type === REGION_TYPE_GROUP) {
                    return i + getRegionTotalChildren(arr, i);
                }
                return i;
            }
        }
        return arr[x].groupID >= 0 ? x : arr.length - 1;
    }
};

export const canShiftRegionUp = function (arr, x) {
    return retrieveNearestSiblingIndex(arr, x, -1) !== x && x - 1 >= 0 ? true : false;
};

export const canShiftRegionDown = function (arr, x) {
    if (arr[x].type === REGION_TYPE_GROUP) {
        return x + getRegionTotalChildren(arr, x) < arr.length - 1 ? true : false;
    }

    return retrieveNearestSiblingIndex(arr, x, 1) !== x && x + 1 < arr.length ? true : false;
};
