import React, {Component} from 'react';
import {mouse, CanvasQL} from 'gocanvas';

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
            nodeRadius: 10
        };
        this.shape = 'rect';
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    getRandomColour() {
        const min = 0;
        const max = 256;
        return {
            r: this.getRandomInt(min, max),
            g: this.getRandomInt(min, max),
            b: this.getRandomInt(min, max),
            a: 0.5
        };
    }

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

    /* eslint-disable */
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
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
            this.ctx.lineWidth = 5;
            this.ctx.strokeStyle = '#eeeeee';
            this.ctx.stroke();
        }
    }

    resetPolygon() {
        this.polygon = {
            type: 'polygon',
            color: this.getRandomColour(),
            nodes: [{x: 0, y: 0}],
            index: 0,
            closed: false,
            selectedNodeIndex: -1
        };
    }

    resetRectangle() {
        this.rect = {
            type: 'rect',
            color: this.getRandomColour(),
            nodes: [{x: 0, y: 0},
                    {x: 0, y: 0},
                    {x: 0, y: 0},
                    {x: 0, y: 0}],
            start: {x: 0, y: 0},
            size: {x: 0, y: 0},
            selectedNodeIndex: -1
        };
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

    saveRegion() {
        if (this.regions.index == this.regions.list.length - 1) {
            this.regions.index++;
            this.regions.list.push({});
        }
        this.resetPolygon();
        this.resetRectangle();
        this.regions.showNodes = false;
    }

    offsetLayerIndex(offset) {
        if ( this.regions.index + offset >= this.regions.list.length ||
             this.regions.index + offset < 0 
            ) {
            return;
        }

        this.regions.index += offset;
    }

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

    onMouseInput(evt) {
        const {pos, type, button} = evt;
        const shape = this.shape;
        
        switch(shape) {
            case 'rect' : {
                switch(type) {
                    case 'press' : {
                        if (!this.regions.showNodes) {
                            this.resetRectangle();
                            this.rect.start = pos;
                        } else {
                            for (let i = 0; i < this.rect.nodes.length; i++) {
                                if (Math.sqrt(Math.pow((pos.x - this.rect.nodes[i].x), 2) + Math.pow((pos.y - this.rect.nodes[i].y), 2)) <= this.regions.nodeRadius) {
                                    this.rect.selectedNodeIndex = i;
                                }
                            }
                        }
                        
                        break;                        
                    }
                    case 'drag' : {
                        if (this.regions.showNodes) {
                            const offsetX = this.rect.start.x - pos.x;
                            const offsetY = this.rect.start.y - pos.y;

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
                            break;
                        }
                    }
                    case 'release' : {
                        if (!this.regions.showNodes) {
                            this.rect.size = {
                                x: pos.x - this.rect.start.x,
                                y: pos.y - this.rect.start.y
                            };
                        }                        
                        this.rect.selectedNodeIndex = -1;
                        break;
                    }
                }

                this.rect.nodes = [{x: this.rect.start.x, y: this.rect.start.y},
                    {x: this.rect.start.x + this.rect.size.x, y: this.rect.start.y},
                    {x: this.rect.start.x, y: this.rect.start.y + this.rect.size.y},
                    {x: this.rect.start.x + this.rect.size.x, y: this.rect.start.y + this.rect.size.y}];
                this.regions.list[this.regions.index] = this.rect;
                break;
            }
            case 'polygon' : {
                switch(type) {
                    case 'press' : {
                        switch(button) {
                            case 0 : {
                                if (!this.regions.showNodes) {
                                    if (this.polygon.closed) { break; }
                                    if (!this.polygon.index > 0) {
                                        this.polygon.nodes[this.polygon.index].x = pos.x;
                                        this.polygon.nodes[this.polygon.index].y = pos.y;
                                        break; 
                                    }
    
                                    this.polygon.nodes.push({x: pos.x, y: pos.y});
                                } else {
                                    for (let i = 0; i < this.polygon.nodes.length; i++) {
                                        if (Math.sqrt(Math.pow((pos.x - this.polygon.nodes[i].x), 2) + Math.pow((pos.y - this.polygon.nodes[i].y), 2)) <= this.regions.nodeRadius) {
                                            this.polygon.selectedNodeIndex = i;
                                        }
                                    }
                                }
                                break;
                            }
                            case 1 :
                            case 2 : {
                                if (!this.regions.showNodes) {
                                    if ( this.polygon.index > 0 && !this.polygon.closed) {
                                        this.polygon.closed = true;
                                    } else {
                                        this.polygon.closed = false;
                                        this.polygon.nodes = [{x:0, y:0}];
                                        this.polygon.index = 0;
                                    }
                                }
                                break;
                            }
                        }
                        break;
                    }
                    case 'drag' : {
                        if (!this.regions.showNodes) {
                            if (this.polygon.closed) { break; }
                            
                            this.polygon.nodes[this.polygon.index].x = pos.x;
                            this.polygon.nodes[this.polygon.index].y = pos.y;
                            break;
                        } else {
                            if (this.polygon.selectedNodeIndex < 0 || this.polygon.selectedNodeIndex >= this.polygon.nodes.length) { break; }
                            this.polygon.nodes[this.polygon.selectedNodeIndex].x = pos.x;
                            this.polygon.nodes[this.polygon.selectedNodeIndex].y = pos.y;
                        }
                        break;
                    }
                    case 'release' : {
                        this.polygon.selectedNodeIndex = -1;      
                        if (!this.regions.showNodes) {                    
                            if (this.polygon.closed) { break; }
                            
                            if ( button === 0 ) {
                                this.polygon.index++;
                            }
                        }
                        break;
                    }
                }
                
                this.regions.list[this.regions.index] = this.polygon;
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
