import { MOUSE_BUTTON_LEFT } from '../../../constants';
import node, { NODE_RADIUS, NODE_STROKE_THICKNESS } from
    '../../../../../reducers/regions/default-region/nodes/node';
import closestNode from '../../../../../reducers/regions/default-region/nodes/closest-node';
import { defaultPos } from '../../defaults';
import { removePolygonNode, addPolygonNode } from '../manipulation';
import { getPointWithinRadiusOfPoint, getDistanceBetweenPoints } from '../../utilities';
import createPolygonRegion, { MIN_POLYGON_NODES, resetPolygonRegion }
    from '../../../../../reducers/regions/default-region/polygon-region';
import { REGION_MODE_POLYGON } from '../../../actions';

/*eslint-disable*/
/**
 * Handles left click input for a polygon region.
 * Sets the polygon start point.
 * If nodes are manipulatable, checks if the click intersects a node
 * and selects it.
 * @param {Object} [polygon=createPolygonRegion()] Polygon to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {Object} [pos=defaultPos()] Position to add node to or check.
 * @returns {Object} Modified polygon.
 */
export const onPolygonLeftClick = (polygon = createPolygonRegion(), showNodes = false, pos = defaultPos()) => {
    if (!showNodes) {
        //Return as the polygon can't be changed now
        if (polygon.closed) { return polygon; }
        //Set the polygon start point
        if (!polygon.selectedNodeIndex > 0) {
            polygon.nodes[polygon.selectedNodeIndex].x = pos.x;
            polygon.nodes[polygon.selectedNodeIndex].y = pos.y;
            return polygon; 
        }
        polygon.nodes.push({...node(), x: pos.x, y: pos.y});
    } else {
        //If nodes are visible, check if the click was within the bounds of one of the nodes
        for (let i = 0; i < polygon.nodes.length; i++) {
            if (getPointWithinRadiusOfPoint(pos.x, pos.y, polygon.nodes[i].x, polygon.nodes[i].y, 
                NODE_RADIUS + NODE_STROKE_THICKNESS)) {                                  
                polygon.selectedNodeIndex = i;
            }
        }
    }

    return polygon;
};

/**
 * Handles right click input for a polygon region.
 * If an unclosed temporary region, the polygon will be closed.
 * If a closed temporary region, the polygon will be reset.
 * If nodes are manipulatable, will add or remove a node.
 * @param {Object} [polygon=createPolygonRegion()] Polygon to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {Object} [pos=defaultPos()] Position to add node to.
 * @param {function} [resetAction=null] Reset Region action. 
 * @param {function} [saveAction=null] Save Region action. 
 * @returns {Object} Modified polygon.
 */
export const onPolygonRightClick = (polygon = createPolygonRegion(), showNodes = false, pos = defaultPos(), 
    resetAction = null, saveAction = null) => {

    if (!showNodes) {
        //Close the polygon frame if it's a legal polygon
        if (polygon.selectedNodeIndex > 0 && !polygon.closed && polygon.nodes.length >= MIN_POLYGON_NODES) {
            polygon.closed = true;
            if (saveAction !== null) {
                saveAction({region: Object.assign({}, polygon)});
            }
            polygon = resetPolygonRegion(polygon);
        } else {
            //If the polygon was already closed reset it
            polygon = resetPolygonRegion(polygon);
            if (resetAction !== null) {
                resetAction({mode:REGION_MODE_POLYGON});
            }
        }
    } else {
        //Check for polygon node manipulation
        polygon = checkForPolygonNodeSelection(polygon, pos);
        if (polygon.selectedNodeIndex >= 0 && polygon.selectedNodeIndex < polygon.nodes.length) { 
            polygon = removePolygonNode(polygon);
        } else {
            polygon = addPolygonNode(polygon, pos);
        }                                 
    }
    
    //Reset properties
    polygon.closestNode = closestNode();
    return polygon;
};

/**
 * Handles dragging input for a polygon region.
 * Updates selected node position if possible.
 * @param {Object} [polygon=createPolygonRegion()] Polygon to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {Object} [pos=defaultPos()] Position to update current node with.
 * @returns {Object} Modified polygon.
 */
export const onPolygonDrag = (polygon = createPolygonRegion(), showNodes = false, pos = defaultPos()) => {
    if (!showNodes) {
        //Polygon isn't modifiable anymore
        if (polygon.closed) { return polygon; }
        //Update node position
        polygon.nodes[polygon.selectedNodeIndex].x = pos.x;
        polygon.nodes[polygon.selectedNodeIndex].y = pos.y;
    } else {
        //Selected node is out of bounds
        if (polygon.selectedNodeIndex < 0 || polygon.selectedNodeIndex >= polygon.nodes.length) { return polygon; }
        //Update node position
        polygon.nodes[polygon.selectedNodeIndex].x = pos.x;
        polygon.nodes[polygon.selectedNodeIndex].y = pos.y;
    }
    return polygon;
};

/**
 * Handles input release for a polygon region.
 * Modifies the selected node index.
 * @param {Object} [polygon=createPolygonRegion()] Polygon to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {number} [button=MOUSE_BUTTON_LEFT] Which button was released. [MOUSE_BUTTON_ENUM]
 * @returns {Object} Modified polygon
 */
export const onPolygonRelease = (polygon = createPolygonRegion(), showNodes = false, button = MOUSE_BUTTON_LEFT) => {
    if (!showNodes) {
        if (polygon.closed) { return polygon; }
        if ( button === MOUSE_BUTTON_LEFT ) {
            polygon.selectedNodeIndex++;
        }
    } else {
        polygon.selectedNodeIndex = -1;        
    }
    return polygon;
};

/**
 * Checks if a polygon node has been clicked on and updates the 
 * closestNode property of the polygon with the information.
 * @param {Object} [polygon=createPolygonRegion()] Polygon to check.
 * @param {Object} [pos=defaultPos()] Position to check for node.
 * @returns {Object} Modified polygon.
 */
export const checkForPolygonNodeSelection = (polygon = createPolygonRegion(), pos = defaultPos()) => {
    for (let i = 0; i < polygon.nodes.length; i++) {
        //Get the distance between the current node and the point
        const dist = getDistanceBetweenPoints(pos.x, pos.y, polygon.nodes[i].x, polygon.nodes[i].y);
        //Update the node index if the click was inside the node                                      
        if (dist <= NODE_RADIUS + NODE_STROKE_THICKNESS) { 
            polygon.selectedNodeIndex = i;                                                                         
        }
        //Update the current closest node if necessary
        if (polygon.closestNode.dist < 0 || dist < polygon.closestNode.dist) {
            polygon.closestNode.dist = dist;
            polygon.closestNode.index = i;
        }
    }

    return polygon;
}