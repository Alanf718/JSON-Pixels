import React, {Component} from 'react';
import {mouse, CanvasQL} from 'gocanvas';
import './style.scss';
import { resetRectangleRegion } from '../../../../reducers/regions/default-region/rect-region';
import { resetPolygonRegion } from '../../../../reducers/regions/default-region/polygon-region';
import { onPolygonRelease, onPolygonDrag, onPolygonRightClick, onPolygonLeftClick }
    from '../../functions/polygon-region/input';
import { onRectangleRelease, onRectangleDrag, onRectangleLeftClick, onRectangleRightClick }
    from '../../functions/rectangle-region/input';
import { NODE_STROKE_COLOUR, NODE_STROKE_THICKNESS, NODE_FILL_COLOUR, NODE_RADIUS }
    from '../../../../reducers/regions/default-region/nodes/node';
import { drawRectangleRegion } from '../../functions/rectangle-region/draw';
import { drawPolygonRegion } from '../../functions/polygon-region/draw';
import { REGION_MODE_RECTANGLE, REGION_MODE_POLYGON } from '../../actions';
import { REGION_TYPE_RECTANGLE, REGION_TYPE_POLYGON, MOUSE_INPUT_PRESS, MOUSE_INPUT_DRAG,
    MOUSE_INPUT_RELEASE, MOUSE_BUTTON_LEFT, MOUSE_BUTTON_MIDDLE, MOUSE_BUTTON_RIGHT } from '../../constants';
import createRectangleRegion from '../../../../reducers/regions/default-region/rect-region';
import createPolygonRegion from '../../../../reducers/regions/default-region/polygon-region';

export class RegionSelector extends Component {

    /* eslint-disable */    
    constructor(props) {
        super(props);
        const {regionMode, regionList, regionConfig, showNodes, addRegion} = this.props;
        this.tempRegion = null;
        this.regionMode = regionMode;
        this.regionList = regionList;
        this.regionConfig = {...regionConfig};
        this.showNodes = showNodes;
        addRegion({mode: regionMode});
        this.tempRegion = regionList[regionConfig.selectedRegion];
    }


    /**
     * Resets the temporary region to it's initial
     * state, based on the region mode.
     */
    assignTempRegion() {
        switch(this.regionMode) {
            case REGION_MODE_RECTANGLE:
                if (this.tempRegion === null) {
                    this.tempRegion = createRectangleRegion();
                }
                if (this.tempRegion.type != REGION_TYPE_RECTANGLE) {
                    this.tempRegion = createRectangleRegion();
                }
                this.tempRegion = resetRectangleRegion(this.tempRegion);
                break;
            case REGION_MODE_POLYGON:
                if (this.tempRegion === null) {
                    this.tempRegion = createPolygonRegion();
                }
                if (this.tempRegion.type != REGION_TYPE_POLYGON) {
                    this.tempRegion = createPolygonRegion();
                }
                this.tempRegion = resetPolygonRegion(this.tempRegion);
                break;
        }
    }    

