import React, {Component} from 'react';

import './style.scss';

export class SelectedRegion extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="display zoomed-display">
                <canvas width="320" height="320"/>
                <div className="tool-bar">
                    <button type="button" onClick={() => this.props.handleClick('rect')}>Rectangle Tool</button>
                    <button type="button" onClick={() => this.props.handleClick('polygon')}>Polygon Tool</button>
                    <button type="button" onClick={() => this.props.saveRegionClick(true)}>Save Region</button>
                    <button type="button" onClick={() => this.props.toggleNodesClick(true)}>Toggle Nodes</button>
                    {/* <button>Add Line</button>
                    <button>Add Point</button> */}
                    <br/>
                    <button type="button" onClick={() => this.props.prevLayerClick(true)}>Previous Layer</button>
                    <button type="button" onClick={() => this.props.nextLayerClick(true)}>Next Layer</button>
                    <pre id="remove-later">
                        Number of Layers: {this.props.numberOfLayers} <br/>
                        Current Layer Index: {this.props.layerIndex}
                    </pre>
                </div>
            </div>
        );
    }
}

export default SelectedRegion;
