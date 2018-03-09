import React, {Component} from 'react';
import {mouse, CanvasQL} from 'gocanvas';
import './style.scss';
import { REGION_MODE_RECTANGLE, REGION_MODE_POLYGON } from '../../enums/region-modes';
import baseRegion from '../../../../reducers/regions/default-region';
import rectangleRegion from '../../../../reducers/regions/default-region/rect-region';
import polygonRegion from '../../../../reducers/regions/default-region/polygon-region';
import { MOUSE_INPUT_PRESS, MOUSE_INPUT_DRAG, MOUSE_INPUT_RELEASE } from '../../enums/mouse-input-types';
import { MOUSE_BUTTON_LEFT, MOUSE_BUTTON_MIDDLE, MOUSE_BUTTON_RIGHT } from '../../enums/mouse-buttons';
import { onPolygonRelease, onPolygonDrag, onPolygonRightClick, onPolygonLeftClick }
    from '../../functions/polygon-region/input';
import { onRectangleRelease, onRectangleDrag, onRectangleLeftClick } from '../../functions/rectangle-region/input';
import { REGION_TYPE_POLYGON, REGION_TYPE_RECTANGLE } from '../../enums/region-types';
import { NODE_STROKE_COLOUR, NODE_STROKE_THICKNESS, NODE_FILL_COLOUR, NODE_RADIUS }
    from '../../../../reducers/regions/default-region/nodes/node';

export class RegionSelector extends Component {

    constructor(props) {
        super(props);
        const {regionMode, regions, showNodes, addRegion} = this.props;
        this.tempRegion = null;
        this.regionMode = regionMode;
        this.regions = regions;
        this.showNodes = showNodes;
        this.assignTempRegion();
        addRegion({mode: regionMode});
    }

    /* eslint-disable */

    /*
    **    Region resets
    */
    assignTempRegion() {
        switch(this.regionMode) {
            case REGION_MODE_RECTANGLE:
                this.tempRegion = Object.assign({}, baseRegion, rectangleRegion);
                break;
            case REGION_MODE_POLYGON:
                this.tempRegion = Object.assign({}, baseRegion, polygonRegion);
                break;
        }
    }

    /*
    **    Region drawing
    */
    drawRectangleRegion(region, canvas) {
        canvas
            .primitive()
            .rect()
            .color('rgba('
                + region.color.r
                + ', ' + region.color.g
                + ', ' + region.color.b
                + ', ' + region.color.a
                + ')')
            .at(region.nodes[0].x, region.nodes[0].x)
            .size(region.width, region.height)
            .go();
    }

    drawPolygonRegion(region) {
        this.ctx.fillStyle = 'rgba('
            + region.color.r
            + ', ' + region.color.g
            + ', ' + region.color.b
            + ', ' + region.color.a
            + ')';
        this.ctx.strokeStyle = 'rgba('
            + region.color.r
            + ', ' + region.color.g
            + ', ' + region.color.b
            + ', ' + region.color.a
            + ')';
        this.ctx.lineWidth = 5;
        
        this.ctx.beginPath();
        this.ctx.moveTo(region.nodes[0].x, region.nodes[0].y);
        for (let j = 1; j < region.nodes.length; j++) {
            this.ctx.lineTo(region.nodes[j].x,region.nodes[j].y);
        }
        if (region.closed) {
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }

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

    drawFilter(region, canvas, i) {
        if(region.type === REGION_TYPE_RECTANGLE){
            this.drawRectangleRegion(region, canvas);
        } else if (region.type === REGION_TYPE_POLYGON) {
            this.drawPolygonRegion(region);
        }

        if (this.showNodes && i == this.regions.config.selectedRegion) {
            this.drawNodes(region);
        }
    }

    draw() {
        const {canvas} = this;
        canvas.primitive().clear();

        for (let i = 0; i < this.regions.list.length; i++)
        {
            if (!this.regions.list[i].saved) {
                this.drawFilter(this.tempRegion, canvas, i);
            } else {
                this.drawFilter(this.regions.list[i], canvas, i);
            }            
        }
    }

    /*
    **    Region manipulation
    */

    //Change the currently selected layer by a specified value and 
    //retrieve the correctly defined region
    offsetLayerIndex(offset) {
        if ( this.regions.index + offset >= this.regions.list.length ||
             this.regions.index + offset < 0 
            ) {
            return;
        }

        this.regions.index += offset;
        if (this.regions.list[this.regions.index].type == 'rect') {
            this.rect = this.regions.list[this.regions.index];
        } else if (this.regions.list[this.regions.index].type == 'polygon') {
            this.polygon = this.regions.list[this.regions.index];
        }
    }

    //Toggle whether or not nodes are currently being shown for the selected region
    tryToggleNodes() {
        if (this.regions.list.length <= 0) { return false; }
        if (Object.keys(this.regions.list[this.regions.config.selectedRegion]).length === 0) { return false; }
        if (this.regions.list[this.regions.config.selectedRegion].type === REGION_TYPE_POLYGON) {
            if (!this.regions.list[this.regions.config.selectedRegion].closed) {
                return false;
            }
        }
        return true;
    }

    /*
    **    Rect input methods
    */

    onRectInput(pos, type) {
        //Call correct methods based on input type
        switch(type) {
            case MOUSE_INPUT_PRESS : {
                this.tempRegion = onRectangleLeftClick(this.tempRegion, this.showNodes, pos);
                break;                        
            }
            case MOUSE_INPUT_DRAG : {
                this.tempRegion = onRectangleDrag(this.tempRegion, this.showNodes, pos);
                break;
            }
            case MOUSE_INPUT_RELEASE : {
                this.tempRegion = onRectangleRelease(this.tempRegion, this.saveRegion);
                this.addRegion({mode:this.regionMode});      
                break;
            }
        }
    }

    /*
    **    Polygon input methods
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
                        const rClickObj = onPolygonRightClick(this.tempRegion, this.showNodes, pos);
                        this.tempRegion = rClickObj.polygon;
                        if (rClickObj.add) {
                            this.addRegion({mode: regionMode, region: this.tempRegion});
                            this.assignTempRegion();
                        }
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
    
    /*
    **    Input checks
    */
    onMouseInput(evt) {
        const {pos, type, button} = evt;
        const regionMode = this.regionMode;

        switch(regionMode) {
            case REGION_MODE_RECTANGLE : {
                this.onRectInput(pos, type);            
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
        const {regionMode, saveRegion, saveRegionAction, 
            toggleSaveRegion, toggleNodes, showNodes} = nextProps;

        if (this.regionMode != regionMode) {
            this.assignTempRegion ();
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
            } else {
                toggleNodes({state: false});
            }
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
        const {regionMode, regions, layerConfig, toggleNodes, addRegion, removeRegion, saveRegion,
            saveRegionAction} = this.props;
        this.regionMode = regionMode;
        this.regions = regions;
        this.layerConfig = layerConfig;
        this.toggleNodes = toggleNodes;
        this.addRegion = addRegion;
        this.removeRegion = removeRegion;
        this.saveRegion = saveRegionAction;

        return (
            <div className="display">
                <canvas width="640" height="480" onContextMenu={this.contextMenu}/>
            </div>
        );
    }
}

export default RegionSelector;
