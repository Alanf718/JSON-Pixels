import React, {Component} from 'react';
import {mouse, CanvasQL} from 'gocanvas';
import {getRandomColour, getDistanceBetweenPoints, getPointWithinRadiusOfPoint} from '../../utilities/index';

import './style.scss';

export class RegionSelector extends Component {

    constructor(props) {
        super(props);
        this.resetPolygon();
        this.resetRectangle();
        this.regions = {
            list: [],
            index: 0,
            showNodes: false,
            nodeRadius: 10,
            nodeStrokeSize: 5,
            nodeFillColour: '#ffffff',
            nodeStrokeColour: '#dddddd'
        };
        this.shape = 'rect';
    }

    /* eslint-disable */
    /*
    **    Region resets
    */
    resetPolygon() {
        this.polygon = {
            type: 'polygon',
            color: getRandomColour(),
            nodes: [{x: 0, y: 0}],
            index: 0,
            closed: false,
            selectedNodeIndex: -1,
            closestNode: {index:-1 , dist: -1}
        };
    }

    resetRectangle() {
        this.rect = {
            type: 'rect',
            color: getRandomColour(),
            nodes: [{x: 0, y: 0},
                    {x: 0, y: 0},
                    {x: 0, y: 0},
                    {x: 0, y: 0}],
            start: {x: 0, y: 0},
            size: {x: 0, y: 0},
            selectedNodeIndex: -1,
            closestNode: {index:-1 , dist: -1}
        };
    }

    /*
    **    Region drawing
    */
    drawRectangleRegion(i, canvas) {
        canvas
            .primitive()
            .rect()
            .color('rgba('
                + this.regions.list[i].color.r
                + ', ' + this.regions.list[i].color.g
                + ', ' + this.regions.list[i].color.b
                + ', ' + this.regions.list[i].color.a
                + ')')
            .at(this.regions.list[i].start.x, this.regions.list[i].start.y)
            .size(this.regions.list[i].size.x, this.regions.list[i].size.y)
            .go();
    }

