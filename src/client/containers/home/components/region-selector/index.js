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
            index: 0
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

    resetPolygon() {
        this.polygon = {
            type: 'polygon',
            color: this.getRandomColour(),
            nodes: [{x: 0, y: 0}],
            index: 0,
            closed: false
        };
    }

    resetRectangle() {
        this.rect = {
            type: 'rect',
            color: this.getRandomColour(),
            start: {x: 0, y: 0},
            size: {x: 0, y: 0}
        };
    }

    saveRegion() {
        this.regions.index++;
        this.resetPolygon();
        this.resetRectangle();
    }

    onMouseInput(evt) {
        const {pos, type, button} = evt;
        const {canvas, start} = this;
        const shape = this.shape;
        canvas.primitive().clear();
        
        switch(shape) {
            case 'rect' : {
                switch(type) {
                    case 'press' : {
                        this.resetRectangle();
                        this.rect.start = pos;
                        break;
                    }
                    case 'drag'    :
                    case 'release' : {
                        this.rect.size = {
                            x: pos.x - this.rect.start.x,
                            y: pos.y - this.rect.start.y
                        };
                        break;
                    }
                }

                this.regions.list[this.regions.index] = this.rect;
                break;
            }
            case 'polygon' : {
                switch(type) {
                    case 'press' : {
                        switch(button) {
                            case 0 : {
                                if (this.polygon.closed) { break; }
                                
                                if (!this.polygon.index > 0) {
                                    this.polygon.nodes[this.polygon.index].x = pos.x;
                                    this.polygon.nodes[this.polygon.index].y = pos.y;
                                    break; 
                                }

                                this.polygon.nodes.push({x: pos.x, y: pos.y});
                                break;
                            }
                            case 1 :
                            case 2 : {
                                if ( this.polygon.index > 0 && !this.polygon.closed) {
                                    this.polygon.closed = true;
                                } else {
                                    this.polygon.closed = false;
                                    this.polygon.nodes = [{x:0, y:0}];
                                    this.polygon.index = 0;
                                }
                                break;
                            }
                        }
                        break;
                    }
                    case 'drag' : {
                        if (this.polygon.closed) { break; }
                        
                        this.polygon.nodes[this.polygon.index].x = pos.x;
                        this.polygon.nodes[this.polygon.index].y = pos.y;
                        break;
                    }
                    case 'release' : {          
                        if (this.polygon.closed) { break; }
                        
                        if ( button === 0 ) {
                            this.polygon.index++;
                        }                 
                        break;
                    }
                }
                
                this.regions.list[this.regions.index] = this.polygon;
                break;
            }
        }

        for (let i = 0; i <= this.regions.index; i++)
        {
            if(this.regions.list[i].type == 'rect'){
                this.drawRectangleRegion(i, canvas);
            } else if (this.regions.list[i].type == 'polygon') {
                this.drawPolygonRegion(i);
            }
        }
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
        }
    }

    // called on first render
    componentDidMount() {
        const domElement = document.querySelector('.display');
        const cql = CanvasQL('.display canvas');
        cql.primitive().clear();
        cql.primitive().rect().at(10, 20).size(32, 32).go();

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
