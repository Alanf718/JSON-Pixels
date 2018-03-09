/*eslint-disable*/

/**
 * Draws the passed in rectangle region.
 * @param {Object} region The region to be drawn.
 * @param {Object} canvas The canvas to draw to.
 */
export const drawRectangleRegion = (region, canvas) => {
    canvas
        .primitive()
        .rect()
        .color('rgba('
            + region.color.r
            + ', ' + region.color.g
            + ', ' + region.color.b
            + ', ' + region.color.a
            + ')')
        .at(region.nodes[0].x, region.nodes[0].y)
        .size(region.width, region.height)
        .go();
};