    drawPolygonRegion(i) {
        this.ctx.fillStyle = 'rgba('
            + this.regions.list[i].color.r
            + ', ' + this.regions.list[i].color.g
            + ', ' + this.regions.list[i].color.b
            + ', ' + this.regions.list[i].color.a
            + ')';
        this.ctx.strokeStyle = 'rgba('
            + this.regions.list[i].color.r
            + ', ' + this.regions.list[i].color.g
            + ', ' + this.regions.list[i].color.b
            + ', ' + this.regions.list[i].color.a
            + ')';
        this.ctx.lineWidth = 5;
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.regions.list[i].nodes[0].x, this.regions.list[i].nodes[0].y);
        for (let j = 1; j < this.regions.list[i].nodes.length; j++) {
            this.ctx.lineTo(this.regions.list[i].nodes[j].x, this.regions.list[i].nodes[j].y);
        }
        if (this.regions.list[i].closed) {
            this.ctx.closePath();
            this.ctx.fill();
        } else {
            this.ctx.stroke();
        }
    }

    drawNodes(i) {
        for (let j = 0; j < this.regions.list[i].nodes.length; j++) {
            this.ctx.beginPath();
            this.ctx.arc(this.regions.list[i].nodes[j].x, this.regions.list[i].nodes[j].y, this.regions.nodeRadius, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = this.regions.nodeFillColour;
            this.ctx.fill();
            this.ctx.lineWidth = this.regions.nodeStrokeSize;
            this.ctx.strokeStyle = this.regions.nodeStrokeColour;
            this.ctx.stroke();
        }
    }

    draw() {
        const {canvas} = this;
        canvas.primitive().clear();
        
        for (let i = 0; i < this.regions.list.length; i++)
        {
            if(this.regions.list[i].type == 'rect'){
                this.drawRectangleRegion(i, canvas);
            } else if (this.regions.list[i].type == 'polygon') {
                this.drawPolygonRegion(i);
            }

            if (this.regions.showNodes && i == this.regions.index) {
                this.drawNodes(i);
            }
        }
    }

    /*
    **    Region manipulation
    */
    //Saves the currently define region and creates a new layer if it was the last in the list
    saveRegion() {
        if (this.regions.index == this.regions.list.length - 1) {
            this.regions.index++;
            this.regions.list.push({});
        }
        this.resetPolygon();
        this.resetRectangle();
        this.regions.showNodes = false;
    }

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
    toggleNodes() {
        if (this.regions.list.length <= 0) { return; }
        if (Object.keys(this.regions.list[this.regions.index]).length === 0) { return; }
        if (this.regions.list[this.regions.index].type == 'polygon') {
            if (!this.regions.list[this.regions.index].closed) {
                return;
            }
        }
        this.regions.showNodes = !this.regions.showNodes;        
    }

    //Checks if a polygon node has been clicked on
    checkForPolygonNodeSelection(pos) {
        for (let i = 0; i < this.polygon.nodes.length; i++) {
            //Get the distance between the current node and the point
            const dist = getDistanceBetweenPoints(pos.x, pos.y, this.polygon.nodes[i].x, this.polygon.nodes[i].y);   
            //Update the node index if the click was inside the node                                     
            if (dist <= this.regions.nodeRadius + this.regions.nodeStrokeSize) {
                this.polygon.selectedNodeIndex = i;                                                                        
            }
            //Update the current closest node if necessary   
            if (this.polygon.closestNode.dist < 0 || dist < this.polygon.closestNode.dist) {
                this.polygon.closestNode.dist = dist;
                this.polygon.closestNode.index = i;
            }  
        }
    }

    //Remove the currently selected polygon node
    removePolygonNode() {
        //Exit early as the polygon is the smallest it can be.
        if (this.polygon.nodes.length <= 3) { return; }                                        
        this.polygon.nodes.splice(this.polygon.selectedNodeIndex, 1);
        this.polygon.selectedNodeIndex = -1;
    }

    //Adds a polygon node at the specified point and joins it to the correct nodes.
    //NOTE: Currently buggy and does NOT correctly join the node in certain situations. To be fixed.
    addPolygonNode(pos) {
        //Get the distance between the point and previously adjoining node to the current closest node.
        let prevDist = -1;
        if (this.polygon.closestNode.index - 1 >= 0) {
            prevDist = getDistanceBetweenPoints(pos.x, pos.y, this.polygon.nodes[this.polygon.closestNode.index - 1].x, this.polygon.nodes[this.polygon.closestNode.index - 1].y);
        } else {
            prevDist = getDistanceBetweenPoints(pos.x, pos.y, this.polygon.nodes[this.polygon.nodes.length - 1].x, this.polygon.nodes[this.polygon.nodes.length - 1].y);                                            
        }
        //Get the distance between the point and next adjoining node to the current closest node.
        let nextDist = -1;
        if (this.polygon.closestNode.index + 1 < this.polygon.nodes.length) {
            nextDist = getDistanceBetweenPoints(pos.x, pos.y, this.polygon.nodes[this.polygon.closestNode.index + 1].x, this.polygon.nodes[this.polygon.closestNode.index + 1].y);
        } else {
            nextDist = getDistanceBetweenPoints(pos.x, pos.y, this.polygon.nodes[0].x, this.polygon.nodes[0].y);                                            
        }

        //Compare if the point is closer to the next or previous adjoining node so that it can be placed
        //at the correct index.
        if (prevDist < nextDist) {
            this.polygon.nodes.splice(this.polygon.closestNode.index,0,{x: pos.x, y: pos.y});                                            
        } else {
            this.polygon.nodes.splice(this.polygon.closestNode.index + 1,0,{x: pos.x, y: pos.y});                                                                                        
        }
    }

    /*
    **    Rect update/input methods
    */
    updateRectRegion() {
        //Set the nodes of the rect correctly
        this.rect.nodes = [{x: this.rect.start.x, y: this.rect.start.y},
            {x: this.rect.start.x + this.rect.size.x, y: this.rect.start.y},
            {x: this.rect.start.x, y: this.rect.start.y + this.rect.size.y},
            {x: this.rect.start.x + this.rect.size.x, y: this.rect.start.y + this.rect.size.y}];
        //Override the current saved region with the temp rect
        this.regions.list[this.regions.index] = this.rect;
    }

    onRectLeftClick(pos) {
        //Start drawing a new rectangle if nodes aren't turned on
        if (!this.regions.showNodes) {
            this.resetRectangle();
            this.rect.start = pos;
        } else {
            //If nodes are being turned on, check if the click was within the bounds of one of the nodes 
            //and set it as the selected node
            for (let i = 0; i < this.rect.nodes.length; i++) {
                if (getPointWithinRadiusOfPoint(pos.x, pos.y, this.rect.nodes[i].x, this.rect.nodes[i].y, this.regions.nodeRadius + this.regions.nodeStrokeSize)) {
                    this.rect.selectedNodeIndex = i;
                }
            }
        }
    }

    onRectDrag(pos) {
        if (this.regions.showNodes) {
            const offsetX = this.rect.start.x - pos.x;
            const offsetY = this.rect.start.y - pos.y;

            //Depending on the selected corner of the rectangle, manipulate
            // it's properties accordingly to correctly resize it.
            switch(this.rect.selectedNodeIndex) {
                case 0 : {
                    this.rect.start.x = pos.x;
                    this.rect.start.y = pos.y;
                    this.rect.size.x += offsetX;
                    this.rect.size.y += offsetY;
                    break;
                }
                case 1 : {
                    this.rect.size.x = pos.x - this.rect.start.x;
                    this.rect.start.y = pos.y;
                    this.rect.size.y += offsetY;
                    break;
                }
                case 2 : {
                    this.rect.start.x = pos.x;
                    this.rect.size.y = pos.y - this.rect.start.y;
                    this.rect.size.x += offsetX;                                    
                    break;
                }        
                case 3 : {
                    this.rect.size.x = pos.x - this.rect.start.x;
                    this.rect.size.y = pos.y - this.rect.start.y;
                    break;
                }                      
            }
        } else {
            //Simple drag the rect to set the size
            this.rect.size = {
                x: pos.x - this.rect.start.x,
                y: pos.y - this.rect.start.y
            };
        }
    }

    onRectRelease() {
        //Reset the selected node.
        this.rect.selectedNodeIndex = -1;
    }

    onRectInput(pos, type) {
        //Call correct methods based on input type
        switch(type) {
            case 'press' : {
                this.onRectLeftClick(pos);
                break;                        
            }
            case 'drag' : {
                this.onRectDrag(pos);
                break;
            }
            case 'release' : {
                this.onRectRelease();        
                break;
            }
        }
    }

    /*
    **    Polygon update/input methods
    */
    updatePolygonRegion() {
        this.regions.list[this.regions.index] = this.polygon;
    }

    onPolygonLeftClick(pos) {
        if (!this.regions.showNodes) {
            //Return as the polygon can't be changed now
            if (this.polygon.closed) { return; }
            //Set the polygon start point
            if (!this.polygon.index > 0) {
                this.polygon.nodes[this.polygon.index].x = pos.x;
                this.polygon.nodes[this.polygon.index].y = pos.y;
                return; 
            }
            this.polygon.nodes.push({x: pos.x, y: pos.y});
        } else {
            //If nodes are visible, check if the click was within the bounds of one of the nodes
            for (let i = 0; i < this.polygon.nodes.length; i++) {
                if (getPointWithinRadiusOfPoint(pos.x, pos.y, this.polygon.nodes[i].x, this.polygon.nodes[i].y, this.regions.nodeRadius + this.regions.nodeStrokeSize)) {                                            
                    this.polygon.selectedNodeIndex = i;
                }
            }
        }
    }

    onPolygonRightClick(pos) {
        if (!this.regions.showNodes) {
            //Close the polygon frame if it's a legal polygon
            if ( this.polygon.index > 0 && !this.polygon.closed && this.polygon.nodes.length >= 3) {
                this.polygon.closed = true;
            } else {
                //If the polygon was already closed delete it
                this.polygon.closed = false;
                this.polygon.nodes = [{x:0, y:0}];
                this.polygon.index = 0;
            }
        } else {
            //Check for polygon node manipulation
            this.checkForPolygonNodeSelection(pos);
            if (this.polygon.selectedNodeIndex >= 0 && this.polygon.selectedNodeIndex < this.polygon.nodes.length) { 
                this.removePolygonNode();
            } else {
                this.addPolygonNode(pos);
            }                                 
        }
        
        //Reset properties
        this.polygon.closestNode.index = -1;
        this.polygon.closestNode.dist = -1;
    }

    onPolygonDrag(pos) {
        if (!this.regions.showNodes) {
            //Polygon isn't modifiable anymore
            if (this.polygon.closed) { return; }
            //Update node position
            this.polygon.nodes[this.polygon.index].x = pos.x;
            this.polygon.nodes[this.polygon.index].y = pos.y;
        } else {
            //Selected node is out of bounds
            if (this.polygon.selectedNodeIndex < 0 || this.polygon.selectedNodeIndex >= this.polygon.nodes.length) { return; }
            //Update node position
            this.polygon.nodes[this.polygon.selectedNodeIndex].x = pos.x;
            this.polygon.nodes[this.polygon.selectedNodeIndex].y = pos.y;
        }
    }

    onPolygonRelease(button) {
        this.polygon.selectedNodeIndex = -1;      
        if (!this.regions.showNodes) {                    
            if (this.polygon.closed) { return; }
            
            if ( button === 0 ) {
                this.polygon.index++;
            }
        }
    }

    onPolygonInput(pos, type, button) {
        switch(type) {
            case 'press' : {
                switch(button) {
                    case 0 : {
                        this.onPolygonLeftClick(pos);
                        break;
                    }
                    case 1 :
                    case 2 : {
                        this.onPolygonRightClick(pos);
                        break;
                    }
                }
                break;
            }
            case 'drag' : {
                this.onPolygonDrag(pos);
                break;
            }
            case 'release' : {
                this.onPolygonRelease(button);
                break;
            }
        }
    }
    
    /*
    **    Input checks
    */
    onMouseInput(evt) {
        const {pos, type, button} = evt;
        const shape = this.shape;

        switch(shape) {
            case 'rect' : {
                this.onRectInput(pos, type);
                this.updateRectRegion();                
                break;
            }
            case 'polygon' : {
                this.onPolygonInput(pos, type, button);
                this.updatePolygonRegion();
                break;
            }
        }

        this.draw();
    }

    contextMenu(e) {
        e.preventDefault();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.shape != nextProps.shape) {
            this.shape = nextProps.shape;
            this.resetRectangle();
            this.resetPolygon();
        }
        if (nextProps.saveRegion) {
            this.saveRegion();
            nextProps.saveRegionReset(false);
            nextProps.setLayers(this.regions.list.length, this.regions.index);            
        }

        if (nextProps.prevLayer) {
            this.offsetLayerIndex(-1);
            nextProps.prevLayerReset(false);
            nextProps.setLayers(this.regions.list.length, this.regions.index);   
        }

        if (nextProps.nextLayer) {
            this.offsetLayerIndex(1);            
            nextProps.nextLayerReset(false);
            nextProps.setLayers(this.regions.list.length, this.regions.index);   
        }

        if (nextProps.toggleNodes) {
            this.toggleNodes();
            nextProps.toggleNodesReset(false);
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
        return (
            <div className="display">
                <canvas width="640" height="480" onContextMenu={this.contextMenu}/>
            </div>
        );
    }
}

export default RegionSelector;