    /**
     * Draws the nodes of the passed in region.
     * @param {Object} region The region to draw nodes
     * for.
     */
    drawNodes(region) {
        for (let i = 0; i < region.nodes.length; i++) {
            this.ctx.beginPath();
            this.ctx.arc(region.nodes[i].x, region.nodes[i].y, NODE_RADIUS, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = NODE_FILL_COLOUR;
            this.ctx.fill();
            this.ctx.lineWidth = NODE_STROKE_THICKNESS;
            this.ctx.strokeStyle = NODE_STROKE_COLOUR;
            this.ctx.stroke();
        }
    }

    /**
     * A filtered version of the original draw function
     * which passes the region to the correct drawing
     * function depending on it's type.
     * @param {Object} region The region to pass through.
     * @param {Object} canvas The canvas to draw to.
     */
    drawFilter(region, canvas) {
        if(region.type === REGION_TYPE_RECTANGLE){
            drawRectangleRegion(region, canvas);
        } else if (region.type === REGION_TYPE_POLYGON) {
            drawPolygonRegion(region, this.ctx);
        }
    }

    /**
     * Draws all entities, both saved and temporary
     * where appropriae, to the canvas.
     */
    draw() {
        const {canvas} = this;
        canvas.primitive().clear();
        for (let i = 0; i < this.regionList.length; i++)
        {
            if (this.showNodes && i == this.regionConfig.selectedRegion) {
                this.drawFilter(this.tempRegion, canvas);
                this.drawNodes(this.tempRegion);
            } else if (!this.regionList[i].saved) {
                this.drawFilter(this.tempRegion, canvas);
            } else {
                this.drawFilter(this.regionList[i], canvas);
            }        
        }
    }

    /**
     * Checks a number of properties and returns 
     * if showing and modifying nodes is currently
     * allowed for this region.
     * @returns {boolean} Whether showing nodes is 
     * currently a valid option.
     */
    tryToggleNodes() {
        if (this.regionList.length <= 0) { return false; }
        if(this.regionConfig.selectedRegion < 0 || 
            this.regionConfig.selectedRegion >= this.regionList.length) {
            return false;
        }
        if (Object.keys(this.regionList[this.regionConfig.selectedRegion]).length === 0) { return false; }
        if (this.regionList[this.regionConfig.selectedRegion].type === REGION_TYPE_POLYGON) {
            if (!this.regionList[this.regionConfig.selectedRegion].closed) {
                return false;
            }
        }

        return true;
    }

   /**
     * Delegates properties from a mouse input
     * event to the correct rectangle region
     * functions based on the type of input event
     * and button pressed.
     * @param {Object} pos Mouse position.
     * @param {string} type Type of input event. 
     * [MOUSE_INPUT_ENUM]
     * @param {Object} button The mouse button for 
     * the event. [MOUSE_BUTTON_ENUM]
     */
    onRectInput(pos, type, button) {
        //Call correct methods based on input type
        switch(type) {
            case MOUSE_INPUT_PRESS : {
                switch(button) {
                    case MOUSE_BUTTON_LEFT : {
                        this.tempRegion = onRectangleLeftClick(this.tempRegion, this.showNodes, pos);
                        break;
                    }
                    case MOUSE_BUTTON_MIDDLE :
                    case MOUSE_BUTTON_RIGHT : {
                        this.tempRegion = onRectangleRightClick(this.tempRegion, this.showNodes, this.resetRegion);
                        break;
                    }
                }
                break;                        
            }
            case MOUSE_INPUT_DRAG : {
                this.tempRegion = onRectangleDrag(this.tempRegion, this.showNodes, pos);
                break;
            }
            case MOUSE_INPUT_RELEASE : {
                switch(button) {
                    case MOUSE_BUTTON_LEFT : {
                        this.tempRegion = onRectangleRelease(this.tempRegion, this.saveRegion);
                        break;
                    }
                }
                break;
            }
        }
    }

    /**
     * Delegates properties from a mouse input
     * event to the correct polygon region
     * functions based on the type of input event
     * and button pressed.
     * @param {Object} pos Mouse position.
     * @param {string} type Type of input event. 
     * [MOUSE_INPUT_ENUM]
     * @param {Object} button The mouse button for 
     * the event. [MOUSE_BUTTON_ENUM]
     */
    onPolygonInput(pos, type, button) {
        switch(type) {
            case MOUSE_INPUT_PRESS : {
                switch(button) {
                    case MOUSE_BUTTON_LEFT : {
                        this.tempRegion = onPolygonLeftClick(this.tempRegion, this.showNodes, pos);
                        break;
                    }
                    case MOUSE_BUTTON_MIDDLE :
                    case MOUSE_BUTTON_RIGHT : {
                        this.tempRegion = onPolygonRightClick(this.tempRegion, this.showNodes, pos, this.resetRegion, this.saveRegion);
                        break;
                    }
                }
                break;
            }
            case MOUSE_INPUT_DRAG : {
                this.tempRegion = onPolygonDrag(this.tempRegion, this.showNodes, pos);
                break;
            }
            case MOUSE_INPUT_RELEASE : {
                this.tempRegion = onPolygonRelease(this.tempRegion, this.showNodes, button);
                break;
            }
        }
    }

    /**
     * Delegates properties from a mouse input
     * event to the correct functions based
     * on the region mode and then redraws the 
     * canvas.
     * @param {Object} evt Mouse event.
     */
    onMouseInput(evt) {
        const {pos, type, button} = evt;

        switch(this.regionMode) {
            case REGION_MODE_RECTANGLE : {
                this.onRectInput(pos, type, button);            
                break;
            }
            case REGION_MODE_POLYGON : {
                this.onPolygonInput(pos, type, button);
                break;
            }
        }

        this.draw();
    }

    contextMenu(e) {
        e.preventDefault();
    }

    componentWillUpdate(nextProps, nextState) {
        const {regionMode, regionList, regionConfig, saveRegion, saveRegionAction, 
            toggleSaveRegion, toggleNodes, showNodes} = nextProps;

        if (this.regionMode != regionMode) {
            this.regionMode = regionMode;
            this.assignTempRegion ();
        }
        
        if (this.regionConfig.selectedRegion != regionConfig.selectedRegion) {
            this.tempRegion = Object.assign({}, regionList[regionConfig.selectedRegion]);
        }

        if (saveRegion) {
            saveRegionAction({region: this.tempRegion})
            this.assignTempRegion();
            toggleSaveRegion({state: false});
            toggleNodes({state: false});
        }

        if (showNodes) {
            if (this.tryToggleNodes()) {
                this.showNodes = showNodes;
                this.tempRegion = regionList[regionConfig.selectedRegion];
            } else {
                toggleNodes({state: false});
            }
        } else if (showNodes != this.showNodes){
            this.showNodes = showNodes;
            this.assignTempRegion();
        }

        this.draw();        
    }

    // called on first render
    componentDidMount() {
        const domElement = document.querySelector('.display');
        const cql = CanvasQL('.display canvas');
        cql.primitive().clear();

        this.canvas = cql;
        this.ctx = document.querySelector('.display canvas').getContext("2d");
        this.mouseSubscription = mouse(domElement).subscribe(evt => this.onMouseInput(evt));
    }

    // called on any updated renders
    componentDidUpdate() {
        this.mouseSubscription.unsubscribe();
        const domElement = document.querySelector('.display');
        this.mouseSubscription = mouse(domElement).subscribe(evt => this.onMouseInput(evt));
    }

    componentWillUnmount() {
        this.mouseSubscription.unsubscribe();
    }

    render() {
        const {regionMode, regionList, regionConfig, layerConfig, toggleNodes, addRegion, removeRegion, saveRegion,
            saveRegionAction, updateSelectedRegion, resetRegion} = this.props;
        this.regionMode = regionMode;
        this.regionList = regionList;
        this.regionConfig = {...regionConfig};
        this.layerConfig = layerConfig;
        this.toggleNodes = toggleNodes;
        this.addRegion = addRegion;
        this.removeRegion = removeRegion;
        this.resetRegion = resetRegion;
        this.saveRegion = saveRegionAction;
        this.updateSelectedRegion = updateSelectedRegion;

        return (
            <div className="display">
                <canvas width="640" height="480" onContextMenu={this.contextMenu}/>
            </div>
        );
    }
}

export default RegionSelector;
