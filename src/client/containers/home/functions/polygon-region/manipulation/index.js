import { MIN_POLYGON_NODES } from '../../../../../reducers/regions/default-region/polygon-region';
import { defaultPolygon, defaultPos } from '../defaults';
import { getDistanceBetweenPoints } from '../../../utilities';
import defaultNode from '../../../../../reducers/regions/default-region/nodes/node';

/*eslint-disable*/
/**
 * Adds a polygon node at the specified point and joins it to the correct nodes.
 * NOTE: Currently buggy and does NOT correctly join the node in certain situations. To be fixed.
 * @param {Object} [polygon=defaultPolygon] Polygon to be modified.
 * @param {Object} [pos=defaultPolygon] Position to add node.
 * @returns {Object} Modified polygon
 */
export const addPolygonNode = (polygon = defaultPolygon, pos = defaultPos) => {
    //Get the distance between the point and previously adjoining node to the current closest node.
    let prevDist = -1;
    if (polygon.closestNode.index - 1 >= 0) {
        prevDist = getDistanceBetweenPoints(pos.x, pos.y, 
            polygon.nodes[polygon.closestNode.index - 1].x, polygon.nodes[polygon.closestNode.index - 1].y);
    } else {
        prevDist = getDistanceBetweenPoints(pos.x, pos.y, 
            polygon.nodes[polygon.nodes.length - 1].x, polygon.nodes[polygon.nodes.length - 1].y);                                            
    }
    //Get the distance between the point and next adjoining node to the current closest node.
    let nextDist = -1;
    if (polygon.closestNode.index + 1 < polygon.nodes.length) {
        nextDist = getDistanceBetweenPoints(pos.x, pos.y, polygon.nodes[polygon.closestNode.index + 1].x, polygon.nodes[polygon.closestNode.index + 1].y);
    } else {
        nextDist = getDistanceBetweenPoints(pos.x, pos.y, polygon.nodes[0].x, polygon.nodes[0].y);                                            
    }

    //Compare if the point is closer to the next or previous adjoining node so that it can be placed
    //at the correct index.
    if (prevDist < nextDist) {
        polygon.nodes.splice(polygon.closestNode.index,0,{...defaultNode, x: pos.x, y: pos.y});                                            
    } else {
        polygon.nodes.splice(polygon.closestNode.index + 1,0,{...defaultNode, x: pos.x, y: pos.y});
    }

    return polygon;
};

/**
 * Remove the currently selected polygon node.
 * @param {Object} [polygon=defaultPolygon] Polygon to be modified.
 * @returns {Object} Modified polygon
 */
export const removePolygonNode = (polygon = defaultPolygon) => {
    //Exit early as the polygon is the smallest it can be.
    if (polygon.nodes.length <= MIN_POLYGON_NODES) { return polygon; }
    polygon.nodes.splice(polygon.selectedNodeIndex, 1);
    polygon.selectedNodeIndex = -1;

    return polygon;
};
