export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

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
export const getDistanceBetweenPoints = function(mx,my,nx,ny) {
    return (Math.sqrt(Math.pow((mx - nx), 2) + Math.pow((my - ny), 2)));
}

export const getPointWithinRadiusOfPoint = function(mx,my,nx,ny,nodeSize) {
    if (getDistanceBetweenPoints(mx,my,nx,ny) <= nodeSize) {
        return true;
    } 
    return false;
}  
