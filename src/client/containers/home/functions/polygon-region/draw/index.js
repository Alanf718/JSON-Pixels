/*eslint-disable*/

/**
 * Draws the passed in polygon region.
 * @param {Object} region The region to be drawn.
 * @param {Object} ctx The canvas context to draw to.
 */
export const drawPolygonRegion = (region, ctx) => {
    ctx.fillStyle = 'rgba('
        + region.color.r
        + ', ' + region.color.g
        + ', ' + region.color.b
        + ', ' + region.color.a
        + ')';
    ctx.strokeStyle = 'rgba('
        + region.color.r
        + ', ' + region.color.g
        + ', ' + region.color.b
        + ', ' + region.color.a
        + ')';
    ctx.lineWidth = 5;
    
    ctx.beginPath();
    ctx.moveTo(region.nodes[0].x, region.nodes[0].y);
    for (let i = 1; i < region.nodes.length; i++) {
        ctx.lineTo(region.nodes[i].x,region.nodes[i].y);
    }
    if (region.closed) {
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.stroke();
    }
};
