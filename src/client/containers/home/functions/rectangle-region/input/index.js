import { NODE_RADIUS, NODE_STROKE_THICKNESS } from '../../../../../reducers/regions/default-region/nodes/node';
import { RECT_NODE_TOPLEFT_CORNER, RECT_NODE_TOPRIGHT_CORNER, RECT_NODE_BOTTOMLEFT_CORNER,
    RECT_NODE_BOTTOMRIGHT_CORNER } from '../../../enums/rectangle-region-nodes';
import { defaultRectangle, defaultPos } from '../defaults';
import { REGION_MODE_RECTANGLE } from '../../../enums/region-modes';

/*eslint-disable*/
/**
 * Handles left click input for a rectangle region.
 * Sets the rectangle start point and adds a new region to the state.
 * If nodes are manipulatable, checks if the click intersects a node
 * and selects it.
 * @param {Object} [rect=defaultRectangle] Rectangle to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {Object} [pos=defaultPos] Position to add node to or check.
 * @param {function} [action=null] Add Region action.
 * @returns {Object} Modified rectangle.
 */
export const onRectangleLeftClick = (rect = defaultRectangle, showNodes = false, pos = defaultPos, action = null) => {
    //Start drawing a new rectangle if nodes aren't turned on
    if (!showNodes) {
        if (action !== null) {
            action({mode: REGION_MODE_RECTANGLE, region: rect});            
        }
        rect = defaultRectangle;
        rect.nodes[0] = pos;
    } else {
        //If nodes are being turned on, check if the click was within the bounds of one of the nodes 
        //and set it as the selected node
        for (let i = 0; i < rect.nodes.length; i++) {
            if (getPointWithinRadiusOfPoint(pos.x, pos.y, rect.nodes[i].x, rect.nodes[i].y, 
                NODE_RADIUS + NODE_STROKE_THICKNESS)) {
                rect.selectedNodeIndex = i;
            }
        }
    }

    return rect;
};

/**
 * Handles dragging input for a rectangle region.
 * Updates selected node position if possible, otherwise changes
 * the initial size of the rectangle.
 * @param {Object} [rect=defaultRectangle] Rectangle to handle input for.
 * @param {boolean} [showNodes=false] Are nodes currently being shown?
 * @param {Object} [pos=defaultPos] Position to update nodes with.
 * @returns {Object} Modified rectangle.
 */
export const onRectangleDrag = (rect = defaultRectangle, showNodes = false, pos = defaultPos) => {
    if (showNodes) {
        const offsetX = rect.nodes[0].x - pos.x;
        const offsetY = rect.nodes[0].y - pos.y;

        //Depending on the selected corner of the rectangle, manipulate
        // it's properties accordingly to correctly resize it.
        switch(rect.selectedNodeIndex) {
            case RECT_NODE_TOPLEFT_CORNER : {
                rect.nodes[0].x = pos.x;
                rect.nodes[0].y = pos.y;
                rect.width += offsetX;
                rect.height += offsetY;
                break;
            }
            case RECT_NODE_TOPRIGHT_CORNER : {
                rect.width = pos.x - rect.nodes[0].x;
                rect.nodes[0].y = pos.y;
                rect.height += offsetY;
                break;
            }
            case RECT_NODE_BOTTOMLEFT_CORNER : {
                rect.nodes[0].x = pos.x;
                rect.height = pos.y - rect.nodes[0].y;
                rect.width += offsetX;                                    
                break;
            }        
            case RECT_NODE_BOTTOMRIGHT_CORNER : {
                rect.width = pos.x - rect.nodes[0].x;
                rect.height = pos.y - rect.nodes[0].y;
                break;
            }                      
        }
    } else {
        //Simply drag the rect to set the size
        rect.width = pos.x - rect.nodes[0].x;
        rect.height = pos.y - rect.nodes[0].y;
    }
         
    rect.nodes[RECT_NODE_TOPRIGHT_CORNER] = {x: rect.nodes[0].x + rect.width, y: rect.nodes[0].y},
    rect.nodes[RECT_NODE_BOTTOMLEFT_CORNER] = {x: rect.nodes[0].x, y: rect.nodes[0].y + rect.height},
    rect.nodes[RECT_NODE_BOTTOMRIGHT_CORNER] = {x: rect.nodes[0].x + rect.width, y: rect.nodes[0].y + rect.height};

    return rect;
};

/**
 * Handles input release for a rectangle region.
 * Modifies the selected node index and saves the region.
 * @param {Object} [rect=defaultRectangle] Rectangle to handle input for.
 * @param {function} [action=null] Save Region action.
 * @returns {Object} Modified rectangle.
 */
export const onRectangleRelease = (rect = defaultRectangle, action = null) => {
    //Reset the selected node.
    rect.selectedNodeIndex = -1;
    if (action !== null ) {
        console.log(action);
        action({region: rect});
    }

    return rect;
};